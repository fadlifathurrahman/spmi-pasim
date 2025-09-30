import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiX,
  FiTarget,
  FiBarChart2,
} from "react-icons/fi";

// Import data
import { targetData, jenisIndikatorData } from "./../utils/Data.js";

const TargetIndikator = () => {
  const [targets, setTargets] = useState([]);
  const [indikators, setIndikators] = useState([]);
  const [showTargetForm, setShowTargetForm] = useState(false);
  const [showIndikatorForm, setShowIndikatorForm] = useState(false);
  const [editingTarget, setEditingTarget] = useState(null);
  const [editingIndikator, setEditingIndikator] = useState(null);
  const [formData, setFormData] = useState({
    deskripsi: "",
    kode: "",
    nama_indikator: "",
  });

  useEffect(() => {
    // Load data dari Data.js
    setTargets(targetData);
    setIndikators(jenisIndikatorData);
  }, []);

  // Target Functions
  const handleAddTarget = () => {
    setShowTargetForm(true);
    setEditingTarget(null);
    setFormData({ deskripsi: "", kode: "", nama_indikator: "" });
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
    setFormData({ deskripsi: "", kode: "", nama_indikator: "" });
  };

  // Indikator Functions
  const handleAddIndikator = () => {
    setShowIndikatorForm(true);
    setEditingIndikator(null);
    setFormData({ deskripsi: "", kode: "", nama_indikator: "" });
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
    setFormData({ deskripsi: "", kode: "", nama_indikator: "" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Target & Indikator</h1>
        <p className="text-gray-600 mt-2">
          Kelola target dan indikator kinerja untuk Sistem Peningkatan Mutu
          Internal
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={handleAddTarget}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <FiPlus className="mr-2" />
          Tambah Target
        </button>
        <button
          onClick={handleAddIndikator}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <FiPlus className="mr-2" />
          Tambah Indikator
        </button>
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Tabel Target */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiTarget className="mr-2 text-red-500" />
              Daftar Target
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
                        >
                          <FiEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteTarget(target.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded hover:bg-red-50"
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
              </div>
            )}
          </div>
        </div>

        {/* Tabel Indikator */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
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
                        >
                          <FiEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteIndikator(indikator.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded hover:bg-red-50"
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
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Target</p>
              <p className="text-2xl font-bold mt-1">{targets.length}</p>
            </div>
            <FiTarget className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Indikator</p>
              <p className="text-2xl font-bold mt-1">{indikators.length}</p>
            </div>
            <FiBarChart2 className="text-2xl opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetIndikator;
