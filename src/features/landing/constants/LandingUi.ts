import { APP_NAME } from "@/shared/constants/Site";

export const LANDING_COPY = {
  brand: APP_NAME,
  cta: "Mulai ngobrol",
  headline: { before: "Ceritakan ", highlight: "moodmu", after: ", dapatkan lagunya." },
  tagline: "Chatbot musik yang mendengarkan ceritamu, lalu mencarikan lagu dengan vibes yang pas.",
  demo: {
    user: "Galau banget, kasih lagu yang mirip Yellow dari Coldplay",
    reply:
      "Ini beberapa lagu dengan nuansa hangat dan sendu seperti Yellow. Semoga cocok menemani malammu.",
    tracks: [
      { title: "The Scientist", artist: "Coldplay" },
      { title: "Somewhere Only We Know", artist: "Keane" },
      { title: "Chasing Cars", artist: "Snow Patrol" },
    ],
  },
  stepsTitle: "Cara kerjanya",
  steps: [
    {
      title: "Ceritakan moodmu",
      text: "Tulis perasaanmu, atau sebut satu lagu yang lagi kamu suka.",
    },
    {
      title: "Terima lagu yang pas",
      text: "Moodify mencari lagu dengan vibes serupa dan tidak mengulang lagu yang sudah tampil.",
    },
    {
      title: "Putar dan lanjutkan",
      text: "Dengarkan cuplikan 30 detik, lalu lanjut di Spotify atau YouTube Music.",
    },
  ],
  closing: {
    title: "Siap cari lagu untuk moodmu hari ini?",
    text: "Masuk dengan Google lalu mulai ngobrol. Obrolanmu tersimpan, jadi bisa dilanjutkan kapan saja.",
  },
  footer: "Data musik dari Last.fm dan Deezer. Obrolan diproses oleh Google Gemini.",
} as const;

export const STEP_TONES = ["bg-mint", "bg-blush", "bg-sky"] as const;