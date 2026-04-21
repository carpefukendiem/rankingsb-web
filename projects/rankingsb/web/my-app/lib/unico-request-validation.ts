export const UNICO_PRIMARY = "#0047AB"
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])
export const ALLOWED_IMAGE_EXTENSIONS = /\.(jpe?g|png|webp)$/i

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  const v = value.trim()
  return v.length > 3 && EMAIL_RE.test(v)
}

export function validateImageFile(file: File | null | undefined): string | null {
  if (!file || file.size === 0) return null
  if (file.size > MAX_IMAGE_BYTES) return "Image must be 10MB or smaller."
  const type = file.type.toLowerCase()
  if (!ALLOWED_IMAGE_TYPES.has(type)) return "Image must be JPG, PNG, or WebP."
  if (!ALLOWED_IMAGE_EXTENSIONS.test(file.name)) return "Image must be JPG, PNG, or WebP."
  return null
}
