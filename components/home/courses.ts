export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  schedule: string;
  priceNow: string;
  priceWas: string;
  bullets: string[];
  href: string;
};

export const courses: Course[] = [
  {
    slug: "vibe-code-website-bootcamp",
    title: "Vibe Code Website Bootcamp",
    subtitle:
      "สร้างเว็บไซต์ด้วย AI ใน 2 วัน ตั้งแต่วางไอเดีย ออกแบบ ขึ้น Next.js ติดตั้ง Tracking จน Deploy ออนไลน์",
    tag: "เรียนสด 2 วัน",
    schedule: "27–28 มิ.ย. 2026 · เสาร์–อาทิตย์",
    priceNow: "2,990.-",
    priceWas: "4,990.-",
    bullets: [
      "เรียนสด 2 วัน รวม 10 ชั่วโมง",
      "ใช้ AI ช่วยออกแบบ เขียนโค้ด และแก้ Error",
      "ติดตั้ง Tracking และ Deploy เว็บออนไลน์จริง",
    ],
    href: "/courses/vibe-code-website-bootcamp",
  },
];
