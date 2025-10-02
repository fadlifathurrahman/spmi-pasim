import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiSave,
  FiX,
  FiTarget,
  FiBarChart2,
  FiTrendingUp,
  FiChevronDown,
} from "react-icons/fi";

// Import data
import { targetData, capaianData } from "./../utils/Data.js";

const TargetIndikator = () => {
  const [targets, setTargets] = useState([]);
  const [capaian, setCapaian] = useState([]);
  const [showTargetForm, setShowTargetForm] = useState(false);
  const [showCapaianForm, setShowCapaianForm] = useState(false);
  const [editingTarget, setEditingTarget] = useState(null);
  const [editingCapaian, setEditingCapaian] = useState(null);
  const [formData, setFormData] = useState({
    deskripsi: "",
    hasil: "",
  });

  // Indikator fix (tidak bisa ditambah/dihapus)
  const indikators = [
    {
      id: 1,
      kode: "IKU",
      nama_indikator: "Indikator Kinerja Utama",
    },
    {
      id: 2,
      kode: "IKT",
      nama_indikator: "Indikator Kinerja Tambahan",
    },
  ];

  useEffect(() => {
    setTargets(targetData.map((t) => ({ ...t, status: "Tampil" })));
    setCapaian(capaianData.map((c) => ({ ...c, status: "Tampil" })));
  }, []);

  // Target Functions
  const handleAddTarget = () => {
    setShowTargetForm(true);
    setEditingTarget(null);
    setFormData({ deskripsi: "", hasil: "" });
  };

  const handleEditTarget = (target) => {
    setShowTargetForm(true);
    setEditingTarget(target);
    setFormData({ ...formData, deskripsi: target.deskripsi });
  };

  const handleSaveTarget = () => {
    if (!formData.deskripsi.trim()) {
      alert("Deskripsi target tidak boleh kosong");
      return;
    }

    if (editingTarget) {
      setTargets(
        targets.map((target) =>
          target.id === editingTarget.id
            ? { ...target, deskripsi: formData.deskripsi }
            : target
        )
      );
    } else {
      const newId = Math.max(...targets.map((t) => t.id), 0) + 1;
      setTargets([
        ...targets,
        { id: newId, deskripsi: formData.deskripsi, status: "Tampil" },
      ]);
    }

    setShowTargetForm(false);
    setFormData({ deskripsi: "", hasil: "" });
  };

  // Capaian Functions
  const handleAddCapaian = () => {
    setShowCapaianForm(true);
    setEditingCapaian(null);
    setFormData({ deskripsi: "", hasil: "" });
  };

  const handleEditCapaian = (capaianItem) => {
    setShowCapaianForm(true);
    setEditingCapaian(capaianItem);
    setFormData({ ...formData, hasil: capaianItem.deskripsi });
  };

  const handleSaveCapaian = () => {
    if (!formData.hasil.trim()) {
      alert("Deskripsi capaian tidak boleh kosong");
      return;
    }

    if (editingCapaian) {
      setCapaian(
        capaian.map((c) =>
          c.id === editingCapaian.id ? { ...c, hasil: formData.hasil } : c
        )
      );
    } else {
      const newId = Math.max(...capaian.map((c) => c.id), 0) + 1;
      setCapaian([
        ...capaian,
        {
          id: newId,
          hasil: formData.hasil,
          status: "Tampil",
        },
      ]);
    }

    setShowCapaianForm(false);
    setFormData({ deskripsi: "", hasil: "" });
  };

  // Update status dropdown
  const handleStatusChange = (list, setList, id, newStatus) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  // Fungsi untuk mendapatkan style dropdown berdasarkan status
  const getDropdownStyle = (status) => {
    if (status === "Tampil") {
      return "bg-green-50 text-green-700 border-green-200 hover:bg-green-100";
    } else {
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Target, Indikator & Capaian
        </h1>
        <p className="text-gray-600 mt-2">
          Kelola target, indikator, dan capaian kinerja untuk Sistem Peningkatan
          Mutu Internal
        </p>
        <div className="w-32 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Target</p>
              <p className="text-2xl font-bold mt-1">{targets.length}</p>
            </div>
            <FiTarget className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Indikator</p>
              <p className="text-2xl font-bold mt-1">{indikators.length}</p>
            </div>
            <FiBarChart2 className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Capaian</p>
              <p className="text-2xl font-bold mt-1">{capaian.length}</p>
            </div>
            <FiTrendingUp className="text-2xl opacity-80" />
          </div>
        </div>
      </div>

      {/* Grid 2 kolom untuk Indikator & Capaian */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Tabel Indikator */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiBarChart2 className="mr-2 text-red-500" />
              Daftar Indikator
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kode
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Indikator
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {indikators.map((indikator) => (
                  <tr
                    key={indikator.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        {indikator.kode}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {indikator.nama_indikator}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel Capaian */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiTrendingUp className="mr-2 text-red-500" />
              Daftar Capaian
            </h3>
            <button
              onClick={handleAddCapaian}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
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
                    Hasil
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {capaian.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {c.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {c.hasil}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditCapaian(c)}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                        >
                          <FiEdit className="mr-1" />
                          Edit
                        </button>
                        <div className="relative">
                          <select
                            value={c.status}
                            onChange={(e) =>
                              handleStatusChange(
                                capaian,
                                setCapaian,
                                c.id,
                                e.target.value
                              )
                            }
                            className={`appearance-none flex items-center px-3 py-1 border rounded-lg transition-colors duration-200 text-sm cursor-pointer ${getDropdownStyle(
                              c.status
                            )}`}
                          >
                            <option
                              value="Tampil"
                              className="bg-white text-gray-900"
                            >
                              Tampil
                            </option>
                            <option
                              value="Arsip"
                              className="bg-white text-gray-900"
                            >
                              Arsip
                            </option>
                          </select>
                          <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tabel Target di bawah */}
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiTarget className="mr-2 text-red-500" />
            Daftar Target
          </h3>
          <button
            onClick={handleAddTarget}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
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
                  Deskripsi
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {targets.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {t.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {t.deskripsi}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditTarget(t)}
                        className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                      >
                        <FiEdit className="mr-1" />
                        Edit
                      </button>
                      <div className="relative">
                        <select
                          value={t.status}
                          onChange={(e) =>
                            handleStatusChange(
                              targets,
                              setTargets,
                              t.id,
                              e.target.value
                            )
                          }
                          className={`appearance-none flex items-center px-3 py-1 border rounded-lg transition-colors duration-200 text-sm cursor-pointer ${getDropdownStyle(
                            t.status
                          )}`}
                        >
                          <option
                            value="Tampil"
                            className="bg-white text-gray-900"
                          >
                            Tampil
                          </option>
                          <option
                            value="Arsip"
                            className="bg-white text-gray-900"
                          >
                            Arsip
                          </option>
                        </select>
                        <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  Hasil Capaian
                </label>
                <textarea
                  value={formData.hasil}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hasil: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Masukkan hasil capaian (contoh: 90% Sesuai, Tersedia, ≥ 60%, dll)"
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
    </div>
  );
};

export default TargetIndikator;
