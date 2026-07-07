// ข้อมูล E-book — โครงสร้างเดียวกับ courses.ts เพื่อให้ต่อ Supabase ภายหลังได้ง่าย
// coverImage = ไฟล์รูปปกจริง (ถ้าไม่ใส่จะใช้ gradient จาก cover.from / cover.to)
export type Ebook = {
  slug: string;
  title: string;
  subtitle: string;
  cover: { from: string; to: string };
  coverImage?: string; // ถ้ามีไฟล์รูปปกจริง (เช่น /ebooks/xxx.jpg) จะใช้รูปแทน gradient
  tag: string;
  pages: number;
  priceNow: string;
  priceWas?: string;
  bullets: string[];
  href: string;
  author: string;
  description: string;
  toc: string[];
  forWho: string[];
};

export const ebooks: Ebook[] = [
  {
    slug: "start-business-ai-30-days",
    title: "เริ่มต้นธุรกิจด้วย AI ใน 30 วัน",
    subtitle:
      "คู่มือทีละวันสำหรับคนเริ่มจากศูนย์ ใช้ AI ช่วยหาไอเดีย ปั้นสินค้า เปิดหน้าร้าน และหาลูกค้ากลุ่มแรก โดยไม่ขายฝันรวยเร็ว",
    cover: { from: "#f8791f", to: "#f82525" },
    coverImage: "/ebooks/start-business-ai-30-days.webp",
    tag: "E-book · PDF",
    pages: 120,
    priceNow: "290.-",
    priceWas: "590.-",
    bullets: [
      "แผนลงมือทำทีละวัน เหมาะกับคนไม่มีพื้นฐานเทคนิค",
      "พาไปตั้งแต่หาไอเดีย ปั้นสินค้า เปิดหน้าร้าน ไปจนถึงหาลูกค้ากลุ่มแรก",
      "มีชุดพรอมต์ AI สำเร็จรูปให้คัดลอกไปใช้ต่อได้ทุกขั้นตอน",
    ],
    href: "/ebooks/start-business-ai-30-days",
    author: "ทีม Best Solutions Skill",
    description:
      "คู่มือทีละวันสำหรับคนที่อยากเริ่มธุรกิจแต่ยังไม่รู้จะเริ่มตรงไหน พาลงมือตั้งแต่หาไอเดียที่เหมาะกับตัวเอง ปั้นสินค้าแรก ตั้งราคา เปิดหน้าร้านออนไลน์ วางระบบคอนเทนต์ หาลูกค้ากลุ่มแรก และจัดขั้นตอนให้ทำซ้ำได้ โดยใช้ AI เป็นผู้ช่วยในทุกช่วง ออกแบบมาสำหรับคนไม่มีพื้นฐานเทคนิค เน้นทำตามได้จริง ไม่ใช่สูตรลัดรวยเร็ว",
    toc: [
      "สัปดาห์ที่ 1 · วางฐานให้พร้อมขาย — หาไอเดีย ปั้นสินค้า ตั้งราคา เปิดหน้าร้าน (วันที่ 1-7)",
      "สัปดาห์ที่ 2 · หาลูกค้ากลุ่มแรก — วางระบบคอนเทนต์ ตอบแชท และปิดออเดอร์แรกด้วย AI (วันที่ 8-14)",
      "สัปดาห์ที่ 3 · ทำให้คนหาเจอ — Google Business, Maps, บทความ และโฆษณางบเล็ก (วันที่ 15-21)",
      "สัปดาห์ที่ 4 · จัดระบบให้ทำซ้ำได้ — automation, ขายซ้ำ, upsell และเก็บรายชื่อลูกค้า (วันที่ 22-30)",
    ],
    forWho: [
      "คนอยากเริ่มธุรกิจจากศูนย์ ยังไม่รู้ว่าจะเริ่มจากอะไร",
      "ฟรีแลนซ์หรือร้านค้าออนไลน์ที่อยากใช้ AI ประหยัดเวลาและลดต้นทุน",
      "คนที่ตั้งใจลงมือทำจริง ไม่ใช่หาสูตรลัดรวยเร็ว",
    ],
  },
];

export function getEbookBySlug(slug: string): Ebook | undefined {
  return ebooks.find((e) => e.slug === slug);
}
