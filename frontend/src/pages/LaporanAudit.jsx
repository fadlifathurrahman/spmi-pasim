import { useState, useEffect } from "react";
import {
  FiFileText,
  FiDownload,
  FiBarChart2,
  FiFilter,
  FiPrinter,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEye,
  FiSearch,
} from "react-icons/fi";

// Import data
import {
  prodiData,
  periodeData,
  tahunAkademikData,
  evaluasiData,
  substandarData,
  jenisIndikatorData,
  targetData,
  capaianData,
} from "./../utils/Data.js";

const LaporanAudit = () => {
  const [selectedProdi, setSelectedProdi] = useState("");
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [auditData, setAuditData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Simulasi data audit
    const generatedData = evaluasiData.map((evaluasi) => {
      const substandar = substandarData.find(
        (s) => s.id === evaluasi.id_substandar
      );
      const indikator = jenisIndikatorData.find(
        (i) => i.id === evaluasi.id_jenisindikator
      );
      const target = targetData.find((t) => t.id === evaluasi.id_target);
      const capaian = capaianData.find((c) => c.id === evaluasi.id_capaian);
      const periode = periodeData.find((p) => p.id === evaluasi.id_periode);
      const prodi = prodiData.find((p) => p.id === periode?.id_prodi);

      const validasiStatuses = [
        "Sesuai",
        "Tidak Sesuai",
        "Perlu Tindak Lanjut",
        "Belum Diaudit",
      ];
      const randomStatus =
        validasiStatuses[Math.floor(Math.random() * validasiStatuses.length)];

      const temuanAudit = [
        "Dokumen lengkap dan sesuai standar",
        "Perlu perbaikan dokumentasi",
        "Bukti fisik belum lengkap",
        "Proses sudah berjalan optimal",
        "Perlu evaluasi ulang implementasi",
      ];

      const randomTemuan =
        temuanAudit[Math.floor(Math.random() * temuanAudit.length)];

      return {
        id: evaluasi.id,
        substandar: substandar?.nama_substandar || "Substandar tidak ditemukan",
        indikator: indikator
          ? `${indikator.kode} - ${indikator.nama_indikator}`
          : "Indikator tidak ditemukan",
        target: target?.deskripsi || "Target tidak ditemukan",
        capaian: capaian?.pencapaian || "Capaian tidak ditemukan",
        validasi: randomStatus,
        temuan: randomTemuan,
        id_periode: evaluasi.id_periode,
        nama_prodi: prodi?.nama_prodi || "Prodi tidak ditemukan",
        rekomendasi: "Implementasikan rekomendasi perbaikan",
        tanggal_audit: new Date().toISOString().split("T")[0],
      };
    });

    setAuditData(generatedData);
    setFilteredData(generatedData);
  }, []);

  // Filter data berdasarkan prodi, periode, dan search
  useEffect(() => {
    let filtered = auditData;

    if (selectedProdi) {
      filtered = filtered.filter((item) =>
        item.nama_prodi.includes(selectedProdi)
      );
    }

    if (selectedPeriode) {
      filtered = filtered.filter(
        (item) => item.id_periode === parseInt(selectedPeriode)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.substandar.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.indikator.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.validasi.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [selectedProdi, selectedPeriode, searchTerm, auditData]);

  // Export functions
  const handleGenerateReport = () => {
    if (filteredData.length === 0) {
      alert("Tidak ada data untuk generate laporan!");
      return;
    }

    const prodiName = selectedProdi || "Semua Program Studi";
    const periodeName = selectedPeriode
      ? getPeriodeDetail(parseInt(selectedPeriode))
      : "Semua Periode";

    alert(
      `Generating Audit Report:\nProgram Studi: ${prodiName}\nPeriode: ${periodeName}\nTotal Data: ${filteredData.length} records`
    );
    console.log("Generating Audit Report:", filteredData);
  };

  const handleExportPDF = () => {
    if (filteredData.length === 0) {
      alert("Tidak ada data untuk diexport!");
      return;
    }

    alert(
      `Exporting PDF Audit Report\nTotal Data: ${filteredData.length} records`
    );
    console.log("Exporting PDF:", filteredData);
  };

  const handleExportExcel = () => {
    if (filteredData.length === 0) {
      alert("Tidak ada data untuk diexport!");
      return;
    }

    alert(
      `Exporting Excel Audit Report\nTotal Data: ${filteredData.length} records`
    );
    console.log("Exporting Excel:", filteredData);
  };

  const handleViewDetail = (auditItem) => {
    alert(
      `Detail Audit #${auditItem.id}\n\n` +
        `Substandar: ${auditItem.substandar}\n` +
        `Indikator: ${auditItem.indikator}\n` +
        `Target: ${auditItem.target}\n` +
        `Capaian: ${auditItem.capaian}\n` +
        `Validasi: ${auditItem.validasi}\n` +
        `Temuan: ${auditItem.temuan}\n` +
        `Rekomendasi: ${auditItem.rekomendasi}\n` +
        `Program Studi: ${auditItem.nama_prodi}\n` +
        `Tanggal Audit: ${auditItem.tanggal_audit}`
    );
  };

  // Helper functions
  const getPeriodeDetail = (id_periode) => {
    const periode = periodeData.find((p) => p.id === id_periode);
    if (!periode) return "Periode tidak ditemukan";

    const tahun = tahunAkademikData.find(
      (t) => t.id === periode.id_tahunakademik
    );
    const prodi = prodiData.find((p) => p.id === periode.id_prodi);

    return `${tahun?.rentang || "Tahun tidak ditemukan"} - ${
      prodi?.nama_prodi || "Prodi tidak ditemukan"
    }`;
  };

  const getValidasiBadge = (validasi) => {
    const validasiConfig = {
      Sesuai: {
        color: "bg-green-100 text-green-800 border border-green-200",
        icon: FiCheckCircle,
        label: "Sesuai",
      },
      "Tidak Sesuai": {
        color: "bg-red-100 text-red-800 border border-red-200",
        icon: FiXCircle,
        label: "Tidak Sesuai",
      },
      "Perlu Tindak Lanjut": {
        color: "bg-orange-100 text-orange-800 border border-orange-200",
        icon: FiClock,
        label: "Perlu Tindak Lanjut",
      },
      "Belum Diaudit": {
        color: "bg-gray-100 text-gray-800 border border-gray-200",
        icon: FiClock,
        label: "Belum Diaudit",
      },
    };

    const config = validasiConfig[validasi] || validasiConfig["Belum Diaudit"];
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <IconComponent className="mr-1" size={12} />
        {config.label}
      </span>
    );
  };

  const getStatistics = () => {
    const total = filteredData.length;
    const sesuai = filteredData.filter(
      (item) => item.validasi === "Sesuai"
    ).length;
    const tidakSesuai = filteredData.filter(
      (item) => item.validasi === "Tidak Sesuai"
    ).length;
    const tindakLanjut = filteredData.filter(
      (item) => item.validasi === "Perlu Tindak Lanjut"
    ).length;
    const belumAudit = filteredData.filter(
      (item) => item.validasi === "Belum Diaudit"
    ).length;

    return { total, sesuai, tidakSesuai, tindakLanjut, belumAudit };
  };

  const stats = getStatistics();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Laporan Audit</h1>
        <p className="text-gray-600 mt-2">
          Generate laporan hasil audit mutu internal
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiSearch className="inline mr-2 text-red-500" />
              Cari Data Audit
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan substandar, indikator, atau validasi..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiFilter className="inline mr-2 text-red-500" />
              Program Studi
            </label>
            <select
              value={selectedProdi}
              onChange={(e) => setSelectedProdi(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Semua Program Studi</option>
              {prodiData.map((prodi) => (
                <option key={prodi.id} value={prodi.nama_prodi}>
                  {prodi.nama_prodi}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiFilter className="inline mr-2 text-red-500" />
              Periode Audit
            </label>
            <select
              value={selectedPeriode}
              onChange={(e) => setSelectedPeriode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Semua Periode</option>
              {periodeData.map((periode) => (
                <option key={periode.id} value={periode.id}>
                  {getPeriodeDetail(periode.id)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={handleGenerateReport}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <FiFileText className="mr-2" />
            Generate Laporan Audit
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <FiDownload className="mr-2" />
            Export PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <FiDownload className="mr-2" />
            Export Excel
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <FiPrinter className="mr-2" />
            Print
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Audit</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FiBarChart2 className="text-blue-500 text-xl" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sesuai</p>
              <p className="text-2xl font-bold text-gray-900">{stats.sesuai}</p>
            </div>
            <FiCheckCircle className="text-green-500 text-xl" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tidak Sesuai</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.tidakSesuai}
              </p>
            </div>
            <FiXCircle className="text-red-500 text-xl" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tindak Lanjut</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.tindakLanjut}
              </p>
            </div>
            <FiClock className="text-orange-500 text-xl" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Belum Audit</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.belumAudit}
              </p>
            </div>
            <FiClock className="text-gray-500 text-xl" />
          </div>
        </div>
      </div>

      {/* Audit Report Table */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiFileText className="mr-2 text-red-500" />
            Hasil Audit Mutu Internal
          </h3>
          <span className="text-sm text-gray-500">
            Menampilkan {filteredData.length} data audit
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Substandar
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Indikator
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capaian
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validasi
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="max-w-xs font-medium">
                      {item.substandar}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div className="max-w-xs">{item.indikator}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div className="max-w-md truncate" title={item.target}>
                      {item.target}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div className="max-w-md truncate" title={item.capaian}>
                      {item.capaian}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {getValidasiBadge(item.validasi)}
                    <div
                      className="text-xs text-gray-500 mt-1 max-w-xs truncate"
                      title={item.temuan}
                    >
                      {item.temuan}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => handleViewDetail(item)}
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                      title="Lihat Detail"
                    >
                      <FiEye className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FiFileText className="mx-auto text-3xl text-gray-300 mb-2" />
              <p>Tidak ada data audit</p>
              <p className="text-sm">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {filteredData.length > 0 && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FiBarChart2 className="mr-2 text-red-500" />
              Ringkasan Audit
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Program Studi:</span>
                <span className="font-medium">
                  {selectedProdi || "Semua Program Studi"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Periode:</span>
                <span className="font-medium">
                  {selectedPeriode
                    ? getPeriodeDetail(parseInt(selectedPeriode))
                    : "Semua Periode"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Audit:</span>
                <span className="font-medium">{stats.total} data</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tingkat Kesesuaian:</span>
                <span className="font-medium">
                  {stats.total > 0
                    ? Math.round((stats.sesuai / stats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FiCheckCircle className="mr-2 text-red-500" />
              Distribusi Hasil Validasi
            </h4>
            <div className="space-y-2">
              {[
                { label: "Sesuai", value: stats.sesuai, color: "bg-green-500" },
                {
                  label: "Tidak Sesuai",
                  value: stats.tidakSesuai,
                  color: "bg-red-500",
                },
                {
                  label: "Perlu Tindak Lanjut",
                  value: stats.tindakLanjut,
                  color: "bg-orange-500",
                },
                {
                  label: "Belum Diaudit",
                  value: stats.belumAudit,
                  color: "bg-gray-500",
                },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{item.value}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{
                          width: `${
                            stats.total > 0
                              ? (item.value / stats.total) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LaporanAudit;
