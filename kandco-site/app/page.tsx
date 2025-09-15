import Section from "@/components/Section";
import Card from "@/components/Card";
import Link from "next/link";
import { track } from "@/lib/analytics";

export default function Page(){
  return (
    <>
      <Section className="pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Build the right thing. <span className="text-k-purple-primary">Ship it faster.</span>
          </h1>
          <p className="mt-5 text-neutral-300 text-lg">
            We’re a Product & Technology Consultancy that turns ideas into outcomes with lean discovery, clear roadmaps, and production-ready delivery.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/contact" onClick={()=>track('cta_click', {loc:'hero'})} className="k-btn-primary">Book a 20-min consult</Link>
            <Link href="/services" className="k-link">See services</Link>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold mb-6">What we offer</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Discovery Sprint (2 weeks)"
            cta={<Link href="/contact" className="k-btn-primary">Start Discovery</Link>}>
            Problem framing, KPI plan, roadmap, designs, estimates.
          </Card>
          <Card title="Project Build (6–10 weeks)"
            cta={<Link href="/services" className="k-btn-primary">See modules</Link>}>
            Fixed scope, weekly demos, acceptance criteria, Vercel launch → Lite Retainer.
          </Card>
          <Card title="Fractional Product & Tech (monthly)"
            cta={<Link href="/pricing" className="k-btn-primary">View pricing</Link>}>
            Capacity-based delivery, outcomes tied to KPIs, renew monthly after 3-month start.
          </Card>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold mb-6">Outcomes we aim for</h2>
        <ul className="grid md:grid-cols-3 gap-4 text-neutral-200">
          <li className="k-card">SaaS: Trial→Paid ↑, activation time ↓, weekly releases.</li>
          <li className="k-card">D2C: Checkout conversion ↑, Month‑1 churn ↓, AOV ↑.</li>
          <li className="k-card">Marketplace: Lead→Hire ↑, response time ↓, dispute rate ↓.</li>
        </ul>
      </Section>

      <Section>
        <div className="k-card">
          <h3 className="text-xl font-semibold">Proof: our public lab build</h3>
          <p className="mt-2 text-neutral-300">10‑day public build in your niche with demo, repo, and metrics. It’s our way to show how we work—before you hire us.</p>
          <div className="mt-4"><Link href="/case-studies" className="k-link">See the case</Link></div>
        </div>
      </Section>

      <Section>
        <div className="k-card flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Ready to move fast?</h3>
            <p className="text-neutral-300">Book a 20‑minute consult. We’ll assess your goals and route you to a Discovery, Project Build, or Fractional Team.</p>
          </div>
          <Link href="/contact" className="k-btn-primary">Book a 20-min consult</Link>
        </div>
      </Section>
    </>
  )
}
