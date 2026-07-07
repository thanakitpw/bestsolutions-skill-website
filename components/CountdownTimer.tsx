"use client";

import { useEffect, useState } from "react";

const DAY_MS = 24 * 60 * 60 * 1000;

// นับถอยหลัง — ค่าเริ่มต้น evergreen (นับ N วันต่อผู้เข้าชม เก็บใน localStorage)
// ถ้าอยากใช้กำหนดวันตายตัว ส่ง prop deadline เป็น ISO string เช่น "2026-07-31T23:59:59+07:00"
export function CountdownTimer({
  days = 5,
  deadline,
  storageKey = "sp-countdown-start-business",
}: {
  days?: number;
  deadline?: string;
  storageKey?: string;
}) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    let target: number;
    if (deadline) {
      target = new Date(deadline).getTime();
    } else {
      const now = Date.now();
      let stored = Number(localStorage.getItem(storageKey));
      if (!stored || Number.isNaN(stored) || stored < now) {
        stored = now + days * DAY_MS;
        localStorage.setItem(storageKey, String(stored));
      }
      target = stored;
    }
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [days, deadline, storageKey]);

  // ก่อน mount ใช้ค่าเริ่มต้นเต็มจำนวนวัน → server กับ client render ตรงกัน (กัน hydration mismatch)
  const ms = remaining ?? days * DAY_MS;
  const d = Math.floor(ms / DAY_MS);
  const h = Math.floor((ms % DAY_MS) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);

  const units: [number, string][] = [
    [d, "วัน"],
    [h, "ชั่วโมง"],
    [m, "นาที"],
    [s, "วินาที"],
  ];

  return (
    <div className="countdown" suppressHydrationWarning>
      {units.map(([v, label], i) => (
        <div className="cd-unit" key={i}>
          <span className="cd-num">{String(v).padStart(2, "0")}</span>
          <span className="cd-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
