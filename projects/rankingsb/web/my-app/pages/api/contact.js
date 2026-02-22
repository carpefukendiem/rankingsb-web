// Next.js API Route - /api/contact
// Receives contact form submissions and sends to GHL

import { GHLContactBackend } from '@/lib/ghl-contact-backend';

export default async function handler(req, res) {
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
        const backend = new GHLContactBackend();
        const result = await backend.handleSubmission(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            error: 'Failed to process submission',
            message: error.message 
        });
    }
}
