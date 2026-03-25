const https = require('https')
const { execSync } = require('child_process')

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = '5054388991'
const SITE_URL = 'https://rankingsb.com'

const PAGES_TO_CHECK = [
  '/',
  '/services',
  '/contact',
  '/free-audit',
  '/blog'
]

async function checkPage(path) {
  return new Promise((resolve) => {
    const url = new URL(path, SITE_URL)
    https.get(url.toString(), (res) => {
      resolve({ path, status: res.statusCode, ok: res.statusCode < 400 })
    }).on('error', (err) => {
      resolve({ path, status: 0, ok: false, error: err.message })
    })
  })
}

async function sendTelegram(message) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    })
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length
      }
    }
    const req = https.request(options, resolve)
    req.write(body)
    req.end()
  })
}

async function main() {
  console.log('[monitor] Starting RankingsSB health check...')
  const results = await Promise.all(PAGES_TO_CHECK.map(checkPage))
  const failures = results.filter(r => !r.ok)

  if (failures.length === 0) {
    console.log('[monitor] All pages healthy ✓')
    return
  }

  let report = '🚨 <b>RankingsSB Alert</b>\n\n'
  report += '<b>Page Failures:</b>\n'
  failures.forEach(f => {
    report += `• ${f.path} → HTTP ${f.status || 'unreachable'}\n`
  })
  report += '\n<b>Proposed action:</b> Reply YES to trigger auto-fix agent'

  await sendTelegram(report)
  console.log('[monitor] Alert sent to Telegram')
}

main().catch(console.error)
