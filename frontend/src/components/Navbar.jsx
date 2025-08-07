import { useState } from "react";
import { FiBell, FiSearch, FiChevronDown, FiMenu } from "react-icons/fi";

const Navbar = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-red-800 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md hover:bg-red-700 focus:outline-none"
        >
          <FiMenu className="h-6 w-6" />
        </button>

        {/* Search bar */}
        <div className="hidden md:flex items-center bg-red-700 rounded-md px-3 py-2 flex-1 max-w-md mx-4">
          <FiSearch className="text-gray-300 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-white placeholder-gray-300 w-full"
          />
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-red-700 relative">
            <FiBell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-400"></span>
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-red-800 font-bold">A</span>
              </div>
              <span className="hidden md:inline">Admin</span>
              <FiChevronDown />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-red-50"
                >
                  Profile
                </a>
                <a
                  onClick={() => {
                    // Handle logout logic here
                    window.location.href = "/login"; // Redirect to login page on logout
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-red-50"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
