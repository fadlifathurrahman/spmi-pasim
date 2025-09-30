import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiX,
  FiUpload,
  FiFileText,
  FiDownload,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

// Import data
import {
  evaluasiData,
  substandarData,
  jenisIndikatorData,
  targetData,
  capaianData,
} from "./../utils/Data.js";

const InputCapaian = () => {
  const [capaian, setCapaian] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCapaian, setEditingCapaian] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    id_evaluasi: "",
    pencapaian: "",
    status: "draft",
    bukti: null,
  });

  useEffect(() => {
    // Load data capaian dari Data.js
    setCapaian(
      capaianData.map((item) => ({
        ...item,
        status: Math.random() > 0.5 ? "draft" : "validasi",
        bukti: `bukti-${item.id}.pdf`,
      }))
    );
  }, []);

  // Form Functions
  const handleAddCapaian = () => {
    setShowForm(true);
    setEditingCapaian(null);
    setSelectedFile(null);
    setFormData({
      id_evaluasi: "",
      pencapaian: "",
      status: "draft",
      bukti: null,
    });
  };

  const handleEditCapaian = (capaianItem) => {
    setShowForm(true);
    setEditingCapaian(capaianItem);
    setSelectedFile(null);
    setFormData({
      id_evaluasi: capaianItem.id_evaluasi || "",
      pencapaian: capaianItem.pencapaian,
      status: capaianItem.status || "draft",
      bukti: capaianItem.bukti || null,
    });
  };

  const handleDeleteCapaian = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus capaian ini?")) {
      setCapaian(capaian.filter((c) => c.id !== id));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFormData({ ...formData, bukti: file ? file.name : null });
  };

  const handleSaveCapaian = () => {
    if (!formData.id_evaluasi || !formData.pencapaian.trim()) {
      alert("Evaluasi dan pencapaian harus diisi");
      return;
    }

    if (editingCapaian) {
      // Update capaian
      setCapaian(
        capaian.map((capaianItem) =>
          capaianItem.id === editingCapaian.id
            ? {
                ...capaianItem,
                id_evaluasi: parseInt(formData.id_evaluasi),
                pencapaian: formData.pencapaian,
                status: formData.status,
                bukti: formData.bukti,
              }
            : capaianItem
        )
      );
    } else {
      // Add new capaian
      const newId = Math.max(...capaian.map((c) => c.id), 0) + 1;
      setCapaian([
        ...capaian,
        {
          id: newId,
          id_evaluasi: parseInt(formData.id_evaluasi),
          pencapaian: formData.pencapaian,
          status: formData.status,
          bukti: formData.bukti,
          tanggal_input: new Date().toISOString().split("T")[0],
        },
      ]);
    }

    setShowForm(false);
    setSelectedFile(null);
    setFormData({
      id_evaluasi: "",
      pencapaian: "",
      status: "draft",
      bukti: null,
    });
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
    const target = targetData.find((t) => t.id === evaluasi.id_target);

    return `${substandar?.nama_substandar || "Substandar tidak ditemukan"} - ${
      indikator?.kode || "Indikator tidak ditemukan"
    }`;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { color: "bg-yellow-100 text-yellow-800", label: "Draft" },
      validasi: { color: "bg-green-100 text-green-800", label: "Validasi" },
      revisi: { color: "bg-orange-100 text-orange-800", label: "Revisi" },
      ditolak: { color: "bg-red-100 text-red-800", label: "Ditolak" },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {status === "draft" && <FiClock className="mr-1" />}
        {status === "validasi" && <FiCheckCircle className="mr-1" />}
        {config.label}
      </span>
    );
  };

  const handleDownloadBukti = (bukti) => {
    // Simulasi download file
    alert(`Mengunduh file: ${bukti}`);
    console.log(`Downloading: ${bukti}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Input Capaian</h1>
        <p className="text-gray-600 mt-2">
          Input dan kelola capaian evaluasi standar mutu
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Action Button */}
      <div className="mb-8">
        <button
          onClick={handleAddCapaian}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <FiPlus className="mr-2" />
          Input Capaian Baru
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCapaian ? "Edit Capaian" : "Input Capaian Baru"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Evaluasi
                  </label>
                  <select
                    value={formData.id_evaluasi}
                    onChange={(e) =>
                      setFormData({ ...formData, id_evaluasi: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Pilih Evaluasi</option>
                    {evaluasiData.map((evaluasi) => {
                      const substandar = substandarData.find(
                        (s) => s.id === evaluasi.id_substandar
                      );
                      const indikator = jenisIndikatorData.find(
                        (i) => i.id === evaluasi.id_jenisindikator
                      );
                      return (
                        <option key={evaluasi.id} value={evaluasi.id}>
                          {substandar?.nama_substandar} - {indikator?.kode}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Pencapaian
                  </label>
                  <textarea
                    value={formData.pencapaian}
                    onChange={(e) =>
                      setFormData({ ...formData, pencapaian: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Deskripsikan pencapaian yang telah dilakukan..."
                    rows="6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Bukti
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 transition-colors duration-200">
                        <FiUpload className="mr-2 text-gray-400" />
                        <span className="text-gray-600">
                          {selectedFile ? selectedFile.name : "Choose File"}
                        </span>
                      </div>
                    </label>
                    {selectedFile && (
                      <span className="text-sm text-green-600">
                        File siap diupload
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Format yang didukung: PDF, DOC, DOCX, JPG, JPEG, PNG (Maks.
                    5MB)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="validasi">Ajukan Validasi</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveCapaian}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <FiSave className="mr-2" />
                {editingCapaian ? "Update Capaian" : "Simpan Capaian"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* Tabel Capaian */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiFileText className="mr-2 text-red-500" />
              Capaian yang Sudah Diisi
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
                    Pencapaian
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
                {capaian.map((capaianItem) => (
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
                      <div
                        className="max-w-md truncate"
                        title={capaianItem.pencapaian}
                      >
                        {capaianItem.pencapaian}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {capaianItem.bukti ? (
                        <button
                          onClick={() => handleDownloadBukti(capaianItem.bukti)}
                          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          <FiDownload className="mr-1" />
                          <span className="text-xs">Download</span>
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">Tidak ada</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {getStatusBadge(capaianItem.status)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCapaian(capaianItem)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                          title="Edit"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteCapaian(capaianItem.id)}
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
            {capaian.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiFileText className="mx-auto text-3xl text-gray-300 mb-2" />
                <p>Belum ada data capaian</p>
                <button
                  onClick={handleAddCapaian}
                  className="mt-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Input capaian pertama Anda
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Capaian</p>
              <p className="text-2xl font-bold mt-1">{capaian.length}</p>
            </div>
            <FiFileText className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Dalam Draft</p>
              <p className="text-2xl font-bold mt-1">
                {capaian.filter((c) => c.status === "draft").length}
              </p>
            </div>
            <FiClock className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Tervalidasi</p>
              <p className="text-2xl font-bold mt-1">
                {capaian.filter((c) => c.status === "validasi").length}
              </p>
            </div>
            <FiCheckCircle className="text-2xl opacity-80" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Panduan Input Capaian
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Tips Input yang Baik:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Deskripsikan pencapaian secara spesifik dan terukur</li>
              <li>Sertakan data pendukung yang relevan</li>
              <li>Upload bukti dokumen yang valid</li>
              <li>Periksa kembali sebelum mengajukan validasi</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Status Capaian:</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FiClock className="text-yellow-500 mr-2" />
                <span>Draft - Masih dapat diedit</span>
              </li>
              <li className="flex items-center">
                <FiCheckCircle className="text-green-500 mr-2" />
                <span>Validasi - Menunggu persetujuan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputCapaian;
