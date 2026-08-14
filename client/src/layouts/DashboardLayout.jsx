import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa]">

      <div className="flex min-h-screen">

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">

          <DashboardNavbar
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}