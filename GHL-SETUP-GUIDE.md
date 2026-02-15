# COMPLETE GHL SETUP GUIDE
## Step-by-Step for Sal's Launch | Monday February 16, 2026

---

## ⏰ TIME ESTIMATE: 2-3 HOURS TOTAL

**Saturday (2 hours):**
- Hour 1: Sal's account + Pipeline (below)
- Hour 2: Forms + Automations

**Sunday (1 hour):**
- Hour 3: Testing + Lead list

---

## PART 1: CREATE SAL'S USER ACCOUNT (15 min)

### Step-by-Step

1. **Login to GoHighLevel**
   - URL: Your GHL subdomain (e.g., `yourname.gohighlevel.com`)
   - Use your admin account

2. **Navigate to Settings**
   - Left sidebar → Settings (gear icon)
   - OR: Click your profile photo → Settings

3. **Create New User**
   - Settings tab → "Staff" or "Team Management"
   - Click "+ Add User" button
   
4. **Fill in Details**
   ```
   First Name: Sal
   Last Name: Vasquez
   Email: vasquez.salvador.jr@gmail.com
   Phone: 805-724-2788
   Role: Custom (see below)
   ```

5. **Set Custom Role Permissions**
   
   **ENABLE these permissions:**
   - ✅ Contacts (View, Edit)
   - ✅ Opportunities / Pipeline (View, Edit own, Create)
   - ✅ Calendar (View, Edit own appointments)
   - ✅ Forms (View submissions from his leads)
   - ✅ Reputation/Reviews (View only)
   
   **DISABLE these (security):**
   - ❌ Billing / Payments
   - ❌ Settings (agency-level)
   - ❌ Other users' data
   - ❌ Account deletion rights

6. **Save User**
   - Click "Add User" or "Save"
   - Sal will receive email invitation

7. **Set Temporary Password**
   - In user list, click Sal's name
   - "Reset Password" or "Set Password"
   - Use: `SFexIYGYlRvIcFtI0plP` (change this after he logs in!)

8. **Test Login**
   - Open incognito window
   - Go to your GHL subdomain
   - Login as Sal
   - Verify he can see only what he should

---

## PART 2: CREATE THE SALES PIPELINE (20 min)

### Step-by-Step

1. **Navigate to Opportunities**
   - Left sidebar → "Opportunities" (briefcase icon)
   
2. **Create New Pipeline**
   - Click "+ Add Pipeline" (top right of Opportunities page)
   - Name: "Sales Funnel"
   - Pipeline value: Optional

3. **Create Stages (IN THIS ORDER)**

   Click "+ Add Stage" for each:

   **Stage 1: Lead**
   - Name: Lead
   - Description: New uncontacted inquiry
   - Probability: 10%
   - Color: Gray

   **Stage 2: Contacted**
   - Name: Contacted
   - Description: Call attempted, no answer
   - Probability: 20%
   - Color: Yellow

   **Stage 3: Connected**
   - Name: Connected
   - Description: Had conversation, not yet qualified
   - Probability: 30%
   - Color: Orange

   **Stage 4: Qualified**
   - Name: Qualified
   - Description: Meets BANT criteria (Budget, Authority, Need, Timeline)
   - Probability: 50%
   - Color: Light Green

   **Stage 5: Appointment Scheduled**
   - Name: Appointment Scheduled
   - Description: Meeting booked
   - Probability: 70%
   - Color: Green

   **Stage 6: Appointment Complete**
   - Name: Appointment Complete
   - Description: Meeting held, proposal pending
   - Probability: 80%
   - Color: Dark Green

   **Stage 7: Proposal Sent**
   - Name: Proposal Sent
   - Description: Awaiting decision
   - Probability: 85%
   - Color: Blue

   **Stage 8: Closed Won** 🎉
   - Name: Closed Won
   - Description: Deal closed, contract signed
   - Probability: 100%
   - Color: Dark Blue

   **Stage 9: Closed Lost** ❌
   - Name: Closed Lost
   - Description: Deal did not close
   - Probability: 0%
   - Color: Red

