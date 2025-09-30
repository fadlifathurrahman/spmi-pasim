import { useEffect, useState } from "react";
import {
  FiHome,
  FiUsers,
  FiBarChart2,
  FiChevronDown,
  FiChevronRight,
  FiBook,
  FiArchive,
  FiTarget,
  FiCalendar,
  FiCheckSquare,
  FiFileText,
  FiTrendingUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, closeSidebar }) => {
  const [isLaporanOpen, setIsLaporanOpen] = useState(false);
  const [userRole, setUserRole] = useState("admin");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserRole(currentUser.role);
    }
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

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
          {/* Dashboard */}
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
              onClick={handleLinkClick}
            >
              <FiHome className="mr-2 text-black" />
              Dashboard
            </Link>
          </li>

          {/* Standar & Substandar */}
          <li>
            <Link
              to="/admin/standar-substandar"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
              onClick={handleLinkClick}
            >
              <FiFileText className="mr-2 text-black" />
              Standar & Substandar
            </Link>
          </li>

          {/* Target & Indikator */}
          <li>
            <Link
              to="/admin/target-indikator"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
              onClick={handleLinkClick}
            >
              <FiTarget className="mr-2 text-black" />
              Target & Indikator
            </Link>
          </li>

          {/* Tahun & Periode */}
          <li>
            <Link
              to="/admin/tahun-periode"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
              onClick={handleLinkClick}
            >
              <FiCalendar className="mr-2 text-black" />
              Tahun & Periode
            </Link>
          </li>

          {/* Evaluasi */}
          <li>
            <Link
              to="/admin/evaluasi"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
              onClick={handleLinkClick}
            >
              <FiTrendingUp className="mr-2 text-black" />
              Evaluasi
            </Link>
          </li>

          {/* Input Capaian */}
          <li>
            <Link
              to="/admin/input-capaian"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
              onClick={handleLinkClick}
            >
              <FiCheckSquare className="mr-2 text-black" />
              Input Capaian
            </Link>
          </li>

          {/* Validasi Capaian */}
          {(userRole === "admin" || userRole === "kaprodi") && (
            <li>
              <Link
                to="/admin/validasi-capaian"
                className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
                onClick={handleLinkClick}
              >
                <FiCheckSquare className="mr-2 text-black" />
                Validasi Capaian
              </Link>
            </li>
          )}

          {/* Menu Laporan */}
          <li>
            <button
              onClick={() => setIsLaporanOpen(!isLaporanOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 font-medium"
            >
              <div className="flex items-center">
                <FiBarChart2 className="mr-2 text-black" />
                <span>Laporan</span>
              </div>
              {isLaporanOpen ? <FiChevronDown /> : <FiChevronRight />}
            </button>
            {isLaporanOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link
                    to="/admin/laporan-prodi"
                    className="flex items-center p-2 rounded-lg hover:bg-red-50"
                    onClick={handleLinkClick}
                  >
                    <FiBarChart2 className="mr-2 text-black" />
                    Laporan Prodi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/laporan-audit"
                    className="flex items-center p-2 rounded-lg hover:bg-red-50"
                    onClick={handleLinkClick}
                  >
                    <FiBarChart2 className="mr-2 text-black" />
                    Laporan Audit
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Only show Pengguna menu for admin */}
          {userRole === "admin" && (
            <li>
              <Link
                to="/admin/pengguna"
                className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
                onClick={handleLinkClick}
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
              onClick={handleLinkClick}
            >
              <FiBook className="mr-2 text-black" />
              Mata Kuliah
            </Link>
          </li>

          {/* Menu Arsip Data - Hanya untuk admin dan kaprodi */}
          {(userRole === "admin" || userRole === "kaprodi") && (
            <li>
              <Link
                to="/admin/arsip"
                className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
                onClick={handleLinkClick}
              >
                <FiArchive className="mr-2 text-black" />
                Arsip Data
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
