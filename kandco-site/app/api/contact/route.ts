import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  message: z.string().min(1),
});

export async function POST(req: Request){
  try{
    const body = await req.json();
    const data = schema.parse(body);

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = Number(process.env.SMTP_PORT || 587);
    const to = process.env.CONTACT_TO || "hello@kandco.io";
    const from = process.env.CONTACT_FROM || "website@kandco.io";

    if(host && user && pass){
      const transporter = nodemailer.createTransport({
        host, port, secure: false,
        auth: { user, pass }
      });
      await transporter.sendMail({
        to, from,
        subject: `New inquiry from ${data.name}`,
        text: `Email: ${data.email}
Company: ${data.company || ""}
Website: ${data.website || ""}
Budget: ${data.budget || ""}

${data.message}`
      });
    } else {
      console.warn("[contact] SMTP env not set. Mocking success.");
    }
    return NextResponse.json({ ok: true });
  }catch(err:any){
    console.error(err);
    return NextResponse.json({ ok:false, error: "Invalid request" }, { status: 400 });
  }
}
