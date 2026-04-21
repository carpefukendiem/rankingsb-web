/** Bot / spam heuristics shared by website JSON forms and multipart Unico form. */

export const SPAM_EMAIL_PATTERNS = [/remotetact/i, /intellagency/i, /flowchat/i, /a\.yo\.de\.k\.ep/i, /vettedvas/i]
export const SPAM_COMPANY_PATTERNS = [
  /^[A-Za-z0-9]{18,}$/,
  /flowchat/i,
  /intellagency/i,
  /vettedvas/i,
  /vetted.*va/i,
  /virtual.*assist/i,
  /va\s+services/i,
]

/** Minimum ms a human takes to fill a form. Bots submit instantly. */
export const MIN_FILL_MS = 5000

export function isBot(hp: string, email: string, business: string, mountTime: string): boolean {
  if (hp) return true
  if (SPAM_EMAIL_PATTERNS.some((p) => p.test(email))) return true
  if (business && SPAM_COMPANY_PATTERNS.some((p) => p.test(business))) return true
  if (mountTime) {
    const elapsed = Date.now() - parseInt(mountTime, 10)
    if (!isNaN(elapsed) && elapsed < MIN_FILL_MS) return true
  }
  return false
}
