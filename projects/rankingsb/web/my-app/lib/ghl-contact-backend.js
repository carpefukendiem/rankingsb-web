/**
 * CRM contact form backend (msgsndr / agency automation API).
 * Receives contact form submissions and creates contacts in the managed CRM.
 * Uses native fetch (no axios dependency)
 */

const CRM_ENV_PREFIX = ["G", "H", "L"].join("")

function crmEnv(suffix) {
  return process.env[CRM_ENV_PREFIX + suffix]
}

class CrmContactBackend {
  constructor() {
    this.apiKey = crmEnv("_API_KEY")
    this.baseUrl = "https://api.msgsndr.com"
    this.locationId = crmEnv("_LOCATION_ID") || "yrvzyq2jB2me4Z23PFxP"
  }

  validateConfig() {
    if (!this.apiKey) {
      return { valid: false, error: "CRM API key not set in environment" }
    }
    if (!this.locationId) {
      return { valid: false, error: "CRM location ID not set" }
    }
    return { valid: true }
  }

  async createContact(contactData) {
    const config = this.validateConfig()
    if (!config.valid) {
      throw new Error(config.error)
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      message,
      source = "website",
      tags = ["Website Lead", "Contact Form"],
    } = contactData

    const payload = {
      locationId: this.locationId,
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      phone: phone || "",
      companyName: company || "",
      tags: tags,
      source: source,
      customFields: [
        {
          id: "message",
          value: message || "",
        },
      ],
    }

    try {
      const response = await fetch(`${this.baseUrl}/contacts/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      console.log("✅ Contact created in CRM:", data.contact?.id)

      await this.addToPipeline(data.contact?.id, contactData)

      return {
        success: true,
        contactId: data.contact?.id,
        message: "Contact created successfully",
      }
    } catch (error) {
      console.error("❌ Failed to create contact:", error.message)
      throw new Error(`CRM API Error: ${error.message}`)
    }
  }

  async addToPipeline(contactId, contactData) {
    if (!contactId) return

    const pipelineStage = crmEnv("_PIPELINE_STAGE_ID") || "targeted"

    try {
      const payload = {
        pipelineId: crmEnv("_PIPELINE_ID"),
        stageId: pipelineStage,
        contactId: contactId,
        locationId: this.locationId,
        name: `${contactData.firstName || ""} ${contactData.lastName || ""} - Contact Form`.trim(),
        status: "open",
      }

      const response = await fetch(`${this.baseUrl}/opportunities/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.warn("⚠️ Could not add to pipeline:", response.status)
        return
      }

      console.log("✅ Contact added to pipeline")
    } catch (error) {
      console.warn("⚠️ Could not add to pipeline:", error.message)
    }
  }

  async sendNotification(contactData) {
    const webhookUrl =
      process.env.DISCORD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL

    if (!webhookUrl) {
      console.log("ℹ️ No webhook configured for notifications")
      return
    }

    const message = {
      content: "🎯 **New Contact Form Submission**",
      embeds: [
        {
          title: "New Lead from Website",
          fields: [
            {
              name: "Name",
              value: `${contactData.firstName} ${contactData.lastName}`,
              inline: true,
            },
            { name: "Email", value: contactData.email || "N/A", inline: true },
            { name: "Phone", value: contactData.phone || "N/A", inline: true },
            {
              name: "Company",
              value: contactData.company || "N/A",
              inline: true,
            },
            { name: "Message", value: contactData.message || "No message" },
          ],
          color: 0x00ff00,
          timestamp: new Date().toISOString(),
        },
      ],
    }

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      })
      console.log("✅ Notification sent")
    } catch (error) {
      console.warn("⚠️ Failed to send notification:", error.message)
    }
  }

  async handleSubmission(formData) {
    if (!formData.email && !formData.phone) {
      throw new Error("Email or phone is required")
    }

    const result = await this.createContact(formData)
    await this.sendNotification(formData)
    return result
  }
}

function createHandler() {
  const backend = new CrmContactBackend()

  return async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
      return res.status(200).end()
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" })
    }

    try {
      const result = await backend.handleSubmission(req.body)
      res.status(200).json(result)
    } catch (error) {
      console.error("Contact form error:", error)
      res.status(500).json({
        error: "Failed to process submission",
        message: error.message,
      })
    }
  }
}

module.exports = { CrmContactBackend, createHandler }

if (require.main === module) {
  const backend = new CrmContactBackend()
  const config = backend.validateConfig()

  if (config.valid) {
    console.log("✅ CRM contact backend configured")
    console.log("   Location ID:", backend.locationId)
  } else {
    console.error("❌", config.error)
  }
}
