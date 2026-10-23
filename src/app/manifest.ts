import type { MetadataRoute } from "next";
import { APP_NAME, SITE_DESCRIPTION, THEME_COLOR } from "@/shared/constants/Site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/chat",
    scope: "/",
    display: "standalone",
    lang: "id",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    categories: ["music", "lifestyle"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}