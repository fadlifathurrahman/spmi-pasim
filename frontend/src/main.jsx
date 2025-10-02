import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import StandarSubstandar from "./pages/StandarSubstandar.jsx";
import TargetIndikator from "./pages/TargetIndikator.jsx";
import TahunPeriode from "./pages/TahunPeriode.jsx";
import Evaluasi from "./pages/Evaluasi.jsx";
import InputCapaian from "./pages/InputCapaian.jsx";
import ValidasiCapaian from "./pages/ValidasiCapaian.jsx";
import LaporanProdi from "./pages/LaporanProdi.jsx";
import LaporanAudit from "./pages/LaporanAudit.jsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/standar-substandar",
        element: <StandarSubstandar />,
      },
      {
        path: "/target-indikator",
        element: <TargetIndikator />,
      },
      {
        path: "/tahun-periode",
        element: <TahunPeriode />,
      },
      {
        path: "/evaluasi/:idProdi",
        element: <Evaluasi />,
      },
      {
        path: "/input-capaian",
        element: <InputCapaian />,
      },
      {
        path: "/validasi-capaian",
        element: <ValidasiCapaian />,
      },
      {
        path: "/laporan-prodi",
        element: <LaporanProdi />,
      },
      {
        path: "/laporan-audit",
        element: <LaporanAudit />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
