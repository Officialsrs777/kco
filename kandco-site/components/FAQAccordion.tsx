"use client";
import { useState } from "react";

export default function FAQ({items}:{items:{q:string,a:string}[]}){
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((it, i)=>(
        <div key={i} className="k-card">
          <button onClick={()=>setOpen(open===i?null:i)} className="w-full text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium">{it.q}</h4>
              <span className="text-k-purple-soft">{open===i?'-':'+'}</span>
            </div>
          </button>
          {open===i && <p className="mt-3 text-neutral-300">{it.a}</p>}
        </div>
      ))}
    </div>
  )
}
