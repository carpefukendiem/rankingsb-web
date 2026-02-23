/**
 * Website Sales System - Payment Handler
 * Stripe integration for payment collection
 */

const fs = require('fs');
const path = require('path');

class PaymentHandler {
  constructor() {
    this.stripeKey = process.env.STRIPE_SECRET_KEY;
    this.paymentLinks = {
      base: 'mk_1T07I7EuKXuKfbciRJp9zBcw',
      upsell: 'mk_1T07IHEuKXuKfbciiKrAIogv'
    };
    this.ordersDir = path.join(__dirname, '..', 'orders');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.ordersDir)) {
      fs.mkdirSync(this.ordersDir, { recursive: true });
    }
  }

  /**
   * Generate payment link URL
   */
  getPaymentUrl(prospect, options = {}) {
    const baseUrl = 'https://buy.stripe.com';
    const linkId = options.upsell ? this.paymentLinks.upsell : this.paymentLinks.base;
    
    // Add client_reference_id to track the prospect
    const params = new URLSearchParams({
      client_reference_id: prospect.id,
      prefilled_email: prospect.email || ''
    });
    
    return `${baseUrl}/${linkId}?${params.toString()}`;
  }

  /**
   * Create order record
   */
  createOrder(prospect, orderDetails) {
    const order = {
      id: `order_${Date.now()}`,
      prospectId: prospect.id,
      businessName: prospect.businessName,
      contactName: prospect.contactName,
      email: prospect.email,
      phone: prospect.phone,
      amount: orderDetails.amount || 500,
      upsells: orderDetails.upsells || [],
      totalAmount: orderDetails.totalAmount || 500,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
      paymentUrl: this.getPaymentUrl(prospect, { upsell: orderDetails.upsells?.length > 0 })
    };

    const filepath = path.join(this.ordersDir, `${order.id}.json`);
    fs.writeFileSync(filepath, JSON.stringify(order, null, 2));

    return order;
  }

  /**
   * Process payment webhook
   */
  processWebhook(payload) {
    const { type, data } = payload;
    
    if (type === 'checkout.session.completed') {
      const prospectId = data.client_reference_id;
      const orderId = this.findOrderByProspectId(prospectId);
      
      if (orderId) {
        this.updateOrder(orderId, {
          status: 'paid',
          paidAt: new Date().toISOString(),
          stripeSessionId: data.id,
          amountReceived: data.amount_total / 100 // Convert from cents
        });
        
        // Trigger notifications
        this.notifyTeam(orderId);
        
        return { success: true, orderId };
      }
    }
    
    return { success: false, error: 'Unknown event type or order not found' };
  }

  /**
   * Find order by prospect ID
   */
  findOrderByProspectId(prospectId) {
    const files = fs.readdirSync(this.ordersDir);
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      const order = JSON.parse(fs.readFileSync(path.join(this.ordersDir, file)));
      if (order.prospectId === prospectId) {
        return order.id;
      }
    }
    
    return null;
  }

  /**
   * Update order
   */
  updateOrder(orderId, updates) {
    const filepath = path.join(this.ordersDir, `${orderId}.json`);
    if (!fs.existsSync(filepath)) return null;
    
    const order = JSON.parse(fs.readFileSync(filepath));
    Object.assign(order, updates);
    order.updatedAt = new Date().toISOString();
    
    fs.writeFileSync(filepath, JSON.stringify(order, null, 2));
    return order;
  }

  /**
   * Notify team of new order
   */
  notifyTeam(orderId) {
    const order = this.getOrder(orderId);
    if (!order) return;

    const notification = {
      type: 'new_website_order',
      orderId: order.id,
      businessName: order.businessName,
      amount: order.totalAmount,
      timestamp: new Date().toISOString(),
      message: `🎉 NEW ORDER: ${order.businessName} - $${order.totalAmount} paid!`
    };

    // Log notification (Discord webhook integration here)
    console.log('NOTIFICATION:', notification.message);
    
    // Could also send to Discord webhook, SMS, etc.
    return notification;
  }

  /**
   * Get order
   */
  getOrder(orderId) {
    const filepath = path.join(this.ordersDir, `${orderId}.json`);
    if (!fs.existsSync(filepath)) return null;
    return JSON.parse(fs.readFileSync(filepath));
  }

  /**
   * Get all orders
   */
  getAllOrders() {
    const files = fs.readdirSync(this.ordersDir);
    return files
      .filter(f => f.endsWith('.json'))
      .map(f => JSON.parse(fs.readFileSync(path.join(this.ordersDir, f))));
  }

  /**
   * Get revenue stats
   */
  getRevenueStats() {
    const orders = this.getAllOrders();
    const paid = orders.filter(o => o.status === 'paid');
    
    return {
      totalOrders: orders.length,
      paidOrders: paid.length,
      totalRevenue: paid.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
      averageOrder: paid.length > 0 ? paid.reduce((sum, o) => sum + (o.totalAmount || 0), 0) / paid.length : 0,
      conversionRate: orders.length > 0 ? (paid.length / orders.length) * 100 : 0
    };
  }

  /**
   * Generate sales script for closing
   */
  generateCloseScript(prospect) {
    return {
      opener: `Hi ${prospect.contactName || 'there'}, this is Ruben from Rankingsb. I wanted to follow up on the website preview I sent you for ${prospect.businessName}. Have you had a chance to look at it?`,
      
      discovery: [
        "What did you think of the preview?",
        "Are you currently getting leads from online?",
        "What would a steady stream of new customers mean for your business?",
        "Have you looked into websites before?"
      ],
      
      pitch: `Here's what I'm proposing: For $500, I'll build you a complete 5-page website based on that preview. You saw the quality - custom design, your branding, mobile-friendly. $39/month covers hosting and any small updates you need. I can have it live in 7 days.`,
      
      urgency: `I'm offering a special rate right now because I'm building up my portfolio in ${prospect.city}. This price goes up to $750 next month. Plus, every day without a website is a day your competitors are getting those calls.`,
      
      close: `I can send you the payment link right now. It takes 2 minutes to complete, and we can have your site live by ${this.getDeliveryDate()}. Sound good?`,
      
      paymentInstructions: `Perfect! I'm sending you the secure payment link now. Once you complete it, I'll send you a quick questionnaire to gather your final details, and we'll be live in 7 days. You'll get progress updates throughout.`,
      
      paymentUrl: this.getPaymentUrl(prospect)
    };
  }

  getDeliveryDate() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  }
}

module.exports = PaymentHandler;

// CLI usage
if (require.main === module) {
  const handler = new PaymentHandler();
  
  if (process.argv[2] === 'stats') {
    console.log(JSON.stringify(handler.getRevenueStats(), null, 2));
  } else if (process.argv[2] === 'script') {
    const demo = {
      id: 'demo_001',
      businessName: 'Santa Barbara HVAC Pros',
      contactName: 'John',
      city: 'Santa Barbara'
    };
    console.log(JSON.stringify(handler.generateCloseScript(demo), null, 2));
  } else {
    console.log('Payment links configured:', handler.paymentLinks);
    console.log('Revenue stats:', handler.getRevenueStats());
  }
}
