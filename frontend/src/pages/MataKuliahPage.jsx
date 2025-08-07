import { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiChevronDown,
  FiX,
  FiUser,
  FiBook,
  FiCalendar,
  FiClock,
} from "react-icons/fi";

const MataKuliahPage = () => {
  // Data contoh
  const initialMatkuls = [
    { id: 1, kode: "MK001", nama: "Algoritma Pemrograman", sks: 3 },
    { id: 2, kode: "MK002", nama: "Struktur Data", sks: 3 },
    { id: 3, kode: "MK003", nama: "Basis Data", sks: 3 },
    { id: 4, kode: "MK004", nama: "Jaringan Komputer", sks: 2 },
    { id: 5, kode: "MK005", nama: "Pemrograman Web", sks: 3 },
    { id: 6, kode: "MK006", nama: "Sistem Operasi", sks: 2 },
    { id: 7, kode: "MK007", nama: "Kecerdasan Buatan", sks: 3 },
    { id: 8, kode: "MK008", nama: "Machine Learning", sks: 3 },
    { id: 9, kode: "MK009", nama: "Data Mining", sks: 3 },
    { id: 10, kode: "MK010", nama: "Keamanan Sistem", sks: 2 },
  ];

  const initialDosen = [
    { id: 1, nidn: "123456", nama: "Dr. Ahmad S.T., M.T." },
    { id: 2, nidn: "234567", nama: "Prof. Budi S.Kom., M.Sc." },
    { id: 3, nidn: "345678", nama: "Dr. Citra M.Kom." },
    { id: 4, nidn: "456789", nama: "Dr. Dedi S.T., M.Kom." },
    { id: 5, nidn: "567890", nama: "Dr. Eka S.Si., M.T." },
  ];

  const initialTahunAjaran = [
    { id: 1, tahun: 2020, semester: "Ganjil", status: "Tidak Aktif" },
    { id: 2, tahun: 2020, semester: "Genap", status: "Tidak Aktif" },
    { id: 3, tahun: 2021, semester: "Ganjil", status: "Tidak Aktif" },
    { id: 4, tahun: 2021, semester: "Genap", status: "Tidak Aktif" },
    { id: 5, tahun: 2022, semester: "Ganjil", status: "Tidak Aktif" },
    { id: 6, tahun: 2022, semester: "Genap", status: "Tidak Aktif" },
    { id: 7, tahun: 2023, semester: "Ganjil", status: "Tidak Aktif" },
    { id: 8, tahun: 2023, semester: "Genap", status: "Tidak Aktif" },
    { id: 9, tahun: 2024, semester: "Ganjil", status: "Aktif" },
    { id: 10, tahun: 2024, semester: "Genap", status: "Tidak Aktif" },
  ];

  // State management
  const [matkuls] = useState(initialMatkuls);
  const [dosen] = useState(initialDosen);
  const [tahunAjaran] = useState(initialTahunAjaran);
  const [pengajaran, setPengajaran] = useState([]);
  const [pertemuan, setPertemuan] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    mata_kuliah_id: "",
    dosen_id: "",
    tahun_ajaran_id: "",
    jumlah_pertemuan: 1,
    pertemuan: Array(1).fill({ materi: "", tanggal: "" }),
  });

  // Generate contoh data pengajaran
  useEffect(() => {
    const generatedPengajaran = [];
    const generatedPertemuan = [];

    matkuls.forEach((matkul) => {
      tahunAjaran.forEach((tahun) => {
        // Setiap matkul diajarkan oleh 1-2 dosen berbeda per tahun
        const randomDosenCount = Math.random() > 0.7 ? 2 : 1;
        const selectedDosen = [...dosen]
          .sort(() => 0.5 - Math.random())
          .slice(0, randomDosenCount);

        selectedDosen.forEach((dosenItem) => {
          const jumlahPertemuan = matkul.sks * 8; // 8 pertemuan per SKS
          const newPengajaran = {
            id: `${matkul.id}-${tahun.id}-${dosenItem.id}`,
            mata_kuliah_id: matkul.id,
            dosen_id: dosenItem.id,
            tahun_ajaran_id: tahun.id,
            jumlah_pertemuan: jumlahPertemuan,
          };
          generatedPengajaran.push(newPengajaran);

          // Generate pertemuan
          for (let i = 1; i <= jumlahPertemuan; i++) {
            generatedPertemuan.push({
              id: `${newPengajaran.id}-${i}`,
              pengajaran_id: newPengajaran.id,
              pertemuan_ke: i,
              materi: `Materi ${matkul.nama} Pertemuan ${i}`,
              tanggal: new Date(
                tahun.tahun,
                tahun.semester === "Ganjil" ? 7 + i : 0 + i,
                Math.max(1, (i * 7) % 28)
                  .toString()
                  .padStart(2, "0")
              )
                .toISOString()
                .split("T")[0],
            });
          }
        });
      });
    });

    setPengajaran(generatedPengajaran);
    setPertemuan(generatedPertemuan);
  }, []);

  // Filter data berdasarkan pencarian
  useEffect(() => {
    const filtered = pengajaran
      .map((peng) => {
        const matkul = matkuls.find((m) => m.id === peng.mata_kuliah_id);
        const dosenItem = dosen.find((d) => d.id === peng.dosen_id);
        const tahun = tahunAjaran.find((t) => t.id === peng.tahun_ajaran_id);

        return {
          ...peng,
          kode_matkul: matkul.kode,
          nama_matkul: matkul.nama,
          sks: matkul.sks,
          nama_dosen: dosenItem.nama,
          tahun: tahun.tahun,
          semester: tahun.semester,
          status: tahun.status,
        };
      })
      .filter(
        (item) =>
          item.nama_matkul.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nama_dosen.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tahun.toString().includes(searchTerm) ||
          item.semester.toLowerCase().includes(searchTerm.toLowerCase())
      );

    setFilteredData(filtered);
  }, [searchTerm, pengajaran]);

  // Sorting data
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
  };

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "jumlah_pertemuan") {
      const jumlah = parseInt(value) || 1;
      const newPertemuan = Array(jumlah).fill({ materi: "", tanggal: "" });

      // Preserve existing data if editing
      if (currentItem && formData.pertemuan) {
        for (let i = 0; i < Math.min(jumlah, formData.pertemuan.length); i++) {
          newPertemuan[i] = formData.pertemuan[i];
        }
      }

      setFormData({
        ...formData,
        jumlah_pertemuan: jumlah,
        pertemuan: newPertemuan,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle pertemuan input change
  const handlePertemuanChange = (index, field, value) => {
    const updatedPertemuan = [...formData.pertemuan];
    updatedPertemuan[index] = {
      ...updatedPertemuan[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      pertemuan: updatedPertemuan,
    });
  };

  // Handle form submit (add/edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.mata_kuliah_id ||
      !formData.dosen_id ||
      !formData.tahun_ajaran_id
    ) {
      alert("Silakan lengkapi semua field yang wajib diisi!");
      return;
    }

    const newPengajaran = {
      id:
        currentItem?.id ||
        `${formData.mata_kuliah_id}-${formData.tahun_ajaran_id}-${formData.dosen_id}`,
      mata_kuliah_id: parseInt(formData.mata_kuliah_id),
      dosen_id: parseInt(formData.dosen_id),
      tahun_ajaran_id: parseInt(formData.tahun_ajaran_id),
      jumlah_pertemuan: parseInt(formData.jumlah_pertemuan),
    };

    // Update or add pengajaran
    if (currentItem) {
      // Edit existing
      const updatedPengajaran = pengajaran.map((p) =>
        p.id === currentItem.id ? newPengajaran : p
      );
      setPengajaran(updatedPengajaran);

      // Update pertemuan
      const updatedPertemuan = pertemuan
        .filter((p) => p.pengajaran_id !== currentItem.id)
        .concat(
          formData.pertemuan.map((p, idx) => ({
            id: `${newPengajaran.id}-${idx + 1}`,
            pengajaran_id: newPengajaran.id,
            pertemuan_ke: idx + 1,
            materi: p.materi,
            tanggal: p.tanggal,
          }))
        );
      setPertemuan(updatedPertemuan);
    } else {
      // Add new
      setPengajaran([...pengajaran, newPengajaran]);

      // Add pertemuan
      const newPertemuan = formData.pertemuan.map((p, idx) => ({
        id: `${newPengajaran.id}-${idx + 1}`,
        pengajaran_id: newPengajaran.id,
        pertemuan_ke: idx + 1,
        materi: p.materi,
        tanggal: p.tanggal,
      }));
      setPertemuan([...pertemuan, ...newPertemuan]);
    }

    // Reset form
    setIsModalOpen(false);
    setCurrentItem(null);
    setFormData({
      mata_kuliah_id: "",
      dosen_id: "",
      tahun_ajaran_id: "",
      jumlah_pertemuan: 1,
      pertemuan: Array(1).fill({ materi: "", tanggal: "" }),
    });
  };

  // Handle edit
  const handleEdit = (item) => {
    const relatedPertemuan = pertemuan
      .filter((p) => p.pengajaran_id === item.id)
      .sort((a, b) => a.pertemuan_ke - b.pertemuan_ke);

    setCurrentItem(item);
    setFormData({
      mata_kuliah_id: item.mata_kuliah_id,
      dosen_id: item.dosen_id,
      tahun_ajaran_id: item.tahun_ajaran_id,
      jumlah_pertemuan: item.jumlah_pertemuan,
      pertemuan: relatedPertemuan.map((p) => ({
        materi: p.materi,
        tanggal: p.tanggal,
      })),
    });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setPengajaran(pengajaran.filter((item) => item.id !== id));
      setPertemuan(pertemuan.filter((p) => p.pengajaran_id !== id));
    }
  };

  // Handle view detail
  const handleViewDetail = (item) => {
    const relatedPertemuan = pertemuan
      .filter((p) => p.pengajaran_id === item.id)
      .sort((a, b) => a.pertemuan_ke - b.pertemuan_ke);

    setCurrentItem({
      ...item,
      pertemuan: relatedPertemuan,
    });
    setIsDetailOpen(true);
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
        >
          <FiPlus className="mr-2" />
          Tambah Pengajaran
        </button>
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
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("nama_matkul")}
                >
                  <div className="flex items-center">
                    Mata Kuliah
                    <FiChevronDown
                      className={`ml-1 transition-transform ${
                        sortConfig.key === "nama_matkul" &&
                        sortConfig.direction === "desc"
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("nama_dosen")}
                >
                  <div className="flex items-center">
                    Dosen Pengajar
                    <FiChevronDown
                      className={`ml-1 transition-transform ${
                        sortConfig.key === "nama_dosen" &&
                        sortConfig.direction === "desc"
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("tahun")}
                >
                  <div className="flex items-center">
                    Tahun
                    <FiChevronDown
                      className={`ml-1 transition-transform ${
                        sortConfig.key === "tahun" &&
                        sortConfig.direction === "desc"
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("semester")}
                >
                  <div className="flex items-center">
                    Semester
                    <FiChevronDown
                      className={`ml-1 transition-transform ${
                        sortConfig.key === "semester" &&
                        sortConfig.direction === "desc"
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </div>
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
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
                  setFormData({
                    mata_kuliah_id: "",
                    dosen_id: "",
                    tahun_ajaran_id: "",
                    jumlah_pertemuan: 1,
                    pertemuan: Array(1).fill({ materi: "", tanggal: "" }),
                  });
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    {matkuls.map((matkul) => (
                      <option key={matkul.id} value={matkul.id}>
                        {matkul.kode} - {matkul.nama} ({matkul.sks} SKS)
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
                    {dosen.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nama}
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
                    {tahunAjaran.map((tahun) => (
                      <option key={tahun.id} value={tahun.id}>
                        {tahun.tahun} - {tahun.semester}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Jumlah Pertemuan */}
              <div>
                <label
                  htmlFor="jumlah_pertemuan"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Jumlah Pertemuan
                </label>
                <input
                  type="number"
                  id="jumlah_pertemuan"
                  name="jumlah_pertemuan"
                  min="1"
                  max="20"
                  value={formData.jumlah_pertemuan}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Daftar Pertemuan */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FiCalendar className="mr-2" />
                  Rencana Pertemuan
                </h4>

                <div className="space-y-4">
                  {Array.from({ length: formData.jumlah_pertemuan }).map(
                    (_, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">
                          Pertemuan {index + 1}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor={`materi-${index}`}
                              className="block text-xs font-medium text-gray-500 mb-1"
                            >
                              Materi Pembelajaran
                            </label>
                            <input
                              type="text"
                              id={`materi-${index}`}
                              value={formData.pertemuan[index]?.materi || ""}
                              onChange={(e) =>
                                handlePertemuanChange(
                                  index,
                                  "materi",
                                  e.target.value
                                )
                              }
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
                              placeholder="Masukkan materi pembelajaran"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`tanggal-${index}`}
                              className="block text-xs font-medium text-gray-500 mb-1"
                            >
                              Tanggal
                            </label>
                            <input
                              type="date"
                              id={`tanggal-${index}`}
                              value={formData.pertemuan[index]?.tanggal || ""}
                              onChange={(e) =>
                                handlePertemuanChange(
                                  index,
                                  "tanggal",
                                  e.target.value
                                )
                              }
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t sticky bottom-0 bg-white py-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentItem(null);
                    setFormData({
                      mata_kuliah_id: "",
                      dosen_id: "",
                      tahun_ajaran_id: "",
                      jumlah_pertemuan: 1,
                      pertemuan: Array(1).fill({ materi: "", tanggal: "" }),
                    });
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
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FiCalendar className="mr-2" />
                  Rencana Pertemuan
                </h4>

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
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {item.tanggal}
                          </span>
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
    </div>
  );
};

export default MataKuliahPage;
