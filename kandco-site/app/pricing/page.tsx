import Section from "@/components/Section";
import Card from "@/components/Card";
import Link from "next/link";

export default function Page(){
  return (
    <Section className="pt-20">
      <h1 className="text-3xl font-bold mb-8">Pricing</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Discovery Sprint" cta={<Link href="/contact" className="k-btn-primary">Start Discovery</Link>}>
          <p>~$3.5k • 2 weeks</p>
          <ul className="list-disc pl-6 mt-2 text-neutral-300">
            <li>Problem framing & KPIs</li>
            <li>Roadmap & estimates</li>
            <li>Initial designs</li>
          </ul>
        </Card>
        <Card title="Project Build" cta={<Link href="/contact" className="k-btn-primary">Discuss scope</Link>}>
          <p>$30–60k • 6–10 weeks</p>
          <ul className="list-disc pl-6 mt-2 text-neutral-300">
            <li>Fixed scope + acceptance criteria</li>
            <li>Weekly demos</li>
            <li>Vercel launch → Lite Retainer</li>
          </ul>
        </Card>
        <Card title="Fractional Team" cta={<Link href="/contact" className="k-btn-primary">Book consult</Link>}>
          <p>$12k / $15k / $18k per month</p>
          <ul className="list-disc pl-6 mt-2 text-neutral-300">
            <li>Capacity: 20 / 30 / 40 points</li>
            <li>KPIs & monthly review</li>
            <li>Weekly demo cadence</li>
          </ul>
        </Card>
      </div>
    </Section>
  )
}
