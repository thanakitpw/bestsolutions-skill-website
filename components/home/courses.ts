export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  schedule: string;
  priceNow: string;
  priceWas?: string;
  bullets: string[];
  href: string;
};

export const courses: Course[] = [
  {
    slug: "vibe-code-website-bootcamp",
    title: "Vibe Code Website Bootcamp",
    subtitle:
      "เรียนสร้างเว็บไซต์ด้วย AI แบบตัวต่อตัว 1:1 ตั้งแต่วางไอเดีย ออกแบบ ขึ้น Next.js ติดตั้ง Tracking จน Deploy ออนไลน์",
    image: "/courses/vibe-code-website-bootcamp.svg",
    tag: "เรียนตัวต่อตัว 1:1",
    schedule: "เรียนตัวต่อตัว · 5 ชั่วโมง",
    priceNow: "6,900.-",
    bullets: [
      "เรียนตัวต่อตัว 1:1 รวม 5 ชั่วโมง",
      "ใช้ AI ช่วยออกแบบ เขียนโค้ด และแก้ Error",
      "ติดตั้ง Tracking และ Deploy เว็บออนไลน์จริง",
    ],
    href: "/courses/vibe-code-website-bootcamp",
  },
];
