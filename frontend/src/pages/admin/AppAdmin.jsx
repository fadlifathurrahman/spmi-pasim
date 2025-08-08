import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/Sidebar";

function AppAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      <SideBar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppAdmin;
