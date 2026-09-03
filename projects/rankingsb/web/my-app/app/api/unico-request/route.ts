import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import {
  crmRequest,
  getCrmApiKey,
  LOCATION_ID,
  OWNER_USER_ID,
  PIPELINE_ID,
  STAGE_ID,
  WORKFLOW_ID,
  upsertCrmContact,
} from "@/lib/crm-api"
import { isSpamBot } from "@/lib/website-form-bot-guard"
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, isValidEmail } from "@/lib/unico-request-validation"

export const runtime = "nodejs"
export const maxDuration = 30

const TRYOUTS = "tryouts"
const MISC = "misc"

function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "upload"
}

function validateImageServer(file: File): string | null {
  if (file.size === 0) return null
  if (file.size > MAX_IMAGE_BYTES) return "Image must be 3.5MB or smaller."
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

  const _hp = str(formData, "_hp")
  const formType = str(formData, "formType")
  const coachName = str(formData, "coachName")
  const coachEmail = str(formData, "coachEmail")
  const businessHint = formType === TRYOUTS ? str(formData, "division") : str(formData, "requestTitle")

  // Unico forms have many required fields; skip the 5s page-load timing heuristic (it caused
  // silent drops with a fake success response). Honeypot + spam patterns still apply.
  if (isSpamBot(_hp, coachEmail, businessHint)) {
    console.log(`[unico-request] Spam blocked — email=${coachEmail} hp=${!!_hp}`)
    return NextResponse.json({ success: true })
  }

  if (formType !== TRYOUTS && formType !== MISC) {
    return jsonError("Invalid or missing form type.", 400)
  }

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

  if (!getCrmApiKey()) {
    console.error("[unico-request] Missing CRM API key")
    return jsonError("Server is not configured for lead notifications. Please try again later.", 503)
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
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN
    if (!blobToken) {
      console.warn(
        `[unico-request] BLOB_READ_WRITE_TOKEN missing — submitting without image (${imageFile.size} bytes)`
      )
    } else {
      try {
        const pathname = `unico-requests/${Date.now()}-${sanitizeFilename(imageFile.name)}`
        const uploaded = await put(pathname, imageFile, {
          access: "public",
          token: blobToken,
        })
        imageUrl = uploaded.url
      } catch (e) {
        console.error("[unico-request] Blob upload failed (continuing without image):", e)
      }
    }
  }

  const hasImage = Boolean(imageUrl)
  const detailsSnippet = additionalDetails.length > 1200 ? `${additionalDetails.slice(0, 1200)}…` : additionalDetails

  let smsBlock: string
  if (formType === TRYOUTS) {
    smsBlock = [
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
    smsBlock = [
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

  const emailSubject = `New Unico Graphic Request - ${formTypeLabel} - ${coachName}`

  const noteLines = [
    `🎨 ${emailSubject}`,
    "",
    "— Notification text (same format as SMS) —",
    smsBlock,
    "",
    "— Full submission —",
    `Coach name: ${coachName}`,
    `Coach email: ${coachEmail}`,
  ]

  if (formType === TRYOUTS) {
    noteLines.push(
      `Division: ${division}`,
      `Age range: ${ageRange}`,
      `Dates of tryouts: ${tryoutDates}`,
      `Times of tryouts: ${tryoutTimes}`,
      `Location: ${location}`,
      `EA status: ${eaStatus}`
    )
  } else {
    noteLines.push(`Request type / title: ${requestTitle}`, "", "Description:", description)
  }

  if (additionalDetails) {
    noteLines.push("", "Additional details:", additionalDetails)
  }
  if (imageUrl) {
    noteLines.push("", "Reference image (URL):", imageUrl)
  } else if (imageFile) {
    noteLines.push(
      "",
      "Reference image: coach attached a file, but image storage is not configured. Ask them to email the graphic."
    )
  }

  const noteBody = noteLines.join("\n")

  const messagePreview = [
    `[Unico ${formTypeLabel}] ${coachName} · ${coachEmail}`,
    hasImage ? `Image: ${imageUrl}` : "",
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 4000)

  const [firstName, ...rest] = coachName.trim().split(/\s+/)
  const lastName = rest.join(" ") || ""

  const source = formType === TRYOUTS ? "unico-team-tryouts" : "unico-misc-graphic"

  try {
    console.log(
      `[unico-request] CRM upsert start email=${coachEmail} type=${formType} imageBytes=${imageFile?.size ?? 0}`
    )
    const contactId = await upsertCrmContact({
      locationId: LOCATION_ID,
      firstName: firstName || coachName,
      lastName,
      email: coachEmail,
      companyName: "Unico Soccer Club",
      source,
      tags: ["Website Lead", "Unico Graphic Request", formTypeLabel],
      customFields: [{ key: "message", field_value: messagePreview }].filter((f) => f.field_value),
    })

    console.log(`[unico-request] Upserted contact ${contactId} for ${coachEmail}`)

    try {
      await crmRequest("POST", "/opportunities/", {
        locationId: LOCATION_ID,
        pipelineId: PIPELINE_ID,
        pipelineStageId: STAGE_ID,
        contactId,
        name: `${coachName} — Unico ${formTypeLabel}`,
        status: "open",
        assignedTo: OWNER_USER_ID,
        monetaryValue: 0,
      })
    } catch (err) {
      console.error("[unico-request] Opportunity error:", String(err))
    }

    try {
      await crmRequest("POST", `/contacts/${contactId}/workflow/${WORKFLOW_ID}`, {
        eventStartTime: new Date().toISOString(),
      })
      console.log(`[unico-request] Enrolled ${contactId} in workflow`)
    } catch (err) {
      console.error("[unico-request] Workflow error:", String(err))
    }

    try {
      await crmRequest("POST", `/contacts/${contactId}/notes/`, {
        body: noteBody,
        userId: OWNER_USER_ID,
      })
    } catch (err) {
      console.warn("[unico-request] Note error:", String(err))
    }

    return NextResponse.json({ success: true, contactId })
  } catch (err) {
    console.error("[unico-request] CRM error:", err)
    return jsonError("Could not submit your request. Please try again or contact us directly.", 502)
  }
}
