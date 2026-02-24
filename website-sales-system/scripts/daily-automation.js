/**
 * Daily Automation Script
 * Runs every morning at 8 AM PST to:
 * 1. Generate 100 new prospects
 * 2. Enrich with additional data
 * 3. Export top 20 for Ruben
 * 4. Send notification
 */

const fs = require('fs');
const path = require('path');
const ProspectScraper = require('./prospect-scraper');
const DailyExport = require('./daily-export');

class DailyAutomation {
  constructor() {
    this.scraper = new ProspectScraper();
    this.exporter = new DailyExport();
    this.logsDir = path.join(__dirname, '..', 'logs');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    
    // Also write to log file
    const logFile = path.join(this.logsDir, `automation-${new Date().toISOString().split('T')[0]}.log`);
    fs.appendFileSync(logFile, logMessage + '\n');
  }

  /**
   * Run the daily automation workflow
   */
  async run() {
    const startTime = Date.now();
    
    console.log('\n' + '='.repeat(70));
    console.log('🚀 WEBSITE SALES SYSTEM - DAILY AUTOMATION');
    console.log('📅 ' + new Date().toLocaleString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Los_Angeles'
    }));
    console.log('='.repeat(70) + '\n');

    try {
      // Step 1: Generate 100 new prospects
      this.log('📍 STEP 1: Generating 100 new prospects...');
      const prospects = await this.scraper.runBatch(100);
      this.log(`✅ Generated ${prospects.length} new prospects`);
      
      // Step 2: Export top 20 for Ruben
      this.log('\n📍 STEP 2: Exporting top 20 prospects...');
      const exportResult = this.exporter.exportTopProspects(20);
      
      if (exportResult) {
        this.log(`✅ Exported ${exportResult.count} prospects to: ${exportResult.filepath}`);
        
        // Count hot leads
        const hotLeads = exportResult.prospects.filter(p => !p.hasWebsite).length;
        this.log(`🔥 Hot leads (no website): ${hotLeads}`);
      }

      // Step 3: Export by category for GHL
      this.log('\n📍 STEP 3: Exporting prospects by category...');
      const categoryExports = this.exporter.exportByCategory();
      this.log(`✅ Exported ${categoryExports.length} category files`);

      // Step 4: Generate summary
      const stats = this.scraper.getStats();
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);

      console.log('\n' + '='.repeat(70));
      console.log('📊 DAILY SUMMARY');
      console.log('='.repeat(70));
      console.log(`⏱️  Duration: ${duration} seconds`);
      console.log(`📈 New prospects today: ${stats.today}`);
      console.log(`📊 Total prospects: ${stats.total}`);
      console.log(`📞 With phone: ${stats.withPhone}`);
      console.log(`✉️  With email: ${stats.withEmail}`);
      console.log(`🔥 Without website (hot leads): ${stats.withoutWebsite}`);
      console.log(`📁 Export location: /exports/`);
      console.log('='.repeat(70));

      // Write summary report
      this.writeDailyReport(stats, exportResult, duration);

      this.log('\n✅ Daily automation complete!');
      
      return {
        success: true,
        prospectsGenerated: prospects.length,
        exportPath: exportResult?.filepath,
        stats,
        duration
      };

    } catch (error) {
      this.log(`\n❌ ERROR: ${error.message}`);
      console.error(error);
      
      // Write error to log
      const errorLog = path.join(this.logsDir, `error-${Date.now()}.log`);
      fs.writeFileSync(errorLog, error.stack);
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Write daily report file
   */
  writeDailyReport(stats, exportResult, duration) {
    const date = new Date().toISOString().split('T')[0];
    const reportPath = path.join(this.logsDir, `report-${date}.json`);
    
    const report = {
      date,
      timestamp: new Date().toISOString(),
      duration: `${duration}s`,
      stats,
      export: exportResult ? {
        filepath: exportResult.filepath,
        count: exportResult.count,
        hotLeads: exportResult.prospects.filter(p => !p.hasWebsite).length
      } : null
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }

  /**
   * Test the scraper (find just a few prospects)
   */
  async test(count = 5) {
    console.log('\n🧪 RUNNING TEST MODE\n');
    console.log(`Finding ${count} test prospects...\n`);
    
    const prospects = await this.scraper.runBatch(count);
    
    console.log('\n✅ Test complete!');
    console.log(`Found ${prospects.length} prospects`);
    
    return prospects;
  }
}

module.exports = DailyAutomation;

// CLI usage
if (require.main === module) {
  const automation = new DailyAutomation();
  
  const command = process.argv[2];
  
  if (command === 'test') {
    const count = parseInt(process.argv[3]) || 5;
    automation.test(count).then(() => {
      process.exit(0);
    }).catch(err => {
      console.error('Test failed:', err);
      process.exit(1);
    });
  } else if (command === 'run') {
    automation.run().then(() => {
      process.exit(0);
    }).catch(err => {
      console.error('Automation failed:', err);
      process.exit(1);
    });
  } else {
    console.log('Usage: node daily-automation.js [run|test [count]]');
    console.log('  run         - Run full daily automation (100 prospects)');
    console.log('  test [n]    - Test with n prospects (default 5)');
  }
}
