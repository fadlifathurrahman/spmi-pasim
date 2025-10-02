// ==========================
// Data Jenis Indikator
// ==========================
export const jenisIndikatorData = [
    { id: 1, kode: "IKU", nama_indikator: "Indikator Kinerja Utama", status: "tampil" },
    { id: 2, kode: "IKT", nama_indikator: "Indikator Kinerja Tambahan", status: "tampil" }
];

// // ==========================
// // Data Capaian
// // ==========================
// export const capaianData = [
//     {
//         id: 1,
//         deskripsi: "90% Sesuai",
//         status: "tampil"
//     },
//     {
//         id: 2,
//         deskripsi: "75% Sesuai",
//         status: "tampil"
//     },
//     {
//         id: 3,
//         deskripsi: "Tersedia",
//         status: "tampil"
//     },
//     {
//         id: 4,
//         deskripsi: "80% Sesuai",
//         status: "tampil"
//     },
//     {
//         id: 5,
//         deskripsi: "Tersedia",
//         status: "tampil"
//     },
//     {
//         id: 6,
//         deskripsi: "≥ 60%",
//         status: "tampil"
//     },
//     {
//         id: 7,
//         deskripsi: "Terlaksana",
//         status: "tampil"
//     },
//     {
//         id: 8,
//         deskripsi: "50% Sesuai",
//         status: "tampil"
//     },
//     {
//         id: 9,
//         deskripsi: "Tidak Tersedia",
//         status: "tampil"
//     },
//     {
//         id: 10,
//         deskripsi: "100% Sesuai",
//         status: "tampil"
//     }
// ];

// ==========================
// Data Tahun Akademik & Periode
// ==========================
export const tahunAkademikData = [
    { id: 1, rentang: "2022/2023", status: "tampil" },
    { id: 2, rentang: "2023/2024", status: "tampil" },
    { id: 3, rentang: "2024/2025", status: "tampil" }
];

export const periodeData = [
    { id: 1, id_tahunakademik: 2, id_prodi: 1, status: "tampil" },
    { id: 2, id_tahunakademik: 2, id_prodi: 2, status: "tampil" },
    { id: 3, id_tahunakademik: 3, id_prodi: 3, status: "tampil" },
    { id: 4, id_tahunakademik: 3, id_prodi: 4, status: "tampil" }
];

// ==========================
// Data Fakultas & Prodi
// ==========================
export const fakultasData = [
    { id: 1, nama_fakultas: "Fakultas Ilmu Komputer", status: "tampil" },
    { id: 2, nama_fakultas: "Fakultas Ekonomi", status: "tampil" },
    { id: 3, nama_fakultas: "Fakultas Teknik", status: "tampil" }
];

export const prodiData = [
    { id: 1, nama_prodi: "Teknik Informatika", id_fakultas: 1, status: "tampil" },
    { id: 2, nama_prodi: "Sistem Informasi", id_fakultas: 1, status: "tampil" },
    { id: 3, nama_prodi: "Manajemen", id_fakultas: 2, status: "tampil" },
    { id: 4, nama_prodi: "Akuntansi", id_fakultas: 2, status: "tampil" }
];

// ==========================
// Data Evaluasi
// ==========================
// export const evaluasiData = [
//     { id: 1, id_substandar: 1, id_jenisindikator: 1, id_target: 1, id_capaian: 1, id_periode: 1, status: "tampil" },
//     { id: 2, id_substandar: 2, id_jenisindikator: 2, id_target: 2, id_capaian: 2, id_periode: 1, status: "tampil" },
//     { id: 3, id_substandar: 3, id_jenisindikator: 1, id_target: 3, id_capaian: 3, id_periode: 2, status: "tampil" },
//     { id: 4, id_substandar: 4, id_jenisindikator: 2, id_target: 4, id_capaian: 4, id_periode: 3, status: "tampil" },
//     { id: 5, id_substandar: 5, id_jenisindikator: 1, id_target: 5, id_capaian: 5, id_periode: 2, status: "tampil" }
// ];

