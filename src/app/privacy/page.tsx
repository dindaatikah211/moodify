import type { Metadata } from "next";
import PrivacyPage from "@/features/legal/components/PrivacyPage";

export const metadata: Metadata = { title: "Kebijakan privasi" };

export default function PrivacyRoute() {
  return <PrivacyPage />;
}