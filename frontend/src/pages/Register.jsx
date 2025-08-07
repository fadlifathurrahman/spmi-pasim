import { FiUser, FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative">
        <img
          src="https://pasim.ac.id/uploads/page/IMG_20191017_060121.jpg"
          alt="Universitas Pasim"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-red-900/30 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              UNIVERSITAS PASIM
            </h1>
            <p className="text-xl text-white/90">
              Sistem Peningkatan Mutu Internal
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-block bg-red-800 p-3 rounded-lg">
              <h1 className="text-2xl font-bold text-white">UNPASIM</h1>
            </div>
            <h2 className="mt-4 text-xl font-bold text-red-800">
              Sistem Peningkatan Mutu Internal
            </h2>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Daftar Akun</h2>
          <p className="text-gray-600 mb-8">
            Isi formulir untuk membuat akun baru
          </p>

          <form className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nama lengkap"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="email@unpasim.ac.id"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Minimal 8 karakter dengan kombinasi huruf dan angka
              </p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 bg-red-800 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200 shadow-lg"
            >
              <FiLogIn className="mr-2" />
              Daftar Sekarang
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Masuk disini
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
