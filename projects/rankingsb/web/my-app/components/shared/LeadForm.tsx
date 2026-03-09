"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Loader2 } from "lucide-react"

interface LeadFormProps {
  source: string
  showIndustry?: boolean
  showWebsite?: boolean
  showMessage?: boolean
  buttonText?: string
  className?: string
}

export function LeadForm({
  source,
  showIndustry = true,
  showWebsite = true,
  showMessage = false,
  buttonText = "Get My Free SEO Audit",
  className = "",
}: LeadFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mountTime, setMountTime] = useState<number | null>(null)

  useEffect(() => {
    setMountTime(Date.now())
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    data.source = source
    data._t = mountTime ? String(mountTime) : ""

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      // Always redirect — even if API had issues, we don't want to block the user
      router.push("/thank-you")
    } catch {
      // Still redirect — fail silently for user experience
      router.push("/thank-you")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Honeypot — invisible to humans, filled by bots */}
      <input name="_hp" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Your Name *</label>
        <Input name="name" placeholder="John Smith" className="h-12" required />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Business Name *</label>
        <Input name="business" placeholder="Your Business LLC" className="h-12" required />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Email Address *</label>
        <Input type="email" name="email" placeholder="john@yourbusiness.com" className="h-12" required />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Phone Number *</label>
        <Input type="tel" name="phone" placeholder="(805) 555-0123" className="h-12" required />
      </div>
      {showWebsite && (
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">Website URL</label>
          <Input name="website" placeholder="https://yourbusiness.com" className="h-12" />
        </div>
      )}
      {showIndustry && (
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">Industry</label>
          <select name="industry" className="w-full h-12 px-3 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select your industry</option>
            <option value="electrician">Electrician</option>
            <option value="hvac">HVAC / Heating & Cooling</option>
            <option value="plumber">Plumber</option>
            <option value="roofer">Roofing</option>
            <option value="solar">Solar</option>
            <option value="attorney">Attorney / Law Firm</option>
            <option value="dental">Dental</option>
            <option value="medical">Medical Practice</option>
            <option value="real-estate">Real Estate</option>
            <option value="restaurant">Restaurant</option>
            <option value="contractor">General Contractor</option>
            <option value="winery">Winery / Wine Bar</option>
            <option value="spa-beauty">Spa / Beauty Salon</option>
            <option value="pest-control">Pest Control</option>
            <option value="landscaping">Landscaping</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}
      {showMessage && (
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">Message</label>
          <textarea
            name="message"
            placeholder="Tell us about your business and goals..."
            className="w-full px-3 py-3 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 mt-2">
        {loading ? (
          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
        ) : (
          <>{buttonText}<ArrowRight className="w-5 h-5 ml-2" /></>
        )}
      </Button>
      <p className="text-xs text-slate-400 text-center">No spam, ever. We respect your privacy.</p>
    </form>
  )
}
