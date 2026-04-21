import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

const royal = "#0047AB"
const muted = "#64748b"
const border = "#e2e8f0"

export type UnicoRequestEmailProps = {
  formTypeLabel: string
  coachName: string
  coachEmail: string
  division?: string
  ageRange?: string
  tryoutDates?: string
  tryoutTimes?: string
  location?: string
  eaStatus?: string
  requestTitle?: string
  description?: string
  additionalDetails?: string
  imageUrl?: string | null
  hasImage: boolean
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <Section style={{ marginBottom: 12 }}>
      <Text style={{ margin: "0 0 4px 0", fontSize: 12, color: muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </Text>
      <Text style={{ margin: 0, fontSize: 16, color: "#0f172a", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
        {value}
      </Text>
    </Section>
  )
}

export function UnicoRequestEmail({
  formTypeLabel,
  coachName,
  coachEmail,
  division,
  ageRange,
  tryoutDates,
  tryoutTimes,
  location,
  eaStatus,
  requestTitle,
  description,
  additionalDetails,
  imageUrl,
  hasImage,
}: UnicoRequestEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New Unico graphic request — {formTypeLabel}</Preview>
      <Body style={{ backgroundColor: "#f8fafc", fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial', margin: 0, padding: "24px 12px" }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", backgroundColor: "#ffffff", borderRadius: 12, overflow: "hidden", border: `1px solid ${border}` }}>
          <Section
            style={{
              backgroundColor: royal,
              padding: "24px 28px",
              textAlign: "center" as const,
            }}
          >
            <Heading as="h1" style={{ color: "#ffffff", margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Unico Soccer Club
            </Heading>
            <Text style={{ color: "rgba(255,255,255,0.92)", margin: "8px 0 0 0", fontSize: 14 }}>
              Graphic request — {formTypeLabel}
            </Text>
          </Section>

          <Section style={{ padding: "28px 28px 8px 28px" }}>
            <Heading as="h2" style={{ color: royal, margin: "0 0 16px 0", fontSize: 18, fontWeight: 700 }}>
              Submission details
            </Heading>
            <Row label="Coach name" value={coachName} />
            <Row label="Coach email" value={coachEmail} />
            {formTypeLabel === "Team Tryouts" && (
              <>
                <Row label="Division" value={division ?? ""} />
                <Row label="Age range" value={ageRange ?? ""} />
                <Row label="Dates of tryouts" value={tryoutDates ?? ""} />
                <Row label="Times of tryouts" value={tryoutTimes ?? ""} />
                <Row label="Location" value={location ?? ""} />
                <Row label="EA status" value={eaStatus ?? ""} />
              </>
            )}
            {formTypeLabel === "Miscellaneous" && (
              <>
                <Row label="Request type / title" value={requestTitle ?? ""} />
                <Row label="Description" value={description ?? ""} />
              </>
            )}
            <Row label="Additional details" value={additionalDetails ?? ""} />
            <Section style={{ marginTop: 8, marginBottom: 16 }}>
              <Text style={{ margin: "0 0 4px 0", fontSize: 12, color: muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Reference image
              </Text>
              <Text style={{ margin: 0, fontSize: 16, color: "#0f172a" }}>{hasImage ? "Yes — see below" : "Not provided"}</Text>
            </Section>
            {imageUrl ? (
              <Section style={{ marginBottom: 24, textAlign: "center" as const }}>
                <Img src={imageUrl} alt="Uploaded reference" width={520} style={{ maxWidth: "100%", height: "auto", borderRadius: 8, border: `1px solid ${border}` }} />
              </Section>
            ) : null}
          </Section>

          <Hr style={{ borderColor: border, margin: "0 28px" }} />
          <Section style={{ padding: "16px 28px 28px 28px" }}>
            <Text style={{ margin: 0, fontSize: 13, color: muted, lineHeight: 1.6 }}>
              This message was sent from the Unico graphic request form on Ranking SB. Reply directly to the coach using the email above.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default UnicoRequestEmail
