import { useNavigate } from "react-router-dom";
import { Menu, LogOut, User } from "lucide-react";
import avatar1 from "../assets/avatars/avatar-1.svg";
import avatar2 from "../assets/avatars/avatar-2.svg";
import avatar3 from "../assets/avatars/avatar-3.svg";
import avatar4 from "../assets/avatars/avatar-4.svg";
import avatar5 from "../assets/avatars/avatar-5.svg";
import avatar6 from "../assets/avatars/avatar-6.svg";
import avatar7 from "../assets/avatars/avatar-7.svg";
import avatar8 from "../assets/avatars/avatar-8.svg";

const avatars = {
  "avatar-1": avatar1,
  "avatar-2": avatar2,
  "avatar-3": avatar3,
  "avatar-4": avatar4,
  "avatar-5": avatar5,
  "avatar-6": avatar6,
  "avatar-7": avatar7,
  "avatar-8": avatar8,
};

export default function DashboardNavbar({ onMenuClick, user, onLogout }) {
  const navigate = useNavigate();

  const userName = user?.name || "User";
  const userRole = user?.role || "Candidate";
  const userInitial = userName.charAt(0).toUpperCase();
  const userAvatar = avatars[user?.avatar];

  const hour = new Date().getHours();

  let greeting = "Good evening";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  }

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-[#fafafa]/95 backdrop-blur-md">
      <div className="flex min-h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-white hover:text-gray-900 lg:hidden"
          >
            <Menu size={21} />
          </button>

          {/* Greeting */}
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight text-gray-950 sm:text-xl">
              {greeting}, {userName}
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Here's an overview of your interview preparation.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Profile */}
          <div className="group relative">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              aria-label="View profile"
              className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-white hover:shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#013364] text-sm font-semibold text-white shadow-sm">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={`${userName}'s avatar`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  userInitial
                )}
              </div>

              <div className="hidden min-w-0 text-left sm:block">
                <p className="max-w-[140px] truncate text-sm font-medium leading-4 text-gray-900">
                  {userName}
                </p>

                <p className="mt-0.5 text-[11px] font-medium text-gray-400">
                  {userRole}
                </p>
              </div>
            </button>

            {/* Profile tooltip */}
            <span className="pointer-events-none absolute right-0 top-full z-30 mt-2 hidden whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg group-hover:block">
              <span className="inline-flex items-center gap-1.5">
                <User size={13} />
                View profile
              </span>
            </span>
          </div>

          {/* Logout */}
          <div className="group relative">
            <button
              type="button"
              onClick={onLogout}
              aria-label="Logout"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={19} strokeWidth={1.8} />
            </button>

            {/* Logout tooltip */}
            <span className="pointer-events-none absolute right-0 top-full z-30 mt-2 hidden whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg group-hover:block">
              Logout
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
