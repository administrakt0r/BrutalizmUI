import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names with tailwind-merge and clsx.
 * @param inputs - Class names to merge.
 * @returns Merged class names string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Transforms a string into a URL-friendly slug.
 * @param input - The string to transform.
 * @returns The slugified string.
 */
export function transformToSlug(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "-")
}
