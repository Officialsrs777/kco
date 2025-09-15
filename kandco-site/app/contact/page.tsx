import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export default function Page(){
  return (
    <Section className="pt-20">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <ContactForm />
      <p className="text-neutral-400 mt-4 text-sm">We typically reply within 1 business day.</p>
    </Section>
  )
}
