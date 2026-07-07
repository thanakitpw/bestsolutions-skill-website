"use client";

import { useState } from "react";

// ปุ่มคัดลอกข้อความ (เช่น เลขบัญชี) — client component เล็กๆ
export function CopyButton({
  value,
  className = "",
  label = "คัดลอก",
}: {
  value: string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard ไม่รองรับ — เงียบไว้ */
        }
      }}
    >
      {copied ? "คัดลอกแล้ว ✓" : label}
    </button>
  );
}
