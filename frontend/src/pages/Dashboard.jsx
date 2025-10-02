/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  FiFileText,
  FiTrendingUp,
  FiClock,
  FiBarChart2,
  FiBook,
  FiTarget,
} from "react-icons/fi";
import {
  standarData,
  substandarData,
  evaluasiData,
  capaianData,
  tahunAkademikData,
  prodiData,
} from "./../utils/Data.js";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalStandar: 0,
    totalSubstandar: 0,
    evaluasiAktif: 0,
    capaianValid: 0,
    capaianBelumValid: 0,
    tahunAktif: "",
    totalProdi: 0,
  });

  // State dropdown tahun akademik
  const [selectedTahun, setSelectedTahun] = useState(
    tahunAkademikData[tahunAkademikData.length - 1]?.rentang
  );

  // State untuk capaian universitas
  const [capaianUniversitas, setCapaianUniversitas] = useState(0);

  useEffect(() => {
    const totalStandar = standarData.length;
    const totalSubstandar = substandarData.length;
    const evaluasiAktif = evaluasiData.length;
    const capaianValid = capaianData.filter(
      (_, index) => index % 2 === 0
    ).length;
    const capaianBelumValid = capaianData.length - capaianValid;
    const tahunAktif =
      tahunAkademikData[tahunAkademikData.length - 1]?.rentang || "2024/2025";
    const totalProdi = prodiData.length;

    setDashboardData({
      totalStandar,
      totalSubstandar,
      evaluasiAktif,
      capaianValid,
      capaianBelumValid,
      tahunAktif,
      totalProdi,
    });
  }, []);

  // Data capaian per prodi
  const capaianProdi = [
    { nama: "Teknik Informatika", persentase: 85 },
    { nama: "Sistem Informasi", persentase: 72 },
    { nama: "Manajemen", persentase: 68 },
    { nama: "Akuntansi", persentase: 91 },
  ];

  // Hitung capaian universitas sebagai rata-rata dari semua prodi
  useEffect(() => {
    if (capaianProdi.length > 0) {
      const totalPersen = capaianProdi.reduce(
        (sum, prodi) => sum + prodi.persentase,
        0
      );
      const rataRata = Math.round(totalPersen / capaianProdi.length);
      setCapaianUniversitas(rataRata);
    }
  }, [capaianProdi, selectedTahun]); // bisa juga depend on capaianProdi kalau nanti dinamis

  // Fungsi untuk mendapatkan warna berdasarkan persentase
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 80) return "bg-blue-500";
    if (percentage >= 70) return "bg-yellow-500";
    if (percentage >= 60) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard SPMI</h1>
        <p className="text-gray-600 mt-2">
          Ringkasan sistem penjaminan mutu internal universitas
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Standar */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Standar</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardData.totalStandar}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <FiFileText className="text-xl" />
            </div>
          </div>
        </div>

        {/* Sub Standar */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sub Standar</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardData.totalSubstandar}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiBook className="text-xl" />
            </div>
          </div>
        </div>

        {/* Indikator Terisi */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Indikator Terisi</p>
              <p className="text-2xl font-bold text-gray-900">78%</p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiBarChart2 className="text-xl" />
            </div>
          </div>
        </div>

        {/* Belum Verifikasi */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Belum Verifikasi</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FiClock className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Capaian Universitas & Per Program Studi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Capaian per Program Studi */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <FiTarget className="mr-2 text-red-500" />
            Capaian per Program Studi
          </h3>
          <div className="space-y-4">
            {capaianProdi.map((prodi, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {prodi.nama}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {prodi.persentase}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${getProgressColor(
                      prodi.persentase
                    )} transition-all duration-500`}
                    style={{ width: `${prodi.persentase}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capaian Universitas dengan Dropdown */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiTrendingUp className="mr-2 text-red-500" />
              Capaian Universitas
            </h3>
            <div className="relative">
              <select
                value={selectedTahun}
                onChange={(e) => setSelectedTahun(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
              >
                {tahunAkademikData.map((t) => (
                  <option key={t.id} value={t.rentang}>
                    {t.rentang}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            {/* Circular Progress */}
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                {/* Background circle */}
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={
                    capaianUniversitas >= 70
                      ? "#10B981"
                      : capaianUniversitas >= 50
                      ? "#F59E0B"
                      : "#EF4444"
                  }
                  strokeWidth="3"
                  strokeDasharray={`${capaianUniversitas}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">
                  {capaianUniversitas}%
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                Total Capaian SPMI
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Data per Januari {selectedTahun.split("/")[1]}
              </p>
            </div>

            {/* Progress Bar di bawah */}
            <div className="w-full mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress Capaian</span>
                <span className="text-sm font-medium text-gray-900">
                  {capaianUniversitas}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${getProgressColor(
                    capaianUniversitas
                  )} transition-all duration-500`}
                  style={{ width: `${capaianUniversitas}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
