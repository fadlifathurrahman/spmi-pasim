// ==========================
// Data Jenis Indikator
// ==========================
export const jenisIndikatorData = [
    { id: 1, kode: "IKU", nama_indikator: "Indikator Kinerja Utama", status: "aktif" },
    { id: 2, kode: "IKT", nama_indikator: "Indikator Kinerja Tambahan", status: "aktif" }
];

// ==========================
// Data Tahun Akademik & Periode
// ==========================
export const tahunAkademikData = [
    { id: 1, rentang: "2022/2023", status: "pasif" },
    { id: 2, rentang: "2023/2024", status: "aktif" },
    { id: 3, rentang: "2024/2025", status: "aktif" }
];

export const periodeData = [
    { id: 1, id_tahunakademik: 2, id_prodi: 1, status: "aktif" },
    { id: 2, id_tahunakademik: 2, id_prodi: 2, status: "aktif" },
    { id: 3, id_tahunakademik: 3, id_prodi: 3, status: "pasif" },
    { id: 4, id_tahunakademik: 3, id_prodi: 4, status: "pasif" }
];

// ==========================
// Data Fakultas & Prodi
// ==========================
export const fakultasData = [
    { id: 1, nama_fakultas: "Fakultas Ilmu Komputer", status: "aktif" },
    { id: 2, nama_fakultas: "Fakultas Ekonomi", status: "aktif" },
    { id: 3, nama_fakultas: "Fakultas Teknik", status: "pasif" }
];

export const prodiData = [
    { id: 1, nama_prodi: "Teknik Informatika", id_fakultas: 1, status: "aktif" },
    { id: 2, nama_prodi: "Sistem Informasi", id_fakultas: 1, status: "aktif" },
    { id: 3, nama_prodi: "Manajemen", id_fakultas: 2, status: "aktif" },
    { id: 4, nama_prodi: "Akuntansi", id_fakultas: 2, status: "aktif" }
];

// ==========================
// Data Laporan Prodi
// ==========================
export const laporanProdiData = [
    { id: 1, id_prodi: 1, id_evaluasi: 1, status: "aktif" },
    { id: 2, id_prodi: 1, id_evaluasi: 2, status: "aktif" },
    { id: 3, id_prodi: 2, id_evaluasi: 3, status: "aktif" },
    { id: 4, id_prodi: 3, id_evaluasi: 4, status: "pasif" },
    { id: 5, id_prodi: 3, id_evaluasi: 5, status: "pasif" }
];

// ==========================
// Data User (ditambah field status)
// ==========================
export const dataUser = [
    {
        id: 1,
        role: "admin",
        name: "Admin SPMI",
        email: "admin@gmail.com",
        password: "123",
        status: "aktif"
    },
    {
        id: 2,
        role: "user",
        name: "Auditor Internal 1",
        email: "auditor1@university.ac.id",
        password: "auditor123",
        status: "aktif"
    },
    {
        id: 3,
        role: "user",
        name: "Auditor Internal 2",
        email: "auditor2@university.ac.id",
        password: "auditor123",
        status: "pasif"
    }
];

