import type { Metadata } from "next";
import { Prompt, IBM_Plex_Sans_Thai, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Interactions } from "@/components/Interactions";
import { FloatingContact } from "@/components/FloatingContact";
import { Analytics } from "@/components/Analytics";
import { MetaPixel } from "@/components/MetaPixel";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-prompt",
  display: "swap",
});
const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-thai",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const title = "Best Solutions Skill | เรียนสร้างเว็บและทักษะดิจิทัลด้วย AI";
const description =
  "แหล่งเรียนรู้สร้างเว็บไซต์และทักษะดิจิทัลด้วย AI — คอร์สเรียนสดแบบจับมือทำ พร้อมบทความความรู้ ต่อยอดเป็นอาชีพหรือรายได้";

export const metadata: Metadata = {
  metadataBase: new URL("https://bestsolutionskill.com"),
  title,
  description,
  icons: { icon: "/logo.png" },
  openGraph: {
    type: "website",
    title,
    description:
      "แหล่งเรียนรู้สร้างเว็บไซต์และทักษะดิจิทัลด้วย AI — คอร์สเรียนสดและบทความความรู้",
    images: ["/logo.png"],
  },
  twitter: { card: "summary_large_image" },
  // Google Search Console verification (set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION, or verify via Cloudflare DNS)
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // `js` class gates reveal-on-scroll; <noscript> reveals everything when JS is off.
  return (
    <html
      lang="th"
      className={`js ${prompt.variable} ${plexThai.variable} ${plexMono.variable}`}
    >
      <body>
        <Analytics />
        <MetaPixel />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".js .js-reveal{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        {children}
        <FloatingContact />
        <Interactions />
      </body>
    </html>
  );
}
