/**
 * ⚡ Bolt: Cache for sanitized color strings to avoid redundant processing.
 */
const colorCache = new Map<string, string>()

/**
 * ⚡ Bolt: Cache for sanitized CSS variable names.
 */
const cssVariableCache = new Map<string, string>()

/**
 * ⚡ Bolt: Cache for safe URL checks.
 */
const safeUrlCache = new Map<string, boolean>()

/**
 * ⚡ Bolt: Maximum size for the sanitization caches to prevent memory leaks.
 */
const MAX_CACHE_SIZE = 1000

/**
 * ⚡ Bolt: Hoisted regexes and constants to avoid recreation on every function call.
 */
const COLOR_REGEX = /^[-a-zA-Z0-9#(),.%\s+*\/]+$/
const COLOR_FUNCTION_REGEX = /([a-zA-Z-]+)\s*\(/g
const ALLOWED_COLOR_FUNCTIONS = new Set([
  "rgb",
  "rgba",
  "hsl",
  "hsla",
  "oklch",
  "var",
  "color-mix",
  "light-dark",
  "calc",
  "min",
  "max",
  "clamp",
])

const BLOCKED_PROTOCOLS_REGEX =
  /^(javascript|data|blob|file|ftp|about|chrome|config|view-source|resource|vbscript|tcl|ms-help|filesystem|jar|wyciwyg|mediasource|ms-appx-web|ms-appx|ms-appdata):/i

const DANGEROUS_CHARS_REGEX =
  /[\x00-\x1F\x7F-\x9F<>"'`()|{}\[\]\s\u00AD\u1680\u180E\u2000-\u200F\u202A-\u202E\u2028-\u202F\u205F-\u206F\u3000\uFEFF]/

const BLOCKED_KEYS = new Set([
  "__proto__",
  "constructor",
  "prototype",
  "__definegetter__",
  "__definesetter__",
  "__lookupgetter__",
  "__lookupsetter__",
])

const JSON_LD_REPLACE_MAP: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
}
const JSON_LD_REPLACE_REGEX = /[<>&\u2028\u2029]/g

/**
 * Sanitizes a color string for use in CSS variables.
 * Prevents injection of malicious CSS or HTML tags.
 *
 * @param color The color string to sanitize.
 * @returns The sanitized color string, or an empty string if invalid.
 */
export function sanitizeColor(color: string): string {
  // Ensure input is a string
  if (typeof color !== "string") {
    return ""
  }

  // ⚡ Bolt: Return cached result if available.
  if (colorCache.has(color)) {
    return colorCache.get(color)!
  }

  const result = (function () {
    // Prevent ReDoS and excessively long inputs
    if (color.length > 200) {
      return ""
    }

    // Allow only alphanumeric characters, spaces, and specific CSS punctuation used in color definitions.
    // Whitelist: a-z, A-Z, 0-9, space, #, %, ( ), ,, ., -, +, *, /
    if (!COLOR_REGEX.test(color)) {
      return ""
    }

    // Explicitly block CSS comments even though most dangerous characters are already whitelisted out.
    if (color.includes("/*") || color.includes("*/")) {
      return ""
    }

    // Extract function names: word followed by (
    // Reset regex lastIndex because it's global
    COLOR_FUNCTION_REGEX.lastIndex = 0
    let match
    while ((match = COLOR_FUNCTION_REGEX.exec(color)) !== null) {
      if (!ALLOWED_COLOR_FUNCTIONS.has(match[1].toLowerCase())) {
        return ""
      }
    }

    return color
  })()

  // ⚡ Bolt: Update cache with new result.
  if (colorCache.size >= MAX_CACHE_SIZE) {
    const firstKey = colorCache.keys().next().value
    if (firstKey !== undefined) colorCache.delete(firstKey)
  }
  colorCache.set(color, result)

  return result
}

/**
 * Checks if a URL is safe to use in a link (preventing XSS).
 * Uses a whitelist of allowed protocols and handles relative paths.
 *
 * @param url The URL to check.
 * @returns True if the URL is safe, false otherwise.
 */
export function isSafeUrl(url: string | undefined | null): boolean {
  // Ensure input is a string and within reasonable length limits.
  // 2048 is a common safe maximum length for URLs across browsers.
  if (!url || typeof url !== "string" || url.length > 2048) {
    return false
  }

  // ⚡ Bolt: Return cached result if available.
  if (safeUrlCache.has(url)) {
    return safeUrlCache.get(url)!
  }

  const trimmedUrl = url.trim()

  const result = (function () {
    // Explicitly block dangerous protocols as a fail-safe.
    if (BLOCKED_PROTOCOLS_REGEX.test(trimmedUrl)) {
      return false
    }

    // Block control characters and other dangerous characters.
    if (DANGEROUS_CHARS_REGEX.test(trimmedUrl)) {
      return false
    }

    // Block backslashes in URLs as they can be used for bypasses in some browsers.
    if (trimmedUrl.includes("\\")) {
      return false
    }

    // Allow internal fragments
    if (trimmedUrl.startsWith("#")) {
      return true
    }

    // Allow relative paths and protocol-relative URLs (//), but block potential bypasses like /\
    if (
      trimmedUrl.startsWith("/") ||
      trimmedUrl.startsWith("./") ||
      trimmedUrl.startsWith("../")
    ) {
      // Block /\ which some browsers might treat as //
      if (trimmedUrl.startsWith("/\\")) {
        return false
      }

      // If it's a protocol-relative URL (//), we should ensure it doesn't have a colon
      // in the first segment of the host, unless it's a valid port number.
      if (trimmedUrl.startsWith("//")) {
        const hostPart = trimmedUrl.slice(2).split("/")[0]
        if (hostPart?.includes(":") && !/^[a-zA-Z0-9.-]+:\d+$/.test(hostPart)) {
          return false
        }
        // Also block entities and URL encoding in the host part of protocol-relative URLs
        if (hostPart?.includes("&") || hostPart?.includes("%")) {
          return false
        }
      }

      return true
    }

    // Detect and block protocol bypasses using HTML entities or URL encoding
    const firstSegment = trimmedUrl.split(/[/?#]/)[0]
    if (firstSegment.includes("&") || firstSegment.includes("%")) {
      return false
    }

    // Use URL constructor for robust protocol validation
    try {
      const parsed = new URL(trimmedUrl, "http://n")
      const allowedProtocols = ["http:", "https:", "mailto:", "tel:"]
      return allowedProtocols.includes(parsed.protocol)
    } catch (e) {
      // If it's not a valid absolute URL, check if it's a simple path without protocol
      return !trimmedUrl.includes(":")
    }
  })()

  // ⚡ Bolt: Update cache with new result.
  if (safeUrlCache.size >= MAX_CACHE_SIZE) {
    const firstKey = safeUrlCache.keys().next().value
    if (firstKey !== undefined) safeUrlCache.delete(firstKey)
  }
  safeUrlCache.set(url, result)

  return result
}

/**
 * Safely stringifies an object for use in JSON-LD scripts.
 * Escapes characters that can be used for script breakout or cause parsing issues.
 *
 * @param obj The object to stringify.
 * @returns The safe JSON string.
 */
export function safeJsonLd(obj: unknown): string {
  // ⚡ Bolt: Use a single-pass replacement for better performance.
  return JSON.stringify(obj).replace(
    JSON_LD_REPLACE_REGEX,
    (match) => JSON_LD_REPLACE_MAP[match] || match,
  )
}

/**
 * Escapes a string for use in a CSS string literal (e.g. inside "content: ...").
 * Also escapes characters that can break out of a <style> tag.
 *
 * @param str The string to escape.
 * @returns The escaped string.
 */
export function escapeCSSString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ")
    .replace(/</g, "\\3c ")
    .replace(/>/g, "\\3e ")
}

/**
 * Sanitizes a CSS variable name.
 * Prevents injection of malicious CSS or invalid variable names.
 *
 * @param name The variable name to sanitize.
 * @returns The sanitized variable name, or an empty string if invalid.
 */
export function sanitizeCSSVariable(name: string): string {
  if (typeof name !== "string" || name.length > 100) {
    return ""
  }

  // ⚡ Bolt: Return cached result if available.
  if (cssVariableCache.has(name)) {
    return cssVariableCache.get(name)!
  }

  const result = (function () {
    // Remove invalid characters and trim to prevent bypasses
    const sanitized = name.replace(/[^a-zA-Z0-9-_]/g, "").trim()

    // Block sensitive keys that could be used for prototype pollution
    if (BLOCKED_KEYS.has(sanitized.toLowerCase())) {
      return ""
    }

    return sanitized
  })()

  // ⚡ Bolt: Update cache with new result.
  if (cssVariableCache.size >= MAX_CACHE_SIZE) {
    const firstKey = cssVariableCache.keys().next().value
    if (firstKey !== undefined) cssVariableCache.delete(firstKey)
  }
  cssVariableCache.set(name, result)

  return result
}
