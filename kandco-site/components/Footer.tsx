import Link from "next/link";

export default function Footer(){
  return (
    <footer className="border-t border-k-gray-700 bg-black">
      <div className="container py-10 text-sm text-neutral-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p>© {new Date().getFullYear()} K&Co. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="k-link">Privacy</Link>
            <Link href="/terms" className="k-link">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
