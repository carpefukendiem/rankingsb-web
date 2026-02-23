/**
 * Website Sales System - Main Orchestrator
 * Coordinates prospecting, mockups, outreach, and payments
 */

const ProspectScraper = require('./prospect-scraper');
const MockupGenerator = require('./mockup-generator');
const OutreachEngine = require('./outreach-engine');
const PaymentHandler = require('./payment-handler');

class WebsiteSalesSystem {
  constructor() {
    this.scraper = new ProspectScraper();
    this.generator = new MockupGenerator();
    this.outreach = new OutreachEngine();
    this.payments = new PaymentHandler();
    
    this.dailyTarget = 100;
    this.outreachCount = 0;
  }

  /**
   * Generate new prospects for the day
   */
  async generateProspects(count = 20) {
    console.log(`🔍 Generating ${count} new prospects...`);
    
    const queries = this.scraper.generateSearchQueries(count);
    const prospects = [];
    
    for (const query of queries) {
      // In a real implementation, this would use Brave/Google API
      // to search for businesses and filter those without websites
      const prospect = {
        ...query,
        businessName: null, // Will be filled from search results
        website: null,
        phone: null,
        email: null,
        address: null,
        hasWebsite: false,
        priority: Math.floor(Math.random() * 3) + 1 // 1-3 priority
      };
      
      this.scraper.saveProspect(prospect);
      prospects.push(prospect);
    }
    
    console.log(`✅ Generated ${prospects.length} prospects`);
    return prospects;
  }

  /**
   * Create mockups for prospects
   */
  async createMockups(prospects) {
    console.log(`🎨 Creating ${prospects.length} mockups...`);
    
    const mockups = [];
    for (const prospect of prospects) {
      const mockup = this.generator.createMockup(prospect);
      this.scraper.updateProspect(prospect.id, {
        stage: 'Mockup Created',
        mockupPath: mockup.mockupPath,
        previewUrl: mockup.previewUrl,
        businessName: mockup.businessName
      });
      mockups.push(mockup);
    }
    
    console.log(`✅ Created ${mockups.length} mockups`);
    return mockups;
  }

  /**
   * Send outreach to prospects
   */
  async sendOutreach(prospects, channel = 'email') {
    console.log(`📧 Sending ${channel} outreach to ${prospects.length} prospects...`);
    
    for (const prospect of prospects) {
      const sequences = {
        email: this.outreach.generateEmailSequence(prospect),
        sms: this.outreach.generateSMSSequence(prospect),
        whatsapp: this.outreach.generateWhatsAppSequence(prospect)
      };
      
      const sequence = sequences[channel];
      
      // Log the initial outreach
      this.outreach.logOutreach(
        prospect.id,
        channel,
        'initial',
        sequence.initial
      );
      
      this.scraper.updateProspect(prospect.id, {
        stage: 'Outreach Sent',
        lastContact: new Date().toISOString(),
        outreachChannel: channel
      });
      
      this.outreachCount++;
    }
    
    console.log(`✅ Sent ${channel} outreach to ${prospects.length} prospects`);
    return prospects.length;
  }

  /**
   * Process prospect response
   */
  async processResponse(prospectId, response, objection = null) {
    const prospect = this.scraper.getProspectsByStatus('found').find(p => p.id === prospectId);
    if (!prospect) return null;
    
    // Update prospect stage
    this.scraper.updateProspect(prospectId, {
      stage: 'Engaged',
      lastResponse: new Date().toISOString(),
      responseText: response
    });
    
    // If objection, get rebuttal
    if (objection) {
      const rebuttal = this.outreach.getRebuttal(objection, prospect);
      return {
        prospect,
        rebuttal,
        nextAction: 'reply_with_rebuttal'
      };
    }
    
    // If interested, schedule meeting or send payment link
    if (response.toLowerCase().includes('interested') || 
        response.toLowerCase().includes('yes') ||
        response.toLowerCase().includes('tell me more')) {
      
      const closeScript = this.payments.generateCloseScript(prospect);
      
      return {
        prospect,
        closeScript,
        nextAction: 'schedule_call_or_send_payment'
      };
    }
    
    return {
      prospect,
      nextAction: 'continue_nurture'
    };
  }

