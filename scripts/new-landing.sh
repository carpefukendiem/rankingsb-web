#!/bin/bash
#
# Quick Landing Page Generator
# Usage: ./scripts/new-landing.sh --name="electrician-seo" --template=service-v1
#

set -e

# Parse arguments
NAME=""
TEMPLATE="service-v1"
BRAND="rankingsb"

while [[ $# -gt 0 ]]; do
  case $1 in
    --name)
      NAME="$2"
      shift 2
      ;;
    --template)
      TEMPLATE="$2"
      shift 2
      ;;
    --brand)
      BRAND="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

if [ -z "$NAME" ]; then
  echo "❌ Error: --name is required"
  echo "Usage: ./scripts/new-landing.sh --name=\"electrician-seo\" --template=service-v1"
  exit 1
fi

echo "🚀 Creating landing page: $NAME"
echo "   Template: $TEMPLATE"
echo "   Brand: $BRAND"

PROJECT_DIR="projects/$BRAND/web"
PAGE_DIR="$PROJECT_DIR/app/landing/$NAME"

# Create page directory
mkdir -p "$PAGE_DIR"

# Generate page from template
cat > "$PAGE_DIR/page.tsx" << 'EOF'
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Phone, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "{{TITLE}} | Rankingsb",
  description: "{{DESCRIPTION}}",
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {{HEADLINE}}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {{SUBHEADLINE}}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Phone className="w-4 h-4" />
                Call (805) 555-0123
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Get Free Audit
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {{FEATURES_HEADLINE}}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {{FEATURES}}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Ready to {{CTA_ACTION}}?
              </h2>
              <p className="text-muted-foreground mb-6">
                {{CTA_DESCRIPTION}}
              </p>
              <Button size="lg" className="w-full sm:w-auto">
                {{CTA_BUTTON}}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
EOF

echo "✅ Created: $PAGE_DIR/page.tsx"

# Create placeholder content file
mkdir -p "$PROJECT_DIR/content"
cat > "$PROJECT_DIR/content/$NAME.json" << EOF
{
  "title": "$NAME Landing Page",
  "headline": "Main Headline Here",
  "subheadline": "Subheadline that explains the value proposition",
  "features": [
    "Feature 1: Key benefit",
    "Feature 2: Key benefit", 
    "Feature 3: Key benefit"
  ],
  "cta": {
    "action": "get started",
    "description": "Call to action description",
    "button": "Get Started Now"
  }
}
EOF

echo "✅ Created: $PROJECT_DIR/content/$NAME.json"
echo ""
echo "📝 Next steps:"
echo "   1. Edit content: $PROJECT_DIR/content/$NAME.json"
echo "   2. Customize page: $PAGE_DIR/page.tsx"
echo "   3. Run dev server: cd $PROJECT_DIR && npm run dev"
echo "   4. View at: http://localhost:3000/landing/$NAME"
