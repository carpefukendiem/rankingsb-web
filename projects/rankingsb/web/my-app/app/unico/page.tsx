"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { AlertTriangle, CheckCircle2, Loader2, Trash2, Upload } from "lucide-react"
import {
  isValidEmail,
  validateImageFile,
  MAX_IMAGE_BYTES,
  UNICO_PRIMARY,
} from "@/lib/unico-request-validation"

type Tab = "tryouts" | "misc"
type FormStatus = "idle" | "success" | "error"

const hoverBlue = "#003380"
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0047AB]"

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {message}
    </p>
  )
}

export default function UnicoGraphicRequestsPage() {
  const baseId = useId()
  const tryoutsFormRef = useRef<HTMLFormElement>(null)
  const miscFormRef = useRef<HTMLFormElement>(null)
  const fileInputTryoutsRef = useRef<HTMLInputElement>(null)
  const fileInputMiscRef = useRef<HTMLInputElement>(null)

  const [tab, setTab] = useState<Tab>("tryouts")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [successCoach, setSuccessCoach] = useState("")
  const [successEmail, setSuccessEmail] = useState("")

  const [imageTryouts, setImageTryouts] = useState<File | null>(null)
  const [previewTryouts, setPreviewTryouts] = useState<string | null>(null)
  const [imageMisc, setImageMisc] = useState<File | null>(null)
  const [previewMisc, setPreviewMisc] = useState<string | null>(null)
  const [mountTime, setMountTime] = useState<number | null>(null)

  useEffect(() => {
    setMountTime(Date.now())
  }, [])

  const clearTryoutsImage = useCallback(() => {
    if (previewTryouts) URL.revokeObjectURL(previewTryouts)
    setImageTryouts(null)
    setPreviewTryouts(null)
    if (fileInputTryoutsRef.current) fileInputTryoutsRef.current.value = ""
  }, [previewTryouts])

  const clearMiscImage = useCallback(() => {
    if (previewMisc) URL.revokeObjectURL(previewMisc)
    setImageMisc(null)
    setPreviewMisc(null)
    if (fileInputMiscRef.current) fileInputMiscRef.current.value = ""
  }, [previewMisc])

  const assignTryoutsFile = (file: File | null) => {
    if (!file || file.size === 0) {
      clearTryoutsImage()
      return
    }
    const err = validateImageFile(file)
    if (err) {
      setErrors((e) => ({ ...e, imageTryouts: err }))
      return
    }
    setErrors((e) => {
      const next = { ...e }
      delete next.imageTryouts
      return next
    })
    setPreviewTryouts((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
    setImageTryouts(file)
    if (fileInputTryoutsRef.current) fileInputTryoutsRef.current.value = ""
  }

  const assignMiscFile = (file: File | null) => {
    if (!file || file.size === 0) {
      clearMiscImage()
      return
    }
    const err = validateImageFile(file)
    if (err) {
      setErrors((e) => ({ ...e, imageMisc: err }))
      return
    }
    setErrors((e) => {
      const next = { ...e }
      delete next.imageMisc
      return next
    })
    setPreviewMisc((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
    setImageMisc(file)
    if (fileInputMiscRef.current) fileInputMiscRef.current.value = ""
  }

  const resetAll = () => {
    tryoutsFormRef.current?.reset()
    miscFormRef.current?.reset()
    clearTryoutsImage()
    clearMiscImage()
    setErrors({})
    setStatus("idle")
    setSuccessCoach("")
    setSuccessEmail("")
  }

  const validateTryouts = (fd: FormData) => {
    const next: Record<string, string> = {}
    const coachName = String(fd.get("coachName") || "").trim()
    const coachEmail = String(fd.get("coachEmail") || "").trim()
    if (!coachName) next.coachName = "Coach name is required."
    if (!coachEmail) next.coachEmail = "Coach email is required."
    else if (!isValidEmail(coachEmail)) next.coachEmail = "Enter a valid email address."
    if (!String(fd.get("division") || "").trim()) next.division = "Division is required."
    if (!String(fd.get("ageRange") || "").trim()) next.ageRange = "Age range is required."
    if (!String(fd.get("tryoutDates") || "").trim()) next.tryoutDates = "Dates of tryouts are required."
    if (!String(fd.get("tryoutTimes") || "").trim()) next.tryoutTimes = "Times of tryouts are required."
    if (!String(fd.get("location") || "").trim()) next.location = "Location is required."
    const ea = String(fd.get("eaStatus") || "").trim()
    if (!ea) next.eaStatus = "EA status is required."
    return next
  }

  const validateMisc = (fd: FormData) => {
    const next: Record<string, string> = {}
    const coachName = String(fd.get("coachName") || "").trim()
    const coachEmail = String(fd.get("coachEmail") || "").trim()
    if (!coachName) next.coachName = "Coach name is required."
    if (!coachEmail) next.coachEmail = "Coach email is required."
    else if (!isValidEmail(coachEmail)) next.coachEmail = "Enter a valid email address."
    if (!String(fd.get("requestTitle") || "").trim()) next.requestTitle = "Request type / title is required."
    if (!String(fd.get("description") || "").trim()) next.description = "Description is required."
    return next
  }

  async function submitTryouts(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    const form = e.currentTarget
    const fd = new FormData(form)
    const v = validateTryouts(fd)
    setErrors(v)
    if (Object.keys(v).length) return

    setSubmitting(true)
    setStatus("idle")
    try {
      const body = new FormData()
      body.append("formType", "tryouts")
      body.append("coachName", String(fd.get("coachName")))
      body.append("coachEmail", String(fd.get("coachEmail")))
      body.append("division", String(fd.get("division")))
      body.append("ageRange", String(fd.get("ageRange")))
      body.append("tryoutDates", String(fd.get("tryoutDates")))
      body.append("tryoutTimes", String(fd.get("tryoutTimes")))
      body.append("location", String(fd.get("location")))
      body.append("eaStatus", String(fd.get("eaStatus")))
      body.append("additionalDetails", String(fd.get("additionalDetails") || ""))
      body.append("_hp", String(fd.get("_hp") || ""))
      body.append("_t", mountTime != null ? String(mountTime) : "")
      if (imageTryouts) body.append("image", imageTryouts)

      const res = await fetch("/api/unico-request", { method: "POST", body })
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string }
      if (!res.ok || !data.success) {
        setStatus("error")
        return
      }
      setSuccessCoach(String(fd.get("coachName")).trim())
      setSuccessEmail(String(fd.get("coachEmail")).trim())
      setStatus("success")
    } catch {
      setStatus("error")
    } finally {
      setSubmitting(false)
    }
  }

  async function submitMisc(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    const form = e.currentTarget
    const fd = new FormData(form)
    const v = validateMisc(fd)
    setErrors(v)
    if (Object.keys(v).length) return

    setSubmitting(true)
    setStatus("idle")
    try {
      const body = new FormData()
      body.append("formType", "misc")
      body.append("coachName", String(fd.get("coachName")))
      body.append("coachEmail", String(fd.get("coachEmail")))
      body.append("requestTitle", String(fd.get("requestTitle")))
      body.append("description", String(fd.get("description")))
      body.append("additionalDetails", String(fd.get("additionalDetails") || ""))
      body.append("_hp", String(fd.get("_hp") || ""))
      body.append("_t", mountTime != null ? String(mountTime) : "")
      if (imageMisc) body.append("image", imageMisc)

      const res = await fetch("/api/unico-request", { method: "POST", body })
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string }
      if (!res.ok || !data.success) {
        setStatus("error")
        return
      }
      setSuccessCoach(String(fd.get("coachName")).trim())
      setSuccessEmail(String(fd.get("coachEmail")).trim())
      setStatus("success")
    } catch {
      setStatus("error")
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = `w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 shadow-sm ${focusRing}`

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#f1f5f9_100%)] text-slate-900">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${UNICO_PRIMARY} 0 1px, transparent 1px 48px), repeating-linear-gradient(0deg, ${UNICO_PRIMARY} 0 1px, transparent 1px 48px)`,
        }}
        aria-hidden
      />

      <section
        className="relative overflow-hidden border-b border-slate-200/80 text-white"
        style={{ background: `linear-gradient(135deg, ${UNICO_PRIMARY} 0%, #003380 55%, #001a4d 100%)` }}
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/15 opacity-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-10 h-56 w-56 rotate-12 rounded-3xl border-2 border-white/10"
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          aria-hidden
        />
        <div className="container relative mx-auto max-w-5xl px-4 py-14 md:py-20">
          <div
            className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-white/5 px-6 py-10 backdrop-blur-sm md:px-10"
            style={{ clipPath: "inset(0 round 24px)" }}
          >
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Unico Soccer Club</p>
            <h1 className="mt-3 text-center text-3xl font-bold tracking-tight md:text-4xl">Unico Soccer Club - Graphic Requests</h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-white/90 md:text-lg">
              Submit your graphic requests for team tryouts and promotional materials
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-10 md:py-14">
        <div
          role="tablist"
          aria-label="Graphic request type"
          className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <button
            type="button"
            role="tab"
            id={`${baseId}-tab-tryouts`}
            aria-selected={tab === "tryouts"}
            aria-controls={`${baseId}-panel-tryouts`}
            className={`min-h-[48px] flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold transition-colors sm:text-base ${
              tab === "tryouts"
                ? "text-white shadow-lg shadow-blue-900/25"
                : "border border-slate-200 bg-white text-slate-700 hover:border-[#0047AB]/40"
            }`}
            style={tab === "tryouts" ? { backgroundColor: UNICO_PRIMARY } : undefined}
            onClick={() => {
              setTab("tryouts")
              setErrors({})
              setStatus("idle")
            }}
          >
            Team Tryouts Graphic Request
          </button>
          <button
            type="button"
            role="tab"
            id={`${baseId}-tab-misc`}
            aria-selected={tab === "misc"}
            aria-controls={`${baseId}-panel-misc`}
            className={`min-h-[48px] flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold transition-colors sm:text-base ${
              tab === "misc"
                ? "text-white shadow-lg shadow-blue-900/25"
                : "border border-slate-200 bg-white text-slate-700 hover:border-[#0047AB]/40"
            }`}
            style={tab === "misc" ? { backgroundColor: UNICO_PRIMARY } : undefined}
            onClick={() => {
              setTab("misc")
              setErrors({})
              setStatus("idle")
            }}
          >
            Miscellaneous Graphic Request
          </button>
        </div>

        {status === "success" && (
          <div
            className="mx-auto mt-10 max-w-2xl rounded-2xl border border-emerald-200 bg-emerald-50/90 p-6 shadow-sm md:p-8"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-8 w-8 shrink-0 text-emerald-600" aria-hidden />
              <div className="space-y-3 text-slate-800">
                <p className="text-lg font-semibold text-emerald-900">✓ Request Submitted Successfully!</p>
                <p className="whitespace-pre-line text-sm leading-relaxed md:text-base">
                  {`Thank you, ${successCoach}! Your graphic request has been received.\nYou will receive a confirmation email at ${successEmail}.\n\nWe'll get back to you shortly with your completed graphic.`}
                </p>
                <button
                  type="button"
                  className={`mt-2 inline-flex min-h-[44px] items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-95 ${focusRing}`}
                  style={{ backgroundColor: UNICO_PRIMARY }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = hoverBlue
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = UNICO_PRIMARY
                  }}
                  onClick={resetAll}
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div
            className="mx-auto mt-10 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50/95 p-6 shadow-sm md:p-8"
            role="alert"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-8 w-8 shrink-0 text-amber-600" aria-hidden />
              <div className="space-y-3 text-slate-800">
                <p className="text-lg font-semibold text-amber-900">⚠ Submission Error</p>
                <p className="whitespace-pre-line text-sm leading-relaxed md:text-base">
                  {`We couldn't submit your request. Please try again or contact us directly at:\nEmail: ruben@rankingsb.com\nPhone: (805) 307-7600`}
                </p>
                <button
                  type="button"
                  className={`inline-flex min-h-[44px] items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors ${focusRing}`}
                  style={{ backgroundColor: UNICO_PRIMARY }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = hoverBlue
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = UNICO_PRIMARY
                  }}
                  onClick={() => setStatus("idle")}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto mt-10 max-w-3xl">
          <div
            id={`${baseId}-panel-tryouts`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-tryouts`}
            hidden={tab !== "tryouts"}
            className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/5 backdrop-blur md:p-10"
            style={{ clipPath: "inset(0 round 20px)" }}
          >
            <form ref={tryoutsFormRef} onSubmit={submitTryouts} className="space-y-5" noValidate>
              <input name="_hp" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
              <h2 className="text-xl font-bold" style={{ color: UNICO_PRIMARY }}>
                Team tryouts details
              </h2>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-t-coachName`}>
                  Coach Name <span className="text-red-600">*</span>
                </label>
                <input id={`${baseId}-t-coachName`} name="coachName" required className={inputClass} aria-invalid={!!errors.coachName} />
                <FieldError message={errors.coachName} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-t-coachEmail`}>
                  Coach Email <span className="text-red-600">*</span>
                </label>
                <input
                  id={`${baseId}-t-coachEmail`}
                  name="coachEmail"
                  type="email"
                  autoComplete="email"
                  required
                  className={inputClass}
                  aria-invalid={!!errors.coachEmail}
                />
                <FieldError message={errors.coachEmail} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-t-division`}>
                  Division <span className="text-red-600">*</span>
                </label>
                <input id={`${baseId}-t-division`} name="division" placeholder="Girls U13 Team" required className={inputClass} aria-invalid={!!errors.division} />
                <FieldError message={errors.division} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-t-ageRange`}>
                  Age Range <span className="text-red-600">*</span>
                </label>
                <input
                  id={`${baseId}-t-ageRange`}
                  name="ageRange"
                  placeholder="August 1, 2013 - July 31, 2014"
                  required
                  className={inputClass}
                  aria-invalid={!!errors.ageRange}
                />
                <FieldError message={errors.ageRange} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-t-dates`}>
                  Dates of Tryouts <span className="text-red-600">*</span>
                </label>
                <input id={`${baseId}-t-dates`} name="tryoutDates" required className={inputClass} aria-invalid={!!errors.tryoutDates} />
                <FieldError message={errors.tryoutDates} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-t-times`}>
                  Times of Tryouts <span className="text-red-600">*</span>
                </label>
                <input id={`${baseId}-t-times`} name="tryoutTimes" required className={inputClass} aria-invalid={!!errors.tryoutTimes} />
                <FieldError message={errors.tryoutTimes} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-t-location`}>
                  Location <span className="text-red-600">*</span>
                </label>
                <input id={`${baseId}-t-location`} name="location" required className={inputClass} aria-invalid={!!errors.location} />
                <FieldError message={errors.location} />
              </div>

              <fieldset className="space-y-2">
                <legend className="mb-1 text-sm font-medium text-slate-800">
                  EA Status <span className="text-red-600">*</span>
                </legend>
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-6">
                  {(["EA", "Pre-EA", "Not Applicable"] as const).map((opt, i) => (
                    <label key={opt} className="inline-flex items-center gap-2 text-sm text-slate-800">
                      <input type="radio" name="eaStatus" value={opt} required={i === 0} className="h-4 w-4 accent-[#0047AB]" />
                      {opt}
                    </label>
                  ))}
                </div>
                <FieldError message={errors.eaStatus} />
              </fieldset>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-800" id={`${baseId}-t-upload-label`}>
                  Optional picture upload <span className="font-normal text-slate-500">(JPG, PNG, WebP · max 10MB)</span>
                </p>
                <input
                  ref={fileInputTryoutsRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                  className="sr-only"
                  aria-labelledby={`${baseId}-t-upload-label`}
                  onChange={(e) => assignTryoutsFile(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  className={`flex min-h-[140px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#0047AB]/35 bg-slate-50/80 px-4 py-6 text-sm text-slate-700 transition hover:border-[#0047AB]/60 hover:bg-white ${focusRing}`}
                  onClick={() => fileInputTryoutsRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.dataTransfer.dropEffect = "copy"
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    assignTryoutsFile(e.dataTransfer.files?.[0] ?? null)
                  }}
                >
                  <Upload className="h-8 w-8" style={{ color: UNICO_PRIMARY }} aria-hidden />
                  <span className="font-medium" style={{ color: UNICO_PRIMARY }}>
                    Drag & drop or click to upload
                  </span>
                  <span className="text-xs text-slate-500">Reference logos or photos for your graphic</span>
                </button>
                <FieldError message={errors.imageTryouts} />
                {previewTryouts && imageTryouts ? (
                  <div className="mt-3 flex items-start gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewTryouts} alt="" className="h-24 w-24 rounded-lg border border-slate-200 object-cover" />
                    <div className="text-sm text-slate-600">
                      <p className="font-medium text-slate-800">{imageTryouts.name}</p>
                      <p className="text-xs text-slate-500">{(imageTryouts.size / (1024 * 1024)).toFixed(2)} MB / {(MAX_IMAGE_BYTES / (1024 * 1024)).toFixed(0)} MB max</p>
                      <button
                        type="button"
                        className="mt-2 inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        onClick={clearTryoutsImage}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        Remove
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-t-details`}>
                  Additional Details <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <textarea id={`${baseId}-t-details`} name="additionalDetails" rows={4} className={`${inputClass} resize-y`} />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[220px] ${focusRing}`}
                style={{ backgroundColor: UNICO_PRIMARY }}
                onMouseEnter={(e) => {
                  if (!submitting) e.currentTarget.style.backgroundColor = hoverBlue
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = UNICO_PRIMARY
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    Submitting...
                  </>
                ) : (
                  "Submit tryouts request"
                )}
              </button>
            </form>
          </div>

          <div
            id={`${baseId}-panel-misc`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-misc`}
            hidden={tab !== "misc"}
            className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/5 backdrop-blur md:p-10"
            style={{ clipPath: "inset(0 round 20px)" }}
          >
            <form ref={miscFormRef} onSubmit={submitMisc} className="space-y-5" noValidate>
              <input name="_hp" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
              <h2 className="text-xl font-bold" style={{ color: UNICO_PRIMARY }}>
                Miscellaneous request
              </h2>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-m-coachName`}>
                  Coach Name <span className="text-red-600">*</span>
                </label>
                <input id={`${baseId}-m-coachName`} name="coachName" required className={inputClass} />
                <FieldError message={errors.coachName} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-m-coachEmail`}>
                  Coach Email <span className="text-red-600">*</span>
                </label>
                <input id={`${baseId}-m-coachEmail`} name="coachEmail" type="email" autoComplete="email" required className={inputClass} />
                <FieldError message={errors.coachEmail} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-m-title`}>
                  Request Type / Title <span className="text-red-600">*</span>
                </label>
                <input id={`${baseId}-m-title`} name="requestTitle" required className={inputClass} />
                <FieldError message={errors.requestTitle} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-m-desc`}>
                  Description <span className="text-red-600">*</span>
                </label>
                <textarea id={`${baseId}-m-desc`} name="description" required rows={8} className={`${inputClass} min-h-[200px] resize-y`} />
                <FieldError message={errors.description} />
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-800" id={`${baseId}-m-upload-label`}>
                  Optional picture upload <span className="font-normal text-slate-500">(JPG, PNG, WebP · max 10MB)</span>
                </p>
                <input
                  ref={fileInputMiscRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                  className="sr-only"
                  aria-labelledby={`${baseId}-m-upload-label`}
                  onChange={(e) => assignMiscFile(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  className={`flex min-h-[140px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#0047AB]/35 bg-slate-50/80 px-4 py-6 text-sm text-slate-700 transition hover:border-[#0047AB]/60 hover:bg-white ${focusRing}`}
                  onClick={() => fileInputMiscRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.dataTransfer.dropEffect = "copy"
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    assignMiscFile(e.dataTransfer.files?.[0] ?? null)
                  }}
                >
                  <Upload className="h-8 w-8" style={{ color: UNICO_PRIMARY }} aria-hidden />
                  <span className="font-medium" style={{ color: UNICO_PRIMARY }}>
                    Drag & drop or click to upload
                  </span>
                </button>
                <FieldError message={errors.imageMisc} />
                {previewMisc && imageMisc ? (
                  <div className="mt-3 flex items-start gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewMisc} alt="" className="h-24 w-24 rounded-lg border border-slate-200 object-cover" />
                    <div className="text-sm text-slate-600">
                      <p className="font-medium text-slate-800">{imageMisc.name}</p>
                      <button
                        type="button"
                        className="mt-2 inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        onClick={clearMiscImage}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        Remove
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor={`${baseId}-m-details`}>
                  Additional Details <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <textarea id={`${baseId}-m-details`} name="additionalDetails" rows={4} className={`${inputClass} resize-y`} />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[220px] ${focusRing}`}
                style={{ backgroundColor: UNICO_PRIMARY }}
                onMouseEnter={(e) => {
                  if (!submitting) e.currentTarget.style.backgroundColor = hoverBlue
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = UNICO_PRIMARY
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    Submitting...
                  </>
                ) : (
                  "Submit miscellaneous request"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
