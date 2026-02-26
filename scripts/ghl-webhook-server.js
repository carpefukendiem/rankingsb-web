#!/usr/bin/env node
/**
 * GHL Webhook Listener for Sal Activity
 * Receives GHL webhook events and posts to Discord
 * 
 * Setup in GHL:
 * 1. Settings → Integrations → Webhooks
 * 2. Add webhook URL: (your server URL)
 * 3. Select events: OpportunityCreated, OpportunityStatusChanged, ContactCreated, TaskCreated
 * 4. Save
 * 
 * Local test: node scripts/ghl-webhook-server.js
 */

const http = require('http');
const crypto = require('crypto');

// Configuration
const PORT = process.env.GHL_WEBHOOK_PORT || 8765;
const DISCORD_CHANNEL_ID = '1467983424936743026'; // #johnny5-command-center
const SAL_USER_ID = 'SFexIYGYlRvIcFtI0plP'; // Sal's GHL user ID
const RANKINGSB_LOCATION = 'yrvzyq2jB2me4Z23PFxP';

// Pipeline stage names (update with your actual stage IDs)
const PIPELINE_STAGES = {
  'targeted': '🎯 Targeted',
  'contacted': '📞 Contacted', 
  'audit_requested': '📋 Audit Requested',
  'audit_delivered': '📊 Audit Delivered',
  'follow_up': '🔄 Follow Up',
  'proposal_sent': '📨 Proposal Sent',
  'negotiation': '💬 Negotiation',
  'closed_won': '✅ Closed Won',
  'closed_lost': '❌ Closed Lost'
};

/**
 * Send message to Discord via OpenClaw message tool
 */
async function sendToDiscord(content, components = null) {
  try {
    // Use the message tool through a subprocess or direct API call
    // For now, we'll write to a file that can be picked up
    const fs = require('fs');
    const path = require('path');
    
    const messageData = {
      channel: 'discord',
      target: '#johnny5-command-center',
      content: content,
      components: components,
      timestamp: new Date().toISOString()
    };
    
    // Write to a queue file that can be processed
    const queuePath = path.join(process.cwd(), '.webhook-queue.jsonl');
    fs.appendFileSync(queuePath, JSON.stringify(messageData) + '\n');
    
    console.log('📤 Queued message for Discord');
    return true;
  } catch (error) {
    console.error('❌ Failed to queue message:', error);
    return false;
  }
}

/**
 * Format opportunity update for Discord
 */
