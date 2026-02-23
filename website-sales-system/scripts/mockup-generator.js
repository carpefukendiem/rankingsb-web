/**
 * Website Sales System - Mockup Generator
 * Creates preview homepage mockups for prospects
 */

const fs = require('fs');
const path = require('path');

class MockupGenerator {
  constructor() {
    this.mockupsDir = path.join(__dirname, '..', 'mockups');
    this.templatesDir = path.join(__dirname, '..', 'templates');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.mockupsDir)) {
      fs.mkdirSync(this.mockupsDir, { recursive: true });
    }
    if (!fs.existsSync(this.templatesDir)) {
      fs.mkdirSync(this.templatesDir, { recursive: true });
    }
  }

  /**
   * Generate color scheme based on business category
   */
  getColorScheme(category) {
    const schemes = {
      'Contractor': { primary: '#1e40af', secondary: '#f59e0b', accent: '#10b981' },
      'Home Services': { primary: '#059669', secondary: '#0ea5e9', accent: '#f97316' },
      'Restaurant': { primary: '#dc2626', secondary: '#fbbf24', accent: '#7c3aed' },
      'Retail': { primary: '#7c3aed', secondary: '#ec4899', accent: '#06b6d4' },
      'Professional': { primary: '#374151', secondary: '#6366f1', accent: '#14b8a6' },
      'Medical': { primary: '#0891b2', secondary: '#10b981', accent: '#6366f1' },
      'Automotive': { primary: '#ea580c', secondary: '#1e293b', accent: '#3b82f6' },
      'Other': { primary: '#4f46e5', secondary: '#06b6d4', accent: '#f59e0b' }
    };
    return schemes[category] || schemes['Other'];
  }

  /**
   * Generate business name variations
   */
  generateBusinessName(prospect) {
    const { city, category } = prospect;
    
    const prefixes = ['', 'Pro', 'Elite', 'Premier', 'Quality', 'Trusted', 'Local'];
    const suffixes = {
      'Contractor': ['HVAC', 'Plumbing', 'Electric', 'Roofing', 'Solar', 'Contractors', 'Services'],
      'Home Services': ['Cleaning', 'Landscaping', 'Pest Control', 'Home Services', 'Care'],
      'Restaurant': ['Kitchen', 'Bistro', 'Grill', 'Cafe', 'Eats'],
      'Retail': ['Shop', 'Store', 'Boutique', 'Goods', 'Market'],
      'Professional': ['Consulting', 'Services', 'Group', 'Solutions', 'Advisors'],
      'Medical': ['Care', 'Wellness', 'Health', 'Clinic', 'Center'],
      'Automotive': ['Auto', 'Motors', 'Car Care', 'Automotive', 'Service']
    };
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = (suffixes[category] || suffixes['Other'])[Math.floor(Math.random() * suffixes[category]?.length || 0)];
    
    if (prospect.businessName) return prospect.businessName;
    
    return prefix ? `${prefix} ${city} ${suffix}` : `${city} ${suffix}`;
  }

  /**
   * Generate homepage HTML
   */
  generateHomepage(prospect) {
    const colors = this.getColorScheme(prospect.category);
    const businessName = this.generateBusinessName(prospect);
    const tagline = this.generateTagline(prospect.category);
    const services = this.generateServices(prospect.category);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} | ${prospect.city}, CA</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    
    /* Header */
    header { background: ${colors.primary}; color: white; padding: 1rem 0; }
    header .container { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: bold; }
    nav a { color: white; text-decoration: none; margin-left: 2rem; }
    
    /* Hero */
    .hero { background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%); color: white; padding: 4rem 0; text-align: center; }
    .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
    .cta-button { display: inline-block; background: ${colors.accent}; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 1.1rem; }
    
    /* Services */
    .services { padding: 4rem 0; background: #f8fafc; }
    .services h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: ${colors.primary}; }
    .service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .service-card { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .service-card h3 { color: ${colors.primary}; margin-bottom: 1rem; }
    
    /* About */
    .about { padding: 4rem 0; }
    .about-content { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .about h2 { font-size: 2.5rem; margin-bottom: 1.5rem; color: ${colors.primary}; }
    
    /* CTA Section */
    .cta-section { background: ${colors.primary}; color: white; padding: 4rem 0; text-align: center; }
    .cta-section h2 { font-size: 2.5rem; margin-bottom: 1rem; }
    
    /* Footer */
    footer { background: #1e293b; color: white; padding: 2rem 0; text-align: center; }
    
    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem; }
      .about-content { grid-template-columns: 1fr; }
      nav { display: none; }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="logo">${businessName}</div>
      <nav>
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <section class="hero" id="home">
    <div class="container">
      <h1>${tagline}</h1>
      <p>Professional ${prospect.category.toLowerCase()} services in ${prospect.city}, California. Quality work, fair prices, satisfied customers.</p>
      <a href="#contact" class="cta-button">Get a Free Quote</a>
    </div>
  </section>

  <section class="services" id="services">
    <div class="container">
      <h2>Our Services</h2>
      <div class="service-grid">
        ${services.map(s => `
        <div class="service-card">
          <h3>${s.title}</h3>
          <p>${s.description}</p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="about" id="about">
    <div class="container">
      <div class="about-content">
        <div>
          <h2>About ${businessName}</h2>
          <p>We've been serving ${prospect.city} and surrounding areas for over 10 years. Our commitment to quality workmanship and customer satisfaction has made us the trusted choice for ${prospect.category.toLowerCase()} services.</p>
          <p>Licensed, insured, and dedicated to exceeding your expectations on every project.</p>
        </div>
        <div style="background: ${colors.secondary}; height: 300px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
          [Your Photo Here]
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section" id="contact">
    <div class="container">
      <h2>Ready to Get Started?</h2>
      <p>Contact us today for a free consultation and quote.</p>
      <a href="tel:805-XXX-XXXX" class="cta-button">Call Now: (805) XXX-XXXX</a>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; 2026 ${businessName}. All rights reserved. | ${prospect.city}, CA</p>
    </div>
  </footer>
</body>
</html>`;
  }

  generateTagline(category) {
    const taglines = {
      'Contractor': ['Building Trust, One Project at a Time', 'Quality Construction You Can Count On', 'Your Vision, Our Expertise'],
      'Home Services': ['Making Your Home Beautiful', 'Service You Can Trust', 'Your Home, Our Priority'],
      'Restaurant': ['Taste the Difference', 'Fresh. Local. Delicious.', 'Where Flavor Meets Quality'],
      'Retail': ['Find Your Style', 'Quality Products, Great Prices', 'Your Local Shopping Destination'],
      'Professional': ['Expertise You Can Trust', 'Solutions for Your Success', 'Professional Service, Personal Touch'],
      'Medical': ['Care You Can Count On', 'Your Health, Our Priority', 'Compassionate Medical Care'],
      'Automotive': ['Keeping You on the Road', 'Expert Auto Care', 'Service You Can Trust']
    };
    const options = taglines[category] || ['Quality Service You Can Trust'];
    return options[Math.floor(Math.random() * options.length)];
  }

  generateServices(category) {
    const serviceMap = {
      'Contractor': [
        { title: 'New Construction', description: 'Full-service construction for residential and commercial projects.' },
        { title: 'Renovations', description: 'Transform your space with our expert renovation services.' },
        { title: 'Repairs', description: 'Fast, reliable repairs to keep your property in top condition.' }
      ],
      'Home Services': [
        { title: 'Regular Maintenance', description: 'Scheduled services to keep your home looking its best.' },
        { title: 'Deep Cleaning', description: 'Thorough cleaning services for special occasions or seasonal needs.' },
        { title: 'Emergency Service', description: 'Available when you need us most. Quick response times.' }
      ],
      'Restaurant': [
        { title: 'Dine-In', description: 'Enjoy our comfortable atmosphere and exceptional service.' },
        { title: 'Takeout', description: 'Call ahead and pick up your favorite dishes to go.' },
        { title: 'Catering', description: 'Let us handle the food for your next event or celebration.' }
      ],
      'Retail': [
        { title: 'In-Store Shopping', description: 'Browse our carefully curated selection in person.' },
        { title: 'Personal Styling', description: 'Get expert advice to find the perfect items for you.' },
        { title: 'Gift Services', description: 'Gift wrapping and registry services available.' }
      ],
      'Professional': [
        { title: 'Consultation', description: 'Expert advice tailored to your specific needs and goals.' },
        { title: 'Ongoing Support', description: 'Long-term partnership to ensure your continued success.' },
        { title: 'Specialized Services', description: 'Customized solutions for complex requirements.' }
      ],
      'Medical': [
        { title: 'Preventive Care', description: 'Regular checkups and screenings to maintain your health.' },
        { title: 'Treatment', description: 'Expert care using the latest techniques and technology.' },
        { title: 'Patient Education', description: 'Helping you understand and manage your health.' }
      ],
      'Automotive': [
        { title: 'Maintenance', description: 'Regular service to keep your vehicle running smoothly.' },
        { title: 'Repairs', description: 'Expert diagnostics and repairs for all makes and models.' },
        { title: 'Detailing', description: 'Interior and exterior detailing to make your car look new.' }
      ]
    };
    
    return serviceMap[category] || serviceMap['Professional'];
  }

  /**
   * Create mockup for a prospect
   */
  createMockup(prospect) {
    const html = this.generateHomepage(prospect);
    const businessSlug = this.generateBusinessName(prospect).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `${prospect.id}_${businessSlug}.html`;
    const filepath = path.join(this.mockupsDir, filename);
    
    fs.writeFileSync(filepath, html);
    
    return {
      prospectId: prospect.id,
      mockupPath: filepath,
      previewUrl: `https://previews.rankingsb.com/${businessSlug}`,
      businessName: this.generateBusinessName(prospect),
      businessSlug,
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Get all mockups
   */
  getAllMockups() {
    const files = fs.readdirSync(this.mockupsDir);
    return files
      .filter(f => f.endsWith('.html'))
      .map(f => ({
        filename: f,
        path: path.join(this.mockupsDir, f),
        created: fs.statSync(path.join(this.mockupsDir, f)).mtime
      }));
  }
}

module.exports = MockupGenerator;

// CLI usage
if (require.main === module) {
  const generator = new MockupGenerator();
  
  if (process.argv[2] === 'list') {
    console.log(JSON.stringify(generator.getAllMockups(), null, 2));
  } else {
    // Demo mockup
    const demoProspect = {
      id: 'demo_001',
      city: 'Santa Barbara',
      category: 'Contractor',
      query: 'Santa Barbara HVAC contractor'
    };
    
    const mockup = generator.createMockup(demoProspect);
    console.log('Mockup created:', mockup);
  }
}