export const standarData = [
    { id: 1, nama: "Standar Kompetensi Lulusan", status: "aktif" },
    { id: 2, nama: "Standar Isi Pembelajaran", status: "aktif" },
    { id: 3, nama: "Standar Proses Pembelajaran", status: "aktif" },
    { id: 4, nama: "Standar Penilaian Pembelajaran", status: "aktif" },
    { id: 5, nama: "Standar Dosen dan Tenaga Kependidikan", status: "aktif" },
    { id: 6, nama: "Standar Sarana dan Prasarana", status: "aktif" },
    { id: 7, nama: "Standar Pengelolaan Pembelajaran", status: "aktif" },
    { id: 8, nama: "Standar Pembiayaan Pendidikan", status: "aktif" },
    { id: 9, nama: "Standar Penelitian", status: "aktif" },
    { id: 10, nama: "Standar Pengabdian kepada Masyarakat", status: "aktif" },
    { id: 11, nama: "Standar Hasil Penelitian", status: "pasif" },
    { id: 12, nama: "Standar Isi Penelitian", status: "pasif" },
    { id: 13, nama: "Standar Proses Penelitian", status: "pasif" },
    { id: 14, nama: "Standar Penilaian Penelitian", status: "pasif" },
    { id: 15, nama: "Standar Peneliti dan Tenaga Penunjang Penelitian", status: "pasif" },
    { id: 16, nama: "Standar Sarana dan Prasarana Penelitian", status: "pasif" },
    { id: 17, nama: "Standar Pengelolaan Penelitian", status: "pasif" },
    { id: 18, nama: "Standar Pembiayaan dan Pendanaan Penelitian", status: "pasif" },
    { id: 19, nama: "Standar Hasil Pengabdian kepada Masyarakat", status: "pasif" },
    { id: 20, nama: "Standar Isi Pengabdian kepada Masyarakat", status: "pasif" },
    { id: 21, nama: "Standar Proses Pengabdian kepada Masyarakat", status: "pasif" },
    { id: 22, nama: "Standar Penilaian Pengabdian kepada Masyarakat", status: "pasif" },
    { id: 23, nama: "Standar Pelaksana Pengabdian kepada Masyarakat", status: "pasif" },
    { id: 24, nama: "Standar Sarana dan Prasarana Pengabdian kepada Masyarakat", status: "pasif" },
];

// Data Indikator
export const indikatorData = [
    { id: 1, jenis: "Indikator Kinerja Utama (IKU)", status: "aktif" },
    { id: 2, jenis: "Indikator Kinerja Tambahan (IKT)", status: "aktif" },
];