4. **Customize Card Fields**
   - In pipeline settings, click "Customize Cards"
   - Show on cards:
     - Contact name
     - Company name
     - Phone number
     - Pipeline stage
     - Last activity
     - Tags

5. **Test the Pipeline**
   - Create test opportunity
   - Move it through each stage
   - Verify it works

---

## PART 3: CREATE LEAD CAPTURE FORM (20 min)

### Step-by-Step

1. **Navigate to Forms**
   - Left sidebar → "Sites" → "Forms"
   
2. **Create New Form**
   - Click "+ Create Form"
   - Name: "SEO Audit Request"

3. **Add Form Fields (DRAG AND DROP in this order)**

   **Field 1: First Name**
   - Type: Single Input
   - Label: First Name
   - Placeholder: John
   - Required: ✅ YES

   **Field 2: Last Name**
   - Type: Single Input
   - Label: Last Name
   - Placeholder: Smith
   - Required: ✅ YES

   **Field 3: Email**
   - Type: Email
   - Label: Email Address
   - Placeholder: john@company.com
   - Required: ✅ YES

   **Field 4: Phone**
   - Type: Phone
   - Label: Phone Number
   - Placeholder: (805) 555-1234
   - Required: ✅ YES

   **Field 5: Company Name**
   - Type: Single Input
   - Label: Company Name
   - Placeholder: ABC HVAC
   - Required: ✅ YES

   **Field 6: Website**
   - Type: Website URL
   - Label: Website (if you have one)
   - Placeholder: www.example.com
   - Required: ❌ NO

   **Field 7: Industry**
   - Type: Dropdown
   - Label: What industry are you in?
   - Options:
     * HVAC / Heating & Cooling
     * Plumbing
     * Roofing
     * Solar
     * Appliance Repair
     * Electrical
     * Other Home Services
     * Legal
     * Medical / Dental
     * Other
   - Required: ✅ YES

   **Field 8: Business Type**
   - Type: Radio Buttons
   - Label: Business Type
   - Options:
     * Residential services
     * Commercial services
     * Both
   - Required: ✅ YES

   **Field 9: Current Marketing**
   - Type: Multi-select
   - Label: What marketing are you currently using? (Select all)
   - Options:
     * Google Ads
     * Facebook Ads
     * Website only
     * Referrals only
     * Yelp / HomeAdvisor
     * Nothing right now
   - Required: ❌ NO

4. **Form Settings**
   
   **Submission Actions:**
   - Click "Settings" in form builder
   - Under "Submit Actions":

   **Action 1: Create Contact**
   - Enable: ✅ Create new contact
   - Tag: "Lead - New", "Web Form", "[Industry from form]"

   **Action 2: Create Opportunity**
   - Enable: ✅ Create opportunity
   - Pipeline: "Sales Funnel"
   - Stage: "Lead"
   - Assigned to: Auto-assign (round robin) or Manual (you assign to Sal)
   
   **For now: Set to Manual** ← You assign to Sal

   **Action 3: Send Email Notification**
   - Enable: ✅
   - To: vasquez.salvador.jr@gmail.com
   - Subject: "New SEO Audit Lead - {{contact.first_name}} {{contact.last_name}}"
   - Body:
   ```
   New lead submitted the SEO audit form:
   
   Name: {{contact.first_name}} {{contact.last_name}}
   Company: {{contact.company_name}}
   Phone: {{contact.phone}}
   Email: {{contact.email}}
   Industry: {{industry}}
   
   View in GHL: [link to contact]
   
   Call them ASAP!
   ```

   **Action 4: Send Email to Lead**
   - Enable: ✅
   - To: {{contact.email}}
   - Subject: "We received your SEO audit request"
   - Body: Use follow-up sequence Email #1 (see email-sequences.md)

   **Action 5: Redirect**
   - Enable: ✅
   - URL: "Thank You" page (create simple page that says "Thanks! We'll be in touch within 24 hours")

