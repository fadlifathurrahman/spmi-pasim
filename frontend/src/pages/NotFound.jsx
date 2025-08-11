import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        {/* Error Code */}
        <h1 className="text-9xl font-bold text-red-600 mb-4">404</h1>

        {/* Error Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Halaman Tidak Ditemukan
        </h2>

        <p className="text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
        >
          <FiArrowLeft className="mr-2" />
          Kembali ke Beranda
        </Link>

        {/* Optional: Illustration */}
        <div className="mt-12">
          <svg
            className="w-full h-auto max-w-xs mx-auto"
            viewBox="0 0 500 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 150C100 122.386 122.386 100 150 100H350C377.614 100 400 122.386 400 150V250C400 277.614 377.614 300 350 300H150C122.386 300 100 277.614 100 250V150Z"
              fill="#F3F4F6"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            <path
              d="M150 100H350V150H150V100Z"
              fill="#EF4444"
              stroke="#DC2626"
              strokeWidth="2"
            />
            <path
              d="M175 125C175 119.477 179.477 115 185 115H195C200.523 115 205 119.477 205 125V135C205 140.523 200.523 145 195 145H185C179.477 145 175 140.523 175 135V125Z"
              fill="white"
            />
            <path
              d="M225 125C225 119.477 229.477 115 235 115H315C320.523 115 325 119.477 325 125V135C325 140.523 320.523 145 315 145H235C229.477 145 225 140.523 225 135V125Z"
              fill="white"
            />
            <path d="M150 175H350V180H150V175Z" fill="#E5E7EB" />
            <path d="M150 195H350V200H150V195Z" fill="#E5E7EB" />
            <path d="M150 215H350V220H150V215Z" fill="#E5E7EB" />
            <path d="M150 235H350V240H150V235Z" fill="#E5E7EB" />
            <path d="M150 255H250V260H150V255Z" fill="#E5E7EB" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