// Data Substandar (mengacu Univ Borobudur, copy persis)
export const substandarData = [
    // ===== Standar 1 – Kompetensi Lulusan =====
    { id: 1, id_standar: 1, nama: "Rumusan capaian pembelajaran lulusan sesuai KKNI dan SN-Dikti", status: "aktif" },
    { id: 2, id_standar: 1, nama: "Ketersediaan dokumen CPL dalam buku panduan program studi", status: "aktif" },
    { id: 3, id_standar: 1, nama: "Tracer study lulusan untuk menilai kesesuaian bidang kerja", status: "aktif" },

    // ===== Standar 2 – Isi Pembelajaran =====
    { id: 4, id_standar: 2, nama: "Struktur kurikulum sesuai capaian pembelajaran lulusan", status: "aktif" },
    { id: 5, id_standar: 2, nama: "Kurikulum ditinjau minimal setiap 5 tahun", status: "aktif" },
    { id: 6, id_standar: 2, nama: "Mata kuliah wajib universitas, fakultas, dan program studi tersedia", status: "aktif" },

    // ===== Standar 3 – Proses Pembelajaran =====
    { id: 7, id_standar: 3, nama: "Setiap mata kuliah memiliki Rencana Pembelajaran Semester (RPS)", status: "aktif" },
    { id: 8, id_standar: 3, nama: "Proses pembelajaran dilaksanakan sesuai RPS", status: "aktif" },
    { id: 9, id_standar: 3, nama: "Monitoring dan evaluasi pembelajaran dilakukan setiap semester", status: "aktif" },

    // ===== Standar 4 – Penilaian Pembelajaran =====
    { id: 10, id_standar: 4, nama: "Tersedia pedoman dan prosedur penilaian hasil belajar", status: "aktif" },
    { id: 11, id_standar: 4, nama: "Penilaian hasil belajar dilakukan secara transparan dan akuntabel", status: "aktif" },
    { id: 12, id_standar: 4, nama: "Ujian, remediasi, dan ujian ulang dilaksanakan sesuai prosedur", status: "aktif" },

    // ===== Standar 5 – Dosen dan Tenaga Kependidikan =====
    { id: 13, id_standar: 5, nama: "Kualifikasi akademik dosen sesuai ketentuan BAN-PT", status: "aktif" },
    { id: 14, id_standar: 5, nama: "Kompetensi dosen sesuai bidang ilmu yang diampu", status: "aktif" },
    { id: 15, id_standar: 5, nama: "Tenaga kependidikan memiliki sertifikat kompetensi sesuai bidang", status: "aktif" },

    // ===== Standar 6 – Sarana dan Prasarana =====
    { id: 16, id_standar: 6, nama: "Laboratorium, perpustakaan, studio tersedia sesuai kebutuhan", status: "aktif" },
    { id: 17, id_standar: 6, nama: "Ruang kuliah dan fasilitas belajar memenuhi standar rasio mahasiswa", status: "aktif" },
    { id: 18, id_standar: 6, nama: "Akses teknologi informasi dan komunikasi untuk pembelajaran tersedia", status: "aktif" },

    // ===== Standar 7 – Pengelolaan =====
    { id: 19, id_standar: 7, nama: "Tata pamong, kepemimpinan, sistem pengelolaan, dan budaya akademik terdokumentasi", status: "aktif" },
    { id: 20, id_standar: 7, nama: "Sistem Penjaminan Mutu Internal (SPMI) dilaksanakan di seluruh unit", status: "aktif" },
    { id: 21, id_standar: 7, nama: "Tersedia Renstra dan Renop yang konsisten dengan visi, misi, tujuan", status: "aktif" },

    // ===== Standar 8 – Pembiayaan =====
    { id: 22, id_standar: 8, nama: "Tersedia sumber pendanaan yang memadai", status: "aktif" },
    { id: 23, id_standar: 8, nama: "Alokasi dan penggunaan dana sesuai rencana anggaran", status: "aktif" },
    { id: 24, id_standar: 8, nama: "Laporan keuangan disusun akuntabel dan transparan", status: "aktif" },

    // ===== Standar 9 – Hasil Penelitian =====
    { id: 25, id_standar: 9, nama: "Penelitian menghasilkan publikasi ilmiah", status: "aktif" },
    { id: 26, id_standar: 9, nama: "Penelitian menghasilkan HKI, paten, atau produk terapan", status: "aktif" },

    // ===== Standar 10 – Isi Penelitian =====
    { id: 27, id_standar: 10, nama: "Roadmap penelitian sesuai renstra universitas", status: "aktif" },
    { id: 28, id_standar: 10, nama: "Kebijakan penelitian sesuai bidang unggulan", status: "aktif" },

    // ===== Standar 11 – Proses Penelitian =====
    { id: 29, id_standar: 11, nama: "Proposal penelitian ditinjau oleh reviewer sebelum pendanaan", status: "aktif" },
    { id: 30, id_standar: 11, nama: "Penelitian dilaksanakan sesuai proposal", status: "aktif" },
    { id: 31, id_standar: 11, nama: "Evaluasi penelitian dilakukan secara periodik", status: "aktif" },

    // ===== Standar 12 – Penilaian Penelitian =====
    { id: 32, id_standar: 12, nama: "Evaluasi proposal penelitian oleh reviewer internal", status: "aktif" },
    { id: 33, id_standar: 12, nama: "Evaluasi luaran penelitian terhadap target capaian", status: "aktif" },

    // ===== Standar 13 – SDM Penelitian =====
    { id: 34, id_standar: 13, nama: "Dosen aktif dalam penelitian sesuai bidang ilmu", status: "aktif" },
    { id: 35, id_standar: 13, nama: "Pembinaan peneliti muda melalui program internal", status: "aktif" },

    // ===== Standar 14 – Sarana dan Prasarana Penelitian =====
    { id: 36, id_standar: 14, nama: "Laboratorium penelitian tersedia dan berfungsi", status: "aktif" },
    { id: 37, id_standar: 14, nama: "Akses ke database, jurnal, dan referensi ilmiah tersedia", status: "aktif" },

    // ===== Standar 15 – Pengelolaan Penelitian =====
    { id: 38, id_standar: 15, nama: "Unit pengelola penelitian tersedia di universitas/fakultas", status: "aktif" },
    { id: 39, id_standar: 15, nama: "Audit mutu internal penelitian dilakukan rutin", status: "aktif" },

    // ===== Standar 16 – Pembiayaan Penelitian =====
    { id: 40, id_standar: 16, nama: "Dana penelitian internal tersedia setiap tahun", status: "aktif" },
    { id: 41, id_standar: 16, nama: "Dana penelitian eksternal diperoleh melalui hibah kompetitif", status: "aktif" },

    // ===== Standar 17 – Hasil PkM =====
    { id: 42, id_standar: 17, nama: "Kegiatan PkM berdampak pada masyarakat sasaran", status: "aktif" },
    { id: 43, id_standar: 17, nama: "PkM menghasilkan publikasi, produk, atau model pemberdayaan", status: "aktif" },

    // ===== Standar 18 – Isi PkM =====
    { id: 44, id_standar: 18, nama: "Roadmap PkM sesuai renstra universitas", status: "aktif" },
    { id: 45, id_standar: 18, nama: "Tema PkM sesuai kebutuhan masyarakat dan bidang unggulan", status: "aktif" },

    // ===== Standar 19 – Proses PkM =====
    { id: 46, id_standar: 19, nama: "Proposal PkM disusun dan diseleksi sebelum pendanaan", status: "aktif" },
    { id: 47, id_standar: 19, nama: "PkM dilaksanakan sesuai proposal", status: "aktif" },
    { id: 48, id_standar: 19, nama: "Monitoring dan evaluasi PkM dilakukan setelah kegiatan", status: "aktif" },

    // ===== Standar 20 – Penilaian PkM =====
    { id: 49, id_standar: 20, nama: "Evaluasi proposal PkM dilakukan reviewer internal", status: "aktif" },
    { id: 50, id_standar: 20, nama: "Evaluasi dampak PkM dilakukan oleh tim universitas", status: "aktif" },

    // ===== Standar 21 – SDM PkM =====
    { id: 51, id_standar: 21, nama: "Dosen melaksanakan PkM sesuai bidang keilmuan", status: "aktif" },
    { id: 52, id_standar: 21, nama: "Mahasiswa terlibat dalam kegiatan PkM", status: "aktif" },

    // ===== Standar 22 – Sarpras PkM =====
    { id: 53, id_standar: 22, nama: "Fasilitas mendukung pelaksanaan PkM", status: "aktif" },
    { id: 54, id_standar: 22, nama: "Tersedia mitra kerjasama untuk PkM", status: "aktif" },

    // ===== Standar 23 – Pengelolaan PkM =====
    { id: 55, id_standar: 23, nama: "Unit pengelola PkM tersedia di universitas/fakultas", status: "aktif" },
    { id: 56, id_standar: 23, nama: "Audit mutu internal PkM dilakukan rutin", status: "aktif" },

    // ===== Standar 24 – Pembiayaan PkM =====
    { id: 57, id_standar: 24, nama: "Dana internal PkM tersedia setiap tahun", status: "aktif" },
    { id: 58, id_standar: 24, nama: "Dana eksternal PkM diperoleh melalui mitra/hibah", status: "aktif" },
];

