import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navLinkClass = ({ isActive }) => {
    return `block rounded-lg px-4 py-2 text-sm transition 
    ${isActive ? "bg-gray-100 font-semibold text-gray-900" : "text-gray-600 hover:bg-gray-50"}`;
  };
  return (
    <aside className="w-64 border-r p-6">
      <h2 className="mb-8 text-2xl font-bold">InterviewIQ</h2>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/resume" className={navLinkClass}>
          Resume
        </NavLink>
        <NavLink to="/interview" className={navLinkClass}>
          Interview
        </NavLink>
        <NavLink to="/reports" className={navLinkClass}>
          Reports
        </NavLink>
        <NavLink to="/companies" className={navLinkClass}>
          Companies
        </NavLink>
        <NavLink to="/community" className={navLinkClass}>
          Community
        </NavLink>
      </nav>
    </aside>
  );
}