// ==========================
// Data Laporan Prodi
// ==========================
export const laporanProdiData = [
    { id: 1, id_prodi: 1, id_evaluasi: 1, status: "tampil" },
    { id: 2, id_prodi: 1, id_evaluasi: 2, status: "tampil" },
    { id: 3, id_prodi: 2, id_evaluasi: 3, status: "tampil" },
    { id: 4, id_prodi: 3, id_evaluasi: 4, status: "tampil" },
    { id: 5, id_prodi: 3, id_evaluasi: 5, status: "tampil" }
];

// ==========================
// Data User (tidak ditambah field status)
// ==========================
export const dataUser = [
    {
        id: 1,
        role: "admin",
        name: "Admin SPMI",
        email: "admin@gmail.com",
        password: "123"
    },
    {
        id: 2,
        role: "user",
        name: "Auditor Internal 1",
        email: "auditor1@university.ac.id",
        password: "auditor123"
    },
    {
        id: 3,
        role: "user",
        name: "Auditor Internal 2",
        email: "auditor2@university.ac.id",
        password: "auditor123"
    }
];


// // ==========================
// // Data Evaluasi (multi-periode)
// // ==========================
// export const evaluasiData = [
//     // STANDAR PENELITIAN – HASIL PENELITIAN
//     { id: 1, id_substandar: 11, id_jenisindikator: 1, indikator: "Tersedianya pedoman penelitian (usul dan pelaporan penelitian)", target: "Tersedia", status: "tampil" },
//     { id: 2, id_substandar: 11, id_jenisindikator: 1, indikator: "Jumlah penelitian dosen yang relevan dengan program studi per tahun", target: "1 penelitian/dosen", status: "tampil" },
//     { id: 3, id_substandar: 12, id_jenisindikator: 1, indikator: "Publikasi hasil penelitian pada jurnal nasional per tahun (%)", target: "≥ 50%", status: "tampil" },
//     { id: 4, id_substandar: 12, id_jenisindikator: 1, indikator: "Publikasi hasil penelitian pada jurnal internasional per tahun (%)", target: "≥ 10%", status: "tampil" },
//     { id: 5, id_substandar: 12, id_jenisindikator: 1, indikator: "Jumlah HKI/Paten karya ilmiah dosen per tahun", target: "Min. 1 HKI", status: "tampil" },

//     // STANDAR ISI PENELITIAN
//     { id: 6, id_substandar: 11, id_jenisindikator: 1, indikator: "Tersedianya peta jalan penelitian", target: "Tersedia", status: "tampil" },
//     { id: 7, id_substandar: 11, id_jenisindikator: 1, indikator: "Penelitian dilaksanakan sesuai dengan bidang keilmuan program studi", target: "90% sesuai", status: "tampil" },
// ];














export const standarData = [
    { id: 1, nama: "Standar Kompetensi Lulusan" },
    { id: 2, nama: "Standar Isi Pembelajaran" },
    { id: 3, nama: "Standar Proses Pembelajaran" },
    { id: 4, nama: "Standar Penilaian Pembelajaran" },
    { id: 5, nama: "Standar Dosen dan Tenaga Kependidikan" },
    { id: 6, nama: "Standar Sarana dan Prasarana" },
    { id: 7, nama: "Standar Pengelolaan Pembelajaran" },
    { id: 8, nama: "Standar Pembiayaan Pendidikan" },
    { id: 9, nama: "Standar Penelitian" },
    { id: 10, nama: "Standar Pengabdian kepada Masyarakat" },
    { id: 11, nama: "Standar Hasil Penelitian" },
    { id: 12, nama: "Standar Isi Penelitian" },
    { id: 13, nama: "Standar Proses Penelitian" },
    { id: 14, nama: "Standar Penilaian Penelitian" },
    { id: 15, nama: "Standar Peneliti dan Tenaga Penunjang Penelitian" },
    { id: 16, nama: "Standar Sarana dan Prasarana Penelitian" },
    { id: 17, nama: "Standar Pengelolaan Penelitian" },
    { id: 18, nama: "Standar Pembiayaan dan Pendanaan Penelitian" },
    { id: 19, nama: "Standar Hasil Pengabdian kepada Masyarakat" },
    { id: 20, nama: "Standar Isi Pengabdian kepada Masyarakat" },
    { id: 21, nama: "Standar Proses Pengabdian kepada Masyarakat" },
    { id: 22, nama: "Standar Penilaian Pengabdian kepada Masyarakat" },
    { id: 23, nama: "Standar Pelaksana Pengabdian kepada Masyarakat" },
    { id: 24, nama: "Standar Sarana dan Prasarana Pengabdian kepada Masyarakat" },
];


