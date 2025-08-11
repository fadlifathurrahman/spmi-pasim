import { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiX,
  FiUser,
  FiBook,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import {
  dataUser,
  dataMataKuliah,
  dataTahunAjaran,
  dataSpmi,
  dataPertemuan,
} from "../../utils/Data.js";

function Laporan() {
  // State management
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPertemuanModalOpen, setIsPertemuanModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentPertemuan, setCurrentPertemuan] = useState(null);
  const [formData, setFormData] = useState({
    mata_kuliah_id: "",
    dosen_id: "",
    tahun_ajaran_id: "",
  });
  const [pertemuanForm, setPertemuanForm] = useState({
    pertemuan_ke: "",
    materi: "",
    tanggal: "",
    sesi: "",
    capaian_pembelajaran: "",
    model_pembelajaran: "",
    bahan_ajar: "",
    media_belajar: "",
    evaluasi: "",
    referensi: "",
  });

  // Get current user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Prepare data for display
  useEffect(() => {
    const preparedData = dataSpmi.map((spmi) => {
      const matkul = dataMataKuliah.find((m) => m.id === spmi.mata_kuliah_id);
      const dosen = dataUser.find((d) => d.id === spmi.dosen_id);
      const tahun = dataTahunAjaran.find((t) => t.id === spmi.tahun_ajaran_id);
      const pertemuan = dataPertemuan.filter((p) => p.spmi_id === spmi.id);

      return {
        id: spmi.id,
        mata_kuliah_id: spmi.mata_kuliah_id,
        dosen_id: spmi.dosen_id,
        tahun_ajaran_id: spmi.tahun_ajaran_id,
        kode_matkul: matkul?.kode_matkul || "",
        nama_matkul: matkul?.nama_matkul || "",
        sks: matkul?.jumlah_sks || 0,
        nama_dosen: dosen?.name || "",
        tahun: tahun?.tahun || 0,
        semester: tahun?.semester || "",
        status: tahun?.status || "",
        jumlah_pertemuan: pertemuan.length,
        pertemuan: pertemuan,
      };
    });

    // Filter based on search term
    const filtered = preparedData.filter(
      (item) =>
        item.nama_matkul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_dosen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tahun.toString().includes(searchTerm) ||
        item.semester.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // For dosen, only show their own courses
    if (currentUser?.role === "dosen") {
      const dosenCourses = filtered.filter(
        (item) => item.dosen_id === currentUser.id
      );
      setFilteredData(dosenCourses);
    } else {
      setFilteredData(filtered);
    }
  }, [searchTerm, currentUser]);

  // Check user roles
  const isKaprodi = currentUser?.role === "kaprodi";
  const isDosen = currentUser?.role === "dosen";
  const isAdmin = currentUser?.role === "admin";

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle pertemuan form input
  const handlePertemuanInputChange = (e) => {
    const { name, value } = e.target;
    setPertemuanForm({
      ...pertemuanForm,
      [name]: value,
    });
  };

  // Handle form submit (add/edit SPMI)
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save to API here
    setIsModalOpen(false);
    alert(`Data SPMI ${currentItem ? "diperbarui" : "ditambahkan"} (simulasi)`);
  };

  // Handle pertemuan form submit
  const handlePertemuanSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save to API here
    setIsPertemuanModalOpen(false);
    alert(
      `Pertemuan ${currentPertemuan ? "diperbarui" : "ditambahkan"} (simulasi)`
    );
  };

  // Handle edit SPMI
  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      mata_kuliah_id: item.mata_kuliah_id,
      dosen_id: item.dosen_id,
      tahun_ajaran_id: item.tahun_ajaran_id,
    });
    setIsModalOpen(true);
  };

  // Handle delete SPMI
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      // In a real app, you would delete from API here
      alert(`Data SPMI dengan ID ${id} akan dihapus (simulasi)`);
    }
  };

  // Handle view detail
  const handleViewDetail = (item) => {
    setCurrentItem(item);
    setIsDetailOpen(true);
  };

  // Handle add/edit pertemuan
  const handlePertemuanEdit = (pertemuan = null) => {
    if (pertemuan) {
      setCurrentPertemuan(pertemuan);
      setPertemuanForm({
        pertemuan_ke: pertemuan.pertemuan_ke,
        materi: pertemuan.materi,
        tanggal: pertemuan.tanggal,
        sesi: pertemuan.sesi || "",
        capaian_pembelajaran: pertemuan.capaian_pembelajaran || "",
        model_pembelajaran: pertemuan.model_pembelajaran || "",
        bahan_ajar: pertemuan.bahan_ajar || "",
        media_belajar: pertemuan.media_belajar || "",
        evaluasi: pertemuan.evaluasi || "",
        referensi: pertemuan.referensi || "",
      });
    } else {
      setCurrentPertemuan(null);
      setPertemuanForm({
        pertemuan_ke: currentItem.pertemuan.length + 1,
        materi: "",
        tanggal: "",
        sesi: "",
        capaian_pembelajaran: "",
        model_pembelajaran: "",
        bahan_ajar: "",
        media_belajar: "",
        evaluasi: "",
        referensi: "",
      });
    }
    setIsPertemuanModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Manajemen Pengajaran Mata Kuliah
      </h1>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari mata kuliah/dosen..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {(isKaprodi || isAdmin) && (
          <button
            onClick={() => {
              setIsModalOpen(true);
              setCurrentItem(null);
              setFormData({
                mata_kuliah_id: "",
                dosen_id: "",
                tahun_ajaran_id: "",
              });
            }}
            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
          >
            <FiPlus className="mr-2" />
            Tambah Pengajaran
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mata Kuliah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dosen Pengajar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tahun
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pertemuan
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.nama_matkul}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.kode_matkul}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.nama_dosen}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.tahun}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.semester === "Ganjil"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.semester}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.sks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.jumlah_pertemuan}x
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                          title="Detail"
                        >
                          <FiEye />
                        </button>

                        {(isKaprodi || isAdmin) && (
                          <>
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50"
                              title="Edit"
                            >
                              <FiEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                              title="Hapus"
                            >
                              <FiTrash2 />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Tidak ada data yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit SPMI Modal - Only for Kaprodi */}
      {isModalOpen && isKaprodi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b px-6 py-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium text-gray-900">
                {currentItem ? "Edit Pengajaran" : "Tambah Pengajaran"}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentItem(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mata Kuliah */}
                <div>
                  <label
                    htmlFor="mata_kuliah_id"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mata Kuliah <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="mata_kuliah_id"
                    name="mata_kuliah_id"
                    value={formData.mata_kuliah_id}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Pilih Mata Kuliah</option>
                    {dataMataKuliah.map((matkul) => (
                      <option key={matkul.id} value={matkul.id}>
                        {matkul.kode_matkul} - {matkul.nama_matkul} (
                        {matkul.jumlah_sks} SKS)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dosen */}
                <div>
                  <label
                    htmlFor="dosen_id"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Dosen Pengajar <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="dosen_id"
                    name="dosen_id"
                    value={formData.dosen_id}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Pilih Dosen</option>
                    {dataUser
                      .filter((u) => u.role === "dosen")
                      .map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.nidn})
                        </option>
                      ))}
                  </select>
                </div>

                {/* Tahun Ajaran */}
                <div>
                  <label
                    htmlFor="tahun_ajaran_id"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tahun Ajaran <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tahun_ajaran_id"
                    name="tahun_ajaran_id"
                    value={formData.tahun_ajaran_id}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Pilih Tahun Ajaran</option>
                    {dataTahunAjaran.map((tahun) => (
                      <option key={tahun.id} value={tahun.id}>
                        {tahun.tahun} - {tahun.semester}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t sticky bottom-0 bg-white py-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentItem(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  {currentItem ? "Simpan Perubahan" : "Tambah Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailOpen && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b px-6 py-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium text-gray-900">
                Detail Pengajaran
              </h3>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4 space-y-6">
              {/* Informasi Utama */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 flex items-center">
                    <FiBook className="mr-2" />
                    Mata Kuliah
                  </h4>
                  <p className="mt-1 text-sm text-gray-900 font-medium">
                    {currentItem.nama_matkul}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentItem.kode_matkul} - {currentItem.sks} SKS
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 flex items-center">
                    <FiUser className="mr-2" />
                    Dosen Pengajar
                  </h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {currentItem.nama_dosen}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 flex items-center">
                    <FiClock className="mr-2" />
                    Waktu
                  </h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {currentItem.tahun} - {currentItem.semester}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentItem.jumlah_pertemuan} Pertemuan
                  </p>
                </div>
              </div>

              {/* Daftar Pertemuan */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center">
                    <FiCalendar className="mr-2" />
                    Rencana Pertemuan
                  </h4>
                  {isDosen && (
                    <button
                      onClick={() => handlePertemuanEdit()}
                      className="flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                    >
                      <FiPlus className="mr-1" /> Tambah Pertemuan
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {currentItem.pertemuan && currentItem.pertemuan.length > 0 ? (
                    currentItem.pertemuan.map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">
                              Pertemuan {item.pertemuan_ke}
                            </h5>
                            <p className="text-sm text-gray-600 mt-1">
                              {item.materi}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Tanggal: {item.tanggal}
                            </p>
                          </div>
                          {isDosen && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handlePertemuanEdit(item)}
                                className="text-yellow-600 hover:text-yellow-800 p-1 rounded-full hover:bg-yellow-50"
                                title="Edit"
                              >
                                <FiEdit size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-sm text-gray-500">
                      Tidak ada data pertemuan
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 px-6 py-4 border-t sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={() => setIsDetailOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pertemuan Add/Edit Modal - Only for Dosen */}
      {isPertemuanModalOpen && isDosen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b px-6 py-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium text-gray-900">
                {currentPertemuan ? "Edit Pertemuan" : "Tambah Pertemuan"}
              </h3>
              <button
                onClick={() => setIsPertemuanModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <form
              onSubmit={handlePertemuanSubmit}
              className="px-6 py-4 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pertemuan Ke
                  </label>
                  <input
                    type="number"
                    name="pertemuan_ke"
                    value={pertemuanForm.pertemuan_ke}
                    onChange={handlePertemuanInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                    min="1"
                    max="16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    name="tanggal"
                    value={pertemuanForm.tanggal}
                    onChange={handlePertemuanInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sesi
                  </label>
                  <input
                    type="text"
                    name="sesi"
                    value={pertemuanForm.sesi}
                    onChange={handlePertemuanInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Materi/Sub Materi
                  </label>
                  <input
                    type="text"
                    name="materi"
                    value={pertemuanForm.materi}
                    onChange={handlePertemuanInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capaian Pembelajaran
                  </label>
                  <textarea
                    name="capaian_pembelajaran"
                    value={pertemuanForm.capaian_pembelajaran}
                    onChange={handlePertemuanInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    rows="2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model Pembelajaran
                  </label>
                  <input
                    type="text"
                    name="model_pembelajaran"
                    value={pertemuanForm.model_pembelajaran}
                    onChange={handlePertemuanInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bahan Ajar
                  </label>
                  <input
                    type="text"
                    name="bahan_ajar"
                    value={pertemuanForm.bahan_ajar}
                    onChange={handlePertemuanInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Media Belajar
                  </label>
                  <input
                    type="text"
                    name="media_belajar"
                    value={pertemuanForm.media_belajar}
                    onChange={handlePertemuanInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Evaluasi
                  </label>
                  <input
                    type="text"
                    name="evaluasi"
                    value={pertemuanForm.evaluasi}
                    onChange={handlePertemuanInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Referensi
                  </label>
                  <textarea
                    name="referensi"
                    value={pertemuanForm.referensi}
                    onChange={handlePertemuanInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    rows="2"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t sticky bottom-0 bg-white py-3">
                <button
                  type="button"
                  onClick={() => setIsPertemuanModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  {currentPertemuan ? "Simpan Perubahan" : "Tambah Pertemuan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Laporan;
