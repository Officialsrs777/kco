import { ReactNode } from "react";

export default function Card({title, children, cta}:{title:string; children:ReactNode; cta?:ReactNode}){
  return (
    <div className="k-card h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <div className="text-neutral-200">{children}</div>
      </div>
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  )
}
