import type { Metadata, Viewport } from "next";

export const APP_NAME = "Moodify";

export const THEME_COLOR = "#fff4e2";

const DESCRIPTION = "Chatbot musik yang memahami moodmu. Ceritakan perasaanmu, dapatkan lagu yang pas.";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const SITE_METADATA: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: APP_NAME,
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  description: DESCRIPTION,
  appleWebApp: { capable: true, title: APP_NAME, statusBarStyle: "default" },
  openGraph: {
    title: APP_NAME,
    description: DESCRIPTION,
    siteName: APP_NAME,
    locale: "id_ID",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const SITE_VIEWPORT: Viewport = {
  themeColor: THEME_COLOR,
  width: "device-width",
  initialScale: 1,
};

export const SITE_DESCRIPTION = DESCRIPTION;