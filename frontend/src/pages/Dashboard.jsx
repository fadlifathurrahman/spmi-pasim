import { useState, useEffect } from "react";
import {
  FiFileText,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiBarChart2,
  FiUsers,
  FiBook,
  FiTarget,
  FiCalendar,
} from "react-icons/fi";

// Import data dari Data.js
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

  useEffect(() => {
    // Hitung data untuk dashboard
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

  const StatCard = ({ title, value, icon: Icon, subtitle }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-full bg-red-100 text-red-600">
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );

  const ProgressCard = ({ title, completed, total }) => {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {completed} dari {total} selesai
          </span>
          <span className="text-sm font-medium text-red-600">
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-red-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const QuickActionButton = ({ icon: Icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-200 group"
    >
      <Icon className="text-red-600 text-xl mb-2 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-medium text-gray-700 group-hover:text-red-700">
        {label}
      </span>
    </button>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard SPMI</h1>
        <p className="text-gray-600 mt-2">
          Sistem Peningkatan Mutu Internal - Program Studi Teknik Informatika
        </p>
        <div className="w-20 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Ringkasan Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Standar"
          value={dashboardData.totalStandar}
          icon={FiFileText}
          subtitle="Standar mutu"
        />
        <StatCard
          title="Evaluasi Aktif"
          value={dashboardData.evaluasiAktif}
          icon={FiTrendingUp}
          subtitle="Proses evaluasi"
        />
        <StatCard
          title="Capaian Tervalidasi"
          value={dashboardData.capaianValid}
          icon={FiCheckCircle}
          subtitle="Data valid"
        />
        <StatCard
          title="Perlu Validasi"
          value={dashboardData.capaianBelumValid}
          icon={FiClock}
          subtitle="Menunggu validasi"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress Section */}
        <div className="space-y-6">
          <ProgressCard
            title="Progress Evaluasi Standar"
            completed={dashboardData.evaluasiAktif}
            total={dashboardData.totalSubstandar}
          />

          <ProgressCard
            title="Validasi Capaian"
            completed={dashboardData.capaianValid}
            total={dashboardData.capaianValid + dashboardData.capaianBelumValid}
          />

          {/* Informasi Tambahan */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiBarChart2 className="mr-2 text-red-500" />
              Informasi Sistem
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 flex items-center">
                  <FiCalendar className="mr-2 text-red-500" />
                  Tahun Akademik Aktif
                </span>
                <span className="font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                  {dashboardData.tahunAktif}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 flex items-center">
                  <FiUsers className="mr-2 text-red-500" />
                  Total Program Studi
                </span>
                <span className="font-medium text-gray-900">
                  {dashboardData.totalProdi}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 flex items-center">
                  <FiFileText className="mr-2 text-red-500" />
                  Total Substandar
                </span>
                <span className="font-medium text-gray-900">
                  {dashboardData.totalSubstandar}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FiTrendingUp className="mr-2 text-red-500" />
            Aktivitas Terbaru
          </h3>
          <div className="space-y-4">
            {evaluasiData.slice(0, 5).map((evaluasi, index) => (
              <div
                key={evaluasi.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors duration-200 border-l-2 border-red-300"
              >
                <div className="p-2 rounded-full bg-red-100 text-red-600">
                  <FiBarChart2 className="text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Evaluasi standar #{evaluasi.id}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Periode {evaluasi.id_periode} • Substandar{" "}
                    {evaluasi.id_substandar}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    index % 2 === 0
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : "bg-orange-100 text-orange-800 border border-orange-200"
                  }`}
                >
                  {index % 2 === 0 ? "Selesai" : "Proses"}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="w-full text-center text-red-600 hover:text-red-800 text-sm font-medium flex items-center justify-center group">
              Lihat Semua Aktivitas
              <FiTrendingUp className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiTarget className="mr-2 text-red-500" />
          Akses Cepat
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionButton
            icon={FiFileText}
            label="Input Capaian"
            onClick={() => console.log("Input Capaian clicked")}
          />
          <QuickActionButton
            icon={FiCheckCircle}
            label="Validasi"
            onClick={() => console.log("Validasi clicked")}
          />
          <QuickActionButton
            icon={FiBarChart2}
            label="Laporan"
            onClick={() => console.log("Laporan clicked")}
          />
          <QuickActionButton
            icon={FiUsers}
            label="Pengguna"
            onClick={() => console.log("Pengguna clicked")}
          />
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Standar Tersedia</p>
              <p className="text-2xl font-bold mt-1">
                {dashboardData.totalStandar}
              </p>
            </div>
            <FiFileText className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Substandar</p>
              <p className="text-2xl font-bold mt-1">
                {dashboardData.totalSubstandar}
              </p>
            </div>
            <FiBook className="text-2xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-700 to-red-800 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">
                Evaluasi Berjalan
              </p>
              <p className="text-2xl font-bold mt-1">
                {dashboardData.evaluasiAktif}
              </p>
            </div>
            <FiTrendingUp className="text-2xl opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
