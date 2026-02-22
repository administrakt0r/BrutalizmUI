/**
 * Sanitizes a color string for use in CSS variables.
 * Prevents injection of malicious CSS or HTML tags.
 *
 * @param color The color string to sanitize.
 * @returns The sanitized color string, or an empty string if invalid.
 */
export function sanitizeColor(color: string): string {
  // Allow only alphanumeric characters, spaces, and specific CSS punctuation used in color definitions.
  // Whitelist: a-z, A-Z, 0-9, space, #, %, ( ), ,, ., -, +, *, /
  if (!/^[-a-zA-Z0-9#(),.%\s+*\/]+$/.test(color)) {
    return ""
  }

  // Extract function names: word followed by (
  const regex = /([a-zA-Z-]+)\s*\(/g
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

  while ((match = regex.exec(color)) !== null) {
    if (!allowed.includes(match[1].toLowerCase())) {
      return ""
    }
  }

  return color
}

/**
 * Checks if a URL is safe to use in a link (preventing XSS).
 * Uses a whitelist of allowed protocols and handles relative paths.
 *
 * @param url The URL to check.
 * @returns True if the URL is safe, false otherwise.
 */
export function isSafeUrl(url: string | undefined | null): boolean {
  if (!url) return false
  const trimmedUrl = url.trim()

  // Block control characters and other dangerous characters that might be used for bypasses
  // eslint-disable-next-line no-control-regex
  if (/[\x00-\x1F\x7F-\x9F]/.test(trimmedUrl)) {
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
      if (hostPart?.includes(":") && !/^[a-zA-Z0-9.-]+:\d+$/.test(hostPart)) {
        return false
      }
      // Also block entities in the host part of protocol-relative URLs
      if (hostPart?.includes("&")) {
        return false
      }
    }

    return true
  }

  // Detect and block protocol bypasses using HTML entities (e.g., javascript&colon;)
  // We check the segment before the first /, ?, or #
  const firstSegment = trimmedUrl.split(/[/?#]/)[0]
  if (firstSegment.includes("&")) {
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
 * Escapes < and > characters to prevent </script> injection.
 *
 * @param obj The object to stringify.
 * @returns The safe JSON string.
 */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c").replace(/>/g, "\\u003e")
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
  // Allow only alphanumeric characters, dashes, and underscores.
  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    // Remove invalid characters
    return name.replace(/[^a-zA-Z0-9-_]/g, "")
  }
  return name
}