5. **Get Form Embed Code**
   - Click "Publish" or "Get Code"
   - Copy embed code
   - You'll paste this into your website/blog pages

---

## PART 4: CREATE AUTOMATION WORKFLOWS (30 min)

### Workflow 1: New Lead Nurture (Email Sequence)

1. **Navigate to Automation**
   - Left sidebar → "Automation"
   
2. **Create New Workflow**
   - Click "+ Create Workflow"
   - Name: "New Lead Nurture - 7 Days"

3. **Set Trigger**
   - Trigger: "Tag"
   - Tag: "Lead - New"
   - Condition: Tag added

4. **Build the Sequence (DRAG AND DROP)**

   **Step 1: Wait 0 minutes (immediate)**
   - Add "Wait" step
   - Duration: 0 minutes
   
   **Step 2: Send Email 1 (Welcome)**
   - Add "Send Email" step
   - Template: Email 1 from sequences file
   - To: {{contact.email}}
   - From: Your email

   **Step 3: Wait 1 day**
   - Add "Wait" step
   - Duration: 1 day

   **Step 4: Send Email 2 (Audit Complete)**
   - Add "Send Email" step
   - Template: Email 2

   **Step 5: Wait 2 days**
   - Add "Wait" step
   - Duration: 2 days

   **Step 6: Send Email 3 (Value Add)**
   - Add "Send Email" step
   - Template: Email 3

   **Continue pattern...**
   - Day 4: Wait 1 day → Email 4
   - Day 7: Wait 3 days → Email 5
   - Day 10: Wait 3 days → Email 6
   - Day 14: Wait 4 days → Email 7

5. **Add Exit Conditions**
   - "If/Else" step after each email
   - If: Appointment booked → Remove from workflow
   - If: Replied → Tag "Engaged" and notify Sal

6. **Turn On Workflow**
   - Toggle: Enable

---

### Workflow 2: No-Show Follow-Up

1. **Create New Workflow**
   - Name: "No-Show Re-engagement"

2. **Set Trigger**
   - Trigger: "Tag"
   - Tag: "No Show"

3. **Build Sequence**
   - Wait 0 min → Send Email 1 (Sorry we missed you)
   - Wait 2 days → Send Email 2 (Rescheduling)
   - Wait 2 days → Send Email 3 (Last attempt)

4. **Add SMS Fallback**
   - Wait 1 hour after each email
   - If: Email not opened → Send SMS

---

## PART 5: SET UP LEAD ASSIGNMENT (10 min)

### Manual Assignment (Recommended for Week 1)

1. **When new form comes in:**
   - You get email notification
   - You review the lead
   - You assign to Sal in GHL

2. **How to assign:**
   - Go to Opportunities
   - Find the new lead
   - Click on it
   - "Assigned to" dropdown → Select "Sal Vasquez"
   - Save

3. **Tag the lead**
   - Add tag: "Assigned to Sal"
   - Add tag: "[Industry]" (e.g., "HVAC", "Plumbing")

### Auto-Assignment (Set up after Week 1)

Once you know what works:
- Round robin between you and Sal
- Or: Assign all home services to Sal
- Or: Assign by location

---

## PART 6: TEST EVERYTHING (15 min)

### Test Checklist

- [ ] **Test Form Submission**
  1. Go to your website/blog
  2. Find the form
  3. Fill it out with test data
  4. Submit
  5. Check: Do you get email notification?
  6. Check: Does contact appear in GHL?
  7. Check: Is it tagged correctly?

- [ ] **Test Pipeline Movement**
  1. Find the test contact in Opportunities
  2. Drag it through each stage
  3. Verify stages work correctly

- [ ] **Test Email Automation**
  1. Tag a test contact: "Lead - New"
  2. Wait a few minutes
  3. Check: Did welcome email send?

