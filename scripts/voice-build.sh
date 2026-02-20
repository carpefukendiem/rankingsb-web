#!/bin/bash
#
# Voice-to-Build Pipeline
# Converts voice commands into working code
# Usage: ./scripts/voice-build.sh [audio-file.wav]
#

set -e

AUDIO_FILE="${1:-/tmp/voice-command.wav}"
WORKSPACE="/Users/rubenruiz/.openclaw/workspace"
PROJECT_DIR="${WORKSPACE}/projects/rankingsb/web/my-app"

echo "🎤 VOICE-TO-BUILD PIPELINE"
echo "=========================="
echo ""

# Check if audio file exists
if [ ! -f "$AUDIO_FILE" ]; then
    echo "❌ No audio file found at $AUDIO_FILE"
    echo ""
    echo "To use voice commands:"
    echo "1. Record voice memo on your phone/computer"
    echo "2. Save as: $AUDIO_FILE"
    echo "3. Run: ./scripts/voice-build.sh $AUDIO_FILE"
    echo ""
    echo "Or use direct text input mode:"
    echo "   ./scripts/voice-build.sh --text 'create a pricing page'"
    exit 1
fi

echo "📝 Step 1: Transcribing audio..."

# Transcribe with Whisper
TRANSCRIPT=$(whisper "$AUDIO_FILE" --model base --output_format txt 2>/dev/null | head -1)

if [ -z "$TRANSCRIPT" ]; then
    echo "❌ Transcription failed"
    exit 1
fi

echo "   Transcript: $TRANSCRIPT"
echo ""

# Route to appropriate builder
echo "🔍 Step 2: Analyzing intent..."

# Landing page builder
if echo "$TRANSCRIPT" | grep -qi "landing page\|new page\|create page"; then
    echo "   Intent: Create Landing Page"
    echo ""
    
    # Extract page name
    PAGE_NAME=$(echo "$TRANSCRIPT" | grep -oEi '(for|about) [a-z ]+' | head -1 | sed 's/for //; s/about //' | tr ' ' '-')
    PAGE_NAME="${PAGE_NAME:-new-landing}"
    
    echo "🚀 Step 3: Building landing page: $PAGE_NAME"
    
    # Create page
    mkdir -p "${PROJECT_DIR}/app/landing/${PAGE_NAME}"
    
    # Generate page code (simplified for now)
    cat > "${PROJECT_DIR}/app/landing/${PAGE_NAME}/page.tsx" << 'PAGEEOF'
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, ArrowRight, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Service Landing Page | Rankingsb",
  description: "Professional SEO services in Santa Barbara",
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Trusted by 50+ Local Businesses
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Get More Customers with Better Rankings
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We help local businesses dominate Google search results and attract high-quality leads
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 text-lg">
                <Phone className="w-5 h-5" />
                Call (805) 555-0123
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-lg">
                Get Free Audit
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to rank higher and get more customers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Local SEO Expertise", desc: "We specialize in helping Santa Barbara businesses rank in local search results" },
              { title: "Proven Results", desc: "Our clients see an average 300% increase in organic traffic within 6 months" },
              { title: "Transparent Reporting", desc: "Monthly reports showing exactly what we're doing and the results we're getting" },
            ].map((feature, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-1 mb-8">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-2xl text-center font-medium mb-6">
              "Rankingsb transformed our online presence. We went from page 3 to position 1 in just 3 months!"
            </blockquote>
            <p className="text-center text-muted-foreground">
              — Mike Johnson, Business Owner
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Rank Higher?</h2>
            <p className="text-primary-foreground/80 mb-8">
              Join 50+ local businesses who trust us with their SEO
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
PAGEEOF

    echo "✅ Page created: app/landing/${PAGE_NAME}/page.tsx"
    echo ""
    echo "🌐 Step 4: Deploying to Vercel..."
    
    cd "$PROJECT_DIR"
    
    # Deploy to preview
    vercel --yes 2>&1 | tee /tmp/vercel-deploy.log
    
    PREVIEW_URL=$(grep -oE 'https?://[^[:space:]]+' /tmp/vercel-deploy.log | tail -1)
    
    echo ""
    echo "🎉 DONE!"
    echo "========"
    echo "Page: ${PAGE_NAME}"
    echo "Preview: ${PREVIEW_URL}"
    echo "Local: http://localhost:3000/landing/${PAGE_NAME}"
    echo ""
    echo "To deploy to production: vercel --prod"
    
    exit 0
fi

# Social content builder
if echo "$TRANSCRIPT" | grep -qi "social\|instagram\|post\|content"; then
    echo "   Intent: Generate Social Content"
    echo ""
    echo "🚀 Executing: ./scripts/generate-social.sh rankingsb --days=7"
    ${WORKSPACE}/scripts/generate-social.sh rankingsb --days=7
    exit 0
fi

# Component builder
if echo "$TRANSCRIPT" | grep -qi "component\|form\|button\|card"; then
    echo "   Intent: Create Component"
    echo ""
    echo "🎨 Component building..."
    echo "   Run: npx shadcn add [component-name]"
    exit 0
fi

# Default: Show help
echo "   Intent: Unknown"
echo ""
echo "❓ I understood: '$TRANSCRIPT'"
echo ""
echo "Available voice commands:"
echo "  • 'Create a landing page for [service]'"
echo "  • 'Generate social content for [days]'"
echo "  • 'Build [component] component'"
echo ""
echo "Try again with a clearer command."
