import type { Metadata } from "next";
import HistoryPage from "@/features/chat/components/HistoryPage";

export const metadata: Metadata = { title: "Riwayat" };

export default function HistoryRoute() {
  return <HistoryPage />;
}