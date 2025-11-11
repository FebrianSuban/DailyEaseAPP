# DailyEase

Aplikasi produktivitas mobile modern dan ringan yang dibangun dengan React Native (Expo) untuk membantu pengguna mengelola kehidupan sehari-hari mereka melalui manajemen tugas, pelacakan kebiasaan, dan statistik progres.

## Fitur

### 🎯 Fitur Inti
- **Daftar Tugas**: Tambah, edit, selesaikan, dan hapus tugas harian dengan tingkat prioritas (rendah, sedang, tinggi)
- **Pelacak Kebiasaan**: Lacak kebiasaan harian dengan indikator progres visual dan penghitungan seri
- **Dashboard Statistik**: Lihat metrik produktivitas Anda termasuk tingkat penyelesaian tugas, penyelesaian kebiasaan mingguan, dan seri saat ini
- **Mode Gelap & Terang**: Pengalihan tema otomatis berdasarkan preferensi sistem, dengan opsi penggantian manual
- **Autentikasi Pengguna**: Autentikasi email/kata sandi yang aman menggunakan Supabase
- **Sinkronisasi Cloud**: Semua data secara otomatis disinkronkan di seluruh perangkat melalui basis data Supabase

### ✨ Sorotan UI/UX
- Antarmuka bersih dan modern dengan transisi yang mulus
- Navigasi tab bawah untuk akses mudah ke semua fitur
- Tingkat prioritas yang dikodekan warna dan warna kebiasaan khusus
- Visualisasi progres mingguan untuk kebiasaan
- Statistik dan wawasan real-time

## Stack Teknologi

- **Framework**: React Native (Expo SDK 54)
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Autentikasi**: Supabase Auth
- **Ikon**: Lucide React Native
- **Styling**: React Native StyleSheet API

## Memulai

### Prasyarat
- Node.js 18+
- Aplikasi Expo Go (untuk pengujian di perangkat fisik)

### Instalasi

1. Instal dependensi:
```bash
npm install
```

2. Variabel lingkungan sudah dikonfigurasi di `.env`

3. Jalankan server pengembangan:
```bash
npm run dev
```

4. Buka aplikasi:
   - Pindai kode QR dengan Expo Go (Android) atau Aplikasi Kamera (iOS)
   - Tekan `w` untuk membuka di browser web

## Struktur Proyek

```
├── app/
│   ├── (tabs)/           # Layar navigasi berbasis tab
│   │   ├── index.tsx     # Layar Beranda (Tugas)
│   │   ├── habits.tsx    # Layar Kebiasaan
│   │   ├── stats.tsx     # Layar Statistik
│   │   └── settings.tsx  # Layar Pengaturan
│   ├── auth/             # Layar autentikasi
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   └── _layout.tsx       # Tata letak root dengan perutean auth
├── components/           # Komponen UI yang dapat digunakan kembali
│   ├── TaskCard.tsx
│   ├── HabitCard.tsx
│   └── AddButton.tsx
├── store/               # Manajemen state Zustand
│   ├── useAuthStore.ts
│   ├── useTaskStore.ts
│   ├── useHabitStore.ts
│   └── useSettingsStore.ts
├── lib/
│   └── supabase.ts      # Konfigurasi klien Supabase
├── types/               # Definisi tipe TypeScript
├── constants/           # Konstanta aplikasi (warna, dll)
└── hooks/              # Hook React khusus
```

## Skema Database

### Tabel
- **tasks**: Tugas harian pengguna dengan prioritas, status penyelesaian, dan pengingat opsional
- **habits**: Definisi kebiasaan dengan warna khusus dan frekuensi target
- **habit_logs**: Catatan penyelesaian kebiasaan harian
- **user_settings**: Preferensi pengguna termasuk tema dan nama pengguna

Semua tabel dilindungi dengan kebijakan Row Level Security (RLS) yang memastikan pengguna hanya dapat mengakses data mereka sendiri.

## Penggunaan

### Membuat Tugas
1. Navigasi ke tab Beranda
2. Ketuk tombol +
3. Masukkan detail tugas dan pilih prioritas
4. Ketuk "Tambah Tugas"

### Melacak Kebiasaan
1. Navigasi ke tab Kebiasaan
2. Ketuk tombol +
3. Masukkan nama kebiasaan dan pilih warna
4. Tandai kebiasaan sebagai selesai setiap hari

### Melihat Statistik
Navigasi ke tab Statistik untuk melihat:
- Tingkat penyelesaian tugas
- Penyelesaian kebiasaan mingguan
- Seri saat ini
- Ringkasan keseluruhan

### Menyesuaikan Pengaturan
1. Navigasi ke tab Pengaturan
2. Pilih tema pilihan Anda (Terang, Gelap, atau Otomatis)
3. Lihat informasi akun
4. Keluar jika diperlukan

## Pengembangan

### Pemeriksaan Tipe
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

### Membangun untuk Produksi
```bash
npm run build:web
```

## Lisensi

© 2025 Febrian Suban. Proyek ini dilisensikan di bawah lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail lengkap.

Dengan menggunakan, memodifikasi, atau mendistribusikan proyek ini, Anda setuju dengan ketentuan lisensi MIT yang menyebutkan nama pencipta asli (Febrian Suban).
