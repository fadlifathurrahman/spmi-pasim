import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiX,
  FiTrendingUp,
  FiEye,
} from "react-icons/fi";

// Import data
import {
  evaluasiData,
  substandarData,
  jenisIndikatorData,
  targetData,
  capaianData,
  periodeData,
  tahunAkademikData,
  prodiData,
} from "./../utils/Data.js";

const Evaluasi = () => {
  const [evaluasi, setEvaluasi] = useState([]);
  const [showEvaluasiForm, setShowEvaluasiForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingEvaluasi, setEditingEvaluasi] = useState(null);
  const [selectedEvaluasi, setSelectedEvaluasi] = useState(null);
  const [formData, setFormData] = useState({
    id_substandar: "",
    id_jenisindikator: "",
    id_target: "",
    id_capaian: "",
    id_periode: "",
  });

  useEffect(() => {
    // Load data dari Data.js
    setEvaluasi(evaluasiData);
  }, []);

  // Evaluasi Functions
  const handleAddEvaluasi = () => {
    setShowEvaluasiForm(true);
    setEditingEvaluasi(null);
    setFormData({
      id_substandar: "",
      id_jenisindikator: "",
      id_target: "",
      id_capaian: "",
      id_periode: "",
    });
  };

  const handleEditEvaluasi = (evaluasiItem) => {
    setShowEvaluasiForm(true);
    setEditingEvaluasi(evaluasiItem);
    setFormData({
      id_substandar: evaluasiItem.id_substandar.toString(),
      id_jenisindikator: evaluasiItem.id_jenisindikator.toString(),
      id_target: evaluasiItem.id_target.toString(),
      id_capaian: evaluasiItem.id_capaian.toString(),
      id_periode: evaluasiItem.id_periode.toString(),
    });
  };

  const handleViewDetail = (evaluasiItem) => {
    setSelectedEvaluasi(evaluasiItem);
    setShowDetailModal(true);
  };

  const handleDeleteEvaluasi = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus evaluasi ini?")) {
      setEvaluasi(evaluasi.filter((e) => e.id !== id));
    }
  };

  const handleSaveEvaluasi = () => {
    if (
      !formData.id_substandar ||
      !formData.id_jenisindikator ||
      !formData.id_target ||
      !formData.id_capaian ||
      !formData.id_periode
    ) {
      alert("Semua field harus diisi");
      return;
    }

    if (editingEvaluasi) {
      // Update evaluasi
      setEvaluasi(
        evaluasi.map((evaluasiItem) =>
          evaluasiItem.id === editingEvaluasi.id
            ? {
                ...evaluasiItem,
                id_substandar: parseInt(formData.id_substandar),
                id_jenisindikator: parseInt(formData.id_jenisindikator),
                id_target: parseInt(formData.id_target),
                id_capaian: parseInt(formData.id_capaian),
                id_periode: parseInt(formData.id_periode),
              }
            : evaluasiItem
        )
      );
    } else {
      // Add new evaluasi
      const newId = Math.max(...evaluasi.map((e) => e.id), 0) + 1;
      setEvaluasi([
        ...evaluasi,
        {
          id: newId,
          id_substandar: parseInt(formData.id_substandar),
          id_jenisindikator: parseInt(formData.id_jenisindikator),
          id_target: parseInt(formData.id_target),
          id_capaian: parseInt(formData.id_capaian),
          id_periode: parseInt(formData.id_periode),
        },
      ]);
    }

    setShowEvaluasiForm(false);
    setFormData({
      id_substandar: "",
      id_jenisindikator: "",
      id_target: "",
      id_capaian: "",
      id_periode: "",
    });
  };

  // Helper functions to get related data
  const getNamaSubstandar = (id_substandar) => {
    const substandar = substandarData.find((s) => s.id === id_substandar);
    return substandar
      ? substandar.nama_substandar
      : "Substandar tidak ditemukan";
  };

  const getNamaIndikator = (id_jenisindikator) => {
    const indikator = jenisIndikatorData.find(
      (i) => i.id === id_jenisindikator
    );
    return indikator
      ? `${indikator.kode} - ${indikator.nama_indikator}`
      : "Indikator tidak ditemukan";
  };

  const getDeskripsiTarget = (id_target) => {
    const target = targetData.find((t) => t.id === id_target);
    return target ? target.deskripsi : "Target tidak ditemukan";
  };

  const getPencapaian = (id_capaian) => {
    const capaian = capaianData.find((c) => c.id === id_capaian);
    return capaian ? capaian.pencapaian : "Capaian tidak ditemukan";
  };

  const getDetailPeriode = (id_periode) => {
    const periode = periodeData.find((p) => p.id === id_periode);
    if (!periode) return "Periode tidak ditemukan";

    const tahun = tahunAkademikData.find(
      (t) => t.id === periode.id_tahunakademik
    );
    const prodi = prodiData.find((p) => p.id === periode.id_prodi);

    return `${tahun ? tahun.rentang : "Tahun tidak ditemukan"} - ${
      prodi ? prodi.nama_prodi : "Prodi tidak ditemukan"
    }`;
  };

  const getKodeIndikator = (id_jenisindikator) => {
    const indikator = jenisIndikatorData.find(
      (i) => i.id === id_jenisindikator
    );
    return indikator ? indikator.kode : "-";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Evaluasi</h1>
        <p className="text-gray-600 mt-2">
          Kelola evaluasi standar mutu untuk Sistem Peningkatan Mutu Internal
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={handleAddEvaluasi}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <FiPlus className="mr-2" />
          Tambah Evaluasi
        </button>
      </div>

      {/* Form Modal Evaluasi */}
      {showEvaluasiForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingEvaluasi ? "Edit Evaluasi" : "Tambah Evaluasi"}
              </h3>
              <button
                onClick={() => setShowEvaluasiForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Substandar
                  </label>
                  <select
                    value={formData.id_substandar}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        id_substandar: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Pilih Substandar</option>
                    {substandarData.map((substandar) => (
                      <option key={substandar.id} value={substandar.id}>
                        {substandar.nama_substandar}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Indikator
                  </label>
                  <select
                    value={formData.id_jenisindikator}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        id_jenisindikator: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Pilih Jenis Indikator</option>
                    {jenisIndikatorData.map((indikator) => (
                      <option key={indikator.id} value={indikator.id}>
                        {indikator.kode} - {indikator.nama_indikator}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target
                  </label>
                  <select
                    value={formData.id_target}
                    onChange={(e) =>
                      setFormData({ ...formData, id_target: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Pilih Target</option>
                    {targetData.map((target) => (
                      <option key={target.id} value={target.id}>
                        {target.deskripsi}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capaian
                  </label>
                  <select
                    value={formData.id_capaian}
                    onChange={(e) =>
                      setFormData({ ...formData, id_capaian: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Pilih Capaian</option>
                    {capaianData.map((capaian) => (
                      <option key={capaian.id} value={capaian.id}>
                        {capaian.pencapaian}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Periode
                  </label>
                  <select
                    value={formData.id_periode}
                    onChange={(e) =>
                      setFormData({ ...formData, id_periode: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Pilih Periode</option>
                    {periodeData.map((periode) => {
                      const tahun = tahunAkademikData.find(
                        (t) => t.id === periode.id_tahunakademik
                      );
                      const prodi = prodiData.find(
                        (p) => p.id === periode.id_prodi
                      );
                      return (
                        <option key={periode.id} value={periode.id}>
                          {tahun?.rentang} - {prodi?.nama_prodi}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowEvaluasiForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEvaluasi}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <FiSave className="mr-2" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedEvaluasi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Detail Evaluasi #{selectedEvaluasi.id}
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Substandar
                  </label>
                  <p className="text-gray-900">
                    {getNamaSubstandar(selectedEvaluasi.id_substandar)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Indikator
                  </label>
                  <p className="text-gray-900">
                    {getNamaIndikator(selectedEvaluasi.id_jenisindikator)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target
                  </label>
                  <p className="text-gray-900">
                    {getDeskripsiTarget(selectedEvaluasi.id_target)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capaian
                  </label>
                  <p className="text-gray-900">
                    {getPencapaian(selectedEvaluasi.id_capaian)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Periode
                  </label>
                  <p className="text-gray-900">
                    {getDetailPeriode(selectedEvaluasi.id_periode)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Evaluasi */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiTrendingUp className="mr-2 text-red-500" />
            Daftar Evaluasi
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
                  Substandar
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Indikator
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periode
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {evaluasi.map((evaluasiItem) => (
                <tr
                  key={evaluasiItem.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {evaluasiItem.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div
                      className="max-w-xs truncate"
                      title={getNamaSubstandar(evaluasiItem.id_substandar)}
                    >
                      {getNamaSubstandar(evaluasiItem.id_substandar)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getKodeIndikator(evaluasiItem.id_jenisindikator) ===
                        "IKU"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {getKodeIndikator(evaluasiItem.id_jenisindikator)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div
                      className="max-w-xs truncate"
                      title={getDeskripsiTarget(evaluasiItem.id_target)}
                    >
                      {getDeskripsiTarget(evaluasiItem.id_target)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {getDetailPeriode(evaluasiItem.id_periode)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetail(evaluasiItem)}
                        className="text-green-600 hover:text-green-800 transition-colors duration-200 p-1 rounded hover:bg-green-50"
                        title="Lihat Detail"
                      >
                        <FiEye className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleEditEvaluasi(evaluasiItem)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                        title="Edit"
                      >
                        <FiEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvaluasi(evaluasiItem.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded hover:bg-red-50"
                        title="Hapus"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {evaluasi.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FiTrendingUp className="mx-auto text-3xl text-gray-300 mb-2" />
              <p>Tidak ada data evaluasi</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Card */}
      <div className="mt-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Evaluasi</p>
              <p className="text-2xl font-bold mt-1">{evaluasi.length}</p>
              <p className="text-xs opacity-80 mt-1">
                Evaluasi standar mutu yang sedang berjalan
              </p>
            </div>
            <FiTrendingUp className="text-2xl opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluasi;
