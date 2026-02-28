# GHL Direct Integration Setup for getclawedup.com
## Contact Form → GoHighLevel (No Third Parties)

---

## ✅ WHAT'S ALREADY DONE

The form is now connected directly to GHL via a custom API endpoint:
- **Form Action:** `/api/submit-form`
- **API Endpoint:** `api/submit-form.js`
- **Data Flow:** Form → Vercel API → GHL API

---

## 🔧 SETUP STEPS (5 minutes)

### Step 1: Get Your GHL API Key

1. Log into your GHL account: https://app.gohighlevel.com/
2. Go to **Settings** → **Business Profile**
3. Scroll down to **API Key**
4. Click **Generate/Copy** your API key
5. Save it somewhere secure (you'll only see it once)

### Step 2: Get Your Location ID

1. In GHL, look at the URL when you're in your subaccount
2. It looks like: `https://app.gohighlevel.com/v2/location/abc123/dashboard`
3. Copy the `abc123` part — that's your Location ID

### Step 3: Add Environment Variables to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your `openclaw-setup-service` project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Name | Value | Example |
|------|-------|---------|
| `GHL_API_KEY` | Your GHL API key | `eyJhbGciOiJIUzI1NiIs...` |
| `GHL_LOCATION_ID` | Your location ID | `abc123xyz789` |
| `GHL_PIPELINE_ID` | (Optional) Pipeline ID | `pipeline_123` |
| `GHL_STAGE_ID` | (Optional) Stage ID | `stage_456` |

5. Click **Save**
6. **Redeploy** your project (Vercel needs to pick up the new env vars)

### Step 4: Test the Form

1. Go to https://www.getclawedup.com
2. Fill out the contact form
3. Submit
4. Check your GHL subaccount → Contacts
5. You should see the new contact!

---

## 🎯 WHAT HAPPENS WHEN SOMEONE SUBMITS

1. **User submits form** → Data goes to `/api/submit-form`
2. **API endpoint processes data:**
   - Validates name and email
   - Splits full name into first/last
   - Prepares contact data with tags
3. **Creates contact in GHL:**
   - First Name, Last Name
   - Email
   - Company Name
   - Source: getclawedup.com
   - Tags: Website Lead, OpenClaw Setup, Contact Form
   - Custom Fields: message, lead_source, form_url
4. **Adds to Pipeline** (optional):
   - Creates opportunity in your pipeline
   - Sets value to $1000
   - Status: open
5. **Returns success** → User sees confirmation message

---

## 📊 DATA MAPPING

| Form Field | GHL Contact Field | Notes |
|------------|-------------------|-------|
| Name | First Name + Last Name | Auto-split on space |
| Email | Email | Required |
| Company | Company Name | Optional |
| Message | Custom Field: message | Stored in custom field |
| (hidden) | Source | getclawedup.com |
| (hidden) | Tags | Website Lead, OpenClaw Setup |

---

## 🔔 SET UP AUTOMATIONS IN GHL

### Automation 1: New Lead Notification

**Trigger:** Contact Created
**Filter:** Tags contains "Website Lead"
**Actions:**
1. Send email notification to you
2. Send SMS notification (optional)
3. Create task: "Follow up with website lead"

### Automation 2: Welcome Email

**Trigger:** Contact Created
**Delay:** 5 minutes
**Action:** Send email:
```
Subject: Thanks for reaching out!

Hi {{contact.first_name}},

Thanks for contacting OpenClaw Setup! I'll review your message and get back to you within 24 hours.

In the meantime, feel free to check out our services at https://www.getclawedup.com

Best,
Ruben
```

### Automation 3: Pipeline Stage Progression

**Trigger:** Opportunity Created
**Actions:**
1. Add to "New Lead" stage
2. Create follow-up tasks
3. Start nurture sequence

---

## 🛠️ CUSTOMIZATION OPTIONS

### Change Pipeline/Stage IDs

Edit `api/submit-form.js`:
```javascript
const opportunityData = {
  pipelineId: process.env.GHL_PIPELINE_ID || 'YOUR_PIPELINE_ID',
  stageId: process.env.GHL_STAGE_ID || 'YOUR_STAGE_ID',
  // ...
};
```

Or set them as environment variables in Vercel.

### Add More Fields

To add phone number field:

1. Add to HTML form:
```html
<input type="tel" name="phone" placeholder="Phone Number">
```

2. Update API handler:
```javascript
const { name, email, company, message, phone } = req.body;

const contactData = {
  // ... other fields
  phone: phone || '',
};
```

### Change Lead Value

In `api/submit-form.js`:
```javascript
value: 2500, // Change from $1000 to $2500
```

---

## 🚨 TROUBLESHOOTING

### Form shows error on submit?

1. Check browser console for error details
2. Verify environment variables are set in Vercel
3. Make sure API key has correct permissions
4. Check Vercel function logs (Dashboard → Functions)

### Contact not appearing in GHL?

1. Check GHL API key is valid
2. Verify location ID is correct
3. Look in "All Contacts" (not just "My Contacts")
4. Check if contact already exists (GHL deduplicates by email)

### Pipeline/opportunity not created?

1. Check pipeline ID and stage ID are correct
2. Verify they exist in your GHL subaccount
3. Contact is still created even if pipeline fails

### Getting CORS errors?

The API handler includes CORS headers. If you're testing locally, make sure you're accessing the form via the actual domain, not file://

---

## 📞 GHL API REFERENCE

**Base URL:** https://rest.gohighlevel.com/v1/

**Endpoints used:**
- POST `/contacts` - Create contact
- POST `/opportunities` - Create opportunity

**Documentation:** https://highlevel.stoplight.io/

---

## ✅ PRE-LAUNCH CHECKLIST

- [ ] GHL API key generated and copied
- [ ] Location ID identified
- [ ] Environment variables added to Vercel
- [ ] Project redeployed
- [ ] Test form submission
- [ ] Verify contact appears in GHL
- [ ] Set up GHL automations
- [ ] Test automation triggers

---

**Questions?** Check the GHL API docs or inspect the browser console for error messages.

**Status:** ✅ Direct GHL integration complete. Just add your API credentials and you're live!
