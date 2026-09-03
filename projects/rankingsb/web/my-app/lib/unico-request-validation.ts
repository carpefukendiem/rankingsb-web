export const UNICO_PRIMARY = "#0047AB"
/** Stay under Vercel serverless body limit (4.5MB) after multipart overhead. */
export const MAX_IMAGE_BYTES = 3.5 * 1024 * 1024
/** Client may pick a larger original; it is compressed before upload. */
export const MAX_ORIGINAL_IMAGE_BYTES = 15 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])
export const ALLOWED_IMAGE_EXTENSIONS = /\.(jpe?g|png|webp)$/i

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  const v = value.trim()
  return v.length > 3 && EMAIL_RE.test(v)
}

export function validateImageType(file: File | null | undefined): string | null {
  if (!file || file.size === 0) return null
  const type = file.type.toLowerCase()
  if (!ALLOWED_IMAGE_TYPES.has(type)) return "Image must be JPG, PNG, or WebP."
  if (!ALLOWED_IMAGE_EXTENSIONS.test(file.name)) return "Image must be JPG, PNG, or WebP."
  return null
}

export function validateImageFile(file: File | null | undefined): string | null {
  if (!file || file.size === 0) return null
  const typeErr = validateImageType(file)
  if (typeErr) return typeErr
  if (file.size > MAX_IMAGE_BYTES) return "Image must be 3.5MB or smaller after compression."
  return null
}

export function validateOriginalImage(file: File | null | undefined): string | null {
  if (!file || file.size === 0) return null
  const typeErr = validateImageType(file)
  if (typeErr) return typeErr
  if (file.size > MAX_ORIGINAL_IMAGE_BYTES) return "Image must be 15MB or smaller."
  return null
}
