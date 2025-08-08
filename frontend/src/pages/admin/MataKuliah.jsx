import { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { dataMataKuliah } from "../../utils/Data.js";

function Matakuliah() {
  const [matakuliahList, setMatakuliahList] = useState(dataMataKuliah);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMatakuliah, setCurrentMatakuliah] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  // Simulasi role (dalam aplikasi nyata bisa dari context atau local storage)
  const [userRole] = useState("kaprodi"); // bisa diubah ke "dosen" atau "admin" untuk testing
  const isKaprodi = userRole === "kaprodi";

  // Form state
  const [formData, setFormData] = useState({
    kode_matkul: "",
    nama_matkul: "",
    jumlah_sks: "",
  });

  // Show alert
  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate unique kode_matkul
    const isDuplicate = matakuliahList.some(
      (mk) =>
        mk.kode_matkul === formData.kode_matkul &&
        (!currentMatakuliah || mk.id !== currentMatakuliah.id)
    );

    if (isDuplicate) {
      showAlert("error", "Kode Mata Kuliah sudah ada");
      return;
    }

    if (isEditMode) {
      // Update existing matakuliah
      const updatedList = matakuliahList.map((mk) =>
        mk.id === currentMatakuliah.id
          ? {
              ...mk,
              ...formData,
              updated_at: new Date().toISOString(),
            }
          : mk
      );
      setMatakuliahList(updatedList);
      showAlert("success", "Mata Kuliah berhasil diperbarui");
    } else {
      // Add new matakuliah
      const newMatakuliah = {
        id:
          matakuliahList.length > 0
            ? Math.max(...matakuliahList.map((mk) => mk.id)) + 1
            : 1,
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setMatakuliahList([...matakuliahList, newMatakuliah]);
      showAlert("success", "Mata Kuliah berhasil ditambahkan");
    }

    // Reset form and close modal
    setFormData({
      kode_matkul: "",
      nama_matkul: "",
      jumlah_sks: "",
    });
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentMatakuliah(null);
  };

  // Handle edit
  const handleEdit = (matakuliah) => {
    setCurrentMatakuliah(matakuliah);
    setFormData({
      kode_matkul: matakuliah.kode_matkul,
      nama_matkul: matakuliah.nama_matkul,
      jumlah_sks: matakuliah.jumlah_sks,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus mata kuliah ini?")) {
      const updatedList = matakuliahList.filter((mk) => mk.id !== id);
      setMatakuliahList(updatedList);
      showAlert("success", "Mata Kuliah berhasil dihapus");
    }
  };

  return (
    <div className="p-6">
      {/* Alert Notification */}
      {alert.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            alert.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {alert.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-800">Data Mata Kuliah</h1>
        {isKaprodi && (
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              setFormData({
                kode_matkul: "",
                nama_matkul: "",
                jumlah_sks: "",
              });
            }}
            className="bg-red-800 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-700 transition-colors"
          >
            <FiPlus className="mr-2" /> Tambah Mata Kuliah
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Kode Matkul
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Nama Mata Kuliah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Jumlah SKS
                </th>
                {isKaprodi && (
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Aksi
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matakuliahList.length > 0 ? (
                matakuliahList.map((matakuliah, index) => (
                  <tr key={matakuliah.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {matakuliah.kode_matkul}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {matakuliah.nama_matkul}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {matakuliah.jumlah_sks}
                    </td>
                    {isKaprodi && (
                      <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                        <button
                          onClick={() => handleEdit(matakuliah)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(matakuliah.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={isKaprodi ? 5 : 4}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Tidak ada data mata kuliah
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Kode Mata Kuliah
                </label>
                <input
                  type="text"
                  name="kode_matkul"
                  value={formData.kode_matkul}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  required
                  maxLength="10"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Nama Mata Kuliah
                </label>
                <input
                  type="text"
                  name="nama_matkul"
                  value={formData.nama_matkul}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  required
                  maxLength="100"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Jumlah SKS</label>
                <input
                  type="number"
                  name="jumlah_sks"
                  value={formData.jumlah_sks}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  min="1"
                  max="6"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setCurrentMatakuliah(null);
                  }}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700"
                >
                  {isEditMode ? "Simpan Perubahan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Matakuliah;
