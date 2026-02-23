# Vercel Token Setup Guide
## Enable Automatic Deployments

---

## 🎯 GOAL
**Create a Vercel token that I can use to deploy your site automatically**

---

## ✅ METHOD 1: Web Dashboard (Recommended)

### Step 1: Go to Vercel Dashboard
```
https://vercel.com/dashboard/tokens
```

### Step 2: Create New Token
1. Click **"Create Token"**
2. **Token Name:** `Johnny5-AutoDeploy`
3. **Scope:** Select your personal account
4. **Projects:** Select `rankingsb-web` (or all projects)
5. **Expiration:** 1 year (or never)
6. Click **"Create Token"**

### Step 3: Copy Token
The token will look like:
```
bF7x...9mK2  (long string of letters/numbers)
```

**⚠️ COPY IT NOW** — you can't see it again!

### Step 4: Give Token to Me
Paste the token here in this chat.

---

## ✅ METHOD 2: Environment Variable Setup (Most Secure)

### Step 1: Create Token (as above)

### Step 2: Add to Your Shell
```bash
# Add to ~/.zshrc
echo 'export VERCEL_TOKEN=your_token_here' >> ~/.zshrc
source ~/.zshrc
```

### Step 3: I Can Now Deploy
Once set, I can run:
```bash
vercel --prod --token=$VERCEL_TOKEN
```

---

## ✅ METHOD 3: Project-Level Token

### Step 1: Link Project
```bash
cd /Users/rubenruiz/.openclaw/workspace/projects/rankingsb/web/my-app
vercel link
# Select your rankingsb-web project
```

### Step 2: Get Project Token
```bash
# This creates local auth
vercel
```

### Step 3: Store Credentials
Vercel stores auth in:
- `~/.vercel/auth.json` (global)
- `.vercel/project.json` (local to project)

---

## 🔒 SECURITY NOTES

**Token Permissions:**
- ✅ Deploy projects
- ✅ View project settings
- ❌ Delete projects
- ❌ Access billing
- ❌ Manage team

**Best Practice:**
- Use project-specific tokens (not full account)
- Set expiration (1 year max)
- Rotate tokens annually
- Store in environment variables

---

## 🚀 ONCE TOKEN IS SET

### I Can Then:
1. **Auto-deploy on every commit**
2. **Deploy anytime you say "deploy website"**
3. **Create preview deployments for testing**
4. **Rollback to previous versions**

### Commands I'll Use:
```bash
# Production deploy
vercel --prod --token=$VERCEL_TOKEN

# Preview deploy (for testing)
vercel --token=$VERCEL_TOKEN

# With specific project
vercel --prod --token=$VERCEL_TOKEN --scope=your-username
```

---

## 🧪 TEST THE TOKEN

After you give me the token, I'll verify it works:

```bash
# Check token is valid
vercel whoami --token=YOUR_TOKEN

# Should output: your username

# Test deploy
vercel --prod --token=YOUR_TOKEN
```

---

## 📋 ALTERNATIVE: GitHub Integration (Best Long-Term)

Instead of tokens, connect GitHub:

1. Push this repo to GitHub
2. Vercel dashboard → **Add New Project**
3. **Import Git Repository**
4. Select your repo
5. Vercel auto-deploys on every push

**Benefits:**
- No tokens needed
- Deploys on every commit automatically
- Preview deployments for PRs
- Rollback via Git

---

## 🎯 QUICK START

**Right now, do this:**

1. Open https://vercel.com/dashboard/tokens
2. Click "Create Token"
3. Name: `Johnny5-AutoDeploy`
4. Copy the token
5. **Paste it in this chat**

**Then I can deploy immediately.**

---

*Ready for your token.*
