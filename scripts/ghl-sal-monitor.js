#!/usr/bin/env node
/**
 * Sal Activity Monitor
 * Fetches daily activity from GHL and posts to Discord
 * Run: node scripts/ghl-sal-monitor.js
 * Cron: 0 18 * * * (daily at 6 PM)
 */

const GHL_API_TOKEN = process.env.GHL_API_TOKEN;
const SAL_LOCATION_ID = 'yrvzyq2jB2me4Z23PFxP'; // Rankingsb
const SAL_USER_ID = 'SFexIYGYlRvIcFtI0plP'; // Sal's user ID
const DISCORD_WEBHOOK = process.env.DISCORD_MISSION_CONTROL_WEBHOOK;

async function fetchSalActivity(date = new Date()) {
  const dateStr = date.toISOString().split('T')[0];
  
  // TODO: Update with correct GHL API v2 endpoints
  // Current token expired - need new one from GHL
  
  const endpoints = {
    calls: `https://rest.gohighlevel.com/v1/locations/${SAL_LOCATION_ID}/calls?userId=${SAL_USER_ID}&date=${dateStr}`,
    appointments: `https://rest.gohighlevel.com/v1/locations/${SAL_LOCATION_ID}/appointments?userId=${SAL_USER_ID}&date=${dateStr}`,
    opportunities: `https://rest.gohighlevel.com/v1/locations/${SAL_LOCATION_ID}/opportunities?updatedAfter=${dateStr}T00:00:00Z`,
    activities: `https://rest.gohighlevel.com/v1/locations/${SAL_LOCATION_ID}/activities?userId=${SAL_USER_ID}&date=${dateStr}`
  };
  
  console.log('Fetching Sal activity for:', dateStr);
  console.log('Endpoints:', endpoints);
  
  // Placeholder until API token is refreshed
  return {
    date: dateStr,
    callsMade: 0,
    appointments: 0,
    pipelineMoves: 0,
    newContacts: 0,
    dealsClosed: 0,
    revenue: 0
  };
}

async function postToDiscord(report) {
  const message = `## 📊 Sal's Daily Activity — ${report.date}

### 📞 Calls Made: ${report.callsMade}
### 📅 Appointments: ${report.appointments}
### 🎯 Pipeline Moves: ${report.pipelineMoves}
### 📝 New Contacts: ${report.newContacts}
### 💰 Deals Closed: ${report.dealsClosed} ($${report.revenue.toLocaleString()})

---
*Report generated: ${new Date().toLocaleTimeString()}*`;

  if (!DISCORD_WEBHOOK) {
    console.log('Discord webhook not set. Report:');
    console.log(message);
    return;
  }
  
  // TODO: Implement Discord webhook POST
  console.log('Posting to Discord:', message);
}

async function main() {
  console.log('🔍 Sal Activity Monitor');
  console.log('======================');
  
  if (!GHL_API_TOKEN) {
    console.error('❌ GHL_API_TOKEN not set');
    console.log('Run: export GHL_API_TOKEN=your_new_token');
    process.exit(1);
  }
  
  const report = await fetchSalActivity();
  await postToDiscord(report);
  
  console.log('✅ Done');
}

main().catch(console.error);
