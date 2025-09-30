// ==========================
// Data Standar & Substandar
// ==========================
export const standarData = [
    { id: 1, nama_standar: "Visi, Misi, Tujuan, dan Strategi" },
    { id: 2, nama_standar: "Tata Pamong, Tata Kelola, dan Kerjasama" },
    { id: 3, nama_standar: "Mahasiswa dan Lulusan" }
];

export const substandarData = [
    { id: 1, id_standar: 1, nama_substandar: "Visi dan Misi" },
    { id: 2, id_standar: 1, nama_substandar: "Tujuan Strategis" },
    { id: 3, id_standar: 2, nama_substandar: "Struktur Organisasi" },
    { id: 4, id_standar: 2, nama_substandar: "Kerjasama Nasional" },
    { id: 5, id_standar: 3, nama_substandar: "Seleksi Mahasiswa Baru" }
];

// ==========================
// Data Jenis Indikator
// ==========================
export const jenisIndikatorData = [
    { id: 1, kode: "IKU", nama_indikator: "Indikator Kinerja Utama" },
    { id: 2, kode: "IKT", nama_indikator: "Indikator Kinerja Tambahan" }
];

// ==========================
// Data Target
// ==========================
export const targetData = [
    { id: 1, deskripsi: "Visi misi disosialisasikan ke seluruh stakeholder" },
    { id: 2, deskripsi: "Tujuan strategis diterapkan di minimal 80% unit" },
    { id: 3, deskripsi: "Struktur organisasi berjalan efektif" },
    { id: 4, deskripsi: "Kerjasama dengan 5 universitas nasional" },
    { id: 5, deskripsi: "Seleksi mahasiswa baru transparan dan objektif" }
];

// ==========================
// Data Capaian
// ==========================
export const capaianData = [
    { id: 1, pencapaian: "Visi dan misi sudah disosialisasikan ke 90% dosen dan mahasiswa" },
    { id: 2, pencapaian: "Tujuan strategis sudah dilaksanakan di 75% unit" },
    { id: 3, pencapaian: "Struktur organisasi sudah efektif dengan rapat rutin" },
    { id: 4, pencapaian: "Sudah ada 4 MoU dengan universitas dalam negeri" },
    { id: 5, pencapaian: "Seleksi mahasiswa baru dilakukan secara daring" }
];

// ==========================
// Data Tahun Akademik & Periode
// ==========================
export const tahunAkademikData = [
    { id: 1, rentang: "2022/2023" },
    { id: 2, rentang: "2023/2024" },
    { id: 3, rentang: "2024/2025" }
];

export const periodeData = [
    { id: 1, id_tahunakademik: 2, id_prodi: 1 },
    { id: 2, id_tahunakademik: 2, id_prodi: 2 },
    { id: 3, id_tahunakademik: 3, id_prodi: 3 }
];

// ==========================
// Data Fakultas & Prodi
// ==========================
export const fakultasData = [
    { id: 1, nama_fakultas: "Fakultas Ilmu Komputer" },
    { id: 2, nama_fakultas: "Fakultas Ekonomi" }
];

export const prodiData = [
    { id: 1, nama_prodi: "Teknik Informatika", id_fakultas: 1 },
    { id: 2, nama_prodi: "Sistem Informasi", id_fakultas: 1 },
    { id: 3, nama_prodi: "Manajemen", id_fakultas: 2 }
];

// ==========================
// Data Evaluasi
// ==========================
export const evaluasiData = [
    { id: 1, id_substandar: 1, id_jenisindikator: 1, id_target: 1, id_capaian: 1, id_periode: 1 },
    { id: 2, id_substandar: 2, id_jenisindikator: 2, id_target: 2, id_capaian: 2, id_periode: 1 },
    { id: 3, id_substandar: 3, id_jenisindikator: 1, id_target: 3, id_capaian: 3, id_periode: 2 },
    { id: 4, id_substandar: 4, id_jenisindikator: 2, id_target: 4, id_capaian: 4, id_periode: 3 },
    { id: 5, id_substandar: 5, id_jenisindikator: 1, id_target: 5, id_capaian: 5, id_periode: 2 }
];

// ==========================
// Data Laporan Prodi
// ==========================
export const laporanProdiData = [
    { id: 1, id_prodi: 1, id_evaluasi: 1 },
    { id: 2, id_prodi: 1, id_evaluasi: 2 },
    { id: 3, id_prodi: 2, id_evaluasi: 3 },
    { id: 4, id_prodi: 3, id_evaluasi: 4 },
    { id: 5, id_prodi: 3, id_evaluasi: 5 }
];

// ==========================
// Data User
// ==========================
export const dataUser = [
    {
        id: 1,
        role: "spmi", // Unit SPMI
        name: "Admin SPMI",
        email: "admin.spmi@university.ac.id",
        password: "spmi123" // contoh, nanti di-hash di backend
    },
    {
        id: 2,
        role: "auditor", // Auditor Internal
        name: "Auditor Internal 1",
        email: "auditor1@university.ac.id",
        password: "auditor123"
    },
    {
        id: 3,
        role: "auditor", // Auditor Internal
        name: "Auditor Internal 2",
        email: "auditor2@university.ac.id",
        password: "auditor123"
    }
];
