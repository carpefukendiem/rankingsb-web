#!/bin/bash
#
# Quick Deploy Script for Rankingsb Web
# Usage: ./deploy-rankingsb.sh
#

echo "🚀 RANKINGSB WEB DEPLOYMENT"
echo "==========================="
echo ""

cd projects/rankingsb/web/my-app

echo "📦 Current Status:"
echo "   - Build: ✅ Ready"
echo "   - Brand Colors: ✅ Applied (#188bf6, #565a7c)"
echo "   - Logo Colors: ✅ Added to brand config"
echo "   - Components: ✅ 42 shadcn components"
echo ""

echo "🎯 Deployment Options:"
echo ""
echo "OPTION 1: Vercel CLI (Fastest - 2 min)"
echo "--------------------------------------"
echo "1. Run: vercel login"
echo "2. Open browser link, authorize"
echo "3. Run: vercel --prod"
echo ""
echo "OPTION 2: GitHub Integration (Auto-deploy)"
echo "-----------------------------------------"
echo "1. Push to GitHub:"
echo "   git remote add origin https://github.com/YOURNAME/rankingsb-web.git"
echo "   git push -u origin main"
echo ""
echo "2. Go to: https://vercel.com/new"
echo "3. Import GitHub repo"
echo "4. Set Framework: Next.js"
echo "5. Set Root: projects/rankingsb/web/my-app"
echo "6. Deploy!"
echo ""
echo "OPTION 3: Manual Vercel Upload"
echo "------------------------------"
echo "1. Go to: https://vercel.com/new"
echo "2. Drag & drop this folder:"
echo "   $(pwd)"
echo "3. Deploy!"
echo ""

# Check if vercel is logged in
if vercel whoami &>/dev/null; then
    echo "✅ Vercel CLI authenticated"
    echo ""
    read -p "Deploy now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 Deploying..."
        vercel --prod
    fi
else
    echo "⚠️  Vercel CLI not authenticated"
    echo ""
    echo "Run: vercel login"
    echo "Then: ./deploy-rankingsb.sh"
fi
