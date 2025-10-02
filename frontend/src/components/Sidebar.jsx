import { useEffect, useState } from "react";
import {
  FiHome,
  FiChevronDown,
  FiChevronRight,
  FiTarget,
  FiCalendar,
  FiFileText,
  FiTrendingUp,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, closeSidebar }) => {
  const [isEvaluasiOpen, setIsEvaluasiOpen] = useState(false);
  const [userRole, setUserRole] = useState("admin");
  const [prodiList, setProdiList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
      setUserRole(user.role);
    }

    // Data prodi dari file data yang Anda berikan
    const prodiData = [
      {
        id: 1,
        nama_prodi: "Teknik Informatika",
        id_fakultas: 1,
        status: "tampil",
      },
      {
        id: 2,
        nama_prodi: "Sistem Informasi",
        id_fakultas: 1,
        status: "tampil",
      },
      { id: 3, nama_prodi: "Manajemen", id_fakultas: 2, status: "tampil" },
      { id: 4, nama_prodi: "Akuntansi", id_fakultas: 2, status: "tampil" },
    ];

    setProdiList(prodiData);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loginTime");
    window.location.href = "/login";
  };

  return (
    <aside
      className={`bg-white text-red-800 w-64 md:w-72 h-screen fixed md:relative z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg border-r border-red-200 overflow-y-auto`}
    >
      {/* Header dengan Logo */}
      <div className="p-6 border-b border-red-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl">
            <img
              src="https://pasim.ac.id/uploads/page/logo-pasim.png"
              alt="Logo PASIM"
              className="w-10 h-10"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-red-800">
              SISTEM SPMI
            </h1>
            <p className="text-xs text-red-600 opacity-80">Universitas PASIM</p>
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="p-4 border-b border-red-200 bg-red-50 mx-4 my-4 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="bg-red-800 p-2 rounded-full">
            <FiUser className="text-white text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-red-800 truncate">
              {currentUser?.name || "Admin SPMI"}
            </p>
            <p className="text-xs text-red-600 opacity-80 truncate capitalize">
              {userRole} • <span className="text-green-600">Online</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-3 rounded-xl hover:bg-red-50 transition-all duration-200 font-medium group border border-transparent hover:border-red-200"
              onClick={handleLinkClick}
            >
              <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                <FiHome className="text-red-800 text-lg" />
              </div>
              <span className="ml-3 text-red-800">Dashboard</span>
            </Link>
          </li>

          {/* Standar & Substandar */}
          <li>
            <Link
              to="/standar-substandar"
              className="flex items-center p-3 rounded-xl hover:bg-red-50 transition-all duration-200 font-medium group border border-transparent hover:border-red-200"
              onClick={handleLinkClick}
            >
              <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                <FiFileText className="text-red-800 text-lg" />
              </div>
              <span className="ml-3 text-red-800">Standar & Substandar</span>
            </Link>
          </li>

          {/* Target & Indikator */}
          <li>
            <Link
              to="/target-indikator"
              className="flex items-center p-3 rounded-xl hover:bg-red-50 transition-all duration-200 font-medium group border border-transparent hover:border-red-200"
              onClick={handleLinkClick}
            >
              <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                <FiTarget className="text-red-800 text-lg" />
              </div>
              <span className="ml-3 text-red-800">
                Target, Indikator & Capaian
              </span>
            </Link>
          </li>

          {/* Tahun & Periode */}
          <li>
            <Link
              to="/tahun-periode"
              className="flex items-center p-3 rounded-xl hover:bg-red-50 transition-all duration-200 font-medium group border border-transparent hover:border-red-200"
              onClick={handleLinkClick}
            >
              <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                <FiCalendar className="text-red-800 text-lg" />
              </div>
              <span className="ml-3 text-red-800">Tahun & Periode</span>
            </Link>
          </li>

          {/* Menu Evaluasi (Dropdown) */}
          <li>
            <button
              onClick={() => setIsEvaluasiOpen(!isEvaluasiOpen)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition-all duration-200 font-medium group border border-transparent hover:border-red-200"
            >
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                  <FiTrendingUp className="text-red-800 text-lg" />
                </div>
                <span className="ml-3 text-red-800">Evaluasi</span>
              </div>
              <div
                className={`transform transition-transform duration-200 ${
                  isEvaluasiOpen ? "rotate-180" : ""
                }`}
              >
                <FiChevronDown className="text-red-800" />
              </div>
            </button>

            {isEvaluasiOpen && (
              <ul className="ml-4 mt-2 space-y-2 border-l-2 border-red-200 pl-3">
                {prodiList.map((prodi) => (
                  <li key={prodi.id}>
                    <Link
                      to={`/evaluasi/${prodi.id}`}
                      className="flex items-center p-2 rounded-lg hover:bg-red-50 transition-all duration-200 group"
                      onClick={handleLinkClick}
                    >
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 group-hover:bg-red-600 transition-colors"></div>
                      <span className="text-sm text-red-700 font-medium">
                        {prodi.nama_prodi}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Footer dengan Logout */}
      <div className="p-4 border-t border-red-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-all duration-200 font-medium group border border-red-200 hover:border-red-300"
        >
          <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
            <FiLogOut className="text-red-800 text-lg" />
          </div>
          <span className="ml-3 text-red-800 font-medium">Logout</span>
        </button>

        {/* Version Info - lebih sederhana */}
        <div className="mt-3 text-center">
          <p className="text-xs text-red-600 opacity-70">SPMI v1.0</p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
