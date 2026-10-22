import { APP_NAME } from "@/shared/constants/Site";
import type { PrivacySection } from "../types/Privacy";

export const PRIVACY_COPY = {
  linkLabel: "Kebijakan privasi",
  title: "Kebijakan privasi",
  updatedAt: "Terakhir diperbarui: 21 Oktober 2026",
  intro: `${APP_NAME} adalah proyek pribadi berupa chatbot yang merekomendasikan lagu sesuai mood. Halaman ini menjelaskan data apa yang disimpan dan bagaimana data itu dipakai.`,
  contactLabel: "Pertanyaan atau permintaan penghapusan data:",
  contactEmail: "dindaatikahh@gmail.com",
} as const;

export const PRIVACY_SECTIONS: readonly PrivacySection[] = [
  {
    title: "Data yang kami simpan",
    items: [
      "Data akun Google saat kamu masuk: nama, alamat email, dan foto profil.",
      "Isi obrolan: pesan yang kamu kirim, balasan chatbot, dan daftar lagu yang ditampilkan.",
      "Perkiraan mood dari ceritamu (misalnya sedih atau senang) beserta tingkat intensitas dan waktunya, yang dicatat chatbot untuk halaman riwayat mood. Ini hanya perkiraan otomatis, bukan penilaian kesehatan atau diagnosis.",
      "Data teknis: cookie sesi agar kamu tetap masuk, alamat IP dan jenis perangkat yang tercatat pada sesi, serta penghitung jumlah pesan untuk mencegah penyalahgunaan.",
    ],
  },
  {
    title: "Cara data dipakai",
    text: "Data dipakai hanya untuk menjalankan fitur aplikasi: mengenali akunmu, menyimpan riwayat obrolan dan mood supaya bisa dilihat kembali, dan membatasi penyalahgunaan. Data tidak dijual dan tidak dipakai untuk iklan.",
  },
  {
    title: "Layanan pihak ketiga",
    items: [
      "Google: untuk masuk dengan akun Google, dan Google Gemini yang memproses isi obrolanmu untuk menyusun balasan. Perlakuan data oleh Google mengikuti ketentuan Google, dan pada paket gratis Google dapat menggunakan data tersebut untuk meningkatkan layanannya. Karena itu, hindari menulis data pribadi yang sensitif di obrolan.",
      "Neon: menyimpan database akun dan riwayat obrolan.",
      "Vercel: menjalankan dan menyajikan aplikasi.",
      "Last.fm dan Deezer: menerima judul lagu, nama artis, atau tag mood untuk pencarian lagu, tanpa identitasmu.",
      "Spotify dan YouTube Music: hanya dibuka lewat tautan pencarian di tab baru. Aplikasi ini tidak terhubung ke akun Spotify atau YouTube-mu.",
    ],
  },
  {
    title: "Penyimpanan dan penghapusan",
    text: "Data disimpan selama akunmu dipakai. Kamu dapat menghapus obrolan kapan saja lewat panel Riwayat, dan itu ikut menghapus mood yang tercatat dari obrolan tersebut. Untuk menghapus akun beserta seluruh datanya, hubungi kontak di bawah, dan permintaan itu akan diproses dalam waktu yang wajar.",
  },
  {
    title: "Keamanan",
    text: "Koneksi ke aplikasi dienkripsi dan akses ke database dibatasi. Meski begitu, tidak ada sistem yang sepenuhnya bebas risiko, jadi kami tidak dapat menjamin keamanan mutlak.",
  },
  {
    title: "Perubahan kebijakan",
    text: "Kebijakan ini dapat diperbarui. Tanggal pembaruan terakhir selalu tercantum di bagian atas halaman ini.",
  },
];