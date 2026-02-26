/**
 * Stripe Webhook Handler Tests
 * Run: npm test
 */

const { StripeWebhookHandler } = require('./stripe-webhook-handler');
const fs = require('fs');
const path = require('path');

describe('StripeWebhookHandler', () => {
  let handler;
  
  beforeEach(() => {
    handler = new StripeWebhookHandler();
    // Clean up test orders
    const ordersDir = path.join(__dirname, '..', 'orders');
    if (fs.existsSync(ordersDir)) {
      fs.readdirSync(ordersDir).forEach(f => {
        if (f.startsWith('TEST-')) fs.unlinkSync(path.join(ordersDir, f));
      });
    }
  });

  test('should calculate due date 7 business days from now', () => {
    const dueDate = handler.calculateDueDate(7);
    const date = new Date(dueDate);
    const today = new Date();
    const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    
    // Should be approximately 9-10 calendar days (7 business days)
    expect(diffDays).toBeGreaterThanOrEqual(9);
    expect(diffDays).toBeLessThanOrEqual(11);
  });

  test('should save order to filesystem', async () => {
    const testOrder = {
      orderId: 'TEST-123',
      customer: { name: 'Test Customer' },
      amount: 500
    };
    
    const filepath = await handler.saveOrder(testOrder);
    expect(fs.existsSync(filepath)).toBe(true);
    
    const saved = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    expect(saved.orderId).toBe('TEST-123');
  });

  test('should process $500 checkout session', async () => {
    const mockSession = {
      id: 'cs_test_123',
      customer_details: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '805-555-0123'
      },
      amount_total: 50000, // $500 in cents
      currency: 'usd',
      metadata: {
        businessName: "John's Plumbing",
        industry: 'Plumbing',
        city: 'Santa Barbara',
        mockupUrl: 'https://example.com/mockup'
      },
      payment_status: 'paid'
    };
    
    const result = await handler.handleCheckoutCompleted(mockSession);
    
    expect(result.processed).toBe(true);
    expect(result.orderId).toBeDefined();
  });

  test('should ignore non-500 payments', async () => {
    const mockSession = {
      id: 'cs_test_456',
      amount_total: 9999, // $99.99
      payment_status: 'paid'
    };
    
    const result = await handler.handleCheckoutCompleted(mockSession);
    
    expect(result.processed).toBe(false);
    expect(result.reason).toBe('Not a website sale');
  });
});
