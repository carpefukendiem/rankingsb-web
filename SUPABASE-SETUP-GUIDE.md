# Supabase + GHL Setup Guide
## Complete Setup for Conversation Memory & Contact Backend

---

## PART 1: Supabase Setup (Conversation Memory)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login with your email
3. Click "New Project"
4. **Organization:** Create or select yours
5. **Project Name:** `johnny5-memory`
6. **Database Password:** Generate a strong password (save it!)
7. **Region:** US West (N. California) - closest to Santa Barbara
8. Click "Create New Project" (takes ~2 minutes)

### Step 2: Get Your Credentials
Once project is created:

1. **Project URL:**
   - Go to Project Settings → API
   - Copy "Project URL" (looks like: `https://abcdefgh12345678.supabase.co`)

2. **Service Role Key:**
   - In same API section, copy "service_role" key (NOT the anon key)
   - This key has full database access - keep it secret!

3. **Database Password:**
   - This is the password you set when creating the project

### Step 3: Run the Schema
1. In Supabase dashboard, go to "SQL Editor" (left sidebar)
2. Click "New Query"
3. Open the file: `config/supabase-schema.sql` (from this workspace)
4. Copy the entire contents
5. Paste into SQL Editor
6. Click "Run"
7. You should see: "Johnny 5 Memory Schema Created Successfully!"

### Step 4: Update Environment Variables
Edit `/Users/rubenruiz/.openclaw/workspace/.env`:

```bash
SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]
SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
```

Also add to your shell:
```bash
echo 'export SUPABASE_URL=https://[YOUR-PROJECT].supabase.co' >> ~/.zshrc
echo 'export SUPABASE_SERVICE_ROLE_KEY=[YOUR-KEY]' >> ~/.zshrc
source ~/.zshrc
```

### Step 5: Install Dependencies
```bash
cd /Users/rubenruiz/.openclaw/workspace
npm install
```

### Step 6: Test the Connection
```bash
npm run test:memory
```

You should see:
```
✅ ALL TESTS PASSED!
Your Supabase memory system is working correctly.
```

---

## PART 2: GHL Contact Form Backend

### Current Status
✅ **GHL API Key:** Already configured in `.env`
✅ **Location ID:** Already configured (`yrvzyq2jB2me4Z23PFxP`)
✅ **API Route:** Created at `pages/api/contact.js`

### How It Works
1. Visitor fills contact form on your website
2. Form POSTs to `/api/contact`
3. Backend creates contact in GHL Rankingsb location
4. Contact is auto-tagged as "Website Lead"
5. Optional: Contact added to pipeline
6. Optional: Discord notification sent

### Testing the Contact Form
```bash
cd /Users/rubenruiz/.openclaw/workspace
node lib/ghl-contact-backend.js
```

This validates your GHL configuration.

### Integration with Website
Your contact form should POST to `/api/contact` with this JSON:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "805-555-0123",
  "company": "ABC Corp",
  "message": "I need SEO help for my business"
}
```

### Adding to Pipeline (Optional)
To auto-add contacts to your sales pipeline:

1. In GHL, go to Opportunities → Pipelines
2. Copy your Pipeline ID from URL
3. Add to `.env`:
   ```
   GHL_PIPELINE_ID=your-pipeline-id
   GHL_PIPELINE_STAGE_ID=targeted
   ```

---

## PART 3: How Memory Works (For You)

### Before Every Response, I Will:

1. **Check Supabase** for our conversation history
2. **Load session context** (your preferences, key facts, previous decisions)
3. **Search relevant** past conversations if needed
4. **Reference** what we've discussed before answering

### What Gets Stored:
- Every message you send
- Every response I give
- Key facts you tell me (business details, preferences, decisions)
- Summaries of long conversations
- Your custom instructions and settings

### You Can Ask Me:
- "What did we decide about pricing last week?"
- "Show me our conversation about Sal from February 17"
- "What was my website URL again?"
- "Summarize everything we've done this month"

### Privacy:
- Data is stored in YOUR Supabase project
- You own and control all data
- Can export/delete anytime
- Not shared with any third parties

---

## Troubleshooting

### "Cannot connect to Supabase"
- Check that SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set
- Make sure there's no trailing slash in URL
- Verify service role key (not anon key)

### "Table doesn't exist"
- Run the schema SQL in Supabase SQL Editor
- Check for error messages in SQL output

### "GHL contact not created"
- Verify GHL_API_KEY is current
- Check that location ID is correct
- Ensure API key has contact write permissions

---

## Quick Reference

| File | Purpose |
|------|---------|
| `lib/conversation-memory.js` | Memory system core |
| `lib/ghl-contact-backend.js` | Contact form handler |
| `config/supabase-schema.sql` | Database setup |
| `scripts/test-memory.js` | Test script |
| `pages/api/contact.js` | Next.js API route |

---

**Next Steps:**
1. ⬜ Create Supabase project (5 min)
2. ⬜ Run schema SQL (2 min)
3. ⬜ Update .env with credentials (2 min)
4. ⬜ Run `npm install` (1 min)
5. ⬜ Run `npm run test:memory` (1 min)
6. ⬜ Test contact form endpoint (1 min)

**Total time: ~15 minutes**

Once done, I will NEVER forget our conversations again.

---

*Setup Guide Created: February 22, 2026*
