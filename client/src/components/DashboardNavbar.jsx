import { Menu, Search, Bell } from "lucide-react";

export default function DashboardNavbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-[#fafafa]/95 backdrop-blur-sm">
      <div className="flex min-h-16 items-center justify-between px-4 py-2 sm:px-6 lg:px-8">

        {/* LEFT */}

        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile menu */}

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="rounded-lg p-2 text-gray-600 transition hover:bg-white hover:text-gray-900 lg:hidden"
          >
            <Menu size={21} />
          </button>

          {/* Greeting */}

          <div className="min-w-0">

            <h1 className="truncate text-lg font-semibold tracking-tight text-gray-950 sm:text-xl">
              Good evening, Aadarsh
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Here&apos;s an overview of your interview preparation.
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Search */}

          <button
            type="button"
            aria-label="Search"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-white hover:text-gray-900"
          >
            <Search size={19} strokeWidth={1.8} />
          </button>

          {/* Notifications */}

          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-lg p-2 text-gray-500 transition hover:bg-white hover:text-gray-900"
          >
            <Bell size={19} strokeWidth={1.8} />

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#013364]" />
          </button>

          {/* Divider */}

          <div className="mx-1 hidden h-7 w-px bg-gray-200 sm:block" />

          {/* User */}

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 transition hover:bg-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#013364] text-xs font-medium text-white">
              A
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium leading-4 text-gray-900">
                Aadarsh
              </p>

              <p className="mt-0.5 text-[11px] text-gray-400">
                Candidate
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}