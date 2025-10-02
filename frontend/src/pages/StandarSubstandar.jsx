import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiSave,
  FiX,
  FiFileText,
  FiBook,
  FiArchive,
  FiEye,
  FiChevronDown,
} from "react-icons/fi";

// Import data
import { standarData, substandarData } from "./../utils/Data.js";

const StandarSubstandar = () => {
  const [standars, setStandars] = useState([]);
  const [substandars, setSubstandars] = useState([]);
  const [showSubstandarForm, setShowSubstandarForm] = useState(false);
  const [editingSubstandar, setEditingSubstandar] = useState(null);
  const [formData, setFormData] = useState({
    nama_standar: "",
    nama: "",
    id_standar: "",
  });

  useEffect(() => {
    setStandars(standarData);
    setSubstandars(substandarData);
  }, []);

  // Substandar Functions
  const handleAddSubstandar = () => {
    setShowSubstandarForm(true);
    setEditingSubstandar(null);
    setFormData({ nama_standar: "", nama: "", id_standar: "" });
  };

  const handleEditSubstandar = (substandar) => {
    setShowSubstandarForm(true);
    setEditingSubstandar(substandar);
    setFormData({
      ...formData,
      nama: substandar.nama,
      id_standar: substandar.id_standar.toString(),
    });
  };

  const handleStatusSubstandar = (id, newStatus) => {
    setSubstandars(
      substandars.map((substandar) =>
        substandar.id === id ? { ...substandar, status: newStatus } : substandar
      )
    );
  };

  const handleSaveSubstandar = () => {
    if (!formData.nama.trim() || !formData.id_standar) {
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
                nama: formData.nama,
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
          nama: formData.nama,
          id_standar: parseInt(formData.id_standar),
          status: "aktif",
        },
      ]);
    }

    setShowSubstandarForm(false);
    setFormData({ nama_standar: "", nama: "", id_standar: "" });
  };

  const getNamaStandar = (id_standar) => {
    const standar = standars.find((s) => s.id === id_standar);
    return standar ? standar.nama : "Standar tidak ditemukan";
  };

  // Fungsi untuk mendapatkan style dropdown berdasarkan status
  const getDropdownStyle = (status) => {
    if (status === "aktif") {
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
          Standar & Substandar
        </h1>
        <p className="text-gray-600 mt-2">
          Kelola standar dan substandar mutu untuk Sistem Peningkatan Mutu
          Internal
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Standar</p>
              <p className="text-2xl font-bold mt-1">{standars.length}</p>
              <p className="text-xs opacity-80 mt-1">Standar mutu yang aktif</p>
            </div>
            <FiFileText className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Total Substandar</p>
              <p className="text-2xl font-bold mt-1">{substandarData.length}</p>
              <p className="text-xs opacity-80 mt-1">Substandar yang aktif</p>
            </div>
            <FiBook className="text-2xl opacity-80" />
          </div>
        </div>
      </div>

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
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nama: e.target.value,
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
                      {standar.nama}
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
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
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
                      {standar.nama}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel Substandar */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiBook className="mr-2 text-red-500" />
              Daftar Substandar
            </h3>
            <button
              onClick={handleAddSubstandar}
              className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              <FiPlus className="mr-2" />
              Tambah Substandar
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
                      {substandar.nama}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {getNamaStandar(substandar.id_standar)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditSubstandar(substandar)}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                          title="Edit Substandar"
                        >
                          <FiEdit className="mr-1" />
                          Edit
                        </button>
                        <div className="relative">
                          <select
                            value={substandar.status}
                            onChange={(e) =>
                              handleStatusSubstandar(
                                substandar.id,
                                e.target.value
                              )
                            }
                            className={`appearance-none flex items-center px-8 py-1 border rounded-lg transition-colors duration-200 text-sm cursor-pointer ${getDropdownStyle(
                              substandar.status
                            )}`}
                          >
                            <option
                              value="aktif"
                              className="bg-white text-gray-900"
                            >
                              <FiEye className="inline mr-2" />
                              aktif
                            </option>
                            <option
                              value="pasif"
                              className="bg-white text-gray-900"
                            >
                              <FiArchive className="inline mr-1" />
                              pasif
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
            {substandars.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiBook className="mx-auto text-3xl text-gray-300 mb-2" />
                <p>Tidak ada data substandar</p>
                <button
                  onClick={handleAddSubstandar}
                  className="mt-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Tambah substandar pertama
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandarSubstandar;
