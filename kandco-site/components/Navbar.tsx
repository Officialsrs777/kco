"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/services", label: "Services" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case studies" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b border-k-gray-700 bg-black sticky top-0 z-50">
      <nav className="container flex items-center justify-between h-16">
        <Link href="/" className="font-semibold text-xl">K&Co.</Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`hover:text-k-purple-primary ${pathname===l.href?'text-k-purple-primary':'text-white'}`}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/contact" className="k-btn-primary">Book a 20-min consult</Link>
      </nav>
    </header>
  );
}
