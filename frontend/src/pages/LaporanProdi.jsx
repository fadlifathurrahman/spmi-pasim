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
} from "react-icons/fi";

// Import data
import {
  laporanProdiData,
  prodiData,
  periodeData,
  tahunAkademikData,
  evaluasiData,
  substandarData,
  jenisIndikatorData,
  targetData,
  capaianData,
} from "./../utils/Data.js";

const LaporanProdi = () => {
  const [selectedProdi, setSelectedProdi] = useState("");
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [laporanData, setLaporanData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Simulasi data laporan
    const generatedData = laporanProdiData.map((item) => {
      const evaluasi = evaluasiData.find((e) => e.id === item.id_evaluasi);
      const substandar = substandarData.find(
        (s) => s.id === evaluasi?.id_substandar
      );
      const indikator = jenisIndikatorData.find(
        (i) => i.id === evaluasi?.id_jenisindikator
      );
      const target = targetData.find((t) => t.id === evaluasi?.id_target);
      const capaian = capaianData.find((c) => c.id === evaluasi?.id_capaian);
      const prodi = prodiData.find((p) => p.id === item.id_prodi);

      const statuses = ["disetujui", "ditolak", "validasi", "revisi"];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      return {
        id: item.id,
        id_prodi: item.id_prodi,
        nama_prodi: prodi?.nama_prodi || "Prodi tidak ditemukan",
        id_evaluasi: item.id_evaluasi,
        substandar: substandar?.nama_substandar || "Substandar tidak ditemukan",
        indikator: indikator
          ? `${indikator.kode} - ${indikator.nama_indikator}`
          : "Indikator tidak ditemukan",
        target: target?.deskripsi || "Target tidak ditemukan",
        capaian: capaian?.pencapaian || "Capaian tidak ditemukan",
        status: randomStatus,
        id_periode: evaluasi?.id_periode || 1,
      };
    });

    setLaporanData(generatedData);
    setFilteredData(generatedData);
  }, []);

  // Filter data berdasarkan prodi dan periode
  useEffect(() => {
    let filtered = laporanData;

    if (selectedProdi) {
      filtered = filtered.filter(
        (item) => item.id_prodi === parseInt(selectedProdi)
      );
    }

    if (selectedPeriode) {
      filtered = filtered.filter(
        (item) => item.id_periode === parseInt(selectedPeriode)
      );
    }

    setFilteredData(filtered);
  }, [selectedProdi, selectedPeriode, laporanData]);

  // Export functions
  const handleExportPDF = () => {
    if (filteredData.length === 0) {
      alert("Tidak ada data untuk diexport!");
      return;
    }

    const prodiName = selectedProdi
      ? prodiData.find((p) => p.id === parseInt(selectedProdi))?.nama_prodi
      : "Semua Program Studi";

    const periodeName = selectedPeriode
      ? getPeriodeDetail(parseInt(selectedPeriode))
      : "Semua Periode";

    alert(
      `Generating PDF Report:\nProgram Studi: ${prodiName}\nPeriode: ${periodeName}\nTotal Data: ${filteredData.length} records`
    );
    console.log("Exporting PDF:", filteredData);
  };

  const handleExportExcel = () => {
    if (filteredData.length === 0) {
      alert("Tidak ada data untuk diexport!");
      return;
    }

    const prodiName = selectedProdi
      ? prodiData.find((p) => p.id === parseInt(selectedProdi))?.nama_prodi
      : "Semua Program Studi";

    const periodeName = selectedPeriode
      ? getPeriodeDetail(parseInt(selectedPeriode))
      : "Semua Periode";

    alert(
      `Generating Excel Report:\nProgram Studi: ${prodiName}\nPeriode: ${periodeName}\nTotal Data: ${filteredData.length} records`
    );
    console.log("Exporting Excel:", filteredData);
  };

  const handlePrint = () => {
    if (filteredData.length === 0) {
      alert("Tidak ada data untuk dicetak!");
      return;
    }

    window.print();
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      disetujui: {
        color: "bg-green-100 text-green-800 border border-green-200",
        icon: FiCheckCircle,
        label: "Disetujui",
      },
      ditolak: {
        color: "bg-red-100 text-red-800 border border-red-200",
        icon: FiXCircle,
        label: "Ditolak",
      },
      validasi: {
        color: "bg-yellow-100 text-yellow-800 border border-yellow-200",
        icon: FiClock,
        label: "Validasi",
      },
      revisi: {
        color: "bg-orange-100 text-orange-800 border border-orange-200",
        icon: FiXCircle,
        label: "Revisi",
      },
    };

    const config = statusConfig[status] || statusConfig.validasi;
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
    const disetujui = filteredData.filter(
      (item) => item.status === "disetujui"
    ).length;
    const ditolak = filteredData.filter(
      (item) => item.status === "ditolak"
    ).length;
    const validasi = filteredData.filter(
      (item) => item.status === "validasi"
    ).length;
    const revisi = filteredData.filter(
      (item) => item.status === "revisi"
    ).length;

    return { total, disetujui, ditolak, validasi, revisi };
  };

  const stats = getStatistics();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Laporan Program Studi
        </h1>
        <p className="text-gray-600 mt-2">
          Generate laporan evaluasi mutu per program studi
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiFilter className="inline mr-2 text-red-500" />
              Pilih Program Studi
            </label>
            <select
              value={selectedProdi}
              onChange={(e) => setSelectedProdi(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Semua Program Studi</option>
              {prodiData.map((prodi) => (
                <option key={prodi.id} value={prodi.id}>
                  {prodi.nama_prodi}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiFilter className="inline mr-2 text-red-500" />
              Pilih Periode
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

          <div className="flex items-end space-x-3">
            <button
              onClick={handleExportPDF}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <FiDownload className="mr-2" />
              PDF
            </button>
            <button
              onClick={handleExportExcel}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <FiDownload className="mr-2" />
              Excel
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FiPrinter className="mr-2" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Evaluasi
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FiBarChart2 className="text-blue-500 text-xl" />
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

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Validasi</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.validasi}
              </p>
            </div>
            <FiClock className="text-yellow-500 text-xl" />
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

      {/* Report Table */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiFileText className="mr-2 text-red-500" />
            Rekap Evaluasi Program Studi
          </h3>
          <span className="text-sm text-gray-500">
            Menampilkan {filteredData.length} data
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
                  Status
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
                    {getStatusBadge(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FiFileText className="mx-auto text-3xl text-gray-300 mb-2" />
              <p>Tidak ada data laporan</p>
              <p className="text-sm">
                Coba pilih program studi atau periode yang berbeda
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
              Ringkasan Laporan
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Program Studi:</span>
                <span className="font-medium">
                  {selectedProdi
                    ? prodiData.find((p) => p.id === parseInt(selectedProdi))
                        ?.nama_prodi
                    : "Semua Program Studi"}
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
                <span className="text-gray-600">Total Evaluasi:</span>
                <span className="font-medium">{stats.total} data</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tingkat Penyelesaian:</span>
                <span className="font-medium">
                  {stats.total > 0
                    ? Math.round((stats.disetujui / stats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FiCheckCircle className="mr-2 text-red-500" />
              Status Evaluasi
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Disetujui</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.disetujui}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${
                          stats.total > 0
                            ? (stats.disetujui / stats.total) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ditolak</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.ditolak}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${
                          stats.total > 0
                            ? (stats.ditolak / stats.total) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Menunggu Validasi</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.validasi}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{
                        width: `${
                          stats.total > 0
                            ? (stats.validasi / stats.total) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Perlu Revisi</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{stats.revisi}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{
                        width: `${
                          stats.total > 0
                            ? (stats.revisi / stats.total) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
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
          .print-break {
            page-break-after: always;
          }
        }
      `}</style>
    </div>
  );
};

export default LaporanProdi;
