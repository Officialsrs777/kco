# K&Co. Website (Next.js + Tailwind + TS)

Dark theme with purple accents, App Router, Plausible analytics, and a Brevo SMTP contact stub.

## Quick start
```bash
pnpm i # or npm i / yarn
cp .env.example .env.local
pnpm dev
```
Deploy to Vercel. If SMTP env not set, contact endpoint mocks success and logs a warning.

## Stack
Next.js 14, TypeScript, Tailwind, Vercel, Nodemailer (Brevo), Plausible.
