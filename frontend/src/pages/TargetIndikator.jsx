import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiX,
  FiTarget,
  FiBarChart2,
  FiTrendingUp,
} from "react-icons/fi";

// Import data
import {
  targetData,
  jenisIndikatorData,
  capaianData,
} from "./../utils/Data.js";

const TargetIndikator = () => {
  const [targets, setTargets] = useState([]);
  const [indikators, setIndikators] = useState([]);
  const [capaian, setCapaian] = useState([]);
  const [showTargetForm, setShowTargetForm] = useState(false);
  const [showIndikatorForm, setShowIndikatorForm] = useState(false);
  const [showCapaianForm, setShowCapaianForm] = useState(false);
  const [editingTarget, setEditingTarget] = useState(null);
  const [editingIndikator, setEditingIndikator] = useState(null);
  const [editingCapaian, setEditingCapaian] = useState(null);
  const [formData, setFormData] = useState({
    deskripsi: "",
    kode: "",
    nama_indikator: "",
    tingkat_capaian: "",
    deskripsi_capaian: "",
  });

  // Opsi untuk tingkat capaian
  const tingkatCapaianOptions = [
    "Data Tersedia",
    "Data Tidak Tersedia",
    "90% Sesuai",
    "80% Sesuai",
    "75% Sesuai",
    "50% Sesuai",
    "Tidak Sesuai",
  ];

  useEffect(() => {
    // Load data dari Data.js
    setTargets(targetData);
    setIndikators(jenisIndikatorData);
    setCapaian(capaianData);
  }, []);

  // Target Functions
  const handleAddTarget = () => {
    setShowTargetForm(true);
    setEditingTarget(null);
    setFormData({
      deskripsi: "",
      kode: "",
      nama_indikator: "",
      tingkat_capaian: "",
      deskripsi_capaian: "",
    });
  };

  const handleEditTarget = (target) => {
    setShowTargetForm(true);
    setEditingTarget(target);
    setFormData({ ...formData, deskripsi: target.deskripsi });
  };

  const handleDeleteTarget = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus target ini?")) {
      setTargets(targets.filter((target) => target.id !== id));
    }
  };

  const handleSaveTarget = () => {
    if (!formData.deskripsi.trim()) {
      alert("Deskripsi target tidak boleh kosong");
      return;
    }

    if (editingTarget) {
      // Update target
      setTargets(
        targets.map((target) =>
          target.id === editingTarget.id
            ? { ...target, deskripsi: formData.deskripsi }
            : target
        )
      );
    } else {
      // Add new target
      const newId = Math.max(...targets.map((t) => t.id), 0) + 1;
      setTargets([
        ...targets,
        {
          id: newId,
          deskripsi: formData.deskripsi,
        },
      ]);
    }

    setShowTargetForm(false);
    setFormData({
      deskripsi: "",
      kode: "",
      nama_indikator: "",
      tingkat_capaian: "",
      deskripsi_capaian: "",
    });
  };

  // Indikator Functions
  const handleAddIndikator = () => {
    setShowIndikatorForm(true);
    setEditingIndikator(null);
    setFormData({
      deskripsi: "",
      kode: "",
      nama_indikator: "",
      tingkat_capaian: "",
      deskripsi_capaian: "",
    });
  };

  const handleEditIndikator = (indikator) => {
    setShowIndikatorForm(true);
    setEditingIndikator(indikator);
    setFormData({
      ...formData,
      kode: indikator.kode,
      nama_indikator: indikator.nama_indikator,
    });
  };

  const handleDeleteIndikator = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus indikator ini?")) {
      setIndikators(indikators.filter((indikator) => indikator.id !== id));
    }
  };

  const handleSaveIndikator = () => {
    if (!formData.kode.trim() || !formData.nama_indikator.trim()) {
      alert("Kode dan nama indikator harus diisi");
      return;
    }

    if (editingIndikator) {
      // Update indikator
      setIndikators(
        indikators.map((indikator) =>
          indikator.id === editingIndikator.id
            ? {
                ...indikator,
                kode: formData.kode,
                nama_indikator: formData.nama_indikator,
              }
            : indikator
        )
      );
    } else {
      // Add new indikator
      const newId = Math.max(...indikators.map((i) => i.id), 0) + 1;
      setIndikators([
        ...indikators,
        {
          id: newId,
          kode: formData.kode,
          nama_indikator: formData.nama_indikator,
        },
      ]);
    }

    setShowIndikatorForm(false);
    setFormData({
      deskripsi: "",
      kode: "",
      nama_indikator: "",
      tingkat_capaian: "",
      deskripsi_capaian: "",
    });
  };

  // Capaian Functions
  const handleAddCapaian = () => {
    setShowCapaianForm(true);
    setEditingCapaian(null);
    setFormData({
      deskripsi: "",
      kode: "",
      nama_indikator: "",
      tingkat_capaian: "",
      deskripsi_capaian: "",
    });
  };

  const handleEditCapaian = (capaianItem) => {
    setShowCapaianForm(true);
    setEditingCapaian(capaianItem);
    setFormData({
      ...formData,
      tingkat_capaian: capaianItem.tingkat_capaian,
      deskripsi_capaian: capaianItem.deskripsi,
    });
  };

  const handleDeleteCapaian = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus capaian ini?")) {
      setCapaian(capaian.filter((capaianItem) => capaianItem.id !== id));
    }
  };

  const handleSaveCapaian = () => {
    if (
      !formData.tingkat_capaian.trim() ||
      !formData.deskripsi_capaian.trim()
    ) {
      alert("Tingkat capaian dan deskripsi harus diisi");
      return;
    }

    if (editingCapaian) {
      // Update capaian
      setCapaian(
        capaian.map((capaianItem) =>
          capaianItem.id === editingCapaian.id
            ? {
                ...capaianItem,
                tingkat_capaian: formData.tingkat_capaian,
                deskripsi: formData.deskripsi_capaian,
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
          tingkat_capaian: formData.tingkat_capaian,
          deskripsi: formData.deskripsi_capaian,
        },
      ]);
    }

    setShowCapaianForm(false);
    setFormData({
      deskripsi: "",
      kode: "",
      nama_indikator: "",
      tingkat_capaian: "",
      deskripsi_capaian: "",
    });
  };

  // Fungsi untuk mendapatkan warna badge berdasarkan tingkat capaian
  const getBadgeColor = (tingkatCapaian) => {
    switch (tingkatCapaian) {
      case "90% Sesuai":
      case "80% Sesuai":
        return "bg-green-100 text-green-800";
      case "75% Sesuai":
      case "50% Sesuai":
        return "bg-yellow-100 text-yellow-800";
      case "Data Tersedia":
        return "bg-blue-100 text-blue-800";
      case "Data Tidak Tersedia":
        return "bg-gray-100 text-gray-800";
      case "Tidak Sesuai":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Target & Indikator</h1>
        <p className="text-gray-600 mt-2">
          Kelola target, indikator, dan capaian kinerja untuk Sistem Peningkatan
          Mutu Internal
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Target</p>
              <p className="text-2xl font-bold mt-1">{targets.length}</p>
              <p className="text-xs opacity-80 mt-1">
                Target kinerja yang ditetapkan
              </p>
            </div>
            <FiTarget className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Indikator</p>
              <p className="text-2xl font-bold mt-1">{indikators.length}</p>
              <p className="text-xs opacity-80 mt-1">
                Indikator kinerja yang tersedia
              </p>
            </div>
            <FiBarChart2 className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Capaian</p>
              <p className="text-2xl font-bold mt-1">{capaian.length}</p>
              <p className="text-xs opacity-80 mt-1">
                Data capaian yang tercatat
              </p>
            </div>
            <FiTrendingUp className="text-2xl opacity-80" />
          </div>
        </div>
      </div>

      {/* Form Modal Target */}
      {showTargetForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingTarget ? "Edit Target" : "Tambah Target"}
              </h3>
              <button
                onClick={() => setShowTargetForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Target
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Masukkan deskripsi target"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowTargetForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveTarget}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <FiSave className="mr-2" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal Indikator */}
      {showIndikatorForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingIndikator ? "Edit Indikator" : "Tambah Indikator"}
              </h3>
              <button
                onClick={() => setShowIndikatorForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kode Indikator
                </label>
                <input
                  type="text"
                  value={formData.kode}
                  onChange={(e) =>
                    setFormData({ ...formData, kode: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Contoh: IKU, IKT"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Indikator
                </label>
                <input
                  type="text"
                  value={formData.nama_indikator}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_indikator: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Masukkan nama indikator"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowIndikatorForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveIndikator}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <FiSave className="mr-2" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal Capaian */}
      {showCapaianForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCapaian ? "Edit Capaian" : "Tambah Capaian"}
              </h3>
              <button
                onClick={() => setShowCapaianForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tingkat Capaian
                </label>
                <select
                  value={formData.tingkat_capaian}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tingkat_capaian: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Pilih Tingkat Capaian</option>
                  {tingkatCapaianOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Capaian
                </label>
                <textarea
                  value={formData.deskripsi_capaian}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deskripsi_capaian: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Masukkan deskripsi capaian"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowCapaianForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveCapaian}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <FiSave className="mr-2" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Tabel Target */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiTarget className="mr-2 text-red-500" />
              Daftar Target
            </h3>
            <button
              onClick={handleAddTarget}
              className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              <FiPlus className="mr-2" />
              Tambah Target
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deskripsi Target
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {targets.map((target) => (
                  <tr
                    key={target.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {target.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {target.deskripsi}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditTarget(target)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                          title="Edit Target"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteTarget(target.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded hover:bg-red-50"
                          title="Hapus Target"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {targets.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiTarget className="mx-auto text-3xl text-gray-300 mb-2" />
                <p>Tidak ada data target</p>
                <button
                  onClick={handleAddTarget}
                  className="mt-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Tambah target pertama
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabel Indikator */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiBarChart2 className="mr-2 text-red-500" />
              Daftar Indikator
            </h3>
            <button
              onClick={handleAddIndikator}
              className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              <FiPlus className="mr-2" />
              Tambah Indikator
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kode
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Indikator
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {indikators.map((indikator) => (
                  <tr
                    key={indikator.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {indikator.id}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {indikator.kode}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {indikator.nama_indikator}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditIndikator(indikator)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                          title="Edit Indikator"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteIndikator(indikator.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded hover:bg-red-50"
                          title="Hapus Indikator"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {indikators.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiBarChart2 className="mx-auto text-3xl text-gray-300 mb-2" />
                <p>Tidak ada data indikator</p>
                <button
                  onClick={handleAddIndikator}
                  className="mt-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Tambah indikator pertama
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabel Capaian */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiTrendingUp className="mr-2 text-red-500" />
              Daftar Capaian
            </h3>
            <button
              onClick={handleAddCapaian}
              className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              <FiPlus className="mr-2" />
              Tambah Capaian
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tingkat Capaian
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deskripsi
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
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(
                          capaianItem.tingkat_capaian
                        )}`}
                      >
                        {capaianItem.tingkat_capaian}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {capaianItem.deskripsi}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCapaian(capaianItem)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                          title="Edit Capaian"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteCapaian(capaianItem.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded hover:bg-red-50"
                          title="Hapus Capaian"
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
                <FiTrendingUp className="mx-auto text-3xl text-gray-300 mb-2" />
                <p>Tidak ada data capaian</p>
                <button
                  onClick={handleAddCapaian}
                  className="mt-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Tambah capaian pertama
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetIndikator;
