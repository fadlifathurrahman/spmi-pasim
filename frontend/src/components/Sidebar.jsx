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
  FiUserCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, closeSidebar }) => {
  const [isEvaluasiOpen, setIsEvaluasiOpen] = useState(false);
  const [userRole, setUserRole] = useState("admin");
  const [prodiList, setProdiList] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserRole(currentUser.role);
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
              to="/dashboard"
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
              to="/standar-substandar"
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
              to="/target-indikator"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
              onClick={handleLinkClick}
            >
              <FiTarget className="mr-2 text-black" />
              Target, Indikator & Capaian
            </Link>
          </li>

          {/* Tahun & Periode */}
          <li>
            <Link
              to="/tahun-periode"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
              onClick={handleLinkClick}
            >
              <FiCalendar className="mr-2 text-black" />
              Tahun & Periode
            </Link>
          </li>

          {/* Menu Evaluasi (Dropdown) */}
          <li>
            <button
              onClick={() => setIsEvaluasiOpen(!isEvaluasiOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 font-medium"
            >
              <div className="flex items-center">
                <FiTrendingUp className="mr-2 text-black" />
                <span>Evaluasi</span>
              </div>
              {isEvaluasiOpen ? <FiChevronDown /> : <FiChevronRight />}
            </button>
            {isEvaluasiOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                {prodiList.map((prodi) => (
                  <li key={prodi.id}>
                    <Link
                      to={`/evaluasi`}
                      className="flex items-center p-2 rounded-lg hover:bg-red-50"
                      onClick={handleLinkClick}
                    >
                      <FiTrendingUp className="mr-2 text-black" />
                      {prodi.nama_prodi}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Validasi Capaian */}
          {(userRole === "admin" ||
            userRole === "kaprodi" ||
            userRole === "spmi") && (
            <li>
              <Link
                to="/validasi-capaian"
                className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
                onClick={handleLinkClick}
              >
                <FiUserCheck className="mr-2 text-black" />
                Validasi Capaian
              </Link>
            </li>
          )}

          {/* Laporan Prodi (Bukan Dropdown) */}
          <li>
            <Link
              to="/laporan-prodi"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
              onClick={handleLinkClick}
            >
              <FiBarChart2 className="mr-2 text-black" />
              Laporan Prodi
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
