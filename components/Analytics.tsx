import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Loads Google trackers only when their env var is set — safe (renders nothing)
 * until you provide IDs. Set the vars in .env.local (dev) and in Vercel
 * Project → Settings → Environment Variables (production).
 *   NEXT_PUBLIC_GTM_ID  → Google Tag Manager (GTM-XXXXXXX)
 *   NEXT_PUBLIC_GA_ID   → Google Analytics 4 (G-XXXXXXXXXX)
 * Tip: if you load GA4 *inside* GTM, set only NEXT_PUBLIC_GTM_ID (avoid double counting).
 */
export function Analytics() {
  return (
    <>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </>
  );
}