// Data Target
export const targetData = [
    // ===== Standar 1 – Kompetensi Lulusan =====
    { id: 1, deskripsi: "Terdokumentasinya rumusan Capaian Pembelajaran Lulusan sesuai dengan kualifikasi KKNI dalam buku panduan program studi", status: "aktif" },
    { id: 2, deskripsi: "Terdokumentasinya kurikulum dengan Capaian Pembelajaran Lulusan", status: "aktif" },
    { id: 3, deskripsi: "Mahasiswa lulus dengan tepat waktu (untuk S1 : 4 – 4,5 tahun, dan untuk D3 : 3 – 3,5 tahun)", status: "aktif" },

    // ===== Standar 2 – Isi Pembelajaran =====
    { id: 4, deskripsi: "Tersedianya struktur kurikulum yang ditinjau secara berkala setiap 5 tahun", status: "aktif" },
    { id: 5, deskripsi: "Kurikulum memuat mata kuliah wajib universitas, fakultas, dan program studi", status: "aktif" },
    { id: 6, deskripsi: "Kurikulum sesuai dengan kebutuhan pengguna lulusan dan perkembangan IPTEK", status: "aktif" },

    // ===== Standar 3 – Proses Pembelajaran =====
    { id: 7, deskripsi: "Setiap mata kuliah memiliki Rencana Pembelajaran Semester (RPS) yang terdokumentasi", status: "aktif" },
    { id: 8, deskripsi: "Proses pembelajaran dilaksanakan sesuai RPS dan kalender akademik", status: "aktif" },
    { id: 9, deskripsi: "Monitoring dan evaluasi pembelajaran dilakukan setiap semester", status: "aktif" },

    // ===== Standar 4 – Penilaian Pembelajaran =====
    { id: 10, deskripsi: "Ketersediaan pedoman dan prosedur penilaian", status: "aktif" },
    { id: 11, deskripsi: "Penilaian hasil belajar dilaksanakan secara transparan dan akuntabel", status: "aktif" },
    { id: 12, deskripsi: "Ujian, remediasi, dan ujian ulang dilaksanakan sesuai prosedur", status: "aktif" },

    // ===== Standar 5 – Dosen & Tenaga Kependidikan =====
    { id: 13, deskripsi: "Tersedianya tenaga pendidik dengan kualifikasi akademik minimal S2 untuk program sarjana", status: "aktif" },
    { id: 14, deskripsi: "≥70% dosen tetap sesuai bidang keilmuan yang diampu", status: "aktif" },
    { id: 15, deskripsi: "Tenaga kependidikan memiliki kompetensi dan sertifikat sesuai bidang tugas", status: "aktif" },

    // ===== Standar 6 – Sarana & Prasarana =====
    { id: 16, deskripsi: "Tersedianya ruang kuliah yang sesuai dengan jumlah mahasiswa", status: "aktif" },
    { id: 17, deskripsi: "Laboratorium, perpustakaan, dan studio tersedia sesuai kebutuhan kurikulum", status: "aktif" },
    { id: 18, deskripsi: "Ketersediaan akses teknologi informasi dan komunikasi untuk mendukung pembelajaran", status: "aktif" },

    // ===== Standar 7 – Pengelolaan =====
    { id: 19, deskripsi: "Dokumen tata pamong, kepemimpinan, dan budaya akademik tersedia", status: "aktif" },
    { id: 20, deskripsi: "Sistem Penjaminan Mutu Internal (SPMI) dilaksanakan secara konsisten", status: "aktif" },
    { id: 21, deskripsi: "Renstra dan Renop tersedia sesuai visi, misi, dan tujuan universitas", status: "aktif" },

    // ===== Standar 8 – Pembiayaan =====
    { id: 22, deskripsi: "Tersedia sumber pendanaan yang memadai", status: "aktif" },
    { id: 23, deskripsi: "Alokasi dana sesuai rencana anggaran", status: "aktif" },
    { id: 24, deskripsi: "Laporan keuangan tahunan disusun akuntabel dan transparan", status: "aktif" },

    // ===== Standar 9 – Hasil Penelitian =====
    { id: 25, deskripsi: "Penelitian dosen menghasilkan publikasi ilmiah setiap tahun", status: "aktif" },
    { id: 26, deskripsi: "Hasil penelitian menghasilkan HKI, paten, atau produk inovatif", status: "aktif" },

    // ===== Standar 10 – Isi Penelitian =====
    { id: 27, deskripsi: "Tersedianya roadmap penelitian sesuai renstra universitas", status: "aktif" },
    { id: 28, deskripsi: "≥70% penelitian sesuai roadmap penelitian institusi", status: "aktif" },

    // ===== Standar 11 – Proses Penelitian =====
    { id: 29, deskripsi: "Proposal penelitian ditinjau reviewer internal sebelum didanai", status: "aktif" },
    { id: 30, deskripsi: "≥80% penelitian dilaksanakan sesuai proposal", status: "aktif" },
    { id: 31, deskripsi: "Evaluasi penelitian dilakukan minimal satu kali per tahun", status: "aktif" },

    // ===== Standar 12 – Penilaian Penelitian =====
    { id: 32, deskripsi: "Proposal penelitian dievaluasi oleh reviewer internal", status: "aktif" },
    { id: 33, deskripsi: "Luaran penelitian dievaluasi sesuai target capaian", status: "aktif" },

    // ===== Standar 13 – SDM Penelitian =====
    { id: 34, deskripsi: "≥80% dosen aktif melaksanakan penelitian", status: "aktif" },
    { id: 35, deskripsi: "Tersedia program pembinaan peneliti muda", status: "aktif" },

    // ===== Standar 14 – Sarpras Penelitian =====
    { id: 36, deskripsi: "Laboratorium penelitian berfungsi sesuai standar", status: "aktif" },
    { id: 37, deskripsi: "Akses database, jurnal, dan referensi ilmiah tersedia", status: "aktif" },

    // ===== Standar 15 – Pengelolaan Penelitian =====
    { id: 38, deskripsi: "Unit pengelola penelitian tersedia di universitas/fakultas", status: "aktif" },
    { id: 39, deskripsi: "Audit mutu internal penelitian dilaksanakan rutin", status: "aktif" },

    // ===== Standar 16 – Pembiayaan Penelitian =====
    { id: 40, deskripsi: "Dana penelitian internal dialokasikan setiap tahun", status: "aktif" },
    { id: 41, deskripsi: "≥30% penelitian dibiayai dari sumber eksternal", status: "aktif" },

    // ===== Standar 17 – Hasil PkM =====
    { id: 42, deskripsi: "≥80% kegiatan PkM memberi dampak nyata bagi masyarakat", status: "aktif" },
    { id: 43, deskripsi: "≥20% kegiatan PkM menghasilkan publikasi atau produk", status: "aktif" },

    // ===== Standar 18 – Isi PkM =====
    { id: 44, deskripsi: "Tersedianya roadmap PkM sesuai renstra universitas", status: "aktif" },
    { id: 45, deskripsi: "≥70% PkM sesuai roadmap institusi", status: "aktif" },

    // ===== Standar 19 – Proses PkM =====
    { id: 46, deskripsi: "Proposal PkM disusun sebelum kegiatan dilaksanakan", status: "aktif" },
    { id: 47, deskripsi: "≥80% PkM dilaksanakan sesuai proposal", status: "aktif" },
    { id: 48, deskripsi: "Evaluasi PkM dilakukan pada setiap akhir kegiatan", status: "aktif" },

    // ===== Standar 20 – Penilaian PkM =====
    { id: 49, deskripsi: "Proposal PkM dinilai oleh reviewer internal", status: "aktif" },
    { id: 50, deskripsi: "Dampak PkM dievaluasi oleh tim universitas", status: "aktif" },

    // ===== Standar 21 – SDM PkM =====
    { id: 51, deskripsi: "≥80% dosen melaksanakan PkM setiap tahun", status: "aktif" },
    { id: 52, deskripsi: "≥30% mahasiswa terlibat dalam PkM", status: "aktif" },

    // ===== Standar 22 – Sarpras PkM =====
    { id: 53, deskripsi: "Fasilitas mendukung pelaksanaan PkM", status: "aktif" },
    { id: 54, deskripsi: "≥3 mitra eksternal terjalin untuk pelaksanaan PkM", status: "aktif" },

    // ===== Standar 23 – Pengelolaan PkM =====
    { id: 55, deskripsi: "Unit pengelola PkM tersedia di universitas/fakultas", status: "aktif" },
    { id: 56, deskripsi: "Audit mutu internal PkM dilakukan setiap tahun", status: "aktif" },

    // ===== Standar 24 – Pembiayaan PkM =====
    { id: 57, deskripsi: "Dana internal PkM dialokasikan setiap tahun", status: "aktif" },
    { id: 58, deskripsi: "≥30% PkM didanai oleh sumber eksternal", status: "aktif" },
];

