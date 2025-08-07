import { useState } from "react";
import {
  FiHome,
  FiFileText,
  FiCheckSquare,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

const SideBar = ({ isOpen, closeSidebar }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  return (
    <aside
      className={`bg-white text-red-800 w-64 md:w-72 h-full fixed md:relative z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-200 ease-in-out shadow-md`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center p-4 border-b border-red-100">
        <img
          src="https://pasim.ac.id/uploads/page/logo-pasim.png"
          alt=""
          className="w-12 h-12 mr-2"
        />
        <h1 className="text-xl font-bold">
          Sistem Peningkatan Mutu Internal (SPMI)
        </h1>
      </div>

      {/* Close button for mobile */}
      <button
        onClick={closeSidebar}
        className="md:hidden absolute top-4 right-4 p-1 rounded-full hover:bg-red-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Menu Items */}
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
            >
              <FiHome className="mr-3" />
              Dashboard
            </a>
          </li>

          {/* Manajemen Mutu */}
          <li>
            <button
              onClick={() => toggleMenu("mutu")}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 font-medium"
            >
              <div className="flex items-center">
                <FiFileText className="mr-3" />
                Manajemen Mutu
              </div>
              {activeMenu === "mutu" ? <FiChevronDown /> : <FiChevronRight />}
            </button>
            {activeMenu === "mutu" && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 rounded-lg hover:bg-red-50"
                  >
                    Standar Mutu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 rounded-lg hover:bg-red-50"
                  >
                    Audit Internal
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 rounded-lg hover:bg-red-50"
                  >
                    Tindakan Perbaikan
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
            >
              <FiUsers className="mr-3" />
              Pengguna
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
            >
              <FiBarChart2 className="mr-3" />
              Laporan
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-red-50 font-medium"
            >
              <FiSettings className="mr-3" />
              Pengaturan
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
