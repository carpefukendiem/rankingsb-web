#!/usr/bin/env node
/**
 * Google Calendar Event Creator
 * Creates Ruben's daily schedule directly in Google Calendar
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = path.join(__dirname, '../.tokens/calendar-token.json');
const CREDENTIALS_PATH = path.join(__dirname, '../.tokens/calendar-credentials.json');

// Load client secrets from a local file
function loadCredentials() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.log('❌ Credentials not found. Run setup first.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
}

// Authorize and get OAuth2 client
async function authorize() {
  const credentials = loadCredentials();
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have a token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  // Need to get new token
  return getNewToken(oAuth2Client);
}

// Get and store new token
function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  
  console.log('🔗 Authorize this app by visiting this URL:', authUrl);
  console.log('\n📋 After authorizing, you\'ll get a code.');
  console.log('Run: node calendar-setup.js --code=YOUR_CODE\n');
  
  process.exit(0);
}

// Create daily recurring events
async function createDailyRoutine(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  const calendarId = 'rubenstips@gmail.com';
  
  const events = [
    // Daily Workout
    {
      summary: '💪 WORKOUT - No Excuses',
      description: 'David Goggins mode. Discipline = income.\n\nFocus: Strength + cardio\nGoal: 45-60 min intense workout\nLocation: Gym or home',
      start: { dateTime: '2026-02-20T04:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-20T05:00:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
      colorId: '11', // Red
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 10 },
          { method: 'popup', minutes: 0 }
        ]
      }
    },
    // Daily Upwork
    {
      summary: '💰 Upwork - Apply to 10 Jobs',
      description: 'Goal: 10 applications/day minimum\n\nTemplates: business/Ruben-Upwork-Cover-Letters.md\nJobs List: business/Upwork-Jobs-Tonight.md\nLink: https://www.upwork.com/ab/find-work/\n\nTrack applications:\nnode scripts/upwork-tracker.js add "Job Title" "Company" "URL" "Rate"',
      start: { dateTime: '2026-02-20T05:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-20T06:00:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
      colorId: '9', // Blue
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 5 }
        ]
      }
    },
    // Daily CushionFoamz
    {
      summary: '📱 CushionFoamz Marketing',
      description: 'Post 1-2 Reddit responses + check social media\n\nResponses: CUSHIONFOAMZ-REDDIT-CONVERSATIONS.md\n\nLinks:\n- Reddit DIY: https://www.reddit.com/r/DIY/\n- Reddit Upholstery: https://www.reddit.com/r/upholstery/\n- CushionFoamz: https://cushionfoamz.com',
      start: { dateTime: '2026-02-20T06:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-20T06:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
      colorId: '10', // Green
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 0 }
        ]
      }
    },
    // Daily Evening Review
    {
      summary: '🌙 Daily Review + Tomorrow Prep',
      description: 'Set 3 priorities for next day\n\n- Review Johnny 5\'s daily output\n- Check calendar for tomorrow\n- Set 3 main priorities\n- Prepare materials needed',
      start: { dateTime: '2026-02-20T21:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-20T22:00:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
      colorId: '8', // Gray
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 15 }
        ]
      }
    }
  ];

  console.log('🚀 Creating daily recurring events...\n');
  
  for (const event of events) {
    try {
      const response = await calendar.events.insert({
        calendarId: calendarId,
        resource: event
      });
      console.log(`✅ Created: ${event.summary}`);
      console.log(`   ID: ${response.data.id}\n`);
    } catch (err) {
      console.error(`❌ Failed to create: ${event.summary}`);
      console.error(`   Error: ${err.message}\n`);
    }
  }
}

// Create weekly work blocks
async function createWeeklyBlocks(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  const calendarId = 'rubenstips@gmail.com';
  
  const weeklyEvents = [
    {
      summary: '🔥 Client Work / Sales Calls',
      description: 'Focus: Closing deals, client calls, proposal reviews\n\nPriority: Revenue-generating activities',
      start: { dateTime: '2026-02-24T11:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-24T14:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20261231T235959Z'],
      colorId: '9'
    },
    {
      summary: '⚡ Client Work / Project Delivery',
      description: 'Focus: Delivering work, client updates, billing',
      start: { dateTime: '2026-02-25T10:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-25T14:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=TU;UNTIL=20261231T235959Z'],
      colorId: '9'
    },
    {
      summary: '🎯 Prospecting / Cold Outreach',
      description: 'Focus: Sending audits, follow-up calls, new lead gen\n\nLink: https://app.rankingsb.com/prospecting/add-prospect\n\nGoal: 5 audits sent, 5 follow-up calls',
      start: { dateTime: '2026-02-26T09:30:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-26T13:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=WE;UNTIL=20261231T235959Z'],
      colorId: '6'
    },
    {
      summary: '📝 Content Creation / Long-term Assets',
      description: 'Focus: Blog posts, social media, SEO content\n\n- Review Johnny 5 published content\n- Schedule social media posts\n- Plan next week\'s content',
      start: { dateTime: '2026-02-27T09:30:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-27T13:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=TH;UNTIL=20261231T235959Z'],
      colorId: '5'
    },
    {
      summary: '📊 Week Review + Planning',
      description: 'Review week\'s results with Johnny 5\n\n- Check Upwork tracker summary\n- Review CushionFoamz engagement\n- Update sales pipelines\n- Send invoices\n- Plan next week',
      start: { dateTime: '2026-02-21T09:30:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-21T11:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=FR;UNTIL=20261231T235959Z'],
      colorId: '7'
    }
  ];

  console.log('🚀 Creating weekly work blocks...\n');
  
  for (const event of weeklyEvents) {
    try {
      const response = await calendar.events.insert({
        calendarId: calendarId,
        resource: event
      });
      console.log(`✅ Created: ${event.summary}`);
      console.log(`   ID: ${response.data.id}\n`);
    } catch (err) {
      console.error(`❌ Failed to create: ${event.summary}`);
      console.error(`   Error: ${err.message}\n`);
    }
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--setup')) {
    console.log('📋 Setting up Google Calendar API...\n');
    console.log('1. Go to https://console.cloud.google.com/');
    console.log('2. Create a new project (or use existing)');
    console.log('3. Enable Google Calendar API');
    console.log('4. Go to Credentials → Create OAuth 2.0 Client ID');
    console.log('5. Download JSON and save to: .tokens/calendar-credentials.json\n');
    process.exit(0);
  }
  
  if (args.includes('--code')) {
    const codeArg = args.find(a => a.startsWith('--code='));
    if (!codeArg) {
      console.error('❌ Please provide --code=YOUR_AUTH_CODE');
      process.exit(1);
    }
    const code = codeArg.split('=')[1];
    
    const credentials = loadCredentials();
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      fs.mkdirSync(path.dirname(TOKEN_PATH), { recursive: true });
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
      console.log('✅ Token stored successfully!');
      console.log('Run: node calendar-create.js --create-events');
    } catch (err) {
      console.error('❌ Error retrieving token:', err.message);
    }
    return;
  }
  
  if (args.includes('--create-events')) {
    try {
      const auth = await authorize();
      await createDailyRoutine(auth);
      await createWeeklyBlocks(auth);
      console.log('\n🎉 All events created successfully!');
      console.log('Check your calendar at: https://calendar.google.com');
    } catch (err) {
      console.error('❌ Error:', err.message);
    }
    return;
  }
  
  // Default: show help
  console.log('📅 Google Calendar Event Creator\n');
  console.log('Usage:');
  console.log('  node calendar-create.js --setup           # Show setup instructions');
  console.log('  node calendar-create.js                   # Get auth URL');
  console.log('  node calendar-create.js --code=XXX        # Save auth code');
  console.log('  node calendar-create.js --create-events   # Create all events');
  console.log('\nSteps:');
  console.log('  1. Run --setup and follow instructions');
  console.log('  2. Run without args to get auth URL');
  console.log('  3. Authorize in browser, copy code');
  console.log('  4. Run with --code=XXX');
  console.log('  5. Run with --create-events');
}

main().catch(console.error);
