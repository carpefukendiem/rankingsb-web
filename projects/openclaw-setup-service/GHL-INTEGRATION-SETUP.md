# GHL Integration Setup for getclawedup.com
## Connect Contact Form to Your GoHighLevel Subaccount

---

## ⚡ QUICK SETUP (2 Options)

### Option 1: Formspree (Fastest - 5 minutes)
**Best for:** Getting the form working immediately while you set up GHL

1. Go to https://formspree.io/
2. Create a free account
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/xnqkvpzy`)
5. Replace `YOUR_FORM_ID` in the HTML with your actual form ID

**Current form action:**
```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

**Update to:**
```html
action="https://formspree.io/f/xnqkvpzy"
```

6. Test the form — submissions will go to your email

---

### Option 2: Direct GHL Integration (Recommended)
**Best for:** Leads going straight into your GHL pipeline

#### Step 1: Get Your GHL API Key
1. Log into your GHL subaccount (app.rankingsb.com)
2. Go to Settings → Business Profile → API Key
3. Copy your API key

#### Step 2: Create a Custom Form Handler
Create a file `submit-form.php` on your server:

```php
<?php
// GHL API Configuration
$ghl_api_key = 'YOUR_GHL_API_KEY';
$ghl_location_id = 'YOUR_LOCATION_ID';

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$company = $_POST['company'] ?? '';
$message = $_POST['message'] ?? '';

// Create contact in GHL
$contact_data = [
    'firstName' => $name,
    'email' => $email,
    'companyName' => $company,
    'source' => 'getclawedup.com',
    'customFields' => [
        ['key' => 'message', 'value' => $message],
        ['key' => 'lead_source', 'value' => 'Website Contact Form']
    ]
];

$ch = curl_init('https://rest.gohighlevel.com/v1/contacts');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($contact_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $ghl_api_key,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code === 200 || $http_code === 201) {
    // Success — optionally add to pipeline
    $contact = json_decode($response, true);
    $contact_id = $contact['contact']['id'] ?? null;
    
    if ($contact_id) {
        // Add to "New Lead" pipeline stage
        $opportunity_data = [
            'title' => $company ? "$company - OpenClaw Setup" : "$name - OpenClaw Setup",
            'status' => 'open',
            'pipelineId' => 'YOUR_PIPELINE_ID',
            'stageId' => 'YOUR_STAGE_ID',
            'contactId' => $contact_id,
            'value' => 1000 // Estimated value
        ];
        
        $ch2 = curl_init('https://rest.gohighlevel.com/v1/opportunities');
        curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch2, CURLOPT_POST, true);
        curl_setopt($ch2, CURLOPT_POSTFIELDS, json_encode($opportunity_data));
        curl_setopt($ch2, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $ghl_api_key,
            'Content-Type: application/json'
        ]);
        curl_exec($ch2);
        curl_close($ch2);
    }
    
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to create contact']);
}
?>
```

#### Step 3: Update Form Action
Change the form action in your HTML:

```html
<form class="contact-form" id="contactForm" action="submit-form.php" method="POST">
```

#### Step 4: Test
Submit a test form and verify the contact appears in GHL

---

## 🎯 RECOMMENDED: Use Zapier (Easiest)

If you don't want to code, use Zapier as the bridge:

1. **Set up Formspree first** (Option 1 above)
2. **Create a Zapier account** (free tier works)
3. **Create a Zap:**
   - Trigger: Formspree → New Submission
   - Action: GoHighLevel → Create Contact
4. **Map fields:**
   - Name → First Name
   - Email → Email
   - Company → Company Name
   - Message → Notes

This automatically sends all form submissions to GHL without any coding.

---

## 📊 What Happens When Someone Submits?

### Current Flow (Formspree):
1. User fills out form
2. Form submits to Formspree
3. You get an email notification
4. You manually add to GHL (or use Zapier to automate)

### Ideal Flow (GHL Direct):
1. User fills out form
2. Contact created in GHL automatically
3. Contact added to "New Lead" pipeline stage
4. Automation triggers (welcome email, task for you, etc.)

---

## 🔧 TROUBLESHOOTING

### Form not submitting?
- Check browser console for JavaScript errors
- Verify form action URL is correct
- Test with Formspree first to isolate issues

### GHL not receiving contacts?
- Verify API key is correct
- Check location ID is correct
- Ensure contact has at least email or phone
- Check GHL API rate limits

### Emails going to spam?
- Set up SPF/DKIM records for your domain
- Use a professional email (john@rankingsb.com vs gmail)
- Add reply-to header in Formspree settings

---

## 🚀 IMMEDIATE ACTION ITEMS

1. **Right Now (5 min):**
   - Sign up for Formspree
   - Update YOUR_FORM_ID in the HTML
   - Test the form

2. **Today (30 min):**
   - Set up Zapier connection to GHL (optional but recommended)
   - Or implement PHP form handler

3. **This Week:**
   - Set up GHL automation for new leads
   - Create welcome email sequence
   - Add lead scoring/tagging

---

## 📞 NEED HELP?

If you get stuck:
1. Formspree docs: https://formspree.io/docs/
2. GHL API docs: https://highlevel.stoplight.io/
3. Text Ruben for urgent issues

---

**Form Status:** ✅ Fixed (replaced mailto: with proper form submission)
**Next Step:** Connect to Formspree (5 min) or GHL (30 min)
