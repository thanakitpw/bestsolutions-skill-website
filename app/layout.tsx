import type { Metadata } from "next";
import { Prompt, IBM_Plex_Sans_Thai, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Interactions } from "@/components/Interactions";

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

const title = "Vibe Code Website Bootcamp | Best Solutions Skill";
const description =
  "คอร์สสอนสด 2 วัน สร้างเว็บไซต์ด้วย Vibe Code และ AI ตั้งแต่ Design, Next.js, Tracking จน Deploy ออนไลน์ พร้อมต่อยอดเป็น Portfolio สมัครงาน รับงาน หรือสร้างรายได้";

export const metadata: Metadata = {
  metadataBase: new URL("https://bestsolutionskill.com"),
  title,
  description,
  icons: { icon: "/logo.png" },
  openGraph: {
    type: "website",
    title,
    description:
      "คอร์สสอนสด 2 วัน สร้างเว็บไซต์ด้วย Vibe Code และ AI พร้อม Tracking, Deploy และแนวทางต่อยอดอาชีพ",
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
    <html
      lang="th"
      className={`js ${prompt.variable} ${plexThai.variable} ${plexMono.variable}`}
    >
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
