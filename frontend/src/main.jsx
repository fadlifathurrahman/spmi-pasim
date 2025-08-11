import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AppAdmin from "./pages/admin/AppAdmin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Pengguna from "./pages/admin/Pengguna.jsx";
import Laporan from "./pages/admin/Laporan.jsx";
import Profil from "./pages/Profil.jsx";
import Matakuliah from "./pages/admin/MataKuliah.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
    ],
  },
  {
    path: "/admin",
    element: <AppAdmin />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/laporan",
        element: <Laporan />,
      },
      {
        path: "/admin/pengguna",
        element: <Pengguna />,
      },
      {
        path: "/admin/profil",
        element: <Profil />,
      },
      {
        path: "/admin/matakuliah",
        element: <Matakuliah />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
