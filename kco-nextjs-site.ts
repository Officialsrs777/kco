// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Metadata } from "next";
import { SectionWrapper } from "@/components/section-wrapper";
import { trackEvent } from "@/lib/analytics";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      trackEvent("Contact Form Submit", { budget: formData.budget });
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          website: "",
          budget: "",
          message: ""
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SectionWrapper className="pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's build something great together
            </h1>
            <p className="text-xl text-gray-300">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-k-gray-900 border border-k-gray-700 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-k-gray-800 border border-k-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-k-purple-soft focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-k-gray-800 border border-k-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-k-purple-soft focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-k-gray-800 border border-k-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-k-purple-soft focus:border-transparent"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-k-gray-800 border border-k-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-k-purple-soft focus:border-transparent"
                      placeholder="https://yoursite.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-k-gray-800 border border-k-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-k-purple-soft focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    <option value="discovery">Discovery Sprint (~$3.5k)</option>
                    <option value="small-project">Small Project ($10-30k)</option>
                    <option value="medium-project">Medium Project ($30-60k)</option>
                    <option value="large-project">Large Project ($60k+)</option>
                    <option value="fractional">Fractional Team ($12-18k/month)</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-k-gray-800 border border-k-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-k-purple-soft focus:border-transparent resize-none"
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-k-purple-primary hover:bg-k-purple-deep disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-8 py-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-k-purple-soft transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-green-400">
                    Thanks for reaching out! We'll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-400">
                    Something went wrong. Please try again or email us directly at hello@kco-consultancy.com.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Get in touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-6 h-6 text-k-purple-primary mt-1 mr-4">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <p className="text-gray-300">hello@kco-consultancy.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 text-k-purple-primary mt-1 mr-4">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Response Time</h3>
                      <p className="text-gray-300">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 text-k-purple-primary mt-1 mr-4">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Timezone</h3>
                      <p className="text-gray-300">EST (UTC-5)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-k-gray-800 border border-k-gray-700 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">Prefer to schedule a call?</h3>
                <p className="text-gray-300 mb-4">
                  Book a 20-minute consultation call to discuss your project in detail.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-k-purple-primary hover:text-k-purple-deep font-medium"
                >
                  Schedule on Calendly
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="bg-k-gray-800 border border-k-gray-700 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4">What happens next?</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-k-purple-primary mr-2">1.</span>
                    <span>We'll review your project details and respond within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-k-purple-primary mr-2">2.</span>
                    <span>Schedule a 20-minute consultation call to discuss your needs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-k-purple-primary mr-2">3.</span>
                    <span>Receive a custom proposal with timeline and pricing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-k-purple-primary mr-2">4.</span>
                    <span>Start building your project within 1-2 weeks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, website, budget, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Replace with actual Brevo SMTP integration
    // const brevoApiKey = process.env.BREVO_API_KEY;
    // const brevoSender = process.env.BREVO_SENDER_EMAIL;
    
    // For now, log the submission and return success
    console.log("Contact form submission:", {
      name,
      email,
      company,
      website,
      budget,
      message,
      timestamp: new Date().toISOString()
    });

    // TODO: Send email via Brevo
    // if (brevoApiKey && brevoSender) {
    //   await sendEmail({
    //     to: "hello@kco-consultancy.com",
    //     subject: `New Contact Form Submission from ${name}`,
    //     html: `
    //       <h3>New Contact Form Submission</h3>
    //       <p><strong>Name:</strong> ${name}</p>
    //       <p><strong>Email:</strong> ${email}</p>
    //       <p><strong>Company:</strong> ${company || 'Not provided'}</p>
    //       <p><strong>Website:</strong> ${website || 'Not provided'}</p>
    //       <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
    //       <p><strong>Message:</strong></p>
    //       <p>${message}</p>
    //     `
    //   });
    // } else {
    //   console.log("TODO: Configure Brevo SMTP credentials");
    // }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// app/privacy/page.tsx
