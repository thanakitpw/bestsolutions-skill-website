/* Stroke icons (stroke color comes from CSS, e.g. .icon-tile svg { stroke:#fff }) */
import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const XCircle = () => (
  <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M15 9l-6 6M9 9l6 6" /></svg>
);
export const Star = () => (
  <svg {...base}><path d="M12 2l2.4 5.2 5.6.6-4.2 3.9 1.2 5.6L12 19.8 6.8 22l1.2-5.6L4 12.4l5.6-.6z" /></svg>
);
export const ArrowRight = () => (
  <svg {...base}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);
export const CheckCircle = () => (
  <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M8 12l2.5 2.5L16 9" /></svg>
);
export const Clock = () => (
  <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const CreditCard = () => (
  <svg {...base}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></svg>
);
export const ShieldCheck = () => (
  <svg {...base}><path d="M12 3l7 3v5c0 4.5-2.9 8.6-7 10-4.1-1.4-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
);
export const Video = () => (
  <svg {...base}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3z" /></svg>
);
export const Play = () => (
  <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M10 9l5 3-5 3z" /></svg>
);
export const Chat = () => (
  <svg {...base}><path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" /></svg>
);
export const Doc = () => (
  <svg {...base}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6" /></svg>
);
export const Bolt = () => (
  <svg {...base}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
);
export const Layers = () => (
  <svg {...base}><path d="M12 2l9 5-9 5-9-5z" /><path d="M3 12l9 5 9-5" /></svg>
);
export const Database = () => (
  <svg {...base}><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /></svg>
);
export const Layout = () => (
  <svg {...base}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></svg>
);
export const Clipboard = () => (
  <svg {...base}><rect x="6" y="4" width="12" height="18" rx="2" /><path d="M9 9h6M9 13h6M9 17h3" /></svg>
);
export const CheckSquare = () => (
  <svg {...base}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 12l2 2 4-4" /></svg>
);
export const Users = () => (
  <svg {...base}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></svg>
);
export const Info = () => (
  <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></svg>
);
export const Bot = () => (
  <svg {...base}><path d="M12 8V4" /><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M2 14h2M20 14h2" /><path d="M9 13h.01M15 13h.01" /><path d="M9 17h6" /></svg>
);
export const Wand = () => (
  <svg {...base}><path d="M15 4V2M15 10V8M12 5h2M16 5h2" /><path d="M5 21l14-14-2-2L3 19z" /><path d="M9 15l-2-2" /></svg>
);
export const Sitemap = () => (
  <svg {...base}><rect x="9" y="3" width="6" height="4" rx="1" /><rect x="3" y="17" width="6" height="4" rx="1" /><rect x="15" y="17" width="6" height="4" rx="1" /><path d="M12 7v4M6 17v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" /></svg>
);
export const Palette = () => (
  <svg {...base}><path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 1.4-3.4 1.9 1.9 0 0 1 1.35-3.25H18a6 6 0 0 0 0-12z" /><path d="M7.5 10h.01M9.5 6.5h.01M14.5 6.5h.01M16.5 10h.01" /></svg>
);
export const Code = () => (
  <svg {...base}><path d="M8 9l-4 3 4 3" /><path d="M16 9l4 3-4 3" /><path d="M14 4l-4 16" /></svg>
);
export const Chart = () => (
  <svg {...base}><path d="M4 19V5" /><path d="M4 19h16" /><rect x="7" y="11" width="3" height="5" rx="1" /><rect x="12" y="7" width="3" height="9" rx="1" /><rect x="17" y="9" width="3" height="7" rx="1" /></svg>
);
export const Bug = () => (
  <svg {...base}><path d="M8 6a4 4 0 0 1 8 0" /><rect x="6" y="8" width="12" height="11" rx="5" /><path d="M3 13h3M18 13h3M4 19l3-2M20 19l-3-2M4 7l3 2M20 7l-3 2M12 8v11" /></svg>
);
export const Briefcase = () => (
  <svg {...base}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /><path d="M10 12v2h4v-2" /></svg>
);
