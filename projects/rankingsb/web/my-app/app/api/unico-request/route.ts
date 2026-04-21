import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { Resend } from "resend"
import twilio from "twilio"
import React from "react"
import { UnicoRequestEmail } from "@/lib/email-templates/unico-request-email"
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  UNICO_NOTIFY_EMAIL,
  UNICO_SMS_TO_E164,
  isValidEmail,
} from "@/lib/unico-request-validation"

export const runtime = "nodejs"

const TRYOUTS = "tryouts"
const MISC = "misc"

function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

function requireEnv(name: string): string | null {
  const v = process.env[name]
  return v && v.trim() ? v.trim() : null
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "upload"
}

function validateImageServer(file: File): string | null {
  if (file.size === 0) return null
  if (file.size > MAX_IMAGE_BYTES) return "Image must be 10MB or smaller."
  const type = (file.type || "").toLowerCase()
  if (!ALLOWED_IMAGE_TYPES.has(type)) return "Image must be JPG, PNG, or WebP."
  return null
}

function str(formData: FormData, key: string): string {
  const v = formData.get(key)
  if (typeof v !== "string") return ""
  return v.trim()
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || ""
  if (!contentType.toLowerCase().includes("multipart/form-data")) {
    return jsonError("Expected multipart/form-data", 415)
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return jsonError("Invalid form data", 400)
  }

  const formType = str(formData, "formType")
  if (formType !== TRYOUTS && formType !== MISC) {
    return jsonError("Invalid or missing form type.", 400)
  }

  const coachName = str(formData, "coachName")
  const coachEmail = str(formData, "coachEmail")
  if (!coachName) return jsonError("Coach name is required.", 400)
  if (!coachEmail) return jsonError("Coach email is required.", 400)
  if (!isValidEmail(coachEmail)) return jsonError("Please enter a valid coach email address.", 400)

  const additionalDetails = str(formData, "additionalDetails")
  const imageEntry = formData.get("image")
  let imageFile: File | null = null
  if (imageEntry instanceof File && imageEntry.size > 0) {
    imageFile = imageEntry
    const imgErr = validateImageServer(imageFile)
    if (imgErr) return jsonError(imgErr, 400)
  }

  const sid = requireEnv("TWILIO_ACCOUNT_SID")
  const token = requireEnv("TWILIO_AUTH_TOKEN")
  const twilioFrom = requireEnv("TWILIO_PHONE_NUMBER")
  const resendKey = requireEnv("RESEND_API_KEY")
  const resendFrom = requireEnv("RESEND_FROM_EMAIL")

  if (!sid || !token || !twilioFrom) {
    console.error("[unico-request] Missing Twilio configuration")
    return jsonError("Server is not configured for notifications. Please try again later.", 503)
  }
  if (!resendKey || !resendFrom) {
    console.error("[unico-request] Missing Resend configuration")
    return jsonError("Server is not configured for email. Please try again later.", 503)
  }

  const formTypeLabel = formType === TRYOUTS ? "Team Tryouts" : "Miscellaneous"

  let division = ""
  let ageRange = ""
  let tryoutDates = ""
  let tryoutTimes = ""
  let location = ""
  let eaStatus = ""
  let requestTitle = ""
  let description = ""

  if (formType === TRYOUTS) {
    division = str(formData, "division")
    ageRange = str(formData, "ageRange")
    tryoutDates = str(formData, "tryoutDates")
    tryoutTimes = str(formData, "tryoutTimes")
    location = str(formData, "location")
    eaStatus = str(formData, "eaStatus")
    if (!division) return jsonError("Division is required.", 400)
    if (!ageRange) return jsonError("Age range is required.", 400)
    if (!tryoutDates) return jsonError("Dates of tryouts are required.", 400)
    if (!tryoutTimes) return jsonError("Times of tryouts are required.", 400)
    if (!location) return jsonError("Location is required.", 400)
    if (!eaStatus) return jsonError("EA status is required.", 400)
  } else {
    requestTitle = str(formData, "requestTitle")
    description = str(formData, "description")
    if (!requestTitle) return jsonError("Request type / title is required.", 400)
    if (!description) return jsonError("Description is required.", 400)
  }

  let imageUrl: string | null = null
  if (imageFile) {
    try {
      const pathname = `unico-requests/${Date.now()}-${sanitizeFilename(imageFile.name)}`
      const uploaded = await put(pathname, imageFile, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
      imageUrl = uploaded.url
    } catch (e) {
      console.error("[unico-request] Blob upload failed:", e)
      return jsonError("Could not upload image. Check file size and type, then try again.", 502)
    }
  }

  const hasImage = Boolean(imageUrl)

  const detailsSnippet = additionalDetails.length > 1200 ? `${additionalDetails.slice(0, 1200)}…` : additionalDetails

  let smsBody: string
  if (formType === TRYOUTS) {
    smsBody = [
      "NEW UNICO TRYOUTS GRAPHIC REQUEST",
      "",
      `Coach: ${coachName}`,
      `Email: ${coachEmail}`,
      `Division: ${division}`,
      `Age Range: ${ageRange}`,
      `Dates: ${tryoutDates}`,
      `Times: ${tryoutTimes}`,
      `Location: ${location}`,
      `EA Status: ${eaStatus}`,
      `Image: ${hasImage ? "Yes" : "No"}`,
      `Details: ${detailsSnippet || "—"}`,
      "",
      "Check email for full details.",
    ].join("\n")
  } else {
    smsBody = [
      "NEW UNICO MISC GRAPHIC REQUEST",
      "",
      `Coach: ${coachName}`,
      `Email: ${coachEmail}`,
      `Type: ${requestTitle}`,
      `Image: ${hasImage ? "Yes" : "No"}`,
      "",
      "Check email for full details.",
    ].join("\n")
  }

  const resend = new Resend(resendKey)
  const twilioClient = twilio(sid, token)

  const emailSubject = `New Unico Graphic Request - ${formTypeLabel} - ${coachName}`

  const emailPayload = {
    formTypeLabel,
    coachName,
    coachEmail,
    division: formType === TRYOUTS ? division : undefined,
    ageRange: formType === TRYOUTS ? ageRange : undefined,
    tryoutDates: formType === TRYOUTS ? tryoutDates : undefined,
    tryoutTimes: formType === TRYOUTS ? tryoutTimes : undefined,
    location: formType === TRYOUTS ? location : undefined,
    eaStatus: formType === TRYOUTS ? eaStatus : undefined,
    requestTitle: formType === MISC ? requestTitle : undefined,
    description: formType === MISC ? description : undefined,
    additionalDetails: additionalDetails || undefined,
    imageUrl,
    hasImage,
  }

  try {
    const emailResponse = await resend.emails.send({
      from: resendFrom,
      to: UNICO_NOTIFY_EMAIL,
      replyTo: coachEmail,
      subject: emailSubject,
      react: React.createElement(UnicoRequestEmail, emailPayload),
    })

    if (emailResponse.error) {
      console.error("[unico-request] Resend error:", emailResponse.error)
      return jsonError("Email notification failed. Please try again or contact us directly.", 502)
    }

    await twilioClient.messages.create({
      body: smsBody,
      from: twilioFrom,
      to: UNICO_SMS_TO_E164,
    })
  } catch (e) {
    console.error("[unico-request] Notification error:", e)
    return jsonError("Could not complete notifications. Please try again.", 502)
  }

  return NextResponse.json({ success: true })
}