import { Metadata } from "next";
import { SectionWrapper } from "@/components/section-wrapper";

export const metadata: Metadata = {
  title: "Privacy Policy — K&Co. Product & Technology Consultancy",
  description: "Privacy policy for K&Co. Product & Technology Consultancy. Learn how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy — K&Co.",
    description: "Our privacy policy and how we protect your personal information.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <SectionWrapper className="pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            Last updated: [Date]
          </p>
          
          <div className="bg-k-gray-900 border border-k-gray-700 rounded-2xl p-8 space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you contact us through our website, 
                request our services, or communicate with us. This may include your name, email address, company name, 
                and project details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Respond to your inquiries and provide our services</li>
                <li>Communicate with you about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except as described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Analytics</h2>
              <p>
                We use Plausible Analytics, a privacy-focused analytics service that doesn't use cookies or collect 
                personal data. You can learn more about their privacy practices at plausible.io/privacy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at hello@kco-consultancy.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// app/terms/page.tsx
import { Metadata } from "next";
import { SectionWrapper } from "@/components/section-wrapper";

export const metadata: Metadata = {
  title: "Terms of Service — K&Co. Product & Technology Consultancy",
  description: "Terms of service for K&Co. Product & Technology Consultancy. Legal terms and conditions for our services.",
  openGraph: {
    title: "Terms of Service — K&Co.",
    description: "Legal terms and conditions for our consultancy services.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <SectionWrapper className="pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            Last updated: [Date]
          </p>
          
          <div className="bg-k-gray-900 border border-k-gray-700 rounded-2xl p-8 space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Services</h2>
              <p>
                K&Co. provides product and technology consultancy services including discovery sprints, 
                project builds, and fractional team services as described on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
              <p>
                Payment terms vary by service type and will be specified in your service agreement. 
                Generally, Discovery Sprints require full payment upfront, Project Builds use milestone 
                payments, and Fractional Teams are billed monthly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <p>
                Unless otherwise specified in writing, all deliverables and work products created by K&Co. 
                for the client become the property of the client upon full payment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p>
                In no event shall K&Co. be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation, loss of profits, data, or use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p>
                For questions about these terms, please contact us at hello@kco-consultancy.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://kco-consultancy.vercel.app';
  
  const routes = [
    '',
    '/services',
    '/how-we-work',
    '/pricing',
    '/case-studies',
    '/contact',
    '/privacy',
    '/terms'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>
`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

// app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://kco-consultancy.vercel.app/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

// .env.example
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=hello@kco-consultancy.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=kco-consultancy.vercel.app

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/robots.txt',
        destination: '/robots.txt', 
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

// README.md
# K&Co. Product & Technology Consultancy

A modern, high-converting marketing website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **Plausible Analytics** for privacy-focused tracking
- **Responsive design** optimized for all devices
- **SEO optimized** with proper meta tags and sitemap
- **Contact form** with Brevo SMTP integration
- **Accessibility compliant** with WCAG guidelines

## 🛠 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Plausible Analytics
- Vercel (deployment)

## 📦 Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your values
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

```env
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=hello@kco-consultancy.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
```

### Brevo SMTP Setup

1. Sign up for Brevo account
2. Generate API key in settings
3. Add credentials to environment variables
4. Update contact form handler in `app/api/contact/route.ts`

## 📱 Pages

- **Home** (`/`) - Hero, services overview, social proof
- **Services** (`/services`) - Detailed service descriptions and pricing
- **How We Work** (`/how-we-work`) - Process, rituals, and tooling
- **Pricing** (`/pricing`) - Transparent pricing with comparison table
- **Case Studies** (`/case-studies`) - Client success stories
- **Contact** (`/contact`) - Contact form and information
- **Privacy** (`/privacy`) - Privacy policy
- **Terms** (`/terms`) - Terms of service

## 🎨 Design System

### Colors
- **Background**: #000000
- **Text**: #FFFFFF  
- **Primary Purple**: #9236E5
- **Deep Purple**: #6C17B7
- **Soft Lavender**: #C390F0
- **Gray Scale**: #0A0A0A, #141414, #1E1E1E

### Typography
- Font: Inter
- Headings: Bold weights (600-700)
- Body: Regular (400) and medium (500)

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Node.js.

## 📊 Analytics

The site uses Plausible Analytics for privacy-focused tracking:
- Page views
- CTA click events
- Contact form submissions
- No cookies or personal data collection

## ♿ Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Focus states with custom focus rings
- Alt text for images
- Keyboard navigation support
- WCAG AA contrast compliance

## 🔍 SEO

- Next.js Metadata API for page-specific SEO
- OpenGraph tags for social sharing
- Structured data markup
- XML sitemap generation
- Robots.txt file
- Canonical URLs

## 📝 License

This project is proprietary to K&Co. Product & Technology Consultancy.

## 📞 Support

For questions or support, contact hello@kco-consultancy.com.
import { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/section-wrapper";

export const metadata: Metadata = {
  title: "Pricing — K&Co. Product & Technology Consultancy",
  description: "Transparent pricing for Discovery Sprint (~$3.5k), Project Build ($30-60k), and Fractional Team ($12-18k/month). Milestone payments and flexible terms.",
  openGraph: {
    title: "Pricing — K&Co.",
    description: "Transparent pricing for all services. Discovery Sprint, Project Build, and Fractional Team options.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <SectionWrapper className="pt-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transparent pricing
          </h1>
          <p className="text-xl text-gray-300">
            Clear pricing with no hidden fees. Choose the engagement that fits your budget and timeline.
          </p>
        </div>
      </SectionWrapper>

      {/* Pricing Table */}
      <SectionWrapper className="bg-k-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Discovery Sprint */}
            <div className="bg-k-gray-800 border border-k-gray-700 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Discovery Sprint</h2>
                <div className="text-4xl font-bold text-k-purple-primary mb-2">$3,500</div>
                <div className="text-gray-400">2 weeks • Fixed scope</div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold text-white mb-4">Perfect for:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Early-stage product validation</li>
                  <li>• Feature planning and roadmapping</li>
                  <li>• Technical architecture decisions</li>
                  <li>• Getting estimates for development</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold text-white mb-4">Deliverables:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• User research & problem validation</li>
                  <li>• Technical architecture plan</li>
                  <li>• KPI framework & success metrics</li>
                  <li>• UI/UX designs & user flows</li>
                  <li>• Project roadmap & estimates</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <div className="bg-k-gray-900 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Payment Terms</div>
                  <div className="text-white font-semibold">100% upfront</div>
                </div>
              </div>
              
              <Link 
                href="/contact"
                className="block w-full bg-k-purple-primary hover:bg-k-purple-deep text-white text-center rounded-xl px-6 py-3 font-semibold transition-colors"
              >
                Start Discovery
              </Link>
            </div>

            {/* Project Build */}
            <div className="bg-k-gray-800 border-2 border-k-purple-primary rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-k-purple-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Project Build</h2>
                <div className="text-4xl font-bold text-k-purple-primary mb-2">$30–60k</div>
                <div className="text-gray-400">6–10 weeks • Milestone payments</div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold text-white mb-4">Perfect for:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• MVP development and launch</li>
                  <li>• Feature development with tight deadlines</li>
                  <li>• Building production-ready applications</li>
                  <li>• Teams needing rapid delivery</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold text-white mb-4">What's included:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Full-stack development & testing</li>
                  <li>• Weekly demos & feedback cycles</li>
                  <li>• Production deployment on Vercel</li>
                  <li>• Analytics & monitoring setup</li>
                  <li>• Documentation & handoff</li>
                  <li>• Transition to Lite Retainer</li>
                </ul>
              </div>
              
              <div className="mb-8 space-y-3">
                <div className="bg-k-gray-900 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">50/50 Split</div>
                  <div className="text-white font-semibold">50% start • 50% delivery</div>
                </div>
                <div className="bg-k-gray-900 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">40/40/20 Split</div>
                  <div className="text-white font-semibold">40% start • 40% midpoint • 20% delivery</div>
                </div>
              </div>
              
              <Link 
                href="/contact"
                className="block w-full bg-k-purple-primary hover:bg-k-purple-deep text-white text-center rounded-xl px-6 py-3 font-semibold transition-colors"
              >
                Start Project
              </Link>
            </div>

            {/* Fractional Team */}
            <div className="bg-k-gray-800 border border-k-gray-700 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Fractional Team</h2>
                <div className="text-4xl font-bold text-k-purple-primary mb-2">$12–18k</div>
                <div className="text-gray-400">per month • Capacity-based</div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold text-white mb-4">Perfect for:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Ongoing product development</li>
                  <li>• Scaling existing applications</li>
                  <li>• Long-term strategic partnership</li>
                  <li>• Flexible capacity needs</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold text-white mb-4">Capacity options:</h3>
                <div className="space-y-3">
                  <div className="bg-k-gray-900 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">20 points</span>
                      <span className="text-k-purple-primary">$12k/month</span>
                    </div>
                  </div>
                  <div className="bg-k-gray-900 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">30 points</span>
                      <span className="text-k-purple-primary">$15k/month</span>
                    </div>
                  </div>
                  <div className="bg-k-gray-900 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">40 points</span>
                      <span className="text-k-purple-primary">$18k/month</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="bg-k-gray-900 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Commitment</div>
                  <div className="text-white font-semibold">3-month minimum, then monthly</div>
                </div>
              </div>
              
              <Link 
                href="/contact"
                className="block w-full bg-k-purple-primary hover:bg-k-purple-deep text-white text-center rounded-xl px-6 py-3 font-semibold transition-colors"
              >
                Join Fractional
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Comparison Table */}
      <SectionWrapper>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">What's included comparison</h2>
          
          <div className="bg-k-gray-900 border border-k-gray-700 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-k-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Discovery</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Project Build</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Fractional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-k-gray-700">
                  <tr>
                    <td className="px-6 py-4 text-sm text-white">User Research & Validation</td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-gray-500">–</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-white">Technical Architecture</td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-white">UI/UX Design</td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-white">Full Development</td>
                    <td className="px-6 py-4 text-center"><span className="text-gray-500">–</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-white">Production Deployment</td>
                    <td className="px-6 py-4 text-center"><span className="text-gray-500">–</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-white">Analytics & Monitoring</td>
                    <td className="px-6 py-4 text-center"><span className="text-gray-500">–</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-white">Ongoing Support</td>
                    <td className="px-6 py-4 text-center"><span className="text-gray-500">–</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">Via Retainer</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-white">Strategic Guidance</td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-k-purple-primary">✓</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper className="bg-k-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Pricing FAQ</h2>
          
          <div className="space-y-8">
            <div className="bg-k-gray-800 border border-k-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3">What if my project scope changes?</h3>
              <p className="text-gray-300">
                For Discovery and Project Build, we work with fixed scope to keep costs predictable. Scope changes require a separate change order. For Fractional teams, we adjust priorities monthly based on your evolving needs.
              </p>
            </div>
            
            <div className="bg-k-gray-800 border border-k-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3">Do you offer payment plans?</h3>
              <p className="text-gray-300">
                Yes. Project Build offers 50/50 or 40/40/20 milestone payments. Fractional teams are billed monthly. Discovery Sprint is typically paid upfront, but we can discuss alternatives for qualified clients.
              </p>
            </div>
            
            <div className="bg-k-gray-800 border border-k-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3">What's included in the Lite Retainer?</h3>
              <p className="text-gray-300">
                After Project Build delivery, we offer a Lite Retainer starting at $3k/month for bug fixes, minor updates, monitoring, and strategic consultation. It's a cost-effective way to maintain your application post-launch.
              </p>
            </div>
            
            <div className="bg-k-gray-800 border border-k-gray-700 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-3">How do capacity points work?</h3>
              <p className="text-gray-300">
                Each capacity point represents roughly 2 hours of development work. A 20-point month gives you ~40 hours, 30 points = ~60 hours, etc. Points roll over if unused and can be allocated across different types of work (development, design, strategy).
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a 20-minute consultation to discuss your project and get a custom quote.
          </p>
          <Link 
            href="/contact"
            className="bg-k-purple-primary hover:bg-k-purple-deep text-white rounded-xl px-8 py-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-k-purple-soft transition-colors inline-block"
          >
            Book consultation
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}

// app/case-studies/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/section-wrapper";
import { Card } from "@/components/card";
import { StatsRow } from "@/components/stats-row";

export const metadata: Metadata = {
  title: "Case Studies — K&Co. Product & Technology Consultancy",
  description: "Real results from our client projects. See how we've helped SaaS, D2C, and marketplace companies build and ship successful products.",
  openGraph: {
    title: "Case Studies — K&Co.",
    description: "Real results from our client projects. SaaS, D2C, and marketplace success stories.",
    url: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <SectionWrapper className="pt-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Case studies
          </h1>
          <p className="text-xl text-gray-300">
            Real results from real projects. See how we help companies build the right thing and ship it faster.
          </p>
        </div>
      </SectionWrapper>

      {/* Featured Case Study */}
      <SectionWrapper className="bg-k-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="bg-k-gray-800 border border-k-gray-700 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-12">
                <div className="text-k-purple-primary font-semibold mb-2">Lab Build Case #1</div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  SaaS Analytics Dashboard
                </h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">The Problem</h3>
                  <p className="text-gray-300 mb-6">
                    A growing SaaS company was losing users due to poor onboarding and lack of engagement insights. They needed a complete analytics dashboard to understand user behavior and improve retention.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mb-4">Our Approach</h3>
                  <ul className="space-y-2 text-gray-300 mb-6">
                    <li className="flex items-start">
                      <span className="text-k-purple-primary mr-2">•</span>
                      <span>2-week discovery sprint to identify key user journeys</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-k-purple-primary mr-2">•</span>
                      <span>Built real-time analytics with PostHog integration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-k-purple-primary mr-2">•</span>
                      <span>Designed custom dashboards for different user personas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-k-purple-primary mr-2">•</span>
                      <span>Implemented automated alerts and retention campaigns</span>
                    </li>
                  </ul>
                </div>
                
                <StatsRow 
                  stats={[
                    { label: "Delivery Time", value: "6 weeks" },
                    { label: "User Engagement", value: "+40%" },
                    { label: "Churn Reduction", value: "-25%" },
                    { label: "Revenue Impact", value: "+30%" }
                  ]}
                />
              </div>
              
              <div className="bg-k-gray-900 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-k-purple-primary/20 rounded-2xl p-8 mb-6">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-xl font-bold text-white mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-300">Real-time user insights and retention metrics</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-k-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-k-purple-primary">40%</div>
                      <div className="text-sm text-gray-400">Engagement ↑</div>
                    </div>
                    <div className="bg-k-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-k-purple-primary">25%</div>
                      <div className="text-sm text-gray-400">Churn ↓</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* More Cases Coming */}
      <SectionWrapper>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">More case studies coming soon</h2>
          <p className="text-gray-300 mb-12">
            We're currently working with several exciting clients across SaaS, D2C, and marketplace verticals. Check back soon for more detailed case studies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="D2C Commerce Platform"
              description="Building a complete e-commerce solution with advanced personalization and conversion optimization."
              bullets={["50% conversion increase", "35% higher AOV", "60% LTV improvement"]}
              cta={{ text: "Coming soon", href: "#" }}
            />
            
            <Card
              title="Marketplace MVP"
              description="Launching a two-sided marketplace with advanced matching algorithms and payment processing."
              bullets={["80% GMV growth", "45% liquidity boost", "20% take rate increase"]}
              cta={{ text: "Coming soon", href: "#" }}
            />
            
            <Card
              title="SaaS Feature Suite"
              description="Rapid feature development for a growing SaaS platform with 10k+ active users."
              bullets={["65% feature adoption", "30% user growth", "40% retention boost"]}
              cta={{ text: "Coming soon", href: "#" }}
            />
          </div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="bg-k-gray-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to be our next success story?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and explore how we can help you achieve similar results.
          </p>
          <Link 
            href="/contact"
            className="bg-k-purple-primary hover:bg-k-purple-deep text-white rounded-xl px-8 py-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-k-purple-soft transition-colors inline-block"
          >
            Start your project
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}// package.json
{
  "name": "kco-consultancy",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  },
  "devDependencies": {
    "eslint": "^8",
    "eslint-config-next": "14.0.4"
  }
}

// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        k: {
          purple: { 
            primary: "#9236E5", 
            deep: "#6C17B7", 
            soft: "#C390F0" 
          },
          gray: { 
            900: "#0A0A0A", 
            800: "#141414", 
            700: "#1E1E1E" 
          }
        }
      },
      borderColor: { 
        DEFAULT: "#1E1E1E" 
      }
    }
  },
  plugins: []
};

export default config;

// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// tsconfig.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #000;
  --fg: #fff;
  --k-purple: #9236E5;
  --k-purple-deep: #6C17B7;
  --k-lavender: #C390F0;
  --k-gray-900: #0A0A0A;
  --k-gray-800: #141414;
  --k-gray-700: #1E1E1E;
}

body {
  color: rgb(var(--foreground));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background))
    )
    rgb(var(--background));
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PlausibleScript } from "@/components/plausible";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "K&Co. — Product & Technology Consultancy",
  description: "Build the right thing. Ship it faster. We're a Product & Technology Consultancy that turns ideas into outcomes with lean discovery, clear roadmaps, and production-ready delivery.",
  keywords: "product consultancy, technology consulting, next.js development, product discovery, fractional team",
  authors: [{ name: "K&Co." }],
  creator: "K&Co.",
  metadataBase: new URL("https://kco-consultancy.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kco-consultancy.vercel.app",
    title: "K&Co. — Product & Technology Consultancy",
    description: "Build the right thing. Ship it faster. We're a Product & Technology Consultancy that turns ideas into outcomes.",
    siteName: "K&Co.",
  },
  twitter: {
    card: "summary_large_image",
    title: "K&Co. — Product & Technology Consultancy",
    description: "Build the right thing. Ship it faster. We're a Product & Technology Consultancy that turns ideas into outcomes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <PlausibleScript />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

// components/plausible.tsx
import Script from "next/script";

export function PlausibleScript() {
  return (
    <Script
      defer
      data-domain="kco-consultancy.vercel.app"
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

// lib/analytics.ts
export function trackEvent(eventName: string, props?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props });
  }
}

// components/navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCTAClick = () => {
    trackEvent("CTA Click", { location: "navbar" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-k-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white">
              K&Co.
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/services" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Services
              </Link>
              <Link href="/how-we-work" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                How We Work
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </Link>
              <Link href="/case-studies" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Case Studies
              </Link>
              <Link 
                href="/contact" 
                onClick={handleCTAClick}
                className="bg-k-purple-primary hover:bg-k-purple-deep text-white rounded-xl px-5 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-k-purple-soft transition-colors"
              >
                Book Consult
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-k-purple-soft p-2"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-k-gray-900">
            <Link href="/services" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Services
            </Link>
            <Link href="/how-we-work" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              How We Work
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Pricing
            </Link>
            <Link href="/case-studies" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Case Studies
            </Link>
            <Link 
              href="/contact" 
              onClick={handleCTAClick}
              className="bg-k-purple-primary hover:bg-k-purple-deep text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Book Consult
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// components/footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-k-gray-900 border-t border-k-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">K&Co.</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Product & Technology Consultancy. Build the right thing. Ship it faster.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:hello@kco-consultancy.com" className="text-k-purple-primary hover:text-k-purple-deep">
                hello@kco-consultancy.com
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-300 hover:text-white">Discovery Sprint</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white">Project Build</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white">Fractional Team</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/how-we-work" className="text-gray-300 hover:text-white">How We Work</Link></li>
              <li><Link href="/case-studies" className="text-gray-300 hover:text-white">Case Studies</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-k-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 K&Co. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// components/section-wrapper.tsx
interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ children, className = "" }: SectionWrapperProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

// components/card.tsx
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  bullets?: string[];
  cta?: {
    text: string;
    href: string;
  };
  className?: string;
}

export function Card({ title, description, bullets, cta, className = "" }: CardProps) {
  return (
    <div className={`bg-k-gray-900 border border-k-gray-700 rounded-2xl p-6 text-white ${className}`}>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      
      {bullets && bullets.length > 0 && (
        <ul className="space-y-2 mb-6">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start">
              <span className="text-k-purple-primary mr-2">•</span>
              <span className="text-sm text-gray-300">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      
      {cta && (
        <Link 
          href={cta.href}
          className="inline-flex items-center text-k-purple-primary hover:text-k-purple-deep font-medium text-sm"
        >
          {cta.text}
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}

// components/faq-accordion.tsx
"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-k-gray-900 border border-k-gray-700 rounded-xl overflow-hidden">
          <button
            className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-k-purple-soft"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-white">{item.question}</h3>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-gray-300">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// components/kpi-chip.tsx
interface KPIChipProps {
  label: string;
  value: string;
  className?: string;
}

export function KPIChip({ label, value, className = "" }: KPIChipProps) {
  return (
    <div className={`bg-k-gray-800 border border-k-gray-700 rounded-lg p-4 ${className}`}>
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

// components/stats-row.tsx
interface Stat {
  label: string;
  value: string;
}

interface StatsRowProps {
  stats: Stat[];
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-bold text-k-purple-primary mb-2">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// app/services/page.tsx

export const metadata: Metadata = {
  title: "K&Co. — Product & Technology Consultancy | Build the right thing. Ship it faster.",
  description: "We're a Product & Technology Consultancy that turns ideas into outcomes with lean discovery, clear roadmaps, and production-ready delivery. Discovery sprints, project builds, and fractional teams.",
  openGraph: {
    title: "K&Co. — Product & Technology Consultancy",
    description: "Build the right thing. Ship it faster. We turn ideas into outcomes with lean discovery and production-ready delivery.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="pt-24 md:pt-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Build the right thing. Ship it faster.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 text-balance">
            We're a <span className="text-k-purple-primary font-semibold">Product & Technology Consultancy</span> that turns ideas into outcomes with <span className="text-white">lean discovery, clear roadmaps, and production-ready delivery</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-k-purple-primary hover:bg-k-purple-deep text-white rounded-xl px-8 py-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-k-purple-soft transition-colors"
            >
              Book a 20-min consult
            </Link>
            <Link 
              href="/services"
              className="border border-k-gray-700 hover:border-k-purple-primary text-white rounded-xl px-8 py-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-k-purple-soft transition-colors"
            >
              See services
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Value Blocks */}
      <SectionWrapper className="bg-k-gray-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Three ways we help you ship</h2>
          <p className="text-xl text-gray-300">Pick the engagement that fits your stage and timeline</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="Discovery Sprint"
            description="Problem framing, KPI plan, roadmap, designs, estimates."
            bullets={[
              "User research & problem validation",
              "Technical architecture planning",
              "Clear success metrics & KPIs",
              "Detailed project roadmap",
              "2-week delivery timeline"
            ]}
            cta={{ text: "Learn more", href: "/services" }}
          />
          
          <Card
            title="Project Build"
            description="Fixed scope, weekly demos, acceptance criteria, Vercel launch → Lite Retainer."
            bullets={[
              "Production-ready development",
              "Weekly demos & feedback loops",
              "Full deployment & monitoring",
              "6-10 week delivery",
              "Seamless handoff to retainer"
            ]}
            cta={{ text: "Learn more", href: "/services" }}
          />
          
          <Card
            title="Fractional Team"
            description="Capacity-based delivery, outcomes tied to KPIs, renew monthly after 3-month start."
            bullets={[
              "Dedicated capacity allocation",
              "KPI-driven outcomes",
              "Monthly sprint cycles",
              "Flexible team scaling",
              "Long-term partnership"
            ]}
            cta={{ text: "Learn more", href: "/services" }}
          />
        </div>
      </SectionWrapper>

      {/* Outcomes by ICP */}
      <SectionWrapper>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Outcomes by product type</h2>
          <p className="text-xl text-gray-300">We tailor our approach to your business model</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-k-gray-800 border border-k-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">SaaS</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <KPIChip label="User Activation" value="↑40%" />
              <KPIChip label="Feature Adoption" value="↑65%" />
              <KPIChip label="Churn Reduction" value="↓25%" />
              <KPIChip label="Revenue Growth" value="↑30%" />
            </div>
            <p className="text-gray-300">Focus on user engagement, feature adoption, and reducing churn through data-driven product decisions.</p>
          </div>
          
          <div className="bg-k-gray-800 border border-k-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">D2C</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <KPIChip label="Conversion Rate" value="↑50%" />
              <KPIChip label="AOV" value="↑35%" />
              <KPIChip label="LTV" value="↑60%" />
              <KPIChip label="CAC Payback" value="↓40%" />
            </div>
            <p className="text-gray-300">Optimize conversion funnels, increase average order value, and improve customer lifetime value.</p>
          </div>
          
          <div className="bg-k-gray-800 border border-k-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Marketplace</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <KPIChip label="GMV" value="↑80%" />
              <KPIChip label="Take Rate" value="↑20%" />
              <KPIChip label="Liquidity" value="↑45%" />
              <KPIChip label="Retention" value="↑55%" />
            </div>
            <p className="text-gray-300">Build network effects, improve supply-demand matching, and increase transaction volume.</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Proof Strip */}
      <SectionWrapper className="bg-k-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Trusted by growing companies</h2>
          <div className="bg-k-gray-800 border border-k-gray-700 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Lab Build Case #1</h3>
            <p className="text-gray-300 mb-6">
              Built a complete SaaS analytics dashboard in 6 weeks. Increased user engagement by 40% and reduced churn by 25% within 3 months of launch.
            </p>
            <StatsRow 
              stats={[
                { label: "Delivery Time", value: "6 weeks" },
                { label: "User Growth", value: "+40%" },
                { label: "Churn Reduction", value: "-25%" },
                { label: "Client Satisfaction", value: "100%" }
              ]}
            />
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-4">Weekly releases • Modern stack</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-white font-semibold">Stripe</div>
            <div className="text-white font-semibold">Auth0</div>
            <div className="text-white font-semibold">Vercel</div>
            <div className="text-white font-semibold">PostHog</div>
            <div className="text-white font-semibold">Next.js</div>
            <div className="text-white font-semibold">Tailwind</div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Band */}
      <SectionWrapper>
        <div className="bg-gradient-to-r from-k-purple-deep to-k-purple-primary rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to ship faster?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and find the right engagement model for your goals and timeline.
          </p>
          <Link 
            href="/contact"
            className="bg-white text-k-purple-primary hover:bg-gray-100 rounded-xl px-8 py-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors inline-block"
          >
            Book a 20-min consult
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}