  /**
   * Close deal - send payment link
   */
  async closeDeal(prospectId, upsells = []) {
    const prospect = this.scraper.getProspectsByStatus('found').find(p => p.id === prospectId);
    if (!prospect) return null;
    
    const orderDetails = {
      amount: 500,
      upsells,
      totalAmount: 500 + upsells.reduce((sum, u) => sum + u.price, 0)
    };
    
    const order = this.payments.createOrder(prospect, orderDetails);
    
    this.scraper.updateProspect(prospectId, {
      stage: 'Proposal Sent',
      orderId: order.id,
      paymentUrl: order.paymentUrl
    });
    
    return order;
  }

  /**
   * Process payment received
   */
  async processPayment(orderId) {
    const order = this.payments.getOrder(orderId);
    if (!order) return null;
    
    this.payments.updateOrder(orderId, { status: 'paid' });
    
    this.scraper.updateProspect(order.prospectId, {
      stage: 'Payment Received'
    });
    
    // Notify team
    this.payments.notifyTeam(orderId);
    
    return order;
  }

  /**
   * Run daily workflow
   */
  async runDailyWorkflow() {
    console.log('🚀 Starting daily website sales workflow...\n');
    
    const stats = this.getStats();
    console.log('Current stats:', stats);
    
    // 1. Generate new prospects (20/day)
    const prospects = await this.generateProspects(20);
    
    // 2. Create mockups (5/day prioritized)
    const priorityProspects = prospects.filter(p => p.priority <= 2).slice(0, 5);
    await this.createMockups(priorityProspects);
    
    // 3. Send outreach (mix of channels to hit 100/day)
    const readyProspects = this.scraper.getProspectsByStage('Mockup Created').slice(0, 30);
    await this.sendOutreach(readyProspects.slice(0, 15), 'email');
    await this.sendOutreach(readyProspects.slice(15, 25), 'sms');
    await this.sendOutreach(readyProspects.slice(25, 30), 'whatsapp');
    
    // 4. Send follow-ups to engaged prospects (70 to hit 100 total)
    const engaged = this.scraper.getProspectsByStage('Engaged').slice(0, 70);
    for (const prospect of engaged) {
      this.outreach.logOutreach(prospect.id, prospect.outreachChannel || 'email', 'followup', { note: 'Day 3 follow-up' });
      this.outreachCount++;
    }
    
    console.log(`\n✅ Daily workflow complete!`);
    console.log(`📊 Outreach sent today: ${this.outreachCount}`);
    
    return this.getStats();
  }

  /**
   * Get full system stats
   */
  getStats() {
    const prospectStats = this.scraper.generateReport();
    const outreachStats = this.outreach.getStats();
    const revenueStats = this.payments.getRevenueStats();
    
    return {
      prospects: prospectStats,
      outreach: outreachStats,
      revenue: revenueStats,
      mockups: this.generator.getAllMockups().length,
      todayOutreach: this.outreachCount
    };
  }

  /**
   * Generate dashboard data
   */
  generateDashboardData() {
    const stats = this.getStats();
    
    return {
      summary: {
        totalProspects: stats.prospects.totalProspects,
        todayNew: stats.prospects.todayNew,
        totalRevenue: stats.revenue.totalRevenue,
        conversionRate: stats.revenue.conversionRate.toFixed(1),
        todayOutreach: stats.todayOutreach,
        targetProgress: Math.min((stats.todayOutreach / this.dailyTarget) * 100, 100).toFixed(0)
      },
      pipeline: stats.prospects.pipeline,
      byCategory: stats.prospects.byCategory,
      recentActivity: this.getRecentActivity(10)
    };
  }

  /**
   * Get recent activity
   */
  getRecentActivity(limit = 10) {
    const prospects = this.scraper.getAllProspects()
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
      .slice(0, limit);
    
    return prospects.map(p => ({
      id: p.id,
      businessName: p.businessName || 'Unknown',
      stage: p.stage,
      updatedAt: p.updatedAt || p.createdAt
    }));
  }
}

module.exports = WebsiteSalesSystem;

// CLI usage
if (require.main === module) {
  const system = new WebsiteSalesSystem();
  
  const command = process.argv[2];
  
  if (command === 'stats') {
    console.log(JSON.stringify(system.getStats(), null, 2));
  } else if (command === 'dashboard') {
    console.log(JSON.stringify(system.generateDashboardData(), null, 2));
  } else if (command === 'run') {
    system.runDailyWorkflow().then(stats => {
      console.log('\nFinal stats:', JSON.stringify(stats, null, 2));
    });
  } else {
    console.log('Usage: node system.js [stats|dashboard|run]');
  }
}