function formatOpportunityMessage(event, data) {
  const type = event.replace('Opportunity', '');
  const opp = data.opportunity || data;
  const contact = data.contact || {};
  
  let emoji = '📊';
  let color = 0x3498db;
  
  switch (event) {
    case 'OpportunityCreated':
      emoji = '🎯';
      color = 0x2ecc71;
      break;
    case 'OpportunityStatusChanged':
      if (opp.status === 'won') {
        emoji = '💰';
        color = 0x00ff00;
      } else if (opp.status === 'lost') {
        emoji = '❌';
        color = 0xff0000;
      } else {
        emoji = '🔄';
      }
      break;
  }
  
  const stageName = PIPELINE_STAGES[opp.pipelineStageId] || opp.pipelineStageId || 'Unknown';
  const value = opp.monetaryValue ? `$${opp.monetaryValue.toLocaleString()}` : 'No value set';
  
  return {
    content: `${emoji} **${type}** — ${new Date().toLocaleTimeString()}`,
    embed: {
      title: opp.name || 'New Opportunity',
      fields: [
        { name: 'Contact', value: `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'N/A', inline: true },
        { name: 'Company', value: contact.companyName || opp.companyName || 'N/A', inline: true },
        { name: 'Stage', value: stageName, inline: true },
        { name: 'Value', value: value, inline: true },
        { name: 'Assigned To', value: opp.assignedTo === SAL_USER_ID ? '👤 Sal Vasquez' : 'Unknown', inline: true }
      ],
      color: color,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Format contact created message
 */
function formatContactMessage(data) {
  const contact = data.contact || data;
  
  return {
    content: `👤 **New Contact Created** — ${new Date().toLocaleTimeString()}`,
    embed: {
      title: `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'New Contact',
      fields: [
        { name: 'Email', value: contact.email || 'N/A', inline: true },
        { name: 'Phone', value: contact.phone || 'N/A', inline: true },
        { name: 'Company', value: contact.companyName || 'N/A', inline: true },
        { name: 'Source', value: contact.source || 'Unknown', inline: true }
      ],
      color: 0x9b59b6,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Format task created message
 */
function formatTaskMessage(data) {
  const task = data.task || data;
  
  return {
    content: `✅ **Task Created** — ${new Date().toLocaleTimeString()}`,
    embed: {
      title: task.title || 'New Task',
      description: task.description || '',
      fields: [
        { name: 'Due Date', value: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date', inline: true },
        { name: 'Priority', value: task.priority || 'Normal', inline: true },
        { name: 'Assigned To', value: task.assignedTo === SAL_USER_ID ? '👤 Sal Vasquez' : 'Unknown', inline: true }
      ],
      color: 0xf39c12,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Process incoming webhook
 */
async function processWebhook(payload) {
  const { type, event, data } = payload;
  
  console.log(`📥 Received: ${event || type}`);
  
  // Filter for Sal-related events only
  const isSalRelated = 
    data?.opportunity?.assignedTo === SAL_USER_ID ||
    data?.contact?.assignedTo === SAL_USER_ID ||
    data?.task?.assignedTo === SAL_USER_ID ||
    data?.assignedTo === SAL_USER_ID;
  
  // Also allow location-wide events
  const isRankingsb = 
    data?.locationId === RANKINGSB_LOCATION ||
    data?.opportunity?.locationId === RANKINGSB_LOCATION;
  
  if (!isSalRelated && !isRankingsb) {
    console.log('⏭️  Skipping — not Sal or Rankingsb related');
    return;
  }
  
  let message;
  
  switch (event || type) {
    case 'OpportunityCreated':
    case 'OpportunityStatusChanged':
    case 'OpportunityUpdated':
      message = formatOpportunityMessage(event || type, data);
      break;
      
    case 'ContactCreated':
    case 'ContactUpdated':
      message = formatContactMessage(data);
      break;
      
    case 'TaskCreated':
    case 'TaskCompleted':
      message = formatTaskMessage(data);
      break;
      
    default:
      console.log(`⚠️  Unhandled event type: ${event || type}`);
      return;
  }
  
  if (message) {
    await sendToDiscord(message.content, message.embed);
  }
}

/**
 * Create HTTP server for webhooks
 */
function createServer() {
  return http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }
    
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        console.log('📥 Webhook received:', payload.type || payload.event);
        
        await processWebhook(payload);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        console.error('❌ Error processing webhook:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  });
}

/**
 * Daily summary generator
 */
async function generateDailySummary(date = new Date()) {
  const dateStr = date.toLocaleDateString();
  
  // This would query GHL API for actual stats
  // For now, placeholder
  const summary = {
    date: dateStr,
    calls: 0,
    appointments: 0,
    newOpps: 0,
    pipelineMoves: 0,
    closed: 0,
    revenue: 0
  };
  
  const message = `## 📊 Sal's Daily Summary — ${dateStr}

| Metric | Count |
|--------|-------|
| 📞 Calls Made | ${summary.calls} |
| 📅 Appointments Set | ${summary.appointments} |
| 🎯 New Opportunities | ${summary.newOpps} |
| 🔄 Pipeline Moves | ${summary.pipelineMoves} |
| ✅ Deals Closed | ${summary.closed} |
| 💰 Revenue | $${summary.revenue.toLocaleString()} |

---
*Next update: Tomorrow at 6 PM*;

  await sendToDiscord(message);
}

// Main
if (require.main === module) {
  const server = createServer();
  
  server.listen(PORT, () => {
    console.log('🎧 GHL Webhook Server running');
    console.log(`   Port: ${PORT}`);
    console.log(`   Discord: #johnny5-command-center`);
    console.log(`   Sal User ID: ${SAL_USER_ID}`);
    console.log('');
    console.log('📋 Setup in GHL:');
    console.log('   1. Settings → Integrations → Webhooks');
    console.log(`   2. Add URL: http://your-server:${PORT}/webhook`);
    console.log('   3. Select events: OpportunityCreated, OpportunityStatusChanged, ContactCreated');
    console.log('');
    console.log('🧪 Test locally:');
    console.log(`   curl -X POST http://localhost:${PORT}/webhook \\\n        -H "Content-Type: application/json" \\\n        -d '{"type":"OpportunityCreated","data":{"opportunity":{"name":"Test Deal","monetaryValue":1995,"assignedTo":"${SAL_USER_ID}"}}}'`);
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...');
    server.close(() => process.exit(0));
  });
}

module.exports = { createServer, processWebhook };
