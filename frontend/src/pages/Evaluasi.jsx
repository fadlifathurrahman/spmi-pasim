import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  standarData,
  substandarData,
  indikatorData,
  targetData,
  capaianData,
  evaluasiData as initialEvaluasi,
  periodeData,
  tahunAkademikData,
  prodiData,
} from "../utils/Data";
import {
  FiDownload,
  FiCheckCircle,
  FiTarget,
  FiBook,
  FiPlus,
  FiTrash2,
  FiEdit,
} from "react-icons/fi";

const Evaluasi = () => {
  const { idProdi } = useParams();
  const prodiId = parseInt(idProdi, 10);

  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [periodeOptions, setPeriodeOptions] = useState([]);
  const [filteredEvaluasi, setFilteredEvaluasi] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvaluasi, setNewEvaluasi] = useState({
    id_standar: "",
    id_substandar: "",
    id_indikator: "",
    id_target: "",
  });

  // Ambil user login dari localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userRole = currentUser?.role || "";

  // Build periodeOptions
  useEffect(() => {
    const periodes = periodeData.filter((p) => p.id_prodi === prodiId);
    const formatted = periodes.map((periode) => {
      const tahunAkademik = tahunAkademikData.find(
        (t) => t.id === periode.id_tahunakademik
      );
      return {
        id: String(periode.id),
        label: tahunAkademik?.rentang || "Tahun tidak ditemukan",
        tahunAkademikId: periode.id_tahunakademik,
      };
    });

    setPeriodeOptions(formatted);
    if (formatted.length > 0) {
      setSelectedPeriode(formatted[0].id);
    } else {
      setSelectedPeriode("");
    }
  }, [prodiId]);

  // Filter evaluasi berdasarkan periode yang dipilih
  useEffect(() => {
    if (!selectedPeriode) {
      setFilteredEvaluasi([]);
      return;
    }

    const periodeId = parseInt(selectedPeriode, 10);
    const evaluasiFiltered = initialEvaluasi.filter(
      (ev) => ev.id_periode === periodeId && ev.status === "aktif"
    );

    setFilteredEvaluasi(evaluasiFiltered);
  }, [selectedPeriode]);

  // Fungsi untuk mendapatkan standar yang tersedia untuk periode tertentu
  const getAvailableStandars = () => {
    if (!selectedPeriode)
      return standarData.filter((s) => s.status === "aktif");

    const periodeId = parseInt(selectedPeriode, 10);
    const standarIdsInEvaluasi = [
      ...new Set(filteredEvaluasi.map((e) => e.id_standar)),
    ];

    return standarData.filter(
      (s) => s.status === "aktif" && standarIdsInEvaluasi.includes(s.id)
    );
  };

  // Fungsi untuk mendapatkan substandar yang tersedia untuk standar tertentu
  const getAvailableSubstandars = (standarId) => {
    if (!selectedPeriode || !standarId) return [];

    const periodeId = parseInt(selectedPeriode, 10);
    const substandarIdsInEvaluasi = [
      ...new Set(
        filteredEvaluasi
          .filter((e) => e.id_standar === standarId)
          .map((e) => e.id_substandar)
      ),
    ];

    return substandarData.filter(
      (s) =>
        s.status === "aktif" &&
        s.id_standar === standarId &&
        substandarIdsInEvaluasi.includes(s.id)
    );
  };

  // Fungsi untuk mendapatkan target yang tersedia untuk substandar tertentu
  const getAvailableTargets = (substandarId) => {
    if (!selectedPeriode || !substandarId) return [];

    const periodeId = parseInt(selectedPeriode, 10);
    const targetIdsInEvaluasi = [
      ...new Set(
        filteredEvaluasi
          .filter((e) => e.id_substandar === substandarId)
          .map((e) => e.id_target)
      ),
    ];

    return targetData.filter(
      (t) => t.status === "aktif" && targetIdsInEvaluasi.includes(t.id)
    );
  };

  const handlePeriodeChange = (e) => {
    setSelectedPeriode(e.target.value);
    setIsEditing(false);
  };

  const handleCapaianChange = (id, value) => {
    setFilteredEvaluasi((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, id_capaian: parseInt(value, 10) } : item
      )
    );
  };

  const toggleVerifikasi = (id) => {
    setFilteredEvaluasi((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, diverifikasi: !item.diverifikasi } : item
      )
    );
  };

  // Fungsi untuk menghapus evaluasi
  const handleDeleteEvaluasi = (row) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus evaluasi ini?")) {
      setFilteredEvaluasi((prev) =>
        prev.filter(
          (item) =>
            !(
              item.id_target === row.id_target &&
              item.id_indikator === row.id_indikator &&
              item.id_substandar === row.id_substandar &&
              item.id_standar === row.id_standar
            )
        )
      );
    }
    console.log(row);
  };

  // Fungsi untuk menambah evaluasi baru
  const handleAddEvaluasi = () => {
    if (
      !newEvaluasi.id_standar ||
      !newEvaluasi.id_substandar ||
      !newEvaluasi.id_indikator ||
      !newEvaluasi.id_target
    ) {
      alert("Semua field harus diisi!");
      return;
    }

    const newId = Math.max(...filteredEvaluasi.map((e) => e.id), 0) + 1;
    const periodeId = parseInt(selectedPeriode, 10);

    const newEvaluasiItem = {
      id: newId,
      id_periode: periodeId,
      id_standar: parseInt(newEvaluasi.id_standar),
      id_substandar: parseInt(newEvaluasi.id_substandar),
      id_indikator: parseInt(newEvaluasi.id_indikator),
      id_target: parseInt(newEvaluasi.id_target),
      id_capaian: null,
      diverifikasi: false,
      status: "aktif",
    };

    setFilteredEvaluasi((prev) => [...prev, newEvaluasiItem]);
    setShowAddModal(false);
    setNewEvaluasi({
      id_standar: "",
      id_substandar: "",
      id_indikator: "",
      id_target: "",
    });
  };

  const getJoinedEvaluasi = () => {
    return filteredEvaluasi.map((item) => {
      const substandar = substandarData.find(
        (s) => s.id === item.id_substandar
      );
      const standar = standarData.find((st) => st.id === item.id_standar);
      const indikator = indikatorData.find((ik) => ik.id === item.id_indikator);
      const target = targetData.find((t) => t.id === item.id_target);
      const capaian = capaianData.find((c) => c.id === item.id_capaian);

      return {
        ...item,
        standar: standar?.nama || `Standar ${item.id_standar}`,
        substandar: substandar?.nama || `Substandar ${item.id_substandar}`,
        indikator: indikator?.jenis || `Indikator ${item.id_indikator}`,
        target: target?.deskripsi || `Target ${item.id_target}`,
        capaian: capaian?.hasil || "",
      };
    });
  };

  const groupedByStandar = () => {
    const data = getJoinedEvaluasi();
    const grouped = {};
    data.forEach((item) => {
      if (!grouped[item.standar]) grouped[item.standar] = {};
      if (!grouped[item.standar][item.substandar])
        grouped[item.standar][item.substandar] = {};
      if (!grouped[item.standar][item.substandar][item.indikator])
        grouped[item.standar][item.substandar][item.indikator] = [];
      grouped[item.standar][item.substandar][item.indikator].push(item);
    });
    return grouped;
  };

  const uniqueStandarCount = new Set(filteredEvaluasi.map((e) => e.id_standar))
    .size;
  const uniqueSubstandarCount = new Set(
    filteredEvaluasi.map((e) => e.id_substandar)
  ).size;

  const stats = {
    standar: uniqueStandarCount,
    substandar: uniqueSubstandarCount,
    capaianTerisi: filteredEvaluasi.filter((e) => e.id_capaian).length,
    diverifikasi: filteredEvaluasi.filter((e) => e.diverifikasi).length,
    totalEvaluasi: filteredEvaluasi.length,
  };

  // FUNGSI GENERATE PDF YANG DIPERBAIKI
  const handleExportPDF = () => {
    if (filteredEvaluasi.length === 0) {
      alert("Tidak ada data evaluasi untuk diexport!");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Data untuk PDF
    const prodi = prodiData.find((p) => p.id === prodiId);
    const selectedPeriodeObj = periodeOptions.find(
      (p) => p.id === selectedPeriode
    );
    const groupedData = groupedByStandar();

    // Fungsi untuk menggambar garis
    const drawLine = (x1, y1, x2, y2) => {
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.1);
      doc.line(x1, y1, x2, y2);
    };

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("LAPORAN EVALUASI STANDAR", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Program Studi: ${prodi?.nama_prodi || "-"}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Periode: ${selectedPeriodeObj?.label || "-"}`, 20, yPosition);
    yPosition += 6;
    doc.text(
      `Tanggal Generate: ${new Date().toLocaleDateString("id-ID")}`,
      20,
      yPosition
    );
    yPosition += 15;

    // Data Evaluasi per Standar
    Object.entries(groupedData).forEach(
      ([standar, substandars], standarIndex) => {
        // Cek jika perlu page baru
        if (yPosition > pageHeight - 50) {
          doc.addPage();
          yPosition = 20;
        }

        // Standar
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`STANDAR: ${standar.toLocaleUpperCase()}`, 20, yPosition);
        yPosition += 8;

        Object.entries(substandars).forEach(([substandar, indikatorGroups]) => {
          // Substandar
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.text(`STANDAR: ${substandar.toLocaleUpperCase()}`, 20, yPosition);
          yPosition += 6;

          Object.entries(indikatorGroups).forEach(([indikator, items]) => {
            // Tentukan lebar kolom
            const col1X = 30; // Indikator
            const col2X = 130; // Target Capaian
            const col3X = 160; // Verifikasi
            const tableWidth = 155;
            const col1Width = 100; // Indikator
            const col2Width = 30; // Target Capaian
            const col3Width = 25; // Verifikasi

            // Header tabel dengan background
            doc.setFillColor(255, 165, 0); // Orange
            doc.rect(col1X, yPosition, tableWidth, 8, "F");

            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.setTextColor(255, 255, 255);
            doc.text(indikator.toUpperCase(), col1X + 2, yPosition + 5);
            doc.text("TARGET CAPAIAN", col2X + 2, yPosition + 5);
            doc.text("VERIFIKASI", col3X + 2, yPosition + 5);

            // Garis header
            drawLine(col1X, yPosition, col1X + tableWidth, yPosition); // Top
            drawLine(col1X, yPosition + 8, col1X + tableWidth, yPosition + 8); // Bottom
            drawLine(col1X, yPosition, col1X, yPosition + 8); // Left
            drawLine(col2X, yPosition, col2X, yPosition + 8); // Line between col1-col2
            drawLine(col3X, yPosition, col3X, yPosition + 8); // Line between col2-col3
            drawLine(
              col1X + tableWidth,
              yPosition,
              col1X + tableWidth,
              yPosition + 8
            ); // Right

            yPosition += 8;

            // Data items
            items.forEach((item) => {
              // Cek jika perlu page baru
              if (yPosition > pageHeight - 20) {
                doc.addPage();
                yPosition = 20;

                // Redraw header jika pindah halaman
                doc.setFillColor(255, 165, 0);
                doc.rect(col1X, yPosition, tableWidth, 8, "F");
                doc.setFont("helvetica", "bold");
                doc.setFontSize(8);
                doc.setTextColor(255, 255, 255);
                doc.text(indikator.toUpperCase(), col1X + 2, yPosition + 5);
                doc.text("TARGET CAPAIAN", col2X + 2, yPosition + 5);
                doc.text("VERIFIKASI", col3X + 2, yPosition + 5);

                drawLine(col1X, yPosition, col1X + tableWidth, yPosition);
                drawLine(
                  col1X,
                  yPosition + 8,
                  col1X + tableWidth,
                  yPosition + 8
                );
                drawLine(col1X, yPosition, col1X, yPosition + 8);
                drawLine(col2X, yPosition, col2X, yPosition + 8);
                drawLine(col3X, yPosition, col3X, yPosition + 8);
                drawLine(
                  col1X + tableWidth,
                  yPosition,
                  col1X + tableWidth,
                  yPosition + 8
                );

                yPosition += 8;
              }

              doc.setFont("helvetica", "normal");
              doc.setFontSize(8);
              doc.setTextColor(0, 0, 0);

              // Target (dengan word wrap)
              const targetLines = doc.splitTextToSize(
                item.target,
                col1Width - 4
              );
              const rowHeight = Math.max(10, targetLines.length * 4);

              // Draw content
              doc.text(targetLines, col1X + 2, yPosition + 3);
              doc.text(item.capaian || "-", col2X + 2, yPosition + 3);
              doc.text(
                item.diverifikasi ? "Ya" : "Tidak",
                col3X + 2,
                yPosition + 3
              );

              // Draw row borders
              drawLine(col1X, yPosition, col1X + tableWidth, yPosition); // Top
              drawLine(
                col1X,
                yPosition + rowHeight,
                col1X + tableWidth,
                yPosition + rowHeight
              ); // Bottom
              drawLine(col1X, yPosition, col1X, yPosition + rowHeight); // Left
              drawLine(col2X, yPosition, col2X, yPosition + rowHeight); // Line between col1-col2
              drawLine(col3X, yPosition, col3X, yPosition + rowHeight); // Line between col2-col3
              drawLine(
                col1X + tableWidth,
                yPosition,
                col1X + tableWidth,
                yPosition + rowHeight
              ); // Right

              yPosition += rowHeight;
            });

            yPosition += 5; // Spasi antar indikator
          });

          yPosition += 5; // Spasi antar substandar
        });

        yPosition += 10; // Spasi antar standar
      }
    );

    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(0, 0, 0);
      doc.text(
        `Halaman ${i} dari ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    }

    // Save PDF
    const fileName = `Evaluasi_${prodi?.nama_prodi || "Prodi"}_${
      selectedPeriodeObj?.label || "Periode"
    }_${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(fileName);
  };

  const prodi = prodiData.find((p) => p.id === prodiId);
  const selectedPeriodeObj = periodeOptions.find(
    (p) => p.id === selectedPeriode
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Evaluasi Standar - {prodi?.nama_prodi}
        </h1>
        <p className="text-gray-600 mt-2">
          Berikut indikator kinerja prodi sesuai periode yang dipilih
          {selectedPeriodeObj &&
            ` - Tahun Akademik ${selectedPeriodeObj.label}`}
        </p>
        <div className="w-32 h-1 bg-red-500 mt-2 rounded-full"></div>
      </div>

      {/* Filter Periode + Button PDF + Edit Mode */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center gap-4">
        <div className="flex-1">
          <label
            htmlFor="periode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Pilih Periode Evaluasi
          </label>
          <select
            id="periode"
            value={selectedPeriode}
            onChange={handlePeriodeChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          >
            <option value="">-- Pilih Periode --</option>
            {periodeOptions.map((periode) => (
              <option key={periode.id} value={periode.id}>
                {periode.label}
              </option>
            ))}
          </select>
        </div>

        {userRole === "admin" && selectedPeriode && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 ${
              isEditing
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            <FiEdit className="mr-2" />
            {isEditing ? "Keluar Edit" : "Edit Struktur"}
          </button>
        )}

        <button
          onClick={handleExportPDF}
          disabled={filteredEvaluasi.length === 0}
          className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 ${
            filteredEvaluasi.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } text-white`}
        >
          <FiDownload className="mr-2" />
          Export PDF
        </button>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jumlah Standar</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.standar}
              </p>
            </div>
            <FiBook className="text-blue-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jumlah Substandar</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.substandar}
              </p>
            </div>
            <FiTarget className="text-purple-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Evaluasi</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalEvaluasi}
              </p>
            </div>
            <FiTarget className="text-yellow-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Capaian Terisi</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.capaianTerisi}
              </p>
            </div>
            <FiTarget className="text-orange-500 text-xl" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Diverifikasi</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.diverifikasi}
              </p>
            </div>
            <FiCheckCircle className="text-green-500 text-xl" />
          </div>
        </div>
      </div>

      {/* Tombol Tambah Evaluasi (hanya admin dalam mode edit) */}
      {userRole === "admin" && isEditing && selectedPeriode && (
        <div className="mb-6 flex justify-between items-center">
          <div></div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <FiPlus className="mr-2" />
            Tambah Evaluasi
          </button>
        </div>
      )}

      {/* Tabel Evaluasi */}
      <div className="space-y-8">
        {Object.entries(groupedByStandar()).length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
            {selectedPeriode
              ? "Tidak ada data evaluasi untuk periode yang dipilih."
              : "Silakan pilih periode evaluasi."}
          </div>
        ) : (
          Object.entries(groupedByStandar()).map(([standar, substandars]) => (
            <div key={standar} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{standar}</h2>
                {userRole === "admin" && isEditing && (
                  <button
                    onClick={() => {
                      // Logic untuk menghapus standar dari periode ini
                      const standarId = standarData.find(
                        (s) => s.nama === standar
                      )?.id;
                      if (standarId) {
                        setFilteredEvaluasi((prev) =>
                          prev.filter((e) => e.id_standar !== standarId)
                        );
                      }
                    }}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Hapus standar dari periode ini"
                  >
                    <FiTrash2 />
                  </button>
                )}
              </div>

              {Object.entries(substandars).map(
                ([substandar, indikatorGroups]) => (
                  <div key={substandar} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-700">
                        {substandar}
                      </h3>
                      {userRole === "admin" && isEditing && (
                        <button
                          onClick={() => {
                            // Logic untuk menghapus substandar dari periode ini
                            const substandarId = substandarData.find(
                              (s) => s.nama === substandar
                            )?.id;
                            if (substandarId) {
                              setFilteredEvaluasi((prev) =>
                                prev.filter(
                                  (e) => e.id_substandar !== substandarId
                                )
                              );
                            }
                          }}
                          className="text-red-600 hover:text-red-800 p-2"
                          title="Hapus substandar dari periode ini"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>

                    {Object.entries(indikatorGroups).map(
                      ([indikator, items]) => (
                        <div key={indikator} className="mb-4">
                          <table className="w-full border border-gray-300">
                            <thead className="bg-orange-500 text-white">
                              <tr>
                                <th className="px-4 py-2 text-left border border-gray-300 w-2/5">
                                  {indikator}
                                </th>
                                <th className="px-4 py-2 text-center border border-gray-300 w-1/5">
                                  Capaian
                                </th>
                                <th className="px-4 py-2 text-center border border-gray-300 w-1/5">
                                  Diverifikasi
                                </th>
                                {userRole === "admin" && isEditing && (
                                  <th className="px-4 py-2 text-center border border-gray-300 w-1/10">
                                    Aksi
                                  </th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {items.map((row) => (
                                <tr
                                  key={row.id}
                                  className="hover:bg-gray-50 text-sm"
                                >
                                  {/* INDIKATOR */}
                                  <td className="px-4 py-2 border border-gray-300">
                                    {row.target}
                                  </td>

                                  {/* CAPAIAN */}
                                  <td className="px-4 py-2 border border-gray-300 text-center">
                                    {userRole === "admin" ? (
                                      <select
                                        value={row.id_capaian || ""}
                                        onChange={(e) =>
                                          handleCapaianChange(
                                            row.id,
                                            e.target.value
                                          )
                                        }
                                        className="border px-2 py-1 rounded text-xs"
                                      >
                                        <option value="">-- Pilih --</option>
                                        {capaianData.map((c) => (
                                          <option key={c.id} value={c.id}>
                                            {c.hasil}
                                          </option>
                                        ))}
                                      </select>
                                    ) : (
                                      <span>
                                        {capaianData.find(
                                          (c) => c.id === row.id_capaian
                                        )?.hasil || "-"}
                                      </span>
                                    )}
                                  </td>

                                  {/* DIVERIFIKASI */}
                                  <td
                                    className="px-4 py-2 border border-gray-300 text-center cursor-pointer"
                                    onClick={
                                      userRole === "user"
                                        ? () => toggleVerifikasi(row.id)
                                        : undefined
                                    }
                                  >
                                    {row.diverifikasi ? (
                                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                        ✔ Ya
                                      </span>
                                    ) : (
                                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                        ✘ Tidak
                                      </span>
                                    )}
                                  </td>

                                  {/* AKSI */}
                                  {userRole === "admin" && isEditing && (
                                    <td className="px-4 py-2 border border-gray-300 text-center">
                                      <button
                                        onClick={() =>
                                          handleDeleteEvaluasi(row)
                                        }
                                        className="text-red-600 hover:text-red-800 p-1"
                                        title="Hapus evaluasi"
                                      >
                                        <FiTrash2 />
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )
                    )}
                  </div>
                )
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal Tambah Evaluasi */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Tambah Evaluasi Baru</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standar
                </label>
                <select
                  value={newEvaluasi.id_standar}
                  onChange={(e) =>
                    setNewEvaluasi((prev) => ({
                      ...prev,
                      id_standar: e.target.value,
                      id_substandar: "",
                      id_target: "",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">-- Pilih Standar --</option>
                  {standarData
                    .filter((s) => s.status === "aktif")
                    .map((standar) => (
                      <option key={standar.id} value={standar.id}>
                        {standar.nama}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Substandar
                </label>
                <select
                  value={newEvaluasi.id_substandar}
                  onChange={(e) =>
                    setNewEvaluasi((prev) => ({
                      ...prev,
                      id_substandar: e.target.value,
                      id_target: "",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  disabled={!newEvaluasi.id_standar}
                >
                  <option value="">-- Pilih Substandar --</option>
                  {substandarData
                    .filter(
                      (s) =>
                        s.status === "aktif" &&
                        s.id_standar === parseInt(newEvaluasi.id_standar)
                    )
                    .map((substandar) => (
                      <option key={substandar.id} value={substandar.id}>
                        {substandar.nama}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indikator
                </label>
                <select
                  value={newEvaluasi.id_indikator}
                  onChange={(e) =>
                    setNewEvaluasi((prev) => ({
                      ...prev,
                      id_indikator: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">-- Pilih Indikator --</option>
                  {indikatorData
                    .filter((i) => i.status === "aktif")
                    .map((indikator) => (
                      <option key={indikator.id} value={indikator.id}>
                        {indikator.jenis}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target
                </label>
                <select
                  value={newEvaluasi.id_target}
                  onChange={(e) =>
                    setNewEvaluasi((prev) => ({
                      ...prev,
                      id_target: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  disabled={!newEvaluasi.id_substandar}
                >
                  <option value="">-- Pilih Target --</option>
                  {targetData
                    .filter((t) => t.status === "aktif")
                    .map((target) => (
                      <option key={target.id} value={target.id}>
                        {target.deskripsi}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddEvaluasi}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evaluasi;
