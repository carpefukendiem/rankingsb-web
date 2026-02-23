/**
 * GHL Contact Form Backend
 * Receives contact form submissions and creates contacts in GoHighLevel
 */

const axios = require('axios');

class GHLContactBackend {
    constructor() {
        this.apiKey = process.env.GHL_API_KEY;
        this.baseUrl = 'https://api.msgsndr.com'; // GHL API v2
        this.locationId = process.env.GHL_LOCATION_ID || 'yrvzyq2jB2me4Z23PFxP'; // Rankingsb
    }

    /**
     * Validate environment setup
     */
    validateConfig() {
        if (!this.apiKey) {
            return { valid: false, error: 'GHL_API_KEY not set in environment' };
        }
        if (!this.locationId) {
            return { valid: false, error: 'GHL_LOCATION_ID not set' };
        }
        return { valid: true };
    }

    /**
     * Create or update a contact in GHL
     */
    async createContact(contactData) {
        const config = this.validateConfig();
        if (!config.valid) {
            throw new Error(config.error);
        }

        const {
            firstName,
            lastName,
            email,
            phone,
            company,
            message,
            source = 'website',
            tags = ['Website Lead', 'Contact Form']
        } = contactData;

        // Build contact payload
        const payload = {
            locationId: this.locationId,
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
            phone: phone || '',
            companyName: company || '',
            tags: tags,
            source: source,
            customFields: [
                {
                    id: 'message',
                    value: message || ''
                }
            ]
        };

        try {
            const response = await axios.post(
                `${this.baseUrl}/contacts/`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                        'Version': '2021-07-28'
                    }
                }
            );

            console.log('✅ Contact created in GHL:', response.data.contact?.id);
            
            // Add to pipeline if configured
            await this.addToPipeline(response.data.contact?.id, contactData);

            return {
                success: true,
                contactId: response.data.contact?.id,
                message: 'Contact created successfully'
            };
        } catch (error) {
            console.error('❌ Failed to create contact:', error.response?.data || error.message);
            throw new Error(`GHL API Error: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Add contact to sales pipeline
     */
    async addToPipeline(contactId, contactData) {
        if (!contactId) return;

        // Pipeline stage: "Targeted (Not Contact)" - first stage
        const pipelineStage = process.env.GHL_PIPELINE_STAGE_ID || 'targeted';

        try {
            const payload = {
                pipelineId: process.env.GHL_PIPELINE_ID,
                stageId: pipelineStage,
                contactId: contactId,
                locationId: this.locationId,
                name: `${contactData.firstName || ''} ${contactData.lastName || ''} - Contact Form`.trim(),
                status: 'open'
            };

            await axios.post(
                `${this.baseUrl}/opportunities/`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                        'Version': '2021-07-28'
                    }
                }
            );

            console.log('✅ Contact added to pipeline');
        } catch (error) {
            console.warn('⚠️ Could not add to pipeline:', error.response?.data?.message || error.message);
            // Don't fail the whole operation if pipeline add fails
        }
    }

    /**
     * Send notification to Discord/Slack
     */
    async sendNotification(contactData) {
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;
        
        if (!webhookUrl) {
            console.log('ℹ️ No webhook configured for notifications');
            return;
        }

        const message = {
            content: '🎯 **New Contact Form Submission**',
            embeds: [{
                title: 'New Lead from Website',
                fields: [
                    { name: 'Name', value: `${contactData.firstName} ${contactData.lastName}`, inline: true },
                    { name: 'Email', value: contactData.email || 'N/A', inline: true },
                    { name: 'Phone', value: contactData.phone || 'N/A', inline: true },
                    { name: 'Company', value: contactData.company || 'N/A', inline: true },
                    { name: 'Message', value: contactData.message || 'No message' }
                ],
                color: 0x00ff00,
                timestamp: new Date().toISOString()
            }]
        };

        try {
            await axios.post(webhookUrl, message);
            console.log('✅ Notification sent');
        } catch (error) {
            console.warn('⚠️ Failed to send notification:', error.message);
        }
    }

    /**
     * Main handler for contact form submissions
     */
    async handleSubmission(formData) {
        // Validate required fields
        if (!formData.email && !formData.phone) {
            throw new Error('Email or phone is required');
        }

        // Create contact in GHL
        const result = await this.createContact(formData);

        // Send notification
        await this.sendNotification(formData);

        return result;
    }
}

// Express.js handler for use in Next.js API route or standalone server
function createHandler() {
    const backend = new GHLContactBackend();

    return async (req, res) => {
        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        try {
            const result = await backend.handleSubmission(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.error('Contact form error:', error);
            res.status(500).json({ 
                error: 'Failed to process submission',
                message: error.message 
            });
        }
    };
}

module.exports = { GHLContactBackend, createHandler };

// If running directly (for testing)
if (require.main === module) {
    // Test the connection
    const backend = new GHLContactBackend();
    const config = backend.validateConfig();
    
    if (config.valid) {
        console.log('✅ GHL Contact Backend configured');
        console.log('   Location ID:', backend.locationId);
    } else {
        console.error('❌', config.error);
    }
}
