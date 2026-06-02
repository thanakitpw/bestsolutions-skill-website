import type { Metadata } from "next";
import "./globals.css";
import { Interactions } from "@/components/Interactions";

const title = "AI Website Developer Live Class | Best Solutions Skill";
const description =
  "คอร์สสอนสด สร้างเว็บไซต์ Custom Code ด้วย AI ตั้งแต่ Design, Next.js, Supabase จน Deploy ออนไลน์จริง โดยทีม Best Solutions ประสบการณ์ Agency 8+ ปี";

export const metadata: Metadata = {
  metadataBase: new URL("https://bestsolutionskill.com"),
  title,
  description,
  icons: { icon: "/logo.png" },
  openGraph: {
    type: "website",
    title,
    description:
      "คอร์สสอนสด สร้างเว็บไซต์ Custom Code ด้วย AI ตั้งแต่ Design, Next.js, Supabase จน Deploy ออนไลน์จริง",
    images: ["/logo.png"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // `js` class gates reveal-on-scroll; <noscript> reveals everything when JS is off.
  return (
    <html lang="th" className="js">
      <body>
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".js .js-reveal{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        {children}
        <Interactions />
      </body>
    </html>
  );
}