- [ ] **Test Sal's Access**
  1. Login as Sal
  2. Verify he can see pipeline
  3. Verify he can edit his opportunities
  4. Verify he CAN'T see billing/settings

---

## PART 7: CREATE LEAD LIST FOR SAL (15 min)

### Where to Find Leads

1. **Google Maps Search**
   - Search: "HVAC Ventura"
   - Look at Google Business Profiles
   - Find companies with:
     * Few or no reviews
     * Basic/no website
     * Incomplete GBP
     * Old photos

2. **HomeAdvisor / Thumbtack**
   - Search for HVAC/plumbers
   - Look for companies with basic profiles

3. **Yelp**
   - Search by city + service
   - Find 2-3 star companies struggling

4. **Your Network**
   - Ask friends/family who they use
   - Check local business directories

### How to Add to GHL

1. **Manually create contacts:**
   - Contacts → + Add Contact
   - Name, Company, Phone, Email
   - Tag: "Cold Lead", "[Industry]"
   - Source: "Google Maps"

2. **Or import CSV:**
   - Create spreadsheet:
     * Column A: First Name
     * Column B: Last Name
     * Column C: Company
     * Column D: Phone
     * Column E: Email (if found)
     * Column F: Industry
   - Contacts → Import
   - Map columns
   - Import

### Target: 20 Leads for Monday

| Company Name | City | Industry | Phone | Source |
|--------------|------|----------|-------|--------|
| ABC HVAC | Ventura | HVAC | ###-#### | Google Maps |
| [List here] | | | | |

---

## PART 8: DOCUMENTS SAL NEEDS ACCESS TO

### Share These Files with Sal (Sunday night)

Create shared folder (Dropbox, Google Drive, or email):

1. **sal-final-onboarding-packet.md**
   - His complete guide

2. **commission-tracking-sheet.md**
   - His tracking spreadsheet

3. **proposal-template.md**
   - Template for sending proposals

4. **email-sequences.md**
   - For reference (he doesn't need to memorize)

5. **Pricing card**
   - Create simple one-page:
   ```
   Essentials: $1,250 + $197/mo
   Growth: $1,995 + $297/mo ← SELL THIS
   Pro: $2,995 + $497/mo
   Sal's commission: 50% of setup
   ```

---

## 🚨 TROUBLESHOOTING

### Common Issues

**"Sal can't see the pipeline"**
→ Check his permissions → Make sure "Opportunities" is enabled

**"Form submissions not creating contacts"**
→ Check Submit Actions → Is "Create Contact" enabled?

**"Emails not sending"**
→ Check email settings in GHL
→ Verify SMTP/email provider connected

**"Sal can't login"**
→ Check email invitation → May need to reset password
→ Check he's using correct subdomain URL

**"Workflow not triggering"**
→ Make sure workflow is TURNED ON
→ Check trigger conditions match

---

## ✅ COMPLETION CHECKLIST

Before you go to bed Sunday:

- [ ] Sal's user account created and tested
- [ ] Pipeline created with all 9 stages
- [ ] Lead capture form created and embedded on site
- [ ] Email automation workflow created (at least welcome email)
- [ ] Test form submission (you get notification)
- [ ] 20 leads added to GHL for Sal
- [ ] Sal confirmed: Monday 9 AM kickoff
- [ ] Shared folder created with Sal's docs

**All done? You're ready to launch Monday.**

---

## 🚀 MONDAY LAUNCH SEQUENCE

**8:45 AM:** You login to GHL, review overnight leads  
**9:00 AM:** Kickoff call with Sal (30 min)  
**9:30 AM:** Assign Sal's first leads  
**10:00 AM:** Sal starts calling  
**4:00 PM:** Check-in call with Sal  
**Evening:** Review Day 1, plan Day 2

**You're building a sales machine. Let's go.**

---

*Guide created: February 13, 2026*  
*Time to complete: 2-3 hours*  
*Difficulty: Medium (just follow steps)*  
*Status: READY FOR EXECUTION*
