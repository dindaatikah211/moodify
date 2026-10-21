import type { Metadata } from "next";

export const APP_NAME = "Moodify";

const DESCRIPTION = "Chatbot musik yang memahami moodmu. Ceritakan perasaanmu, dapatkan lagu yang pas.";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const SITE_METADATA: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  description: DESCRIPTION,
  openGraph: {
    title: APP_NAME,
    description: DESCRIPTION,
    siteName: APP_NAME,
    locale: "id_ID",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};