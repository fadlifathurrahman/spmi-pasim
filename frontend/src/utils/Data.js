// ==========================
// Data Standar & Substandar
// ==========================
export const standarData = [
    { id: 1, nama_standar: "Visi, Misi, Tujuan, dan Strategi", status: "tampil" },
    { id: 2, nama_standar: "Tata Pamong, Tata Kelola, dan Kerjasama", status: "tampil" },
    { id: 3, nama_standar: "Mahasiswa dan Lulusan", status: "tampil" },
    { id: 4, nama_standar: "Sumber Daya Manusia", status: "tampil" },
    { id: 5, nama_standar: "Keuangan, Sarana, dan Prasarana", status: "tampil" },
    { id: 6, nama_standar: "Penelitian", status: "tampil" },
    { id: 7, nama_standar: "Pengabdian kepada Masyarakat", status: "tampil" }
];

export const substandarData = [
    { id: 1, id_standar: 1, nama_substandar: "Visi dan Misi", status: "tampil" },
    { id: 2, id_standar: 1, nama_substandar: "Tujuan Strategis", status: "tampil" },
    { id: 3, id_standar: 2, nama_substandar: "Struktur Organisasi", status: "tampil" },
    { id: 4, id_standar: 2, nama_substandar: "Kerjasama Nasional", status: "tampil" },
    { id: 5, id_standar: 3, nama_substandar: "Seleksi Mahasiswa Baru", status: "tampil" },
    { id: 6, id_standar: 3, nama_substandar: "Proses Pembelajaran", status: "tampil" },
    { id: 7, id_standar: 4, nama_substandar: "Rekrutmen Dosen", status: "tampil" },
    { id: 8, id_standar: 4, nama_substandar: "Pengembangan Dosen", status: "tampil" },
    { id: 9, id_standar: 5, nama_substandar: "Anggaran Pendidikan", status: "tampil" },
    { id: 10, id_standar: 5, nama_substandar: "Fasilitas Pembelajaran", status: "tampil" },
    { id: 11, id_standar: 6, nama_substandar: "Penelitian Dosen", status: "tampil" },
    { id: 12, id_standar: 6, nama_substandar: "Publikasi Ilmiah", status: "tampil" },
    { id: 13, id_standar: 7, nama_substandar: "Pengabdian Masyarakat", status: "tampil" }
];

// ==========================
// Data Jenis Indikator
// ==========================
export const jenisIndikatorData = [
    { id: 1, kode: "IKU", nama_indikator: "Indikator Kinerja Utama", status: "tampil" },
    { id: 2, kode: "IKT", nama_indikator: "Indikator Kinerja Tambahan", status: "tampil" }
];

// ==========================
// Data Target
// ==========================
export const targetData = [
    { id: 1, deskripsi: "Visi misi disosialisasikan ke seluruh stakeholder", status: "tampil" },
    { id: 2, deskripsi: "Tujuan strategis diterapkan di minimal 80% unit", status: "tampil" },
    { id: 3, deskripsi: "Struktur organisasi berjalan efektif", status: "tampil" },
    { id: 4, deskripsi: "Kerjasama dengan 5 universitas nasional", status: "tampil" },
    { id: 5, deskripsi: "Seleksi mahasiswa baru transparan dan objektif", status: "tampil" }
];

// ==========================
// Data Capaian
// ==========================
export const capaianData = [
    {
        id: 1,
        deskripsi: "90% Sesuai",
        status: "tampil"
    },
    {
        id: 2,
        deskripsi: "75% Sesuai",
        status: "tampil"
    },
    {
        id: 3,
        deskripsi: "Tersedia",
        status: "tampil"
    },
    {
        id: 4,
        deskripsi: "80% Sesuai",
        status: "tampil"
    },
    {
        id: 5,
        deskripsi: "Tersedia",
        status: "tampil"
    },
    {
        id: 6,
        deskripsi: "≥ 60%",
        status: "tampil"
    },
    {
        id: 7,
        deskripsi: "Terlaksana",
        status: "tampil"
    },
    {
        id: 8,
        deskripsi: "50% Sesuai",
        status: "tampil"
    },
    {
        id: 9,
        deskripsi: "Tidak Tersedia",
        status: "tampil"
    },
    {
        id: 10,
        deskripsi: "100% Sesuai",
        status: "tampil"
    }
];

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
export const evaluasiData = [
    { id: 1, id_substandar: 1, id_jenisindikator: 1, id_target: 1, id_capaian: 1, id_periode: 1, status: "tampil" },
    { id: 2, id_substandar: 2, id_jenisindikator: 2, id_target: 2, id_capaian: 2, id_periode: 1, status: "tampil" },
    { id: 3, id_substandar: 3, id_jenisindikator: 1, id_target: 3, id_capaian: 3, id_periode: 2, status: "tampil" },
    { id: 4, id_substandar: 4, id_jenisindikator: 2, id_target: 4, id_capaian: 4, id_periode: 3, status: "tampil" },
    { id: 5, id_substandar: 5, id_jenisindikator: 1, id_target: 5, id_capaian: 5, id_periode: 2, status: "tampil" }
];

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
        role: "spmi",
        name: "Admin SPMI",
        email: "admin@gmail.com",
        password: "123"
    },
    {
        id: 2,
        role: "auditor",
        name: "Auditor Internal 1",
        email: "auditor1@university.ac.id",
        password: "auditor123"
    },
    {
        id: 3,
        role: "auditor",
        name: "Auditor Internal 2",
        email: "auditor2@university.ac.id",
        password: "auditor123"
    }
];
