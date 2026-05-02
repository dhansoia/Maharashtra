import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generatePartnerCode(districtCode: string, sequence: number) {
  return `DP-${districtCode.toUpperCase()}-${String(sequence).padStart(3, '0')}`
}

export function generateApplicationNo(prefix: 'MFP' | 'DP', sequence: number) {
  const year = new Date().getFullYear().toString().slice(-2)
  return `${prefix}${year}-${String(sequence).padStart(5, '0')}`
}
