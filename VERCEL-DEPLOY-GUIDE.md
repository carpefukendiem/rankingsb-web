# Vercel Deployment Guide

## 🚀 Deploy Your Rankingsb Website

### Option 1: Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd projects/rankingsb/web/my-app
vercel --prod
```

**Expected Output:**
```
? Set up and deploy "~/projects/rankingsb/web/my-app"? [Y/n] y
? Which scope do you want to deploy to? [your-account]
? Link to existing project? [y/N] n
? What's your project name? [my-app] rankingsb-web
✅ Production: https://rankingsb-web.vercel.app
```

---

### Option 2: GitHub Integration (Auto-Deploy)

1. Push this repo to GitHub:
```bash
git remote add origin https://github.com/rubenruiz/rankingsb-web.git
git push -u origin main
```

2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Set root directory: `projects/rankingsb/web/my-app`
5. Deploy!

**Auto-deploy:** Every push to `main` branch will auto-deploy.

---

### Option 3: Manual Upload

1. Build locally:
```bash
cd projects/rankingsb/web/my-app
npm run build
```

2. Go to https://vercel.com/new
3. Drag and drop the `.next` folder
4. Deploy!

---

## ⚙️ Environment Variables (if needed)

Set these in Vercel dashboard:

```
NEXT_PUBLIC_SITE_URL=https://rankingsb.com
NEXT_PUBLIC_GHL_LOCATION_ID=yrvzyq2jB2me4Z23PFxP
```

---

## 📁 Project Structure Deployed

```
projects/rankingsb/web/my-app/
├── app/
│   ├── layout.tsx          ✅ Root layout (metadata, themes)
│   ├── page.tsx            ✅ Homepage (hero, services, testimonials)
│   └── globals.css         ✅ Brand colors (#188bf6, #565a7c)
├── components/
│   ├── layout/
│   │   ├── Header.tsx      ✅ Navigation with mobile menu
│   │   └── Footer.tsx      ✅ Site footer
│   ├── ui/                 ✅ 42 shadcn components
│   └── theme-provider.tsx  ✅ Dark/light mode
├── lib/
│   └── utils.ts            ✅ Utility functions
├── public/                 ✅ Static assets
├── next.config.js          ✅ Vercel config
└── package.json            ✅ Dependencies
```

---

## 🎨 Brand Colors Applied

| Element | Color | Hex |
|---------|-------|-----|
| Primary (buttons) | Blue | #188bf6 |
| Text | Dark Gray | #565a7c |
| Background | White | #ffffff |
| Secondary | Light Gray | #f1f5f9 |
| Muted text | Gray | #6b7280 |

---

## ✅ Post-Deploy Checklist

- [ ] Homepage loads correctly
- [ ] Mobile responsive (test on phone)
- [ ] All buttons use #188bf6 blue
- [ ] Text is #565a7c dark gray
- [ ] Header navigation works
- [ ] Mobile menu toggles
- [ ] No console errors

---

## 🔄 Making Changes

After initial deploy:

```bash
# Edit files
cd projects/rankingsb/web/my-app

# Make changes to components

# Commit
git add -A
git commit -m "Update hero section"

# Deploy
vercel --prod
```

**With GitHub integration:** Just push to main → auto-deploys!

---

*Deploy ready: February 20, 2026*
