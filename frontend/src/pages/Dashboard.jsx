import {
  FiCheckCircle,
  FiClipboard,
  FiAlertTriangle,
  FiSmile,
} from "react-icons/fi";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Data for charts
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Pencapaian Mutu",
        data: [75, 80, 85, 82, 88, 90],
        backgroundColor: "#991B1B",
        borderColor: "#991B1B",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Pengajaran", "Penelitian", "Layanan", "Administrasi"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#991B1B", "#DC2626", "#F87171", "#FECACA"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-red-800">Dashboard Mutu</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FiCheckCircle className="text-green-600" />}
          title="Standar Terpenuhi"
          value="85/100"
          description="Standar mutu yang telah terpenuhi"
        />
        <StatCard
          icon={<FiClipboard className="text-blue-600" />}
          title="Audit Bulan Ini"
          value="5"
          description="Audit internal dilakukan"
        />
        <StatCard
          icon={<FiAlertTriangle className="text-yellow-600" />}
          title="Perbaikan Aktif"
          value="12"
          description="Tindakan perbaikan berjalan"
        />
        <StatCard
          icon={<FiSmile className="text-red-600" />}
          title="Kepuasan Pengguna"
          value="78%"
          description="Tingkat kepuasan pengguna sistem"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-red-800">
            Tren Pencapaian Mutu
          </h2>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-red-800">
            Distribusi Standar Mutu
          </h2>
          <div className="h-64">
            <Pie
              data={pieData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-red-800">
          Aktivitas Terkini
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                  Auditor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  date: "15 Jun 2023",
                  auditor: "Dr. Ahmad",
                  unit: "Fakultas Teknik",
                  status: "Selesai",
                },
                {
                  date: "14 Jun 2023",
                  auditor: "Prof. Siti",
                  unit: "Fakultas Ekonomi",
                  status: "Dalam Proses",
                },
                {
                  date: "10 Jun 2023",
                  auditor: "Dr. Budi",
                  unit: "Fakultas Hukum",
                  status: "Selesai",
                },
                {
                  date: "5 Jun 2023",
                  auditor: "Dr. Ani",
                  unit: "LPPM",
                  status: "Ditolak",
                },
              ].map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.auditor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === "Selesai"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Dalam Proses"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Reusable StatCard component
const StatCard = ({ icon, title, value, description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-start">
      <div className="p-3 rounded-full bg-red-50 text-red-800 mr-4">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-red-800">{value}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Dashboard;
