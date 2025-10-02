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














// Data Standar
export const standarData = [
    { id: 1, nama: "STANDAR PENDIDIKAN" },
];

// Data Substandar
export const substandarData = [
    { id: 1, id_standar: 1, nama: "STANDAR KOMPETENSI LULUSAN" },
    { id: 2, id_standar: 1, nama: "STANDAR ISI PEMBELAJARAN" },
];

// Data Indikator
export const indikatorData = [
    { id: 1, jenis: "Indikator Kinerja Utama (IKU) " },
    { id: 2, jenis: "Indikator Kinerja Tambahan (IKT) " },
];

// Data Target
export const targetData = [
    { id: 1, deskripsi: "Terdokumentasinya rumusan Capaian Pembelajaran Lulusan sesuai dengan kualifikasi KKNI dalam buku panduan program studi" },
    { id: 2, deskripsi: "Terdokumentasinya kurikulum dengan Capaian Pembelajaran Lulusan" },
    { id: 3, deskripsi: "Mahasiswa lulus dengan tepat waktu (untuk S1 : 4 – 4,5 tahun, dan untuk D3 : 3 – 3,5 tahun)" },
    { id: 4, deskripsi: "Tersedianya kalender akademik" },
    { id: 5, deskripsi: "Ketersediaan pedoman dan prosedur penilaian" },
];

// Data Capaian
export const capaianData = [
    { id: 1, hasil: "terdokumentasi" },
    { id: 2, hasil: "tersedia" },
    { id: 3, hasil: "tersedia" },
    { id: 4, hasil: "Sesuai" },
    { id: 5, hasil: "Ada" },
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
