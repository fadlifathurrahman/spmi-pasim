import { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiFileText,
  FiDownload,
  FiFilter,
  FiSearch,
} from "react-icons/fi";

// Import data
import {
  capaianData,
  evaluasiData,
  substandarData,
  jenisIndikatorData,
  dataUser,
} from "./../utils/Data.js";

const ValidasiCapaian = () => {
  const [capaian, setCapaian] = useState([]);
  const [filterStatus, setFilterStatus] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load data capaian dengan status validasi
    const capaianWithDetails = capaianData.map((item, index) => ({
      ...item,
      id: index + 1,
      id_evaluasi: evaluasiData[index % evaluasiData.length]?.id || 1,
      auditor:
        dataUser.find((user) => user.role === "auditor")?.name ||
        "Auditor Internal",
      status: ["validasi", "ditolak", "disetujui", "revisi"][index % 4],
      tanggal_input: new Date().toISOString().split("T")[0],
      bukti: `bukti-${index + 1}.pdf`,
      catatan:
        index % 3 === 0 ? "Perlu pengecekan ulang dokumen pendukung" : "",
    }));

    setCapaian(capaianWithDetails);
  }, []);

  // Filter dan search functions
  const filteredCapaian = capaian.filter((item) => {
    const matchesStatus =
      filterStatus === "semua" || item.status === filterStatus;
    const matchesSearch =
      item.pencapaian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDetailEvaluasi(item.id_evaluasi)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Action Functions
  const handleApprove = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menyetujui capaian ini?")) {
      setCapaian(
        capaian.map((item) =>
          item.id === id ? { ...item, status: "disetujui" } : item
        )
      );
      alert("Capaian berhasil disetujui!");
    }
  };

  const handleReject = (id) => {
    const catatan = prompt("Masukkan alasan penolakan:");
    if (catatan !== null) {
      setCapaian(
        capaian.map((item) =>
          item.id === id ? { ...item, status: "ditolak", catatan } : item
        )
      );
      alert("Capaian berhasil ditolak!");
    }
  };

  const handleRequestRevision = (id) => {
    const catatan = prompt("Masukkan permintaan revisi:");
    if (catatan !== null) {
      setCapaian(
        capaian.map((item) =>
          item.id === id ? { ...item, status: "revisi", catatan } : item
        )
      );
      alert("Permintaan revisi berhasil dikirim!");
    }
  };

  const handleViewDetail = (capaianItem) => {
    alert(
      `Detail Capaian #${capaianItem.id}\n\n` +
        `Evaluasi: ${getDetailEvaluasi(capaianItem.id_evaluasi)}\n` +
        `Auditor: ${capaianItem.auditor}\n` +
        `Pencapaian: ${capaianItem.pencapaian}\n` +
        `Status: ${getStatusLabel(capaianItem.status)}\n` +
        `Tanggal Input: ${capaianItem.tanggal_input}\n` +
        `${capaianItem.catatan ? `Catatan: ${capaianItem.catatan}` : ""}`
    );
  };

  const handleDownloadBukti = (bukti) => {
    alert(`Mengunduh file: ${bukti}`);
    console.log(`Downloading: ${bukti}`);
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

  const getStatusLabel = (status) => {
    const statusLabels = {
      validasi: "Menunggu Validasi",
      disetujui: "Disetujui",
      ditolak: "Ditolak",
      revisi: "Perlu Revisi",
    };
    return statusLabels[status] || status;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      validasi: {
        color: "bg-yellow-100 text-yellow-800 border border-yellow-200",
        icon: FiEye,
      },
      disetujui: {
        color: "bg-green-100 text-green-800 border border-green-200",
        icon: FiCheckCircle,
      },
      ditolak: {
        color: "bg-red-100 text-red-800 border border-red-200",
        icon: FiXCircle,
      },
      revisi: {
        color: "bg-orange-100 text-orange-800 border border-orange-200",
        icon: FiXCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.validasi;
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        <IconComponent className="mr-1" size={14} />
        {getStatusLabel(status)}
      </span>
    );
  };

  const getActionButtons = (capaianItem) => {
    if (
      capaianItem.status === "disetujui" ||
      capaianItem.status === "ditolak"
    ) {
      return <span className="text-gray-400 text-sm">Telah diproses</span>;
    }

    return (
      <div className="flex space-x-2">
        <button
          onClick={() => handleApprove(capaianItem.id)}
          className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
        >
          <FiCheckCircle className="mr-1" size={14} />
          Approve
        </button>
        <button
          onClick={() => handleRequestRevision(capaianItem.id)}
          className="flex items-center px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm"
        >
          <FiXCircle className="mr-1" size={14} />
          Revisi
        </button>
        <button
          onClick={() => handleReject(capaianItem.id)}
          className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
        >
          <FiXCircle className="mr-1" size={14} />
          Reject
        </button>
      </div>
    );
  };

  // Statistics
  const stats = {
    total: capaian.length,
    validasi: capaian.filter((item) => item.status === "validasi").length,
    disetujui: capaian.filter((item) => item.status === "disetujui").length,
    ditolak: capaian.filter((item) => item.status === "ditolak").length,
    revisi: capaian.filter((item) => item.status === "revisi").length,
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FiFileText className="text-blue-500 text-xl" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Menunggu</p>
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

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revisi</p>
              <p className="text-2xl font-bold text-gray-900">{stats.revisi}</p>
            </div>
            <FiXCircle className="text-orange-500 text-xl" />
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
              placeholder="Cari berdasarkan evaluasi atau pencapaian..."
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
              <option value="revisi">Perlu Revisi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Capaian Table */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiFileText className="mr-2 text-red-500" />
            Daftar Capaian yang Perlu Validasi
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Evaluasi
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auditor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capaian
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bukti
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCapaian.map((capaianItem) => (
                <tr
                  key={capaianItem.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {capaianItem.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="max-w-xs">
                      {getDetailEvaluasi(capaianItem.id_evaluasi)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {capaianItem.auditor}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div className="max-w-md">
                      <div className="truncate" title={capaianItem.pencapaian}>
                        {capaianItem.pencapaian}
                      </div>
                      <button
                        onClick={() => handleViewDetail(capaianItem)}
                        className="text-blue-600 hover:text-blue-800 text-xs mt-1 flex items-center"
                      >
                        <FiEye className="mr-1" size={12} />
                        Lihat Detail
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
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
                  <td className="px-4 py-3 text-sm">
                    {getStatusBadge(capaianItem.status)}
                    {capaianItem.catatan && (
                      <div className="text-xs text-gray-500 mt-1 max-w-xs">
                        {capaianItem.catatan}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {getActionButtons(capaianItem)}
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
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Keterangan Status:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span>Menunggu Validasi - Perlu ditinjau</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Disetujui - Telah divalidasi</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Ditolak - Tidak memenuhi syarat</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span>Perlu Revisi - Butuh perbaikan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidasiCapaian;