// Data Indikator
export const indikatorData = [
    { id: 1, jenis: "Indikator Kinerja Utama (IKU) " },
    { id: 2, jenis: "Indikator Kinerja Tambahan (IKT) " },
];

// Data Substandar (mengacu Univ Borobudur, copy persis)
export const substandarData = [
    // ===== Standar 1 – Kompetensi Lulusan =====
    { id: 1, id_standar: 1, nama: "Rumusan capaian pembelajaran lulusan sesuai KKNI dan SN-Dikti" },
    { id: 2, id_standar: 1, nama: "Ketersediaan dokumen CPL dalam buku panduan program studi" },
    { id: 3, id_standar: 1, nama: "Tracer study lulusan untuk menilai kesesuaian bidang kerja" },

    // ===== Standar 2 – Isi Pembelajaran =====
    { id: 4, id_standar: 2, nama: "Struktur kurikulum sesuai capaian pembelajaran lulusan" },
    { id: 5, id_standar: 2, nama: "Kurikulum ditinjau minimal setiap 5 tahun" },
    { id: 6, id_standar: 2, nama: "Mata kuliah wajib universitas, fakultas, dan program studi tersedia" },

    // ===== Standar 3 – Proses Pembelajaran =====
    { id: 7, id_standar: 3, nama: "Setiap mata kuliah memiliki Rencana Pembelajaran Semester (RPS)" },
    { id: 8, id_standar: 3, nama: "Proses pembelajaran dilaksanakan sesuai RPS" },
    { id: 9, id_standar: 3, nama: "Monitoring dan evaluasi pembelajaran dilakukan setiap semester" },

    // ===== Standar 4 – Penilaian Pembelajaran =====
    { id: 10, id_standar: 4, nama: "Tersedia pedoman dan prosedur penilaian hasil belajar" },
    { id: 11, id_standar: 4, nama: "Penilaian hasil belajar dilakukan secara transparan dan akuntabel" },
    { id: 12, id_standar: 4, nama: "Ujian, remediasi, dan ujian ulang dilaksanakan sesuai prosedur" },

    // ===== Standar 5 – Dosen dan Tenaga Kependidikan =====
    { id: 13, id_standar: 5, nama: "Kualifikasi akademik dosen sesuai ketentuan BAN-PT" },
    { id: 14, id_standar: 5, nama: "Kompetensi dosen sesuai bidang ilmu yang diampu" },
    { id: 15, id_standar: 5, nama: "Tenaga kependidikan memiliki sertifikat kompetensi sesuai bidang" },

    // ===== Standar 6 – Sarana dan Prasarana =====
    { id: 16, id_standar: 6, nama: "Laboratorium, perpustakaan, studio tersedia sesuai kebutuhan" },
    { id: 17, id_standar: 6, nama: "Ruang kuliah dan fasilitas belajar memenuhi standar rasio mahasiswa" },
    { id: 18, id_standar: 6, nama: "Akses teknologi informasi dan komunikasi untuk pembelajaran tersedia" },

    // ===== Standar 7 – Pengelolaan =====
    { id: 19, id_standar: 7, nama: "Tata pamong, kepemimpinan, sistem pengelolaan, dan budaya akademik terdokumentasi" },
    { id: 20, id_standar: 7, nama: "Sistem Penjaminan Mutu Internal (SPMI) dilaksanakan di seluruh unit" },
    { id: 21, id_standar: 7, nama: "Tersedia Renstra dan Renop yang konsisten dengan visi, misi, tujuan" },

    // ===== Standar 8 – Pembiayaan =====
    { id: 22, id_standar: 8, nama: "Tersedia sumber pendanaan yang memadai" },
    { id: 23, id_standar: 8, nama: "Alokasi dan penggunaan dana sesuai rencana anggaran" },
    { id: 24, id_standar: 8, nama: "Laporan keuangan disusun akuntabel dan transparan" },

    // ===== Standar 9 – Hasil Penelitian =====
    { id: 25, id_standar: 9, nama: "Penelitian menghasilkan publikasi ilmiah" },
    { id: 26, id_standar: 9, nama: "Penelitian menghasilkan HKI, paten, atau produk terapan" },

    // ===== Standar 10 – Isi Penelitian =====
    { id: 27, id_standar: 10, nama: "Roadmap penelitian sesuai renstra universitas" },
    { id: 28, id_standar: 10, nama: "Kebijakan penelitian sesuai bidang unggulan" },

    // ===== Standar 11 – Proses Penelitian =====
    { id: 29, id_standar: 11, nama: "Proposal penelitian ditinjau oleh reviewer sebelum pendanaan" },
    { id: 30, id_standar: 11, nama: "Penelitian dilaksanakan sesuai proposal" },
    { id: 31, id_standar: 11, nama: "Evaluasi penelitian dilakukan secara periodik" },

    // ===== Standar 12 – Penilaian Penelitian =====
    { id: 32, id_standar: 12, nama: "Evaluasi proposal penelitian oleh reviewer internal" },
    { id: 33, id_standar: 12, nama: "Evaluasi luaran penelitian terhadap target capaian" },

    // ===== Standar 13 – SDM Penelitian =====
    { id: 34, id_standar: 13, nama: "Dosen aktif dalam penelitian sesuai bidang ilmu" },
    { id: 35, id_standar: 13, nama: "Pembinaan peneliti muda melalui program internal" },

    // ===== Standar 14 – Sarana dan Prasarana Penelitian =====
    { id: 36, id_standar: 14, nama: "Laboratorium penelitian tersedia dan berfungsi" },
    { id: 37, id_standar: 14, nama: "Akses ke database, jurnal, dan referensi ilmiah tersedia" },

    // ===== Standar 15 – Pengelolaan Penelitian =====
    { id: 38, id_standar: 15, nama: "Unit pengelola penelitian tersedia di universitas/fakultas" },
    { id: 39, id_standar: 15, nama: "Audit mutu internal penelitian dilakukan rutin" },

    // ===== Standar 16 – Pembiayaan Penelitian =====
    { id: 40, id_standar: 16, nama: "Dana penelitian internal tersedia setiap tahun" },
    { id: 41, id_standar: 16, nama: "Dana penelitian eksternal diperoleh melalui hibah kompetitif" },

    // ===== Standar 17 – Hasil PkM =====
    { id: 42, id_standar: 17, nama: "Kegiatan PkM berdampak pada masyarakat sasaran" },
    { id: 43, id_standar: 17, nama: "PkM menghasilkan publikasi, produk, atau model pemberdayaan" },

    // ===== Standar 18 – Isi PkM =====
    { id: 44, id_standar: 18, nama: "Roadmap PkM sesuai renstra universitas" },
    { id: 45, id_standar: 18, nama: "Tema PkM sesuai kebutuhan masyarakat dan bidang unggulan" },

    // ===== Standar 19 – Proses PkM =====
    { id: 46, id_standar: 19, nama: "Proposal PkM disusun dan diseleksi sebelum pendanaan" },
    { id: 47, id_standar: 19, nama: "PkM dilaksanakan sesuai proposal" },
    { id: 48, id_standar: 19, nama: "Monitoring dan evaluasi PkM dilakukan setelah kegiatan" },

    // ===== Standar 20 – Penilaian PkM =====
    { id: 49, id_standar: 20, nama: "Evaluasi proposal PkM dilakukan reviewer internal" },
    { id: 50, id_standar: 20, nama: "Evaluasi dampak PkM dilakukan oleh tim universitas" },

    // ===== Standar 21 – SDM PkM =====
    { id: 51, id_standar: 21, nama: "Dosen melaksanakan PkM sesuai bidang keilmuan" },
    { id: 52, id_standar: 21, nama: "Mahasiswa terlibat dalam kegiatan PkM" },

    // ===== Standar 22 – Sarpras PkM =====
    { id: 53, id_standar: 22, nama: "Fasilitas mendukung pelaksanaan PkM" },
    { id: 54, id_standar: 22, nama: "Tersedia mitra kerjasama untuk PkM" },

    // ===== Standar 23 – Pengelolaan PkM =====
    { id: 55, id_standar: 23, nama: "Unit pengelola PkM tersedia di universitas/fakultas" },
    { id: 56, id_standar: 23, nama: "Audit mutu internal PkM dilakukan rutin" },

    // ===== Standar 24 – Pembiayaan PkM =====
    { id: 57, id_standar: 24, nama: "Dana internal PkM tersedia setiap tahun" },
    { id: 58, id_standar: 24, nama: "Dana eksternal PkM diperoleh melalui mitra/hibah" },
];



