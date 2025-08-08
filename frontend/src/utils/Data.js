export const dataUser = [
    {
        id: 1,
        name: "Prof. Dr. Ahmad Sanusi, M.Kom.",
        role: "admin",
        nidn: "1234567890",
        username: "ahmad.sanusi",
        password: "123",
        email: "ahmad.sanusi@univ.ac.id"
    },
    {
        id: 2,
        name: "Dr. Siti Aminah, M.Si.",
        role: "kaprodi",
        nidn: "2345678901",
        username: "siti.aminah",
        password: "123",
        email: "siti.aminah@univ.ac.id"
    },
    {
        id: 3,
        name: "Mochammad Faisal, M.T.",
        role: "dosen",
        nidn: "3456789012",
        username: "m.faisal",
        password: "password123",
        email: "m.faisal@univ.ac.id"
    },
    {
        id: 4,
        name: "Dewi Kurniasih, M.Kom.",
        role: "dosen",
        nidn: "4567890123",
        username: "dewi.kurniasih",
        password: "123",
        email: "dewi.kurniasih@univ.ac.id"
    },
    {
        id: 5,
        name: "Rudi Hermawan, S.T., M.Eng.",
        role: "tidak aktif",
        nidn: "5678901234",
        username: "rudi.hermawan",
        password: "password123",
        email: "rudi.hermawan@univ.ac.id"
    },
    {
        id: 6,
        name: "Admin Sistem",
        role: "admin",
        nidn: "",
        username: "admin",
        password: "admin123",
        email: "admin@univ.ac.id"
    },
    {
        id: 7,
        name: "Dr. Bambang Sutrisno, M.Sc.",
        role: "kaprodi",
        nidn: "6789012345",
        username: "bambang.s",
        password: "password123",
        email: "bambang.s@univ.ac.id"
    }
];

export const dataMataKuliah = [
    {
        id: 1,
        kode_matkul: "IF101",
        nama_matkul: "Pemrograman Dasar",
        jumlah_sks: 3,
        created_at: "2025-01-10T08:00:00Z",
        updated_at: "2025-01-10T08:00:00Z"
    },
    {
        id: 2,
        kode_matkul: "IF202",
        nama_matkul: "Struktur Data",
        jumlah_sks: 3,
        created_at: "2025-01-10T08:00:00Z",
        updated_at: "2025-01-10T08:00:00Z"
    },
    {
        id: 3,
        kode_matkul: "IF303",
        nama_matkul: "Basis Data",
        jumlah_sks: 3,
        created_at: "2025-01-10T08:00:00Z",
        updated_at: "2025-01-10T08:00:00Z"
    }
];


export const dataTahunAjaran = [
    {
        id: 1,
        tahun: 2025,
        semester: "Ganjil",
        status: "Aktif"
    },
    {
        id: 2,
        tahun: 2025,
        semester: "Genap",
        status: "Tidak Aktif"
    }
];


export const dataSpmi = [
    {
        id: 1,
        mata_kuliah_id: 1,      // Pemrograman Dasar
        dosen_id: 3,            // Mochammad Faisal, M.T.
        tahun_ajaran_id: 1,     // 2025 Ganjil
        jumlah_pertemuan: 14,
        created_at: "2025-08-01T09:00:00Z",
        updated_at: "2025-08-01T09:00:00Z"
    },
    {
        id: 2,
        mata_kuliah_id: 2,      // Struktur Data
        dosen_id: 4,            // Dewi Kurniasih, M.Kom.
        tahun_ajaran_id: 1,
        jumlah_pertemuan: 14,
        created_at: "2025-08-01T09:00:00Z",
        updated_at: "2025-08-01T09:00:00Z"
    }
];


export const dataPertemuan = [
    {
        id: 1,
        spmi_id: 1,
        pertemuan_ke: 1,
        materi: "Pengenalan Algoritma dan Bahasa Pemrograman",
        tanggal: "2025-08-05",
        created_at: "2025-08-05T08:00:00Z",
        updated_at: "2025-08-05T08:00:00Z"
    },
    {
        id: 2,
        spmi_id: 1,
        pertemuan_ke: 2,
        materi: "Struktur Dasar Pemrograman",
        tanggal: "2025-08-12",
        created_at: "2025-08-12T08:00:00Z",
        updated_at: "2025-08-12T08:00:00Z"
    },
    {
        id: 3,
        spmi_id: 2,
        pertemuan_ke: 1,
        materi: "Konsep Dasar Struktur Data",
        tanggal: "2025-08-06",
        created_at: "2025-08-06T08:00:00Z",
        updated_at: "2025-08-06T08:00:00Z"
    }
];


