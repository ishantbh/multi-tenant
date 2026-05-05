import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name?: string) {
  if (!name) return 'G' // Assume it's a guest

  const parts = name
    .trim()
    .split(/\s+/) // split by any whitespace
    .filter(Boolean)

  if (parts.length === 0) return 'G' // Assume it's a guest

  // If only first name
  if (parts.length === 1) {
    return parts[0][0].toUpperCase()
  }

  // If full name, take first letter of first & last
  const first = parts[0][0]
  const last = parts.at(-1)![0]

  return (first + last).toUpperCase()
}
