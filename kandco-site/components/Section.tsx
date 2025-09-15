import { ReactNode } from "react";

export default function Section({children, className=''}:{children:ReactNode; className?:string}){
  return <section className={`section ${className}`}><div className="container">{children}</div></section>
}
