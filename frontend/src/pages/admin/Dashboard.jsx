import {
  FiCheckCircle,
  FiClipboard,
  FiAlertTriangle,
  FiSmile,
  FiUsers,
  FiBook,
  FiCalendar,
  FiFileText,
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
import {
  dataUser,
  dataMataKuliah,
  dataTahunAjaran,
  dataSpmi,
  dataPertemuan,
} from "../../utils/Data.js";

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
  // Calculate stats from data
  const activeUsers = dataUser.filter(
    (user) => user.role !== "tidak aktif"
  ).length;
  const activeCourses = dataMataKuliah.length;
  const activeAcademicYear = dataTahunAjaran.filter(
    (year) => year.status === "Aktif"
  ).length;
  const totalMeetings = dataPertemuan.length;

  // Data for charts
  const userRoleData = {
    labels: ["Admin", "Kaprodi", "Dosen", "Tidak Aktif"],
    datasets: [
      {
        data: [
          dataUser.filter((u) => u.role === "admin").length,
          dataUser.filter((u) => u.role === "kaprodi").length,
          dataUser.filter((u) => u.role === "dosen").length,
          dataUser.filter((u) => u.role === "tidak aktif").length,
        ],
        backgroundColor: ["#991B1B", "#DC2626", "#F87171", "#FECACA"],
        borderWidth: 1,
      },
    ],
  };

  const courseMeetingData = {
    labels: dataMataKuliah.map((course) => course.nama_matkul),
    datasets: [
      {
        label: "Jumlah Pertemuan",
        data: dataMataKuliah.map((course) => {
          const spmi = dataSpmi.find((s) => s.mata_kuliah_id === course.id);
          return spmi ? spmi.jumlah_pertemuan : 0;
        }),
        backgroundColor: "#991B1B",
        borderColor: "#991B1B",
        borderWidth: 1,
      },
    ],
  };

  // Recent activities
  const recentActivities = dataPertemuan
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    .slice(0, 4)
    .map((meeting) => {
      const spmi = dataSpmi.find((s) => s.id === meeting.spmi_id);
      const course = dataMataKuliah.find((c) => c.id === spmi?.mata_kuliah_id);
      const lecturer = dataUser.find((u) => u.id === spmi?.dosen_id);

      return {
        date: new Date(meeting.tanggal).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        course: course?.nama_matkul || "Unknown",
        lecturer: lecturer?.name || "Unknown",
        meeting: `Pertemuan ${meeting.pertemuan_ke}`,
        status: "Selesai",
      };
    });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-black">Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FiUsers className="text-red-600" />}
          title="Pengguna Aktif"
          value={`${activeUsers}`}
          description="Total pengguna aktif sistem"
        />
        <StatCard
          icon={<FiBook className="text-red-600" />}
          title="Mata Kuliah"
          value={`${activeCourses}`}
          description="Total mata kuliah tersedia"
        />
        <StatCard
          icon={<FiCalendar className="text-red-600" />}
          title="Tahun Ajaran"
          value={`${activeAcademicYear}`}
          description="Tahun ajaran aktif"
        />
        <StatCard
          icon={<FiFileText className="text-red-600" />}
          title="Pertemuan"
          value={`${totalMeetings}`}
          description="Total pertemuan tercatat"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-red-800">
            Distribusi Peran Pengguna
          </h2>
          <div className="h-64">
            <Pie
              data={userRoleData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-red-800">
            Pertemuan per Mata Kuliah
          </h2>
          <Bar data={courseMeetingData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-red-800">
          Aktivitas Pertemuan Terkini
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                  Mata Kuliah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                  Dosen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                  Pertemuan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.lecturer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.meeting}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === "Selesai"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
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
