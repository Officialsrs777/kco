import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "K&Co. — Product & Technology Consultancy",
  description: "Build the right thing. Ship it faster.",
  metadataBase: new URL("https://kandco.io")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "kandco.io";
  return (
    <html lang="en">
      <head>
        <script defer data-domain={domain} src="https://plausible.io/js/script.js"></script>
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
