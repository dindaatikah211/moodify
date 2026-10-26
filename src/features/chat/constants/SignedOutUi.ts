import { History, ShieldCheck, Smile } from "lucide-react";

export const SIGNED_OUT_COPY = {
  title: "Yang kamu dapat setelah masuk",
  perks: [
    {
      icon: History,
      tone: "bg-mint",
      title: "Riwayat tersimpan",
      text: "Obrolanmu tersimpan, jadi bisa dilanjutkan kapan saja.",
    },
    {
      icon: Smile,
      tone: "bg-blush",
      title: "Mood tercatat",
      text: "Perkiraan moodmu dicatat dan bisa dilihat lagi di halaman riwayat.",
    },
    {
      icon: ShieldCheck,
      tone: "bg-sky",
      title: "Cukup akun Google",
      text: "Tanpa password baru, dan tidak terhubung ke akun Spotify atau YouTube-mu.",
    },
  ],
} as const;