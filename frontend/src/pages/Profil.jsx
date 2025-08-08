import { FaRegIdCard } from "react-icons/fa";
import { FiEdit, FiUser, FiMail } from "react-icons/fi";
import { useState, useEffect } from "react";
import { dataUser } from "../utils/Data.js";

function Profil() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    nidn: "",
    email: "",
  });

  // Role badge color mapping
  const roleColors = {
    admin: "bg-purple-100 text-purple-800",
    kaprodi: "bg-blue-100 text-blue-800",
    dosen: "bg-green-100 text-green-800",
    "tidak aktif": "bg-gray-100 text-gray-800",
  };

  useEffect(() => {
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.id) {
      // Find user in dataUser
      const foundUser = dataUser.find((user) => user.id === currentUser.id);
      if (foundUser) {
        setUser(foundUser);
        setEditForm({
          name: foundUser.name,
          nidn: foundUser.nidn || "",
          email: foundUser.email,
        });
      }
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: user.name,
      nidn: user.nidn || "",
      email: user.email,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...editForm,
    };
    setUser(updatedUser);
    setIsEditing(false);

    // Update data in localStorage if needed
    // Note: This would only update the current session
    // To persist changes, you would need to update the dataUser array
    // and save it back to wherever it's stored
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-indigo-600">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="text-3xl font-bold text-gray-900 border border-gray-300 rounded px-3 py-2 w-full"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                )}
                <div className="flex items-center mt-2 space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      roleColors[user.role]
                    }`}
                  >
                    {user.role === "admin"
                      ? "Administrator"
                      : user.role === "kaprodi"
                      ? "Ketua Program Studi"
                      : user.role === "dosen"
                      ? "Dosen"
                      : "Tidak Aktif"}
                  </span>
                  <span className="text-gray-500 text-sm">ID: {user.id}</span>
                </div>
              </div>
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                  >
                    <span>Batal</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <span>Simpan</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FiEdit size={16} />
                  <span>Edit Profil</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="mr-2 text-indigo-600" />
              Informasi Pribadi
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="font-medium border border-gray-300 rounded px-3 py-2 w-full"
                  />
                ) : (
                  <p className="font-medium flex items-center">
                    <FiMail className="mr-2 text-gray-400" />
                    {user.email}
                  </p>
                )}
              </div>
              {user.nidn && (
                <div>
                  <p className="text-sm text-gray-500">NIDN</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="nidn"
                      value={editForm.nidn}
                      onChange={handleInputChange}
                      className="font-medium border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  ) : (
                    <p className="font-medium flex items-center">
                      <FaRegIdCard className="mr-2 text-gray-400" />
                      {user.nidn}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="mr-2 text-indigo-600" />
              Status Akun
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Status Akun</p>
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      user.role !== "tidak aktif"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <p className="font-medium">
                    {user.role !== "tidak aktif" ? "Aktif" : "Tidak Aktif"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hak Akses</p>
                <p className="font-medium">
                  {user.role === "admin" && "Full Administrator Access"}
                  {user.role === "kaprodi" && "Ketua Program Studi Access"}
                  {user.role === "dosen" && "Dosen Access"}
                  {user.role === "tidak aktif" && "No Access"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
