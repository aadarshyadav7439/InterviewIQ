import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Mic2,
  BarChart3,
  Building2,
  Users,
  Settings,
  UserCircle,
  LogOut,
  X,
} from "lucide-react";

const mainNavigation = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Resume", to: "/resume", icon: FileText },
  { label: "Interviews", to: "/interview", icon: Mic2 },
  { label: "Reports", to: "/reports", icon: BarChart3 },
];

const exploreNavigation = [
  { label: "Companies", to: "/companies", icon: Building2 },
  { label: "Community", to: "/community", icon: Users },
];

const accountNavigation = [
  { label: "Profile", to: "/profile", icon: UserCircle },
  { label: "Settings", to: "/settings", icon: Settings },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
    isActive
      ? "bg-[#013364]/8 font-medium text-[#013364]"
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
  }`;

function NavigationItem({ item, onClose }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      onClick={onClose}
      className={navLinkClass}
    >
      <Icon size={18} strokeWidth={1.8} />
      <span>{item.label}</span>
    </NavLink>
  );
}

function NavigationSection({ title, items, onClose }) {
  return (
    <div>
      <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
        {title}
      </p>

      <div className="space-y-1">
        {items.map((item) => (
          <NavigationItem
            key={item.to}
            item={item}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}

      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          border-r border-gray-200 bg-white
          transition-transform duration-300 ease-out
          lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}

        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-6">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className="text-xl font-semibold tracking-tight text-[#013364]"
          >
            InterviewIQ
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-50 hover:text-gray-900 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-8">
            <NavigationSection
              title="Main"
              items={mainNavigation}
              onClose={onClose}
            />

            <NavigationSection
              title="Explore"
              items={exploreNavigation}
              onClose={onClose}
            />
          </div>
        </nav>

      </aside>
    </>
  );
}