import { APP_NAME } from "@/shared/constants/Site";

export const CHAT_COPY = {
  title: APP_NAME,
  headline: { before: "Lagi ", highlight: "mood", after: " apa hari ini?" },
  tagline: "Ceritakan perasaanmu atau sebut satu lagu. Nanti aku carikan lagu yang pas.",
  signedOut: {
    headline: { before: "Masuk dulu, yuk, biar bisa ", highlight: "ngobrol", after: " soal musik" },
    tagline: "Masuk dengan Google untuk mulai chat dan menyimpan riwayat obrolanmu.",
  },
  placeholder: "Ceritakan moodmu atau sebut satu lagu...",
  send: "Kirim",
  newChat: "Obrolan baru",
  loading: "Menyiapkan obrolan...",
  typing: `${APP_NAME} sedang menulis...`,
  searching: "Mencari lagu...",
  noResults: "Belum ada lagu yang cocok. Coba sebut judul dan artis lain, atau ceritakan moodmu.",
  toolError: "Pencarian lagu gagal. Kirim pesanmu sekali lagi.",
  requestError: "Pesan belum terkirim. Kirim sekali lagi.",
  modelBusy: `${APP_NAME} lagi kebanjiran permintaan. Coba lagi beberapa menit lagi.`,
  burstLimit: "Pelan-pelan dulu ya. Tunggu sebentar, lalu kirim lagi.",
  dailyLimit: "Batas obrolan hari ini sudah tercapai. Coba lagi besok.",
  sessionExpired: "Sesimu sudah berakhir. Masuk lagi untuk melanjutkan.",
  privacy: "Obrolan diproses oleh Google Gemini. Hindari menulis data pribadi yang sensitif.",
} as const;

export const SUGGESTIONS = [
  "Galau banget, kasih lagu yang mirip Yellow dari Coldplay",
  "Lagu santai buat belajar malam",
  "Lagi senang banget hari ini",
  "Capek seharian, temani aku dengan lagu pelan",
] as const;