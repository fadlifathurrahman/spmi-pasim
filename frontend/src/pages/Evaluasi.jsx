import { useState, useEffect } from "react";
import {
  evaluasiData,
  periodeData,
  tahunAkademikData,
  prodiData,
} from "../utils/Data";

const Evaluasi = () => {
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [periodeOptions, setPeriodeOptions] = useState([]);
  const [filteredEvaluasi, setFilteredEvaluasi] = useState([]);

  // Inisialisasi data periode
  useEffect(() => {
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
  }, []);

  // Filter data evaluasi berdasarkan periode yang dipilih
  useEffect(() => {
    if (selectedPeriode) {
      // Untuk demo, kita akan menampilkan semua data evaluasi
      // Dalam implementasi nyata, Anda akan memfilter berdasarkan periode
      setFilteredEvaluasi(evaluasiData);
    }
  }, [selectedPeriode]);

  const handlePeriodeChange = (e) => {
    setSelectedPeriode(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Standar Penelitian & Evaluasi
        </h1>
        <p className="text-gray-600 mt-2">
          Berikut indikator kinerja utama beserta target capaian
        </p>
        <div className="w-32 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Filter Periode */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <label
              htmlFor="periode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Pilih Periode Evaluasi
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

      {/* Tabel Evaluasi */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Data Evaluasi -{" "}
            {periodeOptions.find((p) => p.id === parseInt(selectedPeriode))
              ?.label || "Semua Periode"}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-orange-500 text-white text-sm">
                <th className="px-4 py-3 text-left border border-gray-300 w-2/3">
                  Indikator Kinerja Utama (IKU)
                </th>
                <th className="px-4 py-3 text-center border border-gray-300">
                  Target Capaian
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEvaluasi.length > 0 ? (
                filteredEvaluasi.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 text-sm">
                    <td className="px-4 py-3 border border-gray-300">
                      {item.indikator}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-center">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        {item.target}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="px-4 py-8 text-center text-gray-500 border border-gray-300"
                  >
                    Tidak ada data evaluasi untuk periode yang dipilih
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Evaluasi;
