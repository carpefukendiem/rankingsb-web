/**
 * Website Sales System - Outreach Engine
 * Manages email, SMS, and WhatsApp outreach sequences
 */

const fs = require('fs');
const path = require('path');

// Outreach templates by channel
const TEMPLATES = {
  email: {
    initial: {
      subject: "Your {businessName} deserves a professional website",
      body: `Hi {contactName || 'there'},

I came across {businessName} while searching for {category.toLowerCase()} businesses in {city}. I noticed you don't currently have a website, and I wanted to reach out because I think you're missing out on potential customers.

I've created a quick preview of what your website could look like:
👉 {previewUrl}

Here's what I'm offering:
✅ Professional 5-page website ($500 one-time)
✅ Custom design with your branding
✅ Mobile-friendly and fast
✅ 7-day delivery
✅ $39/month hosting included

No risk - you only pay when you're happy with the design.

Interested in seeing more? Reply to this email or call me at {phoneNumber}.

Best,
Ruben
Rankingsb Web Design
805-307-7600
`
    },
    followup1: {
      subject: "Quick follow-up: {businessName} website",
      body: `Hi {contactName || 'there'},

Just wanted to follow up on my email from a few days ago about building a website for {businessName}.

Your preview is still available here: {previewUrl}

I built this specifically for your business using your branding and services. Many {category.toLowerCase()} businesses in {city} are getting 3-5 new leads per week just from having a professional website.

Would you like to chat for 10 minutes about how this could work for you?

Ruben
805-307-7600
`
    },
    followup2: {
      subject: "Last follow-up: {businessName} website opportunity",
      body: `Hi {contactName || 'there'},

This is my last follow-up about the website preview I created for {businessName}.

I understand you might not be ready right now, but I'll keep this preview active for another week in case you change your mind: {previewUrl}

If now's not the right time, no worries at all. Just reply with "not interested" and I won't contact you again.

Thanks for your time!

Ruben
805-307-7600
`
    },
    valueAdd: {
      subject: "Free tip for {businessName}",
      body: `Hi {contactName || 'there'},

Quick tip: 76% of people search online before choosing a {category.toLowerCase()} business. Without a website, you're essentially invisible to them.

I've seen {category.toLowerCase()} businesses in {city} increase their leads by 40% just by having a professional website.

Your preview: {previewUrl}

Worth a 10-minute conversation?

Ruben
805-307-7600
`
    }
  },
  
  sms: {
    initial: `Hi! This is Ruben from Rankingsb. I built a preview website for {businessName} - take a look: {previewUrl}. Professional 5-page site for $500 + $39/mo hosting. Interested? Reply YES or call 805-307-7600`,
    followup1: `Quick follow-up on the website preview for {businessName}. Still available here: {previewUrl}. Many {category.toLowerCase()} businesses get 3-5 new leads/week from their site. Worth 10 min to chat?`,
    followup2: `Last follow-up - keeping your {businessName} preview active for one more week: {previewUrl}. Reply STOP to opt out.`,
    urgency: `{businessName} - 76% of customers search online first. Without a website, they can't find you. Preview: {previewUrl}. $500 one-time. Interested?`
  },
  
  whatsapp: {
    initial: `Hi {contactName || 'there'}! 👋\n\nI came across {businessName} and noticed you don't have a website yet. I built a quick preview to show you what's possible:\n\n{previewUrl}\n\n**What you get:**\n✅ Professional 5-page website\n✅ Custom design with your branding\n✅ Mobile-friendly\n✅ 7-day delivery\n✅ Only $500 + $39/month hosting\n\nNo pressure - just wanted you to see what's possible! Let me know if you have questions. 😊\n\nRuben\n805-307-7600`,
    followup1: `Hey {contactName || 'there'}! Just following up on the website preview I shared for {businessName}.\n\nStill here if you want to take a look: {previewUrl}\n\nQuick question: What's holding you back from getting a website? Maybe I can address your concerns.\n\nRuben`,
    valueAdd: `Quick stat: {city} {category.toLowerCase()} businesses with websites get 3x more calls than those without.\n\nYour preview is ready: {previewUrl}\n\nWorth a conversation? ☕`
  }
};

