/**
 * Notifications for SyncLocal batch verification.
 *
 * TODO: Wire to your transactional mail provider (e.g. Resend, SendGrid, Postmark, AWS SES).
 *       Keep secrets out of logs in production once connected.
 */

const SUMMARY_EMAIL = process.env.SYNCLocal_ALERT_EMAIL ?? "ruben@rankingsb.com"

export async function sendSynclocalVerificationSummary(subject: string, textBody: string): Promise<void> {
  console.log("[synclocal-email:TODO]", SUMMARY_EMAIL, subject, "\n", textBody.slice(0, 4000))
}
