import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar.jsx";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardNavbar />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
