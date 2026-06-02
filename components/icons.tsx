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
