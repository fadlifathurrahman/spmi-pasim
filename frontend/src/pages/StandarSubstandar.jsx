import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiX,
  FiFileText,
  FiBook,
} from "react-icons/fi";

// Import data
import { standarData, substandarData } from "./../utils/Data.js";

const StandarSubstandar = () => {
  const [standars, setStandars] = useState([]);
  const [substandars, setSubstandars] = useState([]);
  const [showStandarForm, setShowStandarForm] = useState(false);
  const [showSubstandarForm, setShowSubstandarForm] = useState(false);
  const [editingStandar, setEditingStandar] = useState(null);
  const [editingSubstandar, setEditingSubstandar] = useState(null);
  const [formData, setFormData] = useState({
    nama_standar: "",
    nama_substandar: "",
    id_standar: "",
  });

  useEffect(() => {
    // Load data dari Data.js
    setStandars(standarData);
    setSubstandars(substandarData);
  }, []);

  // Standar Functions
  const handleAddStandar = () => {
    setShowStandarForm(true);
    setEditingStandar(null);
    setFormData({ nama_standar: "", nama_substandar: "", id_standar: "" });
  };

  const handleEditStandar = (standar) => {
    setShowStandarForm(true);
    setEditingStandar(standar);
    setFormData({ ...formData, nama_standar: standar.nama_standar });
  };

  const handleDeleteStandar = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus standar ini?")) {
      setStandars(standars.filter((standar) => standar.id !== id));
      // Juga hapus substandar yang terkait
      setSubstandars(substandars.filter((sub) => sub.id_standar !== id));
    }
  };

  const handleSaveStandar = () => {
    if (!formData.nama_standar.trim()) {
      alert("Nama standar tidak boleh kosong");
      return;
    }

    if (editingStandar) {
      // Update standar
      setStandars(
        standars.map((standar) =>
          standar.id === editingStandar.id
            ? { ...standar, nama_standar: formData.nama_standar }
            : standar
        )
      );
    } else {
      // Add new standar
      const newId = Math.max(...standars.map((s) => s.id), 0) + 1;
      setStandars([
        ...standars,
        {
          id: newId,
          nama_standar: formData.nama_standar,
        },
      ]);
    }

    setShowStandarForm(false);
    setFormData({ nama_standar: "", nama_substandar: "", id_standar: "" });
  };

  // Substandar Functions
  const handleAddSubstandar = () => {
    setShowSubstandarForm(true);
    setEditingSubstandar(null);
    setFormData({ nama_standar: "", nama_substandar: "", id_standar: "" });
  };

  const handleEditSubstandar = (substandar) => {
    setShowSubstandarForm(true);
    setEditingSubstandar(substandar);
    setFormData({
      ...formData,
      nama_substandar: substandar.nama_substandar,
      id_standar: substandar.id_standar.toString(),
    });
  };

  const handleDeleteSubstandar = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus substandar ini?")) {
      setSubstandars(substandars.filter((sub) => sub.id !== id));
    }
  };

  const handleSaveSubstandar = () => {
    if (!formData.nama_substandar.trim() || !formData.id_standar) {
      alert("Nama substandar dan standar harus diisi");
      return;
    }

    if (editingSubstandar) {
      // Update substandar
      setSubstandars(
        substandars.map((substandar) =>
          substandar.id === editingSubstandar.id
            ? {
                ...substandar,
                nama_substandar: formData.nama_substandar,
                id_standar: parseInt(formData.id_standar),
              }
            : substandar
        )
      );
    } else {
      // Add new substandar
      const newId = Math.max(...substandars.map((s) => s.id), 0) + 1;
      setSubstandars([
        ...substandars,
        {
          id: newId,
          nama_substandar: formData.nama_substandar,
          id_standar: parseInt(formData.id_standar),
        },
      ]);
    }

    setShowSubstandarForm(false);
    setFormData({ nama_standar: "", nama_substandar: "", id_standar: "" });
  };

  const getNamaStandar = (id_standar) => {
    const standar = standars.find((s) => s.id === id_standar);
    return standar ? standar.nama_standar : "Standar tidak ditemukan";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Standar & Substandar
        </h1>
        <p className="text-gray-600 mt-2">
          Kelola standar dan substandar mutu untuk Sistem Peningkatan Mutu
          Internal
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={handleAddStandar}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <FiPlus className="mr-2" />
          Tambah Standar
        </button>
        <button
          onClick={handleAddSubstandar}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <FiPlus className="mr-2" />
          Tambah Substandar
        </button>
      </div>

      {/* Form Modal Standar */}
      {showStandarForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingStandar ? "Edit Standar" : "Tambah Standar"}
              </h3>
              <button
                onClick={() => setShowStandarForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Standar
                </label>
                <input
                  type="text"
                  value={formData.nama_standar}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_standar: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Masukkan nama standar"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowStandarForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveStandar}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <FiSave className="mr-2" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal Substandar */}
      {showSubstandarForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingSubstandar ? "Edit Substandar" : "Tambah Substandar"}
              </h3>
              <button
                onClick={() => setShowSubstandarForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Substandar
                </label>
                <input
                  type="text"
                  value={formData.nama_substandar}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nama_substandar: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Masukkan nama substandar"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standar
                </label>
                <select
                  value={formData.id_standar}
                  onChange={(e) =>
                    setFormData({ ...formData, id_standar: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Pilih Standar</option>
                  {standars.map((standar) => (
                    <option key={standar.id} value={standar.id}>
                      {standar.nama_standar}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowSubstandarForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveSubstandar}
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
        {/* Tabel Standar */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiFileText className="mr-2 text-red-500" />
              Daftar Standar
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
                    Nama Standar
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {standars.map((standar) => (
                  <tr
                    key={standar.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {standar.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {standar.nama_standar}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditStandar(standar)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteStandar(standar.id)}
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
            {standars.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiFileText className="mx-auto text-3xl text-gray-300 mb-2" />
                <p>Tidak ada data standar</p>
              </div>
            )}
          </div>
        </div>

        {/* Tabel Substandar */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiBook className="mr-2 text-red-500" />
              Daftar Substandar
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
                    Nama Substandar
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Standar
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {substandars.map((substandar) => (
                  <tr
                    key={substandar.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {substandar.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {substandar.nama_substandar}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {getNamaStandar(substandar.id_standar)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSubstandar(substandar)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                        >
                          <FiEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDeleteSubstandar(substandar.id)}
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
            {substandars.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiBook className="mx-auto text-3xl text-gray-300 mb-2" />
                <p>Tidak ada data substandar</p>
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
              <p className="text-sm font-medium opacity-90">Total Standar</p>
              <p className="text-2xl font-bold mt-1">{standars.length}</p>
            </div>
            <FiFileText className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Substandar</p>
              <p className="text-2xl font-bold mt-1">{substandars.length}</p>
            </div>
            <FiBook className="text-2xl opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandarSubstandar;
