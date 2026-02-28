// API endpoint to handle contact form submissions and send to GHL
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // GHL API Configuration
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = 'vBV7QMEdTmUhhmC1puFl'; // OpenClaw subdomain location
    
    // Split name into first and last
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Prepare contact data for GHL
    const contactData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      companyName: company || '',
      locationId: GHL_LOCATION_ID,
      source: 'getclawedup.com',
      tags: ['Website Lead', 'OpenClaw Setup', 'Contact Form'],
      customFields: [
        { id: 'message', value: message || '' },
        { id: 'lead_source', value: 'Website Contact Form' },
        { id: 'form_url', value: 'https://www.getclawedup.com' }
      ]
    };

    // Create contact in GHL
    const contactResponse = await fetch(`https://rest.gohighlevel.com/v1/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    if (!contactResponse.ok) {
      const errorData = await contactResponse.json();
      console.error('GHL Contact Creation Error:', errorData);
      throw new Error(`GHL API Error: ${errorData.message || 'Failed to create contact'}`);
    }

    const contactResult = await contactResponse.json();
    const contactId = contactResult.contact?.id;

    // If contact created successfully, optionally add to pipeline
    if (contactId) {
      try {
        // Add to opportunity pipeline (optional - configure pipeline/stage IDs)
        const opportunityData = {
          title: company ? `${company} - OpenClaw Setup` : `${name} - OpenClaw Setup`,
          status: 'open',
          pipelineId: process.env.GHL_PIPELINE_ID || 'YOUR_PIPELINE_ID',
          stageId: process.env.GHL_STAGE_ID || 'YOUR_STAGE_ID',
          contactId: contactId,
          value: 1000,
          customFields: [
            { id: 'message', value: message || '' }
          ]
        };

        const oppResponse = await fetch('https://rest.gohighlevel.com/v1/opportunities/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(opportunityData)
        });

        if (!oppResponse.ok) {
          console.log('Pipeline addition skipped or failed - contact still created');
        }
      } catch (oppError) {
        console.log('Pipeline addition error (non-critical):', oppError.message);
      }

      // Send notification email (optional - using GHL's built-in notifications)
      // You can set up automation in GHL to send you an email when a new contact is created
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      contactId: contactId 
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ 
      error: 'Failed to submit form',
      message: error.message 
    });
  }
}