// Data Target
export const targetData = [
    // ===== Standar 1 – Kompetensi Lulusan =====
    { id: 1, deskripsi: "Terdokumentasinya rumusan Capaian Pembelajaran Lulusan sesuai dengan kualifikasi KKNI dalam buku panduan program studi" },
    { id: 2, deskripsi: "Terdokumentasinya kurikulum dengan Capaian Pembelajaran Lulusan" },
    { id: 3, deskripsi: "Mahasiswa lulus dengan tepat waktu (untuk S1 : 4 – 4,5 tahun, dan untuk D3 : 3 – 3,5 tahun)" },

    // ===== Standar 2 – Isi Pembelajaran =====
    { id: 4, deskripsi: "Tersedianya struktur kurikulum yang ditinjau secara berkala setiap 5 tahun" },
    { id: 5, deskripsi: "Kurikulum memuat mata kuliah wajib universitas, fakultas, dan program studi" },
    { id: 6, deskripsi: "Kurikulum sesuai dengan kebutuhan pengguna lulusan dan perkembangan IPTEK" },

    // ===== Standar 3 – Proses Pembelajaran =====
    { id: 7, deskripsi: "Setiap mata kuliah memiliki Rencana Pembelajaran Semester (RPS) yang terdokumentasi" },
    { id: 8, deskripsi: "Proses pembelajaran dilaksanakan sesuai RPS dan kalender akademik" },
    { id: 9, deskripsi: "Monitoring dan evaluasi pembelajaran dilakukan setiap semester" },

    // ===== Standar 4 – Penilaian Pembelajaran =====
    { id: 10, deskripsi: "Ketersediaan pedoman dan prosedur penilaian" },
    { id: 11, deskripsi: "Penilaian hasil belajar dilaksanakan secara transparan dan akuntabel" },
    { id: 12, deskripsi: "Ujian, remediasi, dan ujian ulang dilaksanakan sesuai prosedur" },

    // ===== Standar 5 – Dosen & Tenaga Kependidikan =====
    { id: 13, deskripsi: "Tersedianya tenaga pendidik dengan kualifikasi akademik minimal S2 untuk program sarjana" },
    { id: 14, deskripsi: "≥70% dosen tetap sesuai bidang keilmuan yang diampu" },
    { id: 15, deskripsi: "Tenaga kependidikan memiliki kompetensi dan sertifikat sesuai bidang tugas" },

    // ===== Standar 6 – Sarana & Prasarana =====
    { id: 16, deskripsi: "Tersedianya ruang kuliah yang sesuai dengan jumlah mahasiswa" },
    { id: 17, deskripsi: "Laboratorium, perpustakaan, dan studio tersedia sesuai kebutuhan kurikulum" },
    { id: 18, deskripsi: "Ketersediaan akses teknologi informasi dan komunikasi untuk mendukung pembelajaran" },

    // ===== Standar 7 – Pengelolaan =====
    { id: 19, deskripsi: "Dokumen tata pamong, kepemimpinan, dan budaya akademik tersedia" },
    { id: 20, deskripsi: "Sistem Penjaminan Mutu Internal (SPMI) dilaksanakan secara konsisten" },
    { id: 21, deskripsi: "Renstra dan Renop tersedia sesuai visi, misi, dan tujuan universitas" },

    // ===== Standar 8 – Pembiayaan =====
    { id: 22, deskripsi: "Tersedia sumber pendanaan yang memadai" },
    { id: 23, deskripsi: "Alokasi dana sesuai rencana anggaran" },
    { id: 24, deskripsi: "Laporan keuangan tahunan disusun akuntabel dan transparan" },

    // ===== Standar 9 – Hasil Penelitian =====
    { id: 25, deskripsi: "Penelitian dosen menghasilkan publikasi ilmiah setiap tahun" },
    { id: 26, deskripsi: "Hasil penelitian menghasilkan HKI, paten, atau produk inovatif" },

    // ===== Standar 10 – Isi Penelitian =====
    { id: 27, deskripsi: "Tersedianya roadmap penelitian sesuai renstra universitas" },
    { id: 28, deskripsi: "≥70% penelitian sesuai roadmap penelitian institusi" },

    // ===== Standar 11 – Proses Penelitian =====
    { id: 29, deskripsi: "Proposal penelitian ditinjau reviewer internal sebelum didanai" },
    { id: 30, deskripsi: "≥80% penelitian dilaksanakan sesuai proposal" },
    { id: 31, deskripsi: "Evaluasi penelitian dilakukan minimal satu kali per tahun" },

    // ===== Standar 12 – Penilaian Penelitian =====
    { id: 32, deskripsi: "Proposal penelitian dievaluasi oleh reviewer internal" },
    { id: 33, deskripsi: "Luaran penelitian dievaluasi sesuai target capaian" },

    // ===== Standar 13 – SDM Penelitian =====
    { id: 34, deskripsi: "≥80% dosen aktif melaksanakan penelitian" },
    { id: 35, deskripsi: "Tersedia program pembinaan peneliti muda" },

    // ===== Standar 14 – Sarpras Penelitian =====
    { id: 36, deskripsi: "Laboratorium penelitian berfungsi sesuai standar" },
    { id: 37, deskripsi: "Akses database, jurnal, dan referensi ilmiah tersedia" },

    // ===== Standar 15 – Pengelolaan Penelitian =====
    { id: 38, deskripsi: "Unit pengelola penelitian tersedia di universitas/fakultas" },
    { id: 39, deskripsi: "Audit mutu internal penelitian dilaksanakan rutin" },

    // ===== Standar 16 – Pembiayaan Penelitian =====
    { id: 40, deskripsi: "Dana penelitian internal dialokasikan setiap tahun" },
    { id: 41, deskripsi: "≥30% penelitian dibiayai dari sumber eksternal" },

    // ===== Standar 17 – Hasil PkM =====
    { id: 42, deskripsi: "≥80% kegiatan PkM memberi dampak nyata bagi masyarakat" },
    { id: 43, deskripsi: "≥20% kegiatan PkM menghasilkan publikasi atau produk" },

    // ===== Standar 18 – Isi PkM =====
    { id: 44, deskripsi: "Tersedianya roadmap PkM sesuai renstra universitas" },
    { id: 45, deskripsi: "≥70% PkM sesuai roadmap institusi" },

    // ===== Standar 19 – Proses PkM =====
    { id: 46, deskripsi: "Proposal PkM disusun sebelum kegiatan dilaksanakan" },
    { id: 47, deskripsi: "≥80% PkM dilaksanakan sesuai proposal" },
    { id: 48, deskripsi: "Evaluasi PkM dilakukan pada setiap akhir kegiatan" },

    // ===== Standar 20 – Penilaian PkM =====
    { id: 49, deskripsi: "Proposal PkM dinilai oleh reviewer internal" },
    { id: 50, deskripsi: "Dampak PkM dievaluasi oleh tim universitas" },

    // ===== Standar 21 – SDM PkM =====
    { id: 51, deskripsi: "≥80% dosen melaksanakan PkM setiap tahun" },
    { id: 52, deskripsi: "≥30% mahasiswa terlibat dalam PkM" },

    // ===== Standar 22 – Sarpras PkM =====
    { id: 53, deskripsi: "Fasilitas mendukung pelaksanaan PkM" },
    { id: 54, deskripsi: "≥3 mitra eksternal terjalin untuk pelaksanaan PkM" },

    // ===== Standar 23 – Pengelolaan PkM =====
    { id: 55, deskripsi: "Unit pengelola PkM tersedia di universitas/fakultas" },
    { id: 56, deskripsi: "Audit mutu internal PkM dilakukan setiap tahun" },

    // ===== Standar 24 – Pembiayaan PkM =====
    { id: 57, deskripsi: "Dana internal PkM dialokasikan setiap tahun" },
    { id: 58, deskripsi: "≥30% PkM didanai oleh sumber eksternal" },
];


