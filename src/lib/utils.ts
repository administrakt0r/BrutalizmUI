import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { sanitizeCSSVariable } from "./security"

/**
 * ⚡ Bolt: Merges class names with tailwind-merge and clsx.
 * @param inputs - Class names to merge.
 * @returns Merged class names string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * ⚡ Bolt: Transforms a string into a URL-friendly slug.
 * @param input - The string to transform.
 * @returns The slugified string.
 */
export function transformToSlug(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "-")
}

/**
 * ⚡ Bolt: Sets a CSS variable on the document root.
 * @param name - The name of the CSS variable (without the -- prefix).
 * @param value - The value to set.
 */
export function setCSSVariable(name: string, value: string) {
  if (typeof window === "undefined") return

  const sanitizedName = sanitizeCSSVariable(name)
  if (!sanitizedName) return

  // Basic value validation to prevent breaking out of a CSS property value context.
  // We block characters like ;, {, }, and comments.
  // We also block dangerous patterns like url(), expression(), and javascript:
  if (
    typeof value !== "string" ||
    value.length > 200 ||
    /[;{}]/.test(value) ||
    value.includes("/*") ||
    value.includes("*/") ||
    /url\s*\(/i.test(value) ||
    /expression\s*\(/i.test(value) ||
    /javascript:/i.test(value)
  ) {
    return
  }

  const r = document.documentElement
  if (r) {
    r.style.setProperty(`--${sanitizedName}`, value)
  }
}