// Common objections and rebuttals
const REBUTTALS = {
  "too expensive": "I understand budget is a concern. Let's break it down: $500 is less than $2/day over the first year. One new customer typically covers that cost. Plus, we can split it into 2 payments if that helps.",
  
  "don't need a website": "Fair point - but here's what I'm seeing: 76% of people search online before choosing a {category.toLowerCase()}. Your competitors with websites are getting those calls. A website isn't just nice to have anymore - it's how customers find you.",
  
  "already have Facebook": "Facebook is great! But here's the thing - you don't own that platform. They can change the rules anytime (and they do). Plus, many people don't use Facebook or trust business pages there. Your own website builds more credibility and shows up in Google searches.",
  
  "too busy": "I get it - you're running a business. That's exactly why this makes sense. A website works 24/7 answering questions and generating leads while you focus on the work. The setup takes 30 minutes of your time, then it runs itself.",
  
  "already have someone": "Great! Having a web person is smart. Quick question - are they delivering results? If you're open to a second opinion, I'd be happy to review what you have and suggest improvements. No charge for the review.",
  
  "not interested": "No problem at all! I respect your time. Just to clarify - is it the timing, the price, or you just don't see value in a website right now? Understanding this helps me improve. Thanks!",
  
  "need to think about it": "Absolutely, big decisions need thought. Here's what I'll do - I'll keep your preview active for 7 more days at this link: {previewUrl}. I'll follow up next week, but if you want to move forward sooner, just reply or call 805-307-7600.",
  
  "what's included": "Great question! For $500 you get:\n✅ 5 pages: Home, About, Services, Contact, Reviews\n✅ Mobile-friendly design\n✅ Your logo and brand colors\n✅ Contact form\n✅ 7-day delivery\n✅ Plus $39/month for hosting and updates\n\nWant to see the preview again? {previewUrl}",
  
  "how long": "7 business days from payment to go-live. Day 1-2: I finalize the design with your input. Day 3-5: Build all 5 pages. Day 6-7: Testing and launch. You'll see progress updates throughout.",
  
  "can i see examples": "Absolutely! Your preview is already built specifically for {businessName}: {previewUrl}\n\nThis shows exactly what your site would look like - your business name, your services, your branding. Want to see other sites I've built? I can send links.",
  
  "what if i don't like it": "No risk to you. You see the preview BEFORE paying. If you want changes, I make them. Only when you're 100% happy do we move forward. And even then, if something's not right after launch, I'll fix it. Your satisfaction is guaranteed.",
  
  "cheaper options": "You're right, there are cheaper options. Here's the difference: those $100-200 sites use templates that look generic. I build custom designs that match YOUR business. Plus, you get actual support - when you need updates or have questions, I answer. Cheap sites become expensive when they don't work.",
  
  "do you do SEO": "Yes! Every site I build includes basic on-page SEO - proper titles, meta descriptions, fast loading, mobile-friendly. This helps you show up in Google searches. For advanced SEO, we can discuss that as a separate service after your site is live.",
  
  "can you add X feature": "Probably! Tell me what you need. Extra pages are $50 each. Special features like booking calendars, galleries, or e-commerce - let me know what you're thinking and I'll give you a price. I customize each site to what you actually need.",
  
  "will it work on phones": "Absolutely! Every site I build is mobile-responsive. That means it looks great and works perfectly on phones, tablets, and desktops. Over 60% of people browse on mobile, so this is critical. Your preview is already mobile-friendly - try opening it on your phone!"
};

class OutreachEngine {
  constructor() {
    this.logsDir = path.join(__dirname, '..', 'logs');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  /**
   * Fill template with prospect data
   */
  fillTemplate(template, prospect) {
    let filled = template;
    const variables = {
      businessName: prospect.businessName || prospect.name || 'Your Business',
      contactName: prospect.contactName,
      city: prospect.city,
      category: prospect.category,
      previewUrl: prospect.previewUrl,
      phoneNumber: '805-307-7600'
    };

    for (const [key, value] of Object.entries(variables)) {
      if (value) {
        filled = filled.replace(new RegExp(`{${key}}`, 'g'), value);
      }
    }

    // Clean up any remaining template variables
    filled = filled.replace(/{[^}]+}/g, '');

    return filled;
  }

