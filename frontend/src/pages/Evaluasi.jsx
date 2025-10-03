import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  standarData,
  substandarData,
  indikatorData,
  targetData,
  capaianData,
  evaluasiData as initialEvaluasi,
  periodeData,
  tahunAkademikData,
  prodiData,
} from "../utils/Data";
import { FiDownload, FiCheckCircle, FiTarget, FiBook } from "react-icons/fi";

const Evaluasi = () => {
  const { idProdi } = useParams();
  const prodiId = parseInt(idProdi, 10);

  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [periodeOptions, setPeriodeOptions] = useState([]);
  const [filteredEvaluasi, setFilteredEvaluasi] = useState([]);

  // Ambil user login dari localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userRole = currentUser?.role || "";

  // Build periodeOptions
  useEffect(() => {
    const periodes = periodeData.filter((p) => p.id_prodi === prodiId);
    const formatted = periodes.map((periode) => {
      const tahunAkademik = tahunAkademikData.find(
        (t) => t.id === periode.id_tahunakademik
      );
      return {
        id: String(periode.id),
        label: tahunAkademik?.rentang || "Tahun tidak ditemukan",
      };
    });

    setPeriodeOptions(formatted);
    if (formatted.length > 0) {
      setSelectedPeriode(formatted[0].id);
    } else {
      setSelectedPeriode("");
    }
  }, [prodiId]);

  // Filter evaluasi
  useEffect(() => {
    if (!selectedPeriode) {
      setFilteredEvaluasi([]);
      return;
    }

    const periodeId = parseInt(selectedPeriode, 10);
    const periodeObj = periodeData.find((p) => p.id === periodeId);

    if (!periodeObj || periodeObj.id_prodi !== prodiId) {
      setFilteredEvaluasi([]);
      return;
    }

    const evaluasiFiltered = initialEvaluasi.filter(
      (ev) => ev.id_periode === periodeId && ev.status === "aktif"
    );

    setFilteredEvaluasi(evaluasiFiltered);
  }, [selectedPeriode, prodiId]);

  const handlePeriodeChange = (e) => {
    setSelectedPeriode(e.target.value);
  };

  const handleCapaianChange = (id, value) => {
    setFilteredEvaluasi((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, id_capaian: parseInt(value, 10) } : item
      )
    );
  };

  const toggleVerifikasi = (id) => {
    setFilteredEvaluasi((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, diverifikasi: !item.diverifikasi } : item
      )
    );
  };

  const getJoinedEvaluasi = () => {
    return filteredEvaluasi.map((item) => {
      const substandar = substandarData.find(
        (s) => s.id === item.id_substandar
      );
      const standar = standarData.find((st) => st.id === item.id_standar);
      const indikator = indikatorData.find((ik) => ik.id === item.id_indikator);
      const target = targetData.find((t) => t.id === item.id_target);
      const capaian = capaianData.find((c) => c.id === item.id_capaian);

      return {
        ...item,
        standar: standar?.nama || `Standar ${item.id_standar}`,
        substandar: substandar?.nama || `Substandar ${item.id_substandar}`,
        indikator: indikator?.jenis || `Indikator ${item.id_indikator}`,
        target: target?.deskripsi || `Target ${item.id_target}`,
        capaian: capaian?.hasil || "",
      };
    });
  };

  const groupedByStandar = () => {
    const data = getJoinedEvaluasi();
    const grouped = {};
    data.forEach((item) => {
      if (!grouped[item.standar]) grouped[item.standar] = {};
      if (!grouped[item.standar][item.substandar])
        grouped[item.standar][item.substandar] = {};
      if (!grouped[item.standar][item.substandar][item.indikator])
        grouped[item.standar][item.substandar][item.indikator] = [];
      grouped[item.standar][item.substandar][item.indikator].push(item);
    });
    return grouped;
  };

  const uniqueStandarCount = new Set(filteredEvaluasi.map((e) => e.id_standar))
    .size;
  const uniqueSubstandarCount = new Set(
    filteredEvaluasi.map((e) => e.id_substandar)
  ).size;

  const stats = {
    standar: uniqueStandarCount,
    substandar: uniqueSubstandarCount,
    capaianTerisi: filteredEvaluasi.filter((e) => e.id_capaian).length,
    diverifikasi: filteredEvaluasi.filter((e) => e.diverifikasi).length,
  };

  const handleExportPDF = () => {
    alert("Generate PDF nanti kita sambungkan ke library (contoh: jsPDF)");
  };

  const prodi = prodiData.find((p) => p.id === prodiId);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Evaluasi Standar - {prodi?.nama_prodi}
        </h1>
        <p className="text-gray-600 mt-2">
          Berikut indikator kinerja prodi sesuai periode yang dipilih
        </p>
        <div className="w-32 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Filter Periode + Button PDF */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center gap-4">
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
            <option value="">-- Pilih Periode --</option>
            {periodeOptions.map((periode) => (
              <option key={periode.id} value={periode.id}>
                {periode.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <FiDownload className="mr-2" />
          PDF
        </button>
      </div>
      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jumlah Standar</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.standar}
              </p>
            </div>
            <FiBook className="text-blue-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jumlah Substandar</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.substandar}
              </p>
            </div>
            <FiTarget className="text-purple-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Capaian Terisi</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.capaianTerisi}
              </p>
            </div>
            <FiTarget className="text-yellow-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Diverifikasi</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.diverifikasi}
              </p>
            </div>
            <FiCheckCircle className="text-green-500 text-xl" />
          </div>
        </div>
      </div>

      {/* Tabel Evaluasi */}
      <div className="space-y-8">
        {Object.entries(groupedByStandar()).length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
            Tidak ada data evaluasi untuk prodi / periode yang dipilih.
          </div>
        ) : (
          Object.entries(groupedByStandar()).map(([standar, substandars]) => (
            <div key={standar} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {standar}
              </h2>

              {Object.entries(substandars).map(
                ([substandar, indikatorGroups]) => (
                  <div key={substandar} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      {substandar}
                    </h3>

                    {Object.entries(indikatorGroups).map(
                      ([indikator, items]) => (
                        <div key={indikator} className="mb-4">
                          <table className="w-full border border-gray-300">
                            <thead className="bg-orange-500 text-white">
                              <tr>
                                <th className="px-4 py-2 text-left border border-gray-300 w-2/5">
                                  {indikator}
                                </th>
                                <th className="px-4 py-2 text-center border border-gray-300 w-1/5">
                                  Capaian
                                </th>
                                <th className="px-4 py-2 text-center border border-gray-300 w-1/5">
                                  Diverifikasi
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {items.map((row) => (
                                <tr
                                  key={row.id}
                                  className="hover:bg-gray-50 text-sm"
                                >
                                  <td className="px-4 py-2 border border-gray-300">
                                    {row.target}
                                  </td>

                                  {/* CAPAIAN */}
                                  <td className="px-4 py-2 border border-gray-300 text-center">
                                    {userRole === "admin" ? (
                                      <select
                                        value={row.id_capaian || ""}
                                        onChange={(e) =>
                                          handleCapaianChange(
                                            row.id,
                                            e.target.value
                                          )
                                        }
                                        className="border px-2 py-1 rounded"
                                      >
                                        <option value="">-- Pilih --</option>
                                        {capaianData.map((c) => (
                                          <option key={c.id} value={c.id}>
                                            {c.hasil}
                                          </option>
                                        ))}
                                      </select>
                                    ) : (
                                      <span>
                                        {capaianData.find(
                                          (c) => c.id === row.id_capaian
                                        )?.hasil || "-"}
                                      </span>
                                    )}
                                  </td>

                                  {/* DIVERIFIKASI */}
                                  <td
                                    className="px-4 py-2 border border-gray-300 text-center cursor-pointer"
                                    onClick={
                                      userRole === "user"
                                        ? () => toggleVerifikasi(row.id)
                                        : undefined
                                    }
                                  >
                                    {row.diverifikasi ? (
                                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                        ✔ Ya
                                      </span>
                                    ) : (
                                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                        ✘ Tidak
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )
                    )}
                  </div>
                )
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Evaluasi;
