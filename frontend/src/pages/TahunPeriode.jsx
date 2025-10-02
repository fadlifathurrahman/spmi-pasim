import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiSave,
  FiX,
  FiCalendar,
  FiBook,
  FiUsers,
  FiChevronDown,
} from "react-icons/fi";

// Import data
import {
  tahunAkademikData,
  periodeData,
  prodiData,
  fakultasData,
} from "./../utils/Data.js";

const TahunPeriode = () => {
  const [tahunAkademik, setTahunAkademik] = useState([]);
  const [periode, setPeriode] = useState([]);
  const [fakultas, setFakultas] = useState([]);
  const [prodi, setProdi] = useState([]);
  const [showTahunForm, setShowTahunForm] = useState(false);
  const [showPeriodeForm, setShowPeriodeForm] = useState(false);
  const [showFakultasForm, setShowFakultasForm] = useState(false);
  const [showProdiForm, setShowProdiForm] = useState(false);
  const [editingTahun, setEditingTahun] = useState(null);
  const [editingPeriode, setEditingPeriode] = useState(null);
  const [editingFakultas, setEditingFakultas] = useState(null);
  const [editingProdi, setEditingProdi] = useState(null);
  const [formData, setFormData] = useState({
    rentang: "",
    id_tahunakademik: "",
    id_prodi: "",
    nama_fakultas: "",
    nama_prodi: "",
    id_fakultas: "",
  });

  useEffect(() => {
    // Load data dari Data.js
    setTahunAkademik(tahunAkademikData);
    setPeriode(periodeData);
    setFakultas(fakultasData);
    setProdi(prodiData);
  }, []);

  // Tahun Akademik Functions
  const handleAddTahun = () => {
    setShowTahunForm(true);
    setEditingTahun(null);
    setFormData({ ...formData, rentang: "" });
  };

  const handleEditTahun = (tahun) => {
    setShowTahunForm(true);
    setEditingTahun(tahun);
    setFormData({ ...formData, rentang: tahun.rentang });
  };

  const handleStatusTahun = (id, newStatus) => {
    setTahunAkademik(
      tahunAkademik.map((tahun) =>
        tahun.id === id ? { ...tahun, status: newStatus } : tahun
      )
    );
  };

  const handleSaveTahun = () => {
    if (!formData.rentang.trim()) {
      alert("Rentang tahun akademik tidak boleh kosong");
      return;
    }

    if (editingTahun) {
      // Update tahun akademik
      setTahunAkademik(
        tahunAkademik.map((tahun) =>
          tahun.id === editingTahun.id
            ? { ...tahun, rentang: formData.rentang }
            : tahun
        )
      );
    } else {
      // Add new tahun akademik
      const newId = Math.max(...tahunAkademik.map((t) => t.id), 0) + 1;
      setTahunAkademik([
        ...tahunAkademik,
        {
          id: newId,
          rentang: formData.rentang,
          status: "Tampil",
        },
      ]);
    }

    setShowTahunForm(false);
    setFormData({ ...formData, rentang: "" });
  };

  // Periode Functions
  const handleAddPeriode = () => {
    setShowPeriodeForm(true);
    setEditingPeriode(null);
    setFormData({ ...formData, id_tahunakademik: "", id_prodi: "" });
  };

  const handleEditPeriode = (periodeItem) => {
    setShowPeriodeForm(true);
    setEditingPeriode(periodeItem);
    setFormData({
      ...formData,
      id_tahunakademik: periodeItem.id_tahunakademik.toString(),
      id_prodi: periodeItem.id_prodi.toString(),
    });
  };

  const handleStatusPeriode = (id, newStatus) => {
    setPeriode(
      periode.map((periodeItem) =>
        periodeItem.id === id
          ? { ...periodeItem, status: newStatus }
          : periodeItem
      )
    );
  };

  const handleSavePeriode = () => {
    if (!formData.id_tahunakademik || !formData.id_prodi) {
      alert("Tahun akademik dan program studi harus dipilih");
      return;
    }

    if (editingPeriode) {
      // Update periode
      setPeriode(
        periode.map((periodeItem) =>
          periodeItem.id === editingPeriode.id
            ? {
                ...periodeItem,
                id_tahunakademik: parseInt(formData.id_tahunakademik),
                id_prodi: parseInt(formData.id_prodi),
              }
            : periodeItem
        )
      );
    } else {
      // Add new periode
      const newId = Math.max(...periode.map((p) => p.id), 0) + 1;
      setPeriode([
        ...periode,
        {
          id: newId,
          id_tahunakademik: parseInt(formData.id_tahunakademik),
          id_prodi: parseInt(formData.id_prodi),
          status: "Tampil",
        },
      ]);
    }

    setShowPeriodeForm(false);
    setFormData({ ...formData, id_tahunakademik: "", id_prodi: "" });
  };

  // Fakultas Functions
  const handleAddFakultas = () => {
    setShowFakultasForm(true);
    setEditingFakultas(null);
    setFormData({ ...formData, nama_fakultas: "" });
  };

  const handleEditFakultas = (fakultasItem) => {
    setShowFakultasForm(true);
    setEditingFakultas(fakultasItem);
    setFormData({ ...formData, nama_fakultas: fakultasItem.nama_fakultas });
  };

  const handleStatusFakultas = (id, newStatus) => {
    setFakultas(
      fakultas.map((fakultasItem) =>
        fakultasItem.id === id
          ? { ...fakultasItem, status: newStatus }
          : fakultasItem
      )
    );
  };

  const handleSaveFakultas = () => {
    if (!formData.nama_fakultas.trim()) {
      alert("Nama fakultas tidak boleh kosong");
      return;
    }

    if (editingFakultas) {
      // Update fakultas
      setFakultas(
        fakultas.map((fakultasItem) =>
          fakultasItem.id === editingFakultas.id
            ? { ...fakultasItem, nama_fakultas: formData.nama_fakultas }
            : fakultasItem
        )
      );
    } else {
      // Add new fakultas
      const newId = Math.max(...fakultas.map((f) => f.id), 0) + 1;
      setFakultas([
        ...fakultas,
        {
          id: newId,
          nama_fakultas: formData.nama_fakultas,
          status: "Tampil",
        },
      ]);
    }

    setShowFakultasForm(false);
    setFormData({ ...formData, nama_fakultas: "" });
  };

  // Prodi Functions
  const handleAddProdi = () => {
    setShowProdiForm(true);
    setEditingProdi(null);
    setFormData({ ...formData, nama_prodi: "", id_fakultas: "" });
  };

  const handleEditProdi = (prodiItem) => {
    setShowProdiForm(true);
    setEditingProdi(prodiItem);
    setFormData({
      ...formData,
      nama_prodi: prodiItem.nama_prodi,
      id_fakultas: prodiItem.id_fakultas.toString(),
    });
  };

  const handleStatusProdi = (id, newStatus) => {
    setProdi(
      prodi.map((prodiItem) =>
        prodiItem.id === id ? { ...prodiItem, status: newStatus } : prodiItem
      )
    );
  };

  const handleSaveProdi = () => {
    if (!formData.nama_prodi.trim() || !formData.id_fakultas) {
      alert("Nama program studi dan fakultas harus diisi");
      return;
    }

    if (editingProdi) {
      // Update prodi
      setProdi(
        prodi.map((prodiItem) =>
          prodiItem.id === editingProdi.id
            ? {
                ...prodiItem,
                nama_prodi: formData.nama_prodi,
                id_fakultas: parseInt(formData.id_fakultas),
              }
            : prodiItem
        )
      );
    } else {
      // Add new prodi
      const newId = Math.max(...prodi.map((p) => p.id), 0) + 1;
      setProdi([
        ...prodi,
        {
          id: newId,
          nama_prodi: formData.nama_prodi,
          id_fakultas: parseInt(formData.id_fakultas),
          status: "Tampil",
        },
      ]);
    }

    setShowProdiForm(false);
    setFormData({ ...formData, nama_prodi: "", id_fakultas: "" });
  };

  // Helper functions
  const getNamaTahunAkademik = (id_tahunakademik) => {
    const tahun = tahunAkademik.find((t) => t.id === id_tahunakademik);
    return tahun ? tahun.rentang : "Tahun tidak ditemukan";
  };

  const getNamaProdi = (id_prodi) => {
    const prodiItem = prodi.find((p) => p.id === id_prodi);
    return prodiItem ? prodiItem.nama_prodi : "Prodi tidak ditemukan";
  };

  const getNamaFakultas = (id_fakultas) => {
    const fakultasItem = fakultas.find((f) => f.id === id_fakultas);
    return fakultasItem
      ? fakultasItem.nama_fakultas
      : "Fakultas tidak ditemukan";
  };

  // Fungsi untuk mendapatkan style dropdown berdasarkan status
  const getDropdownStyle = (status) => {
    if (status === "Tampil") {
      return "bg-green-50 text-green-700 border-green-200 hover:bg-green-100";
    } else {
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
    }
  };

  // Filter data yang hanya status tampil untuk summary cards
  const tahunTampil = tahunAkademik.filter((t) => t.status === "Tampil");
  const periodeTampil = periode.filter((p) => p.status === "Tampil");
  const fakultasTampil = fakultas.filter((f) => f.status === "Tampil");
  const prodiTampil = prodi.filter((p) => p.status === "Tampil");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Tahun Akademik & Periode
        </h1>
        <p className="text-gray-600 mt-2">
          Kelola tahun akademik, periode, fakultas, dan program studi untuk
          Sistem Peningkatan Mutu Internal
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Tahun Akademik</p>
              <p className="text-2xl font-bold mt-1">{tahunTampil.length}</p>
              <p className="text-xs opacity-80 mt-1">Tahun akademik aktif</p>
            </div>
            <FiCalendar className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Periode</p>
              <p className="text-2xl font-bold mt-1">{periodeTampil.length}</p>
              <p className="text-xs opacity-80 mt-1">Periode evaluasi aktif</p>
            </div>
            <FiBook className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Fakultas</p>
              <p className="text-2xl font-bold mt-1">{fakultasTampil.length}</p>
              <p className="text-xs opacity-80 mt-1">Fakultas aktif</p>
            </div>
            <FiUsers className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-800 to-red-900 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Program Studi</p>
              <p className="text-2xl font-bold mt-1">{prodiTampil.length}</p>
              <p className="text-xs opacity-80 mt-1">Program studi aktif</p>
            </div>
            <FiBook className="text-2xl opacity-80" />
          </div>
        </div>
      </div>

      {/* Form Modal Tahun Akademik */}
      {showTahunForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingTahun ? "Edit Tahun Akademik" : "Tambah Tahun Akademik"}
              </h3>
              <button
                onClick={() => setShowTahunForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rentang Tahun Akademik
                </label>
                <input
                  type="text"
                  value={formData.rentang}
                  onChange={(e) =>
                    setFormData({ ...formData, rentang: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Contoh: 2024/2025"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: Tahun/Tahun (contoh: 2024/2025)
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowTahunForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveTahun}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <FiSave className="mr-2" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal Periode */}
      {showPeriodeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingPeriode ? "Edit Periode" : "Tambah Periode"}
              </h3>
              <button
                onClick={() => setShowPeriodeForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tahun Akademik
                </label>
                <select
                  value={formData.id_tahunakademik}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      id_tahunakademik: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Pilih Tahun Akademik</option>
                  {tahunAkademik.map((tahun) => (
                    <option key={tahun.id} value={tahun.id}>
                      {tahun.rentang}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Studi
                </label>
                <select
                  value={formData.id_prodi}
                  onChange={(e) =>
                    setFormData({ ...formData, id_prodi: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Pilih Program Studi</option>
                  {prodi.map((prodiItem) => (
                    <option key={prodiItem.id} value={prodiItem.id}>
                      {prodiItem.nama_prodi}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowPeriodeForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSavePeriode}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <FiSave className="mr-2" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal Fakultas */}
      {showFakultasForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingFakultas ? "Edit Fakultas" : "Tambah Fakultas"}
              </h3>
              <button
                onClick={() => setShowFakultasForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Fakultas
                </label>
                <input
                  type="text"
                  value={formData.nama_fakultas}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_fakultas: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Masukkan nama fakultas"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowFakultasForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveFakultas}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <FiSave className="mr-2" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal Prodi */}
      {showProdiForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProdi ? "Edit Program Studi" : "Tambah Program Studi"}
              </h3>
              <button
                onClick={() => setShowProdiForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Program Studi
                </label>
                <input
                  type="text"
                  value={formData.nama_prodi}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_prodi: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Masukkan nama program studi"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fakultas
                </label>
                <select
                  value={formData.id_fakultas}
                  onChange={(e) =>
                    setFormData({ ...formData, id_fakultas: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Pilih Fakultas</option>
                  {fakultas
                    .filter((f) => f.status === "Tampil")
                    .map((fakultasItem) => (
                      <option key={fakultasItem.id} value={fakultasItem.id}>
                        {fakultasItem.nama_fakultas}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowProdiForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveProdi}
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
        {/* Tabel Tahun Akademik */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiCalendar className="mr-2 text-red-500" />
              Daftar Tahun Akademik
            </h3>
            <button
              onClick={handleAddTahun}
              className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              <FiPlus className="mr-2" />
              Tambah Tahun
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
                    Rentang
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tahunAkademik.map((tahun) => (
                  <tr
                    key={tahun.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {tahun.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        {tahun.rentang}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditTahun(tahun)}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                        >
                          <FiEdit className="mr-1" />
                          Edit
                        </button>
                        <div className="relative">
                          <select
                            value={tahun.status}
                            onChange={(e) =>
                              handleStatusTahun(tahun.id, e.target.value)
                            }
                            className={`appearance-none flex items-center px-3 py-1 border rounded-lg transition-colors duration-200 text-sm cursor-pointer ${getDropdownStyle(
                              tahun.status
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
            {tahunAkademik.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiCalendar className="mx-auto text-3xl text-gray-300 mb-2" />
                <p>Tidak ada data tahun akademik</p>
                <button
                  onClick={handleAddTahun}
                  className="mt-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Tambah tahun akademik pertama
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabel Periode */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiBook className="mr-2 text-red-500" />
              Daftar Periode
            </h3>
            <button
              onClick={handleAddPeriode}
              className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              <FiPlus className="mr-2" />
              Tambah Periode
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
                    Tahun Akademik
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program Studi
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {periode.map((periodeItem) => (
                  <tr
                    key={periodeItem.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {periodeItem.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {getNamaTahunAkademik(periodeItem.id_tahunakademik)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {getNamaProdi(periodeItem.id_prodi)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditPeriode(periodeItem)}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                        >
                          <FiEdit className="mr-1" />
                          Edit
                        </button>
                        <div className="relative">
                          <select
                            value={periodeItem.status}
                            onChange={(e) =>
                              handleStatusPeriode(
                                periodeItem.id,
                                e.target.value
                              )
                            }
                            className={`appearance-none flex items-center px-3 py-1 border rounded-lg transition-colors duration-200 text-sm cursor-pointer ${getDropdownStyle(
                              periodeItem.status
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
            {periode.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiBook className="mx-auto text-3xl text-gray-300 mb-2" />
                <p>Tidak ada data periode</p>
                <button
                  onClick={handleAddPeriode}
                  className="mt-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Tambah periode pertama
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabel Fakultas */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiUsers className="mr-2 text-red-500" />
              Daftar Fakultas
            </h3>
            <button
              onClick={handleAddFakultas}
              className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              <FiPlus className="mr-2" />
              Tambah Fakultas
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
                    Nama Fakultas
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fakultas.map((fakultasItem) => (
                  <tr
                    key={fakultasItem.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {fakultasItem.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {fakultasItem.nama_fakultas}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditFakultas(fakultasItem)}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                        >
                          <FiEdit className="mr-1" />
                          Edit
                        </button>
                        <div className="relative">
                          <select
                            value={fakultasItem.status}
                            onChange={(e) =>
                              handleStatusFakultas(
                                fakultasItem.id,
                                e.target.value
                              )
                            }
                            className={`appearance-none flex items-center px-3 py-1 border rounded-lg transition-colors duration-200 text-sm cursor-pointer ${getDropdownStyle(
                              fakultasItem.status
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
            {fakultas.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiUsers className="mx-auto text-3xl text-gray-300 mb-2" />
                <p>Tidak ada data fakultas</p>
                <button
                  onClick={handleAddFakultas}
                  className="mt-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Tambah fakultas pertama
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabel Program Studi */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiBook className="mr-2 text-red-500" />
              Daftar Program Studi
            </h3>
            <button
              onClick={handleAddProdi}
              className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              <FiPlus className="mr-2" />
              Tambah Prodi
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
                    Nama Program Studi
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fakultas
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {prodi.map((prodiItem) => (
                  <tr
                    key={prodiItem.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {prodiItem.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {prodiItem.nama_prodi}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {getNamaFakultas(prodiItem.id_fakultas)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditProdi(prodiItem)}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                        >
                          <FiEdit className="mr-1" />
                          Edit
                        </button>
                        <div className="relative">
                          <select
                            value={prodiItem.status}
                            onChange={(e) =>
                              handleStatusProdi(prodiItem.id, e.target.value)
                            }
                            className={`appearance-none flex items-center px-3 py-1 border rounded-lg transition-colors duration-200 text-sm cursor-pointer ${getDropdownStyle(
                              prodiItem.status
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
            {prodi.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FiBook className="mx-auto text-3xl text-gray-300 mb-2" />
                <p>Tidak ada data program studi</p>
                <button
                  onClick={handleAddProdi}
                  className="mt-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Tambah program studi pertama
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TahunPeriode;
