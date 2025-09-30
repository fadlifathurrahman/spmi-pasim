import { FiLock, FiMail, FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { dataUser } from "../utils/Data.js";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showAlert = (type, message) => {
    // Buat elemen alert custom
    const alertDiv = document.createElement("div");
    alertDiv.className = `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg ${
      type === "success"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }`;
    alertDiv.innerHTML = `
      <div class="flex items-center">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
            type === "success"
              ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          }"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;

    // Tambahkan ke body
    document.body.appendChild(alertDiv);

    // Hapus setelah 3 detik
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Find user in dataUser array
      const user = dataUser.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (user) {
        // Save user data to localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Show success alert
        showAlert("success", "Login berhasil! Mengarahkan ke dashboard...");

        // Redirect after delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        // Show error alert
        showAlert("error", "Email atau password salah!");
      }

      setIsLoading(false);
    }, 1000);
  };

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

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Masuk</h2>
          <p className="text-gray-600 mb-8">Silakan masuk dengan akun Anda</p>

          <form className="space-y-6" onSubmit={handleLogin}>
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
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="mt-2 flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Lupa password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 bg-red-800 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200 shadow-lg disabled:bg-red-600 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                <>
                  <FiLogIn className="mr-2" />
                  Masuk
                </>
              )}
            </button>

            {/* Register Link - Simple text */}
            <div className="text-center text-sm text-gray-600">
              Tidak punya akun?{" "}
              <Link
                to="/register"
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Hubungi Admin
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
