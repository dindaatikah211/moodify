import type { Metadata } from "next";
import MoodView from "@/features/mood/components/MoodView";

export const metadata: Metadata = { title: "Riwayat mood" };

export default function MoodRoute() {
  return <MoodView />;
}