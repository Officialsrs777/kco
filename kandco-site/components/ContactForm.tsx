"use client";
import React, { useState } from "react";

export default function ContactForm(){
  const [loading,setLoading]=useState(false);
  const [ok,setOk]=useState<boolean|null>(null);
  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setLoading(true); setOk(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/contact", {method:"POST", headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)});
    setOk(res.ok);
    setLoading(false);
    if(res.ok) form.reset();
  }
  return (
    <form onSubmit={onSubmit} className="k-card space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" required placeholder="Your name" className="rounded-xl bg-black border border-k-gray-700 px-4 py-3 focus-ring" />
        <input name="email" required type="email" placeholder="Email" className="rounded-xl bg-black border border-k-gray-700 px-4 py-3 focus-ring" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input name="company" placeholder="Company" className="rounded-xl bg-black border border-k-gray-700 px-4 py-3 focus-ring" />
        <input name="website" placeholder="Website" className="rounded-xl bg-black border border-k-gray-700 px-4 py-3 focus-ring" />
      </div>
      <select name="budget" className="rounded-xl bg-black border border-k-gray-700 px-4 py-3 focus-ring">
        <option value="">Budget (optional)</option>
        <option>Under $10k</option>
        <option>$10k–$30k</option>
        <option>$30k–$60k</option>
        <option>$60k+</option>
      </select>
      <textarea name="message" required placeholder="Tell us about your project" rows={5} className="rounded-xl bg-black border border-k-gray-700 px-4 py-3 focus-ring" />
      <button disabled={loading} className="k-btn-primary">{loading?'Sending…':'Send message'}</button>
      {ok===true && <p className="text-green-400">Thanks! We’ll get back to you shortly.</p>}
      {ok===false && <p className="text-red-400">Something went wrong. Please try again later.</p>}
    </form>
  )
}
