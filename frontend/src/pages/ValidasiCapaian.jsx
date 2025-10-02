import { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiFileText,
  FiDownload,
  FiFilter,
  FiSearch,
  FiCheck,
  FiX,
} from "react-icons/fi";

// Import data
import {
  capaianData,
  evaluasiData,
  substandarData,
  jenisIndikatorData,
  dataUser,
  periodeData,
  tahunAkademikData,
  prodiData,
} from "./../utils/Data.js";

const ValidasiCapaian = () => {
  const [capaian, setCapaian] = useState([]);
  const [filterStatus, setFilterStatus] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [periodeOptions, setPeriodeOptions] = useState([]);

  useEffect(() => {
    // Inisialisasi data periode
    const formattedPeriodes = periodeData.map((periode) => {
      const tahunAkademik = tahunAkademikData.find(
        (tahun) => tahun.id === periode.id_tahunakademik
      );
      const prodi = prodiData.find((prodi) => prodi.id === periode.id_prodi);

      return {
        id: periode.id,
        label: `${tahunAkademik?.rentang || "Tahun tidak ditemukan"} - ${
          prodi?.nama_prodi || "Prodi tidak ditemukan"
        }`,
        id_tahunakademik: periode.id_tahunakademik,
        id_prodi: periode.id_prodi,
      };
    });

    setPeriodeOptions(formattedPeriodes);

    // Set periode pertama sebagai default
    if (formattedPeriodes.length > 0 && !selectedPeriode) {
      setSelectedPeriode(formattedPeriodes[0].id);
    }

    // Load data capaian dengan status validasi
    const capaianWithDetails = capaianData.map((item, index) => ({
      ...item,
      id: index + 1,
      id_evaluasi: evaluasiData[index % evaluasiData.length]?.id || 1,
      auditor:
        dataUser.find((user) => user.role === "auditor")?.name ||
        "Auditor Internal",
      status: "validasi", // Default status menunggu validasi
      tanggal_input: new Date().toISOString().split("T")[0],
      bukti: `bukti-${index + 1}.pdf`,
      catatan:
        index % 3 === 0 ? "Perlu pengecekan ulang dokumen pendukung" : "",
      disetujui: false, // Status persetujuan awal
    }));

    setCapaian(capaianWithDetails);
  }, []);

  // Filter data berdasarkan periode dan status
  const filteredCapaian = capaian.filter((item) => {
    const matchesStatus =
      filterStatus === "semua" ||
      (filterStatus === "disetujui" && item.disetujui) ||
      (filterStatus === "ditolak" &&
        !item.disetujui &&
        item.status !== "validasi") ||
      (filterStatus === "validasi" && item.status === "validasi");

    const matchesSearch =
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDetailEvaluasi(item.id_evaluasi)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Toggle status persetujuan
  const togglePersetujuan = (id) => {
    setCapaian(
      capaian.map((item) =>
        item.id === id
          ? {
              ...item,
              disetujui: !item.disetujui,
              status: !item.disetujui ? "disetujui" : "validasi",
              catatan: !item.disetujui ? "" : item.catatan,
            }
          : item
      )
    );
  };

  // Action Functions
  const handleApprove = (id) => {
    setCapaian(
      capaian.map((item) =>
        item.id === id
          ? { ...item, disetujui: true, status: "disetujui", catatan: "" }
          : item
      )
    );
  };

  const handleReject = (id) => {
    const catatan = prompt("Masukkan alasan penolakan:");
    if (catatan !== null) {
      setCapaian(
        capaian.map((item) =>
          item.id === id
            ? { ...item, disetujui: false, status: "ditolak", catatan }
            : item
        )
      );
    }
  };

  const handleViewDetail = (capaianItem) => {
    alert(
      `Detail Capaian #${capaianItem.id}\n\n` +
        `Evaluasi: ${getDetailEvaluasi(capaianItem.id_evaluasi)}\n` +
        `Auditor: ${capaianItem.auditor}\n` +
        `Capaian: ${capaianItem.deskripsi}\n` +
        `Status: ${capaianItem.disetujui ? "Disetujui" : "Belum Disetujui"}\n` +
        `Tanggal Input: ${capaianItem.tanggal_input}\n` +
        `${capaianItem.catatan ? `Catatan: ${capaianItem.catatan}` : ""}`
    );
  };

  const handleDownloadBukti = (bukti) => {
    alert(`Mengunduh file: ${bukti}`);
  };

  const handlePeriodeChange = (e) => {
    setSelectedPeriode(e.target.value);
  };

  // Helper functions
  const getDetailEvaluasi = (id_evaluasi) => {
    const evaluasi = evaluasiData.find((e) => e.id === id_evaluasi);
    if (!evaluasi) return "Evaluasi tidak ditemukan";

    const substandar = substandarData.find(
      (s) => s.id === evaluasi.id_substandar
    );
    const indikator = jenisIndikatorData.find(
      (i) => i.id === evaluasi.id_jenisindikator
    );

    return `${substandar?.nama_substandar || "Substandar tidak ditemukan"} - ${
      indikator?.kode || "Indikator tidak ditemukan"
    }`;
  };

  const getStatusBadge = (disetujui, status) => {
    if (status === "validasi") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          <FiEye className="mr-1" size={14} />
          Menunggu Validasi
        </span>
      );
    }

    return disetujui ? (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
        <FiCheckCircle className="mr-1" size={14} />
        Disetujui
      </span>
    ) : (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
        <FiXCircle className="mr-1" size={14} />
        Ditolak
      </span>
    );
  };

  // Statistics
  const stats = {
    total: capaian.length,
    validasi: capaian.filter((item) => item.status === "validasi").length,
    disetujui: capaian.filter((item) => item.disetujui).length,
    ditolak: capaian.filter(
      (item) => !item.disetujui && item.status !== "validasi"
    ).length,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Validasi Capaian</h1>
        <p className="text-gray-600 mt-2">
          Validasi dan kelola capaian yang diajukan oleh auditor
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Filter Periode */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <label
              htmlFor="periode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Pilih Periode Validasi
            </label>
            <select
              id="periode"
              value={selectedPeriode}
              onChange={handlePeriodeChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            >
              {periodeOptions.map((periode) => (
                <option key={periode.id} value={periode.id}>
                  {periode.label}
                </option>
              ))}
            </select>
          </div>

          {/* Info Periode Terpilih */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 font-medium">
              Periode yang dipilih:{" "}
              {periodeOptions.find((p) => p.id === parseInt(selectedPeriode))
                ?.label || "Pilih periode"}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Capaian</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FiFileText className="text-blue-500 text-xl" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Menunggu Validasi
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.validasi}
              </p>
            </div>
            <FiEye className="text-yellow-500 text-xl" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Disetujui</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.disetujui}
              </p>
            </div>
            <FiCheckCircle className="text-green-500 text-xl" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ditolak</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.ditolak}
              </p>
            </div>
            <FiXCircle className="text-red-500 text-xl" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiSearch className="inline mr-2" />
              Cari Capaian
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan evaluasi atau capaian..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiFilter className="inline mr-2" />
              Filter Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="semua">Semua Status</option>
              <option value="validasi">Menunggu Validasi</option>
              <option value="disetujui">Disetujui</option>
              <option value="ditolak">Ditolak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Capaian Table */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiFileText className="mr-2 text-red-500" />
            Daftar Capaian -{" "}
            {periodeOptions.find((p) => p.id === parseInt(selectedPeriode))
              ?.label || "Semua Periode"}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-orange-500 text-white text-sm">
                <th className="px-4 py-3 text-left border border-gray-300">
                  ID
                </th>
                <th className="px-4 py-3 text-left border border-gray-300 w-2/5">
                  Indikator Kinerja Utama (IKU)
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  Capaian
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  Bukti
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  Status
                </th>
                <th className="px-4 py-3 text-center border border-gray-300">
                  Validasi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCapaian.map((capaianItem) => (
                <tr
                  key={capaianItem.id}
                  className="hover:bg-gray-50 text-sm border-b border-gray-300"
                >
                  <td className="px-4 py-3 border border-gray-300 font-medium">
                    {capaianItem.id}
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    <div className="max-w-md">
                      {getDetailEvaluasi(capaianItem.id_evaluasi)}
                      <button
                        onClick={() => handleViewDetail(capaianItem)}
                        className="text-blue-600 hover:text-blue-800 text-xs mt-1 flex items-center"
                      >
                        <FiEye className="mr-1" size={12} />
                        Lihat Detail
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    {capaianItem.deskripsi}
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    {capaianItem.bukti ? (
                      <button
                        onClick={() => handleDownloadBukti(capaianItem.bukti)}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm"
                      >
                        <FiDownload className="mr-1" size={14} />
                        Unduh
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">Tidak ada</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    {getStatusBadge(capaianItem.disetujui, capaianItem.status)}
                    {capaianItem.catatan && (
                      <div className="text-xs text-gray-500 mt-1 max-w-xs">
                        {capaianItem.catatan}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => togglePersetujuan(capaianItem.id)}
                        className={`flex items-center px-3 py-1 rounded-lg transition-colors duration-200 text-sm ${
                          capaianItem.disetujui
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                        }`}
                        title={
                          capaianItem.disetujui
                            ? "Batalkan Persetujuan"
                            : "Setujui"
                        }
                      >
                        <FiCheck className="mr-1" size={14} />
                        {capaianItem.disetujui ? "Disetujui" : "Setujui"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCapaian.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FiFileText className="mx-auto text-3xl text-gray-300 mb-2" />
              <p>Tidak ada data capaian</p>
              <p className="text-sm">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          )}
        </div>

        {/* Footer Tabel */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Menampilkan {filteredCapaian.length} data capaian
          </p>
        </div>
      </div>

      {/* Info Tambahan */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-1">
            Cara Validasi
          </h3>
          <p className="text-xs text-blue-600">
            Klik tombol "Setujui" untuk menyetujui capaian, atau "Tolak" untuk
            menolak dengan memberikan alasan.
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-green-800 mb-1">
            Status Validasi
          </h3>
          <p className="text-xs text-green-600">
            Status akan berubah otomatis ketika tombol validasi diklik.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValidasiCapaian;