  /**
   * Generate email sequence
   */
  generateEmailSequence(prospect) {
    return {
      initial: {
        subject: this.fillTemplate(TEMPLATES.email.initial.subject, prospect),
        body: this.fillTemplate(TEMPLATES.email.initial.body, prospect),
        delay: 0 // Send immediately
      },
      followup1: {
        subject: this.fillTemplate(TEMPLATES.email.followup1.subject, prospect),
        body: this.fillTemplate(TEMPLATES.email.followup1.body, prospect),
        delay: 3 // Days
      },
      followup2: {
        subject: this.fillTemplate(TEMPLATES.email.followup2.subject, prospect),
        body: this.fillTemplate(TEMPLATES.email.followup2.body, prospect),
        delay: 7 // Days
      },
      valueAdd: {
        subject: this.fillTemplate(TEMPLATES.email.valueAdd.subject, prospect),
        body: this.fillTemplate(TEMPLATES.email.valueAdd.body, prospect),
        delay: 10 // Days
      }
    };
  }

  /**
   * Generate SMS sequence
   */
  generateSMSSequence(prospect) {
    return {
      initial: {
        body: this.fillTemplate(TEMPLATES.sms.initial, prospect),
        delay: 0
      },
      followup1: {
        body: this.fillTemplate(TEMPLATES.sms.followup1, prospect),
        delay: 3
      },
      followup2: {
        body: this.fillTemplate(TEMPLATES.sms.followup2, prospect),
        delay: 7
      },
      urgency: {
        body: this.fillTemplate(TEMPLATES.sms.urgency, prospect),
        delay: 10
      }
    };
  }

  /**
   * Generate WhatsApp sequence
   */
  generateWhatsAppSequence(prospect) {
    return {
      initial: {
        body: this.fillTemplate(TEMPLATES.whatsapp.initial, prospect),
        delay: 0
      },
      followup1: {
        body: this.fillTemplate(TEMPLATES.whatsapp.followup1, prospect),
        delay: 3
      },
      valueAdd: {
        body: this.fillTemplate(TEMPLATES.whatsapp.valueAdd, prospect),
        delay: 7
      }
    };
  }

  /**
   * Get rebuttal for objection
   */
  getRebuttal(objection, prospect) {
    const normalized = objection.toLowerCase().trim();
    
    for (const [key, response] of Object.entries(REBUTTALS)) {
      if (normalized.includes(key)) {
        return this.fillTemplate(response, prospect);
      }
    }
    
    // Default rebuttal
    return this.fillTemplate(
      "I understand your concern. Let me ask - what would make this a no-brainer for you? I'm flexible on timing and can work with you to find a solution that fits your needs.",
      prospect
    );
  }

  /**
   * Log outreach activity
   */
  logOutreach(prospectId, channel, type, content) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      prospectId,
      channel,
      type,
      content
    };

    const logFile = path.join(this.logsDir, `${new Date().toISOString().split('T')[0]}.jsonl`);
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  }

  /**
   * Get outreach stats
   */
  getStats() {
    const files = fs.readdirSync(this.logsDir).filter(f => f.endsWith('.jsonl'));
    const today = new Date().toISOString().split('T')[0];
    
    let total = 0;
    let todayCount = 0;
    const byChannel = {};
    const byType = {};

    for (const file of files) {
      const lines = fs.readFileSync(path.join(this.logsDir, file), 'utf8')
        .split('\n')
        .filter(line => line.trim());
      
      for (const line of lines) {
        const entry = JSON.parse(line);
        total++;
        if (file.startsWith(today)) todayCount++;
        byChannel[entry.channel] = (byChannel[entry.channel] || 0) + 1;
        byType[entry.type] = (byType[entry.type] || 0) + 1;
      }
    }

    return { total, today: todayCount, byChannel, byType };
  }
}

module.exports = OutreachEngine;

// CLI usage
if (require.main === module) {
  const engine = new OutreachEngine();
  
  if (process.argv[2] === 'stats') {
    console.log(JSON.stringify(engine.getStats(), null, 2));
  } else if (process.argv[2] === 'templates') {
    console.log('Email Templates:');
    console.log(JSON.stringify(TEMPLATES.email, null, 2));
  } else if (process.argv[2] === 'rebuttals') {
    console.log('Objections & Rebuttals:');
    for (const [k, v] of Object.entries(REBUTTALS)) {
      console.log(`\n${k}:`);
      console.log(v.substring(0, 100) + '...');
    }
  } else {
    // Demo
    const demoProspect = {
      businessName: 'Santa Barbara HVAC Pros',
      city: 'Santa Barbara',
      category: 'Contractor',
      previewUrl: 'https://previews.rankingsb.com/santa-barbara-hvac-pros'
    };
    
    console.log('Email Sequence:');
    console.log(JSON.stringify(engine.generateEmailSequence(demoProspect), null, 2));
  }
}
