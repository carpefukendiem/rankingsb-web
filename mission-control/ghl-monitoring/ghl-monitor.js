#!/usr/bin/env node
/**
 * GHL Activity Monitor for Sal
 * Tracks daily activities: calls, appointments, pipeline movements
 * Location: Rankingsb
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  apiKey: 'pit-36c7d3ea-abe6-44b0-a0e3-0cf857094125',
  baseUrl: 'services.leadconnectorhq.com',
  locationId: 'rankingsb', // Will need actual location ID from API
  logDir: path.join(__dirname, 'logs'),
  reportsDir: path.join(__dirname, 'reports')
};

// Ensure directories exist
[CONFIG.logDir, CONFIG.reportsDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

class GHLMonitor {
  constructor() {
    this.today = new Date().toISOString().split('T')[0];
    this.activities = {
      calls: [],
      appointments: [],
      pipelineMovements: []
    };
  }

  // Make authenticated request to GHL API
  async apiRequest(endpoint, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: CONFIG.baseUrl,
        path: endpoint,
        method: method,
        headers: {
          'Authorization': `Bearer ${CONFIG.apiKey}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            resolve(body);
          }
        });
      });

      req.on('error', reject);
      if (data) req.write(JSON.stringify(data));
      req.end();
    });
  }

  // Get location info to confirm correct location
  async getLocations() {
    try {
      const data = await this.apiRequest('/locations');
      return data.locations || [];
    } catch (error) {
      console.error('Error fetching locations:', error.message);
      return [];
    }
  }

  // Get contacts updated today
  async getTodayContacts() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timestamp = Math.floor(today.getTime() / 1000);
    
    try {
      const data = await this.apiRequest(`/contacts?locationId=${CONFIG.locationId}&dateUpdated=${timestamp}`);
      return data.contacts || [];
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
      return [];
    }
  }

  // Get appointments for today
  async getTodayAppointments() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    try {
      const data = await this.apiRequest(
        `/calendars/events?locationId=${CONFIG.locationId}&startTime=${startOfDay.toISOString()}&endTime=${endOfDay.toISOString()}`
      );
      return data.events || [];
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
      return [];
    }
  }

  // Get calls made today
  async getTodayCalls() {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      const data = await this.apiRequest(
        `/calls?locationId=${CONFIG.locationId}&date=${today}`
      );
      return data.calls || [];
    } catch (error) {
      console.error('Error fetching calls:', error.message);
      return [];
    }
  }

  // Get pipeline changes
  async getPipelineMovements() {
    try {
      // Get opportunities/pipeline data
      const data = await this.apiRequest(
        `/opportunities?locationId=${CONFIG.locationId}&date=${this.today}`
      );
      return data.opportunities || [];
    } catch (error) {
      console.error('Error fetching pipeline movements:', error.message);
      return [];
    }
  }

  // Detect pipeline stage changes by comparing with previous snapshot
  detectPipelineChanges(currentOpportunities) {
    const snapshotPath = path.join(CONFIG.logDir, 'pipeline-snapshot.json');
    let previousSnapshot = {};
    
    if (fs.existsSync(snapshotPath)) {
      try {
        previousSnapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
      } catch (e) {
        console.log('No previous snapshot found');
      }
    }

    const movements = [];
    
    for (const opp of currentOpportunities) {
      const prevOpp = previousSnapshot[opp.id];
      if (prevOpp && prevOpp.stageId !== opp.stageId) {
        movements.push({
          opportunityId: opp.id,
          contactName: opp.contactName || 'Unknown',
          fromStage: prevOpp.stageName || prevOpp.stageId,
          toStage: opp.stageName || opp.stageId,
          movedAt: new Date().toISOString(),
          value: opp.value || 0
        });
      }
    }

    // Save new snapshot
    const newSnapshot = {};
    currentOpportunities.forEach(opp => {
      newSnapshot[opp.id] = opp;
    });
    fs.writeFileSync(snapshotPath, JSON.stringify(newSnapshot, null, 2));

    return movements;
  }

  // Process and categorize activities
  async processActivities() {
    console.log('📊 Fetching Sal\'s daily activities...\n');

    // Fetch all data
    const [calls, appointments, opportunities] = await Promise.all([
      this.getTodayCalls(),
      this.getTodayAppointments(),
      this.getPipelineMovements()
    ]);

    this.activities.calls = calls.map(call => ({
      type: 'call',
      contactName: call.contactName || 'Unknown',
      phone: call.phone,
      duration: call.duration || 0,
      status: call.status,
      timestamp: call.createdAt,
      recordedBy: call.userName || 'Unknown'
    }));

    this.activities.appointments = appointments.map(appt => ({
      type: 'appointment',
      contactName: appt.contactName || appt.title || 'Unknown',
      calendar: appt.calendarName || 'Main',
      startTime: appt.startTime,
      endTime: appt.endTime,
      status: appt.status,
      bookedBy: appt.userName || 'Unknown'
    }));

    const movements = this.detectPipelineChanges(opportunities);
    this.activities.pipelineMovements = movements;

    return {
      calls: this.activities.calls.length,
      appointments: this.activities.appointments.length,
      pipelineMovements: this.activities.pipelineMovements.length
    };
  }

  // Log raw data
  logActivities() {
    const logFile = path.join(CONFIG.logDir, `${this.today}.json`);
    const logData = {
      date: this.today,
      timestamp: new Date().toISOString(),
      activities: this.activities
    };

    fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));
    console.log(`✅ Activities logged to: ${logFile}`);
  }

  // Generate daily report
  generateReport() {
    const reportFile = path.join(CONFIG.reportsDir, `report-${this.today}.md`);
    
    const report = `# 📈 Sal's Daily Activity Report - ${this.today}

## Summary
- **Date:** ${this.today}
- **Total Calls:** ${this.activities.calls.length}
- **Appointments Scheduled:** ${this.activities.appointments.length}
- **Pipeline Movements:** ${this.activities.pipelineMovements.length}

---

## 📞 Calls Made (${this.activities.calls.length})

${this.activities.calls.length > 0 
  ? this.activities.calls.map(c => `- **${c.contactName}** | ${c.duration}s | ${c.status || 'completed'}`).join('\n')
  : '*No calls recorded today*'}

## 📅 Appointments (${this.activities.appointments.length})

${this.activities.appointments.length > 0
  ? this.activities.appointments.map(a => `- **${a.contactName}** | ${new Date(a.startTime).toLocaleTimeString()} - ${new Date(a.endTime).toLocaleTimeString()} | ${a.status || 'scheduled'}`).join('\n')
  : '*No appointments scheduled today*'}

## 🔄 Pipeline Movements (${this.activities.pipelineMovements.length})

${this.activities.pipelineMovements.length > 0
  ? this.activities.pipelineMovements.map(m => `- **${m.contactName}** | ${m.fromStage} → ${m.toStage} | $${m.value || 0}`).join('\n')
  : '*No pipeline movements today*'}

---

*Report generated: ${new Date().toLocaleString()}*
`;

    fs.writeFileSync(reportFile, report);
    console.log(`✅ Report generated: ${reportFile}`);
    return reportFile;
  }

  // Run full monitoring cycle
  async run() {
    console.log('╔══════════════════════════════════════════════════╗');
    console.log('║    Sal GHL Activity Monitor - Rankingsb          ║');
    console.log('╚══════════════════════════════════════════════════╝\n');

    try {
      // Check location first
      const locations = await this.getLocations();
      console.log(`📍 Found ${locations.length} location(s)`);
      
      // Process activities
      const summary = await this.processActivities();
      
      console.log('\n📊 Activity Summary:');
      console.log(`   📞 Calls Made: ${summary.calls}`);
      console.log(`   📅 Appointments: ${summary.appointments}`);
      console.log(`   🔄 Pipeline Moves: ${summary.pipelineMovements}`);

      // Log and report
      this.logActivities();
      const reportPath = this.generateReport();

      console.log('\n✅ Monitoring complete!');
      return { success: true, summary, reportPath };

    } catch (error) {
      console.error('\n❌ Monitoring failed:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// Run if called directly
if (require.main === module) {
  const monitor = new GHLMonitor();
  monitor.run();
}

module.exports = { GHLMonitor, CONFIG };
