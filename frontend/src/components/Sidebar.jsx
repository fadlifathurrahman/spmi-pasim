import { useEffect, useState } from "react";
import {
  FiHome,
  FiUsers,
  FiBarChart2,
  FiChevronDown,
  FiChevronRight,
  FiUser,
  FiLogOut,
  FiBook,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen }) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [userRole, setUserRole] = useState("admin");
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserRole(currentUser.role);
    }
  }, []);

  return (
    <aside
      className={`bg-white text-red-800 w-64 md:w-72 h-full fixed md:relative z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-200 ease-in-out`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center p-4">
        <img
          src="https://pasim.ac.id/uploads/page/logo-pasim.png"
          alt="Logo PASIM"
          className="w-12 h-12 mr-2"
        />
        <h1 className="text-xl font-bold">
          Sistem Peningkatan Mutu Internal (SPMI)
        </h1>
      </div>

      {/* Program Studi */}
      <div className="flex items-center justify-center">
        <p className="text-xl font-bold text-black mb-4">
          S1 Teknik Informatika
        </p>
      </div>

      <div className="border-b-2 border-red-300 "></div>
      {/* Menu Items */}
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Menu Akun */}
          <li>
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 font-medium"
            >
              <div className="flex items-center">
                <FaUserCircle className="mr-2 text-black" />
                <span>Akun</span>
              </div>
              {isAccountOpen ? <FiChevronDown /> : <FiChevronRight />}
            </button>
            {isAccountOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link
                    to="/admin/profil"
                    className="flex items-center p-2 rounded-lg hover:bg-red-50"
                  >
                    <FiUser className="mr-2 text-black" />
                    Profil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      // Handle logout logic here
                      window.location.href = "/login";
                      localStorage.removeItem("currentUser");
                    }}
                    className="flex items-center w-full p-2 rounded-lg hover:bg-red-50"
                  >
                    <FiLogOut className="mr-2 text-black" />
                    Keluar
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
            >
              <FiHome className="mr-2 text-black" />
              Dashboard
            </Link>
          </li>
          {/* Only show Pengguna menu for admin */}
          {userRole === "admin" && (
            <li>
              <Link
                to="/admin/pengguna"
                className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
              >
                <FiUsers className="mr-2 text-black" />
                Pengguna
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/admin/matakuliah"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
            >
              <FiBook className="mr-2 text-black" />
              Mata Kuliah
            </Link>
          </li>
          <li>
            <Link
              to="/admin/laporan"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
            >
              <FiBarChart2 className="mr-2 text-black" />
              Laporan
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
