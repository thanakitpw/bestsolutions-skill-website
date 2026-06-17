"use client";

import { useEffect } from "react";

export function PixelPurchase({
  eventId,
  value,
  currency,
}: {
  eventId: string;
  value: number;
  currency: string;
}) {
  useEffect(() => {
    window.fbq?.("track", "Purchase", { value, currency }, { eventID: eventId });
  }, [eventId, value, currency]);
  return null;
}
