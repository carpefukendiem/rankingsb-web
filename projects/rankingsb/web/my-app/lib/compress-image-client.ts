/** Browser-only: shrink a reference photo so Unico uploads stay under the API body limit. */

const MAX_DIMENSION = 1600
const TARGET_BYTES = 1.2 * 1024 * 1024

export async function compressImageForUpload(file: File, maxBytes: number): Promise<File> {
  if (!file.type.startsWith("image/")) return file
  if (file.size <= TARGET_BYTES && file.size <= maxBytes) return file
  if (typeof createImageBitmap !== "function") return file

  const bitmap = await createImageBitmap(file)
  try {
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
    const width = Math.max(1, Math.round(bitmap.width * scale))
    const height = Math.max(1, Math.round(bitmap.height * scale))

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) return file
    ctx.drawImage(bitmap, 0, 0, width, height)

    const limit = Math.min(maxBytes, TARGET_BYTES)
    let quality = 0.82
    let blob: Blob | null = null
    while (quality >= 0.45) {
      blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/jpeg", quality)
      })
      if (blob && blob.size <= limit) break
      quality -= 0.08
    }

    if (!blob) return file
    const base = file.name.replace(/\.[^.]+$/, "") || "upload"
    return new File([blob], `${base}.jpg`, { type: "image/jpeg", lastModified: Date.now() })
  } finally {
    bitmap.close()
  }
}
