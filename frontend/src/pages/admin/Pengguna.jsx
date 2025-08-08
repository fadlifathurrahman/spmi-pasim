import { useState, useEffect } from "react";
import { dataUser } from "../../utils/Data.js";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiEye,
  FiX,
  FiSave,
  FiTrash2,
  FiUser,
  FiAtSign,
  FiKey,
  FiMail,
  FiBook,
  FiShield,
  FiAward,
  FiUserCheck,
} from "react-icons/fi";

const Pengguna = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(dataUser);
  const [showDetail, setShowDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    role: "dosen",
    nidn: "",
    username: "",
    password: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState(null);

  useEffect(() => {
    // Get current user role from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setCurrentUserRole(currentUser.role);
    }
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setUsers(dataUser);
    } else {
      const filtered = dataUser.filter((user) =>
        user.name.toLowerCase().includes(term)
      );
      setUsers(filtered);
    }
  };

  const showUserForm = (user = null) => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        role: user.role,
        nidn: user.nidn || "",
        username: user.username,
        password: user.password,
        email: user.email,
        prodi: user.prodi || "",
      });
      setEditMode(true);
    } else {
      const newId = Math.max(...dataUser.map((d) => d.id), 0) + 1;
      setFormData({
        id: newId,
        name: "",
        role: "dosen",
        nidn: "",
        username: "",
        password: "",
        email: "",
        prodi: "",
      });
      setEditMode(false);
    }
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveUser = () => {
    if (editMode) {
      const updatedUsers = users.map((item) =>
        item.id === formData.id ? formData : item
      );
      setUsers(updatedUsers);

      const index = dataUser.findIndex((item) => item.id === formData.id);
      if (index !== -1) {
        dataUser[index] = formData;
      }
    } else {
      const newUser = { ...formData };
      setUsers([...users, newUser]);
      dataUser.push(newUser);
    }
    setShowForm(false);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "kaprodi":
        return "bg-blue-100 text-blue-800";
      case "dosen":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FiShield className="mr-1" />;
      case "kaprodi":
        return <FiAward className="mr-1" />;
      case "dosen":
        return <FiUserCheck className="mr-1" />;
      default:
        return <FiUser className="mr-1" />;
    }
  };

  // Check if current user is admin
  const isAdmin = currentUserRole === "admin";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Manajemen Pengguna
      </h1>

      {/* Search and Add User */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Cari pengguna..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <FiSearch className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>

        {isAdmin && (
          <button
            onClick={() => showUserForm()}
            className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 transition-colors"
          >
            <FiPlus size={18} /> Tambah Pengguna
          </button>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pengguna
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-800 font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      {getRoleIcon(item.role)}
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${getRoleColor(
                          item.role
                        )}`}
                      >
                        {item.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() =>
                          setShowDetail(showDetail === item.id ? null : item.id)
                        }
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        <FiEye size={14} /> Detail
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => showUserForm(item)}
                          className="text-green-600 hover:text-green-800 flex items-center gap-1 px-3 py-1 rounded-md hover:bg-green-50 transition-colors"
                        >
                          <FiEdit2 size={14} /> Edit
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Tidak ada data pengguna yang ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full mx-4 border border-gray-100">
            <div className="bg-gradient-to-r from-red-800 to-red-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Detail Pengguna</h2>
                  <p className="text-red-100 text-sm mt-1">
                    Informasi lengkap pengguna
                  </p>
                </div>
                <button
                  onClick={() => setShowDetail(null)}
                  className="text-white hover:text-red-200 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {users
                .filter((d) => d.id === showDetail)
                .map((user) => (
                  <div key={user.id} className="space-y-5">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-800 text-2xl font-bold">
                          {user.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {user.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <span
                            className={`px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full ${getRoleColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 my-4"></div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-red-100 p-2 rounded-full text-red-800">
                            <FiUser size={16} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">NIDN</p>
                            <p className="font-medium">{user.nidn || "-"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-full text-blue-800">
                            <FiAtSign size={16} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Username</p>
                            <p className="font-medium">{user.username}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-100 p-2 rounded-full text-purple-800">
                            <FiMail size={16} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="font-medium">{user.email || "-"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="flex space-x-3 pt-4">
                        <button
                          onClick={() => {
                            setShowDetail(null);
                            showUserForm(user);
                          }}
                          className="flex-1 bg-white border border-red-800 text-red-800 hover:bg-red-50 px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                        >
                          <FiEdit2 size={16} />
                          <span>Edit Data</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* User Form Modal - Only shown for admin */}
      {showForm && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full mx-4 border border-gray-100">
            <div className="bg-gradient-to-r from-red-800 to-red-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {editMode ? "Edit Data Pengguna" : "Tambah Pengguna Baru"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-white hover:text-red-200"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="kaprodi">Kaprodi</option>
                      <option value="dosen">Dosen</option>
                      <option value="tidak aktif">Tidak Aktif</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NIDN
                    </label>
                    <input
                      type="text"
                      name="nidn"
                      value={formData.nidn}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={saveUser}
                  className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
                >
                  <FiSave size={18} /> Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pengguna;
