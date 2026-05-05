/**
 * ⚡ Bolt: Cache for sanitized color strings to avoid redundant processing.
 */
const colorCache = new Map<string, string>()

/**
 * ⚡ Bolt: Cache for sanitized CSS variable names.
 */
const cssVariableCache = new Map<string, string>()

/**
 * ⚡ Bolt: Maximum size for the sanitization caches to prevent memory leaks.
 */
const MAX_CACHE_SIZE = 1000

/**
 * ⚡ Bolt: Hoisted regexes for performance optimization.
 */
const COLOR_VALIDATION_RE = /^[-a-zA-Z0-9#(),.%\s+*\/]+$/
const COLOR_FUNCTION_RE = /([a-zA-Z-]+)\s*\(/g
const URL_DANGEROUS_CHARS_RE =
  /[\x00-\x1F\x7F-\x9F<>"'`()|{}\[\]\s\u00AD\u1680\u180E\u2000-\u200F\u202A-\u202E\u2028-\u202F\u205F-\u206F\u3000\uFEFF]/
const URL_SPLIT_RE = /[/?#]/
const URL_HOST_PORT_RE = /^[a-zA-Z0-9.-]+:\d+$/
const JSON_LD_ESCAPE_RE = /[<>&\u2028\u2029]/g
const CSS_VARIABLE_NAME_RE = /[^a-zA-Z0-9-_]/g
const CSS_ESCAPE_RE = /[\\"\n<>]/g

/**
 * ⚡ Bolt: JSON-LD escape mapping for single-pass replacement.
 */
const JSON_LD_ESCAPES: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
}

/**
 * ⚡ Bolt: CSS escape mapping for single-pass replacement.
 */
const CSS_ESCAPES: Record<string, string> = {
  "\\": "\\\\",
  '"': '\\"',
  "\n": " ",
  "<": "\\3c ",
  ">": "\\3e ",
}

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
    if (!COLOR_VALIDATION_RE.test(color)) {
      return ""
    }

    // Explicitly block CSS comments even though most dangerous characters are already whitelisted out.
    if (color.includes("/*") || color.includes("*/")) {
      return ""
    }

    // Extract function names: word followed by (
    COLOR_FUNCTION_RE.lastIndex = 0
    let match
    const allowed = [
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
    ]

    while ((match = COLOR_FUNCTION_RE.exec(color)) !== null) {
      if (!allowed.includes(match[1].toLowerCase())) {
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
  const trimmedUrl = url.trim()

  // Explicitly block dangerous protocols as a fail-safe.
  // data: and blob: can be used for XSS in link contexts.
  const lowerUrl = trimmedUrl.toLowerCase()
  const blockedProtocols = [
    "javascript:",
    "data:",
    "blob:",
    "file:",
    "ftp:",
    "about:",
    "chrome:",
    "config:",
    "view-source:",
    "resource:",
    "vbscript:",
    "tcl:",
    "ms-help:",
    "filesystem:",
    "jar:",
    "wyciwyg:",
    "mediasource:",
    "ms-appx-web:",
    // Block Windows-specific URI schemes used in UWP/Electron which can be used
    // for local file access or protocol-based attacks.
    "ms-appx:",
    "ms-appdata:",
  ]
  if (blockedProtocols.some((proto) => lowerUrl.startsWith(proto))) {
    return false
  }

  // Block control characters and other dangerous characters that might be used for bypasses.
  // We also block angle brackets and quotes to prevent HTML breakout and backslashes to
  // prevent browser-specific path normalization bypasses.
  // We also block backticks to prevent injection in template literals if this URL is used there.
  // We also block parentheses, braces, and pipes to further mitigate XSS risks in dynamic contexts.
  // We also block whitespace characters and zero-width/format Unicode characters to prevent bypasses.
  // We include more specific Unicode characters like directional overrides and invisible separators.
  // eslint-disable-next-line no-control-regex
  if (URL_DANGEROUS_CHARS_RE.test(trimmedUrl)) {
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
    // This prevents edge cases like //javascript:alert(1) while allowing //example.com:8080
    if (trimmedUrl.startsWith("//")) {
      const hostPart = trimmedUrl.slice(2).split("/")[0]
      if (hostPart?.includes(":") && !URL_HOST_PORT_RE.test(hostPart)) {
        return false
      }
      // Also block entities and URL encoding in the host part of protocol-relative URLs
      if (hostPart?.includes("&") || hostPart?.includes("%")) {
        return false
      }
    }

    return true
  }

  // Detect and block protocol bypasses using HTML entities (e.g., javascript&colon;)
  // or URL encoding (e.g., javascript%3a)
  // We check the segment before the first /, ?, or #
  const firstSegment = trimmedUrl.split(URL_SPLIT_RE)[0]
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
    // Also ensures it doesn't contain a colon which could be a protocol
    return !trimmedUrl.includes(":")
  }
}

/**
 * Safely stringifies an object for use in JSON-LD scripts.
 * Escapes characters that can be used for script breakout or cause parsing issues.
 *
 * @param obj The object to stringify.
 * @returns The safe JSON string.
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(
    JSON_LD_ESCAPE_RE,
    (match) => JSON_LD_ESCAPES[match],
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
  return str.replace(CSS_ESCAPE_RE, (match) => CSS_ESCAPES[match])
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
    const sanitized = name.replace(CSS_VARIABLE_NAME_RE, "").trim()

    // Block sensitive keys that could be used for prototype pollution
    // This check is performed AFTER character sanitization to catch bypasses like "__proto__ "
    const blockedKeys = [
      "__proto__",
      "constructor",
      "prototype",
      "__definegetter__",
      "__definesetter__",
      "__lookupgetter__",
      "__lookupsetter__",
    ]
    if (blockedKeys.includes(sanitized.toLowerCase())) {
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