// Data Capaian (unique, termasuk angka/rasio, tanpa duplikasi)
export const capaianData = [
    { id: 1, hasil: "Terdokumentasi", status: "aktif" },
    { id: 2, hasil: "Tepat waktu", status: "aktif" },
    { id: 3, hasil: "Tersedia", status: "aktif" },
    { id: 4, hasil: "Ada", status: "aktif" },
    { id: 5, hasil: "Sesuai", status: "aktif" },
    { id: 6, hasil: "Dilaksanakan", status: "aktif" },
    { id: 7, hasil: "Dievaluasi", status: "aktif" },
    { id: 8, hasil: "Transparan", status: "aktif" },
    { id: 9, hasil: "Sesuai prosedur", status: "aktif" },
    { id: 10, hasil: "Sesuai bidang", status: "aktif" },
    { id: 11, hasil: "Bersertifikat", status: "aktif" },
    { id: 12, hasil: "Memadai", status: "aktif" },
    { id: 13, hasil: "Sesuai anggaran", status: "aktif" },
    { id: 14, hasil: "Akuntabel", status: "aktif" },
    { id: 15, hasil: "Menghasilkan", status: "aktif" },
    { id: 16, hasil: "Sesuai roadmap", status: "aktif" },
    { id: 17, hasil: "Direview", status: "aktif" },
    { id: 18, hasil: "Sesuai target", status: "aktif" },
    { id: 19, hasil: "Aktif", status: "aktif" },
    { id: 20, hasil: "Berfungsi", status: "aktif" },
    { id: 21, hasil: "Berdampak", status: "aktif" },
    { id: 22, hasil: "Terlibat", status: "aktif" },

    // Capaian numerik / persentase
    { id: 23, hasil: "≥70%", status: "aktif" },
    { id: 24, hasil: "≥80%", status: "aktif" },
    { id: 25, hasil: "≥90%", status: "aktif" },
    { id: 26, hasil: "≥30%", status: "aktif" },
    { id: 27, hasil: "3–3,5 tahun", status: "aktif" },
    { id: 28, hasil: "4–4,5 tahun", status: "aktif" },
];

// Gabungan evaluasi (tabel)
export const evaluasiData = [
    {
        id: 1,
        id_standar: 1,
        id_substandar: 1,
        id_indikator: 1,
        id_target: 1,
        id_capaian: 1,
        diverifikasi: true,
        status: "aktif"
    },
    {
        id: 2,
        id_standar: 1,
        id_substandar: 1,
        id_indikator: 1,
        id_target: 2,
        id_capaian: 2,
        diverifikasi: true,
        status: "aktif"
    },
    {
        id: 3,
        id_standar: 1,
        id_substandar: 1,
        id_indikator: 1,
        id_target: 3,
        id_capaian: 3,
        diverifikasi: false,
        status: "aktif"
    },
    {
        id: 4,
        id_standar: 1,
        id_substandar: 2,
        id_indikator: 1,
        id_target: 4,
        id_capaian: 4,
        diverifikasi: true,
        status: "pasif"
    },
    {
        id: 5,
        id_standar: 1,
        id_substandar: 2,
        id_indikator: 2,
        id_target: 5,
        id_capaian: 5,
        diverifikasi: false,
        status: "pasif"
    },
];