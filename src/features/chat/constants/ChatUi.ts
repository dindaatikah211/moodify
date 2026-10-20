import { APP_NAME } from "@/shared/constants/Site";

export const CHAT_COPY = {
  title: APP_NAME,
  headline: { before: "Lagi ", highlight: "mood", after: " apa hari ini?" },
  tagline: "Ceritakan perasaanmu atau sebut satu lagu. Nanti aku carikan lagu yang pas.",
  placeholder: "Ceritakan moodmu atau sebut satu lagu...",
  send: "Kirim",
  typing: `${APP_NAME} sedang menulis...`,
  searching: "Mencari lagu...",
  noResults: "Belum ada lagu yang cocok. Coba sebut judul dan artis lain, atau ceritakan moodmu.",
  toolError: "Pencarian lagu gagal. Kirim pesanmu sekali lagi.",
  requestError: "Pesan belum terkirim. Kirim sekali lagi.",
  privacy: "Obrolan diproses oleh Google Gemini. Hindari menulis data pribadi yang sensitif.",
} as const;

export const SUGGESTIONS = [
  "Galau banget, kasih lagu yang mirip Yellow dari Coldplay",
  "Lagu santai buat belajar malam",
  "Lagi senang banget hari ini",
  "Capek seharian, temani aku dengan lagu pelan",
] as const;