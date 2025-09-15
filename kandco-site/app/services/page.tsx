import Section from "@/components/Section";
import Card from "@/components/Card";
import Link from "next/link";

export default function Page(){
  return (
    <Section className="pt-20">
      <h1 className="text-3xl font-bold mb-8">Services</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Discovery Sprint (2 weeks)"
          cta={<Link href="/contact" className="k-btn-primary">Start Discovery</Link>}>
          Problem framing, KPI plan, roadmap, designs, estimates.
        </Card>
        <Card title="Project Build (6–10 weeks)"
          cta={<Link href="/pricing" className="k-btn-primary">View pricing</Link>}>
          Fixed scope, weekly demos, acceptance criteria, Vercel launch. Post‑launch: Lite Retainer.
        </Card>
        <Card title="Fractional Product & Tech (monthly)"
          cta={<Link href="/pricing" className="k-btn-primary">View pricing</Link>}>
          Capacity-based monthly partnership (20/30/40 points), KPIs, weekly demo, monthly review.
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4">FAQs</h2>
      <p className="text-neutral-300">See how we manage scope, acceptance criteria, and hand-offs on the <Link href="/how-we-work" className="k-link">How we work</Link> page.</p>
    </Section>
  )
}
