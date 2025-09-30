
export const dataUser = {
    role: 'spmi', // atau 'auditor'
    name: 'Admin SPMI',
    email: 'admin@university.ac.id'
};

export const dashboardData = {
    // Data untuk Unit SPMI
    spmi: {
        totalStandar: 15,
        totalSubstandar: 45,
        evaluasiAktif: 12,
        capaianBelumValidasi: 8,
        progress: 75,
        recentActivities: [
            {
                id: 1,
                activity: 'Standar 7.1 telah divalidasi',
                time: '2 jam yang lalu',
                type: 'validation'
            },
            {
                id: 2,
                activity: 'Evaluasi baru dibuat untuk Prodi Teknik Informatika',
                time: '1 hari yang lalu',
                type: 'evaluation'
            },
            {
                id: 3,
                activity: 'Substandar 3.2 telah diperbarui',
                time: '2 hari yang lalu',
                type: 'update'
            }
        ]
    },

    // Data untuk Auditor Internal
    auditor: {
        totalStandar: 15,
        totalSubstandar: 45,
        evaluasiAktif: 5,
        capaianBelumValidasi: 3,
        progress: 60,
        recentActivities: [
            {
                id: 1,
                activity: 'Capaian untuk Substandar 4.1 telah diinput',
                time: '3 jam yang lalu',
                type: 'input'
            },
            {
                id: 2,
                activity: 'Laporan audit Prodi Manajemen telah digenerate',
                time: '1 hari yang lalu',
                type: 'report'
            },
            {
                id: 3,
                activity: 'Revisi capaian untuk Standar 2',
                time: '2 hari yang lalu',
                type: 'revision'
            }
        ]
    }
};

export const standarData = [
    { id: 1, nama: 'Standar 1: Visi, Misi, Tujuan dan Strategi', jumlahSubstandar: 5 },
    { id: 2, nama: 'Standar 2: Tata Pamong, Tata Kelola dan Kerjasama', jumlahSubstandar: 6 },
    { id: 3, nama: 'Standar 3: Mahasiswa', jumlahSubstandar: 8 },
    { id: 4, nama: 'Standar 4: Sumber Daya Manusia', jumlahSubstandar: 7 },
    { id: 5, nama: 'Standar 5: Keuangan, Sarana dan Prasarana', jumlahSubstandar: 6 },
    { id: 6, nama: 'Standar 6: Pendidikan', jumlahSubstandar: 9 },
    { id: 7, nama: 'Standar 7: Penelitian', jumlahSubstandar: 4 }
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


