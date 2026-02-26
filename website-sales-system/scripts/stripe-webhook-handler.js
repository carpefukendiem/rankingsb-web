/**
 * Stripe Webhook Handler for $500 Website Sales
 * Receives payment notifications and triggers handoff to Ruben
 * 
 * Endpoint: POST /webhook/stripe
 * Trigger: checkout.session.completed
 */

const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class StripeWebhookHandler {
  constructor() {
    this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    this.ordersDir = path.join(__dirname, '..', 'orders');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.ordersDir)) {
      fs.mkdirSync(this.ordersDir, { recursive: true });
    }
  }

  /**
   * Verify Stripe webhook signature
   */
  verifySignature(payload, signature) {
    if (!this.webhookSecret) {
      console.warn('⚠️ STRIPE_WEBHOOK_SECRET not set - skipping verification');
      return true;
    }

    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(payload, 'utf8')
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }

  /**
   * Handle checkout.session.completed event
   */
  async handleCheckoutCompleted(session) {
    const {
      id: sessionId,
      customer_details,
      amount_total,
      metadata,
      payment_status
    } = session;

    // Only process $500 website sales
    if (amount_total !== 50000) { // $500.00 in cents
      console.log(`ℹ️ Ignoring non-website payment: $${amount_total / 100}`);
      return { processed: false, reason: 'Not a website sale' };
    }

    const order = {
      orderId: `WEB-${Date.now()}`,
      sessionId,
      paymentStatus: payment_status,
      amount: amount_total / 100,
      currency: session.currency,
      customer: {
        name: customer_details?.name || 'Unknown',
        email: customer_details?.email || 'Unknown',
        phone: customer_details?.phone || 'Unknown'
      },
      business: {
        name: metadata?.businessName || 'Unknown',
        industry: metadata?.industry || 'Unknown',
        city: metadata?.city || 'Unknown',
        phone: metadata?.businessPhone || 'Unknown'
      },
      deliverables: {
        mockupUrl: metadata?.mockupUrl || null,
        prospectId: metadata?.prospectId || null
      },
      timeline: {
        orderedAt: new Date().toISOString(),
        dueDate: this.calculateDueDate(7),
        status: 'PENDING_HANDOFF'
      },
      notifications: {
        rubenNotified: false,
        customerNotified: false,
        slackPosted: false
      }
    };

    // Save order to file
    await this.saveOrder(order);

    // Send notifications
    await this.notifyRuben(order);
    await this.sendSlackAlert(order);
    await this.sendCustomerConfirmation(order);

    return { processed: true, orderId: order.orderId };
  }

  /**
   * Calculate due date (7 business days from now)
   */
  calculateDueDate(days) {
    const date = new Date();
    let businessDays = 0;
    
    while (businessDays < days) {
      date.setDate(date.getDate() + 1);
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        businessDays++;
      }
    }
    
    return date.toISOString();
  }

  /**
   * Save order to filesystem
   */
  async saveOrder(order) {
    const filename = `${order.orderId}.json`;
    const filepath = path.join(this.ordersDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(order, null, 2));
    console.log(`✅ Order saved: ${filepath}`);
    
    return filepath;
  }

  /**
   * Generate Ruben handoff notification
   */
  async notifyRuben(order) {
    const notification = {
      type: 'NEW_WEBSITE_ORDER',
      priority: 'HIGH',
      timestamp: new Date().toISOString(),
      order: {
        id: order.orderId,
        amount: `$${order.amount}`,
        customer: order.customer.name,
        business: order.business.name,
        industry: order.business.industry,
        city: order.business.city,
        dueDate: new Date(order.timeline.dueDate).toLocaleDateString()
      },
      actions: [
        'Schedule 15-min intake call within 24h',
        'Review mockup: ' + (order.deliverables.mockupUrl || 'N/A'),
        'Confirm brand colors and services',
        'Begin build (due in 7 business days)'
      ]
    };

    // Save notification for dashboard
    const notificationPath = path.join(
      this.ordersDir, 
      `notification-${order.orderId}.json`
    );
    fs.writeFileSync(notificationPath, JSON.stringify(notification, null, 2));

    // TODO: Send email to Ruben
    // TODO: Send SMS to Ruben
    console.log('📧 Ruben notification prepared:', notificationPath);
    
    return notification;
  }

  /**
   * Send Slack/Discord alert
   */
  async sendSlackAlert(order) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.log('ℹ️ No webhook configured for Slack/Discord alerts');
      return;
    }

    const message = {
      text: '🎉 NEW WEBSITE SALE!',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎉 New $500 Website Sale!'
          }
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Order:*\n${order.orderId}` },
            { type: 'mrkdwn', text: `*Amount:*\n$${order.amount}` },
            { type: 'mrkdwn', text: `*Business:*\n${order.business.name}` },
            { type: 'mrkdwn', text: `*Industry:*\n${order.business.industry}` },
            { type: 'mrkdwn', text: `*City:*\n${order.business.city}` },
            { type: 'mrkdwn', text: `*Due Date:*\n${new Date(order.timeline.dueDate).toLocaleDateString()}` }
          ]
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Customer:* ${order.customer.name}\n*Email:* ${order.customer.email}\n*Phone:* ${order.customer.phone}`
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: { type: 'plain_text', text: 'View Order' },
              url: `file://${path.join(this.ordersDir, `${order.orderId}.json`)}`,
              action_id: 'view_order'
            },
            {
              type: 'button',
              text: { type: 'plain_text', text: 'View Mockup' },
              url: order.deliverables.mockupUrl || '#',
              action_id: 'view_mockup'
            }
          ]
        }
      ]
    };

    try {
      const axios = require('axios');
      await axios.post(webhookUrl, message);
      console.log('✅ Slack/Discord alert sent');
    } catch (error) {
      console.error('❌ Failed to send Slack alert:', error.message);
    }
  }

  /**
   * Send customer confirmation email
   */
  async sendCustomerConfirmation(order) {
    // TODO: Integrate with email service (SendGrid, Postmark, etc.)
    console.log('📧 Customer confirmation email queued for:', order.customer.email);
    
    const emailTemplate = {
      to: order.customer.email,
      subject: `Your Website Order is Confirmed! #${order.orderId}`,
      body: `
Hi ${order.customer.name},

Thank you for choosing Rankingsb for ${order.business.name}'s new website!

ORDER DETAILS:
• Order ID: ${order.orderId}
• Amount Paid: $${order.amount}
• Estimated Delivery: ${new Date(order.timeline.dueDate).toLocaleDateString()}

WHAT HAPPENS NEXT:
1. You'll receive an email within 24 hours to schedule your 15-minute intake call
2. We'll confirm your services, colors, and content
3. We build your 5-page website (7 business days)
4. You review and approve
5. Your site goes live!

MONTHLY HOSTING:
Your $39/month hosting will begin in 30 days. You'll receive a separate invoice.

QUESTIONS?
Call/text: (805) 307-7600
Email: support@rankingsb.com

We're excited to work with you!

The Rankingsb Team
      `.trim()
    };

    // Save email for reference
    const emailPath = path.join(
      this.ordersDir,
      `email-${order.orderId}.json`
    );
    fs.writeFileSync(emailPath, JSON.stringify(emailTemplate, null, 2));
    
    return emailTemplate;
  }

  /**
   * Main webhook handler
   */
  async handleWebhook(req, res) {
    const payload = req.body;
    const signature = req.headers['stripe-signature'];

    // Verify signature
    if (!this.verifySignature(JSON.stringify(payload), signature)) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = payload;

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const result = await this.handleCheckoutCompleted(event.data.object);
          return res.status(200).json(result);
          
        case 'payment_intent.payment_failed':
          console.log('❌ Payment failed:', event.data.object.id);
          return res.status(200).json({ received: true, status: 'failed' });
          
        default:
          console.log(`ℹ️ Unhandled event type: ${event.type}`);
          return res.status(200).json({ received: true, status: 'ignored' });
      }
    } catch (error) {
      console.error('❌ Webhook error:', error);
      return res.status(500).json({ error: error.message });
    }
  }
}

// Express route handler
function createWebhookRoute() {
  const handler = new StripeWebhookHandler();
  
  return async (req, res) => {
    // Verify it's a POST request
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    await handler.handleWebhook(req, res);
  };
}

// Express app setup
function createApp() {
  const express = require('express');
  const app = express();
  
  app.use(express.json({ 
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    }
  }));
  
  app.post('/webhook/stripe', createWebhookRoute());
  
  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'stripe-webhook-handler' });
  });
  
  return app;
}

// If running directly
if (require.main === module) {
  const app = createApp();
  const PORT = process.env.PORT || 3001;
  
  app.listen(PORT, () => {
    console.log(`🚀 Stripe webhook handler running on port ${PORT}`);
    console.log(`📁 Orders will be saved to: ${path.join(__dirname, '..', 'orders')}`);
    console.log(`🔔 Webhook endpoint: POST http://localhost:${PORT}/webhook/stripe`);
  });
}

module.exports = { 
  StripeWebhookHandler, 
  createWebhookRoute,
  createApp 
};