// Data Capaian (unique, termasuk angka/rasio, tanpa duplikasi)
export const capaianData = [
    { id: 1, hasil: "Terdokumentasi" },
    { id: 2, hasil: "Tepat waktu" },
    { id: 3, hasil: "Tersedia" },
    { id: 4, hasil: "Ada" },
    { id: 5, hasil: "Sesuai" },
    { id: 6, hasil: "Dilaksanakan" },
    { id: 7, hasil: "Dievaluasi" },
    { id: 8, hasil: "Transparan" },
    { id: 9, hasil: "Sesuai prosedur" },
    { id: 10, hasil: "Sesuai bidang" },
    { id: 11, hasil: "Bersertifikat" },
    { id: 12, hasil: "Memadai" },
    { id: 13, hasil: "Sesuai anggaran" },
    { id: 14, hasil: "Akuntabel" },
    { id: 15, hasil: "Menghasilkan" },
    { id: 16, hasil: "Sesuai roadmap" },
    { id: 17, hasil: "Direview" },
    { id: 18, hasil: "Sesuai target" },
    { id: 19, hasil: "Aktif" },
    { id: 20, hasil: "Berfungsi" },
    { id: 21, hasil: "Berdampak" },
    { id: 22, hasil: "Terlibat" },

    // Capaian numerik / persentase
    { id: 23, hasil: "≥70%" },
    { id: 24, hasil: "≥80%" },
    { id: 25, hasil: "≥90%" },
    { id: 26, hasil: "≥30%" },
    { id: 27, hasil: "3–3,5 tahun" },
    { id: 28, hasil: "4–4,5 tahun" },
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
    },
    {
        id: 2,
        id_standar: 1,
        id_substandar: 1,
        id_indikator: 1,
        id_target: 2,
        id_capaian: 2,
        diverifikasi: true,
    },
    {
        id: 3,
        id_standar: 1,
        id_substandar: 1,
        id_indikator: 1,
        id_target: 3,
        id_capaian: 3,
        diverifikasi: false,
    },
    {
        id: 4,
        id_standar: 1,
        id_substandar: 2,
        id_indikator: 1,
        id_target: 4,
        id_capaian: 4,
        diverifikasi: true,
    },
    {
        id: 5,
        id_standar: 1,
        id_substandar: 2,
        id_indikator: 2,
        id_target: 5,
        id_capaian: 5,
        diverifikasi: false,
    },
];