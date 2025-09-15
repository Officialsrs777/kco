import Section from "@/components/Section";

export default function Page(){
  return (
    <Section className="pt-20">
      <h1 className="text-3xl font-bold mb-6">How we work</h1>
      <div className="k-card space-y-4">
        <h2 className="text-xl font-semibold">Rituals</h2>
        <ul className="list-disc pl-6 text-neutral-300 space-y-1">
          <li>Monday planning</li>
          <li>Wednesday demo</li>
          <li>Friday release notes</li>
        </ul>

        <h2 className="text-xl font-semibold pt-4">Definition of Done</h2>
        <ul className="list-disc pl-6 text-neutral-300 space-y-1">
          <li>Code + tests merged via PR</li>
          <li>Analytics events instrumented</li>
          <li>Docs updated</li>
          <li>Deployed to staging/prod</li>
        </ul>

        <h2 className="text-xl font-semibold pt-4">Tooling</h2>
        <p className="text-neutral-300">Next.js, TypeScript, Tailwind, Node, MongoDB/Prisma, Auth0, Stripe, Vercel, GitHub Actions, Sentry, PostHog.</p>
      </div>
    </Section>
  )
}
