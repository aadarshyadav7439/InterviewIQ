import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200/80 bg-[#fafafa]">
      <div className="mx-auto flex h-16 items-center justify-between px-6 max-w-7xl">
        <Link to="/" className="text-xl font-semibold tracking-tight text-gray-950">
          InterviewIQ
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <Link to="/" className="text-sm text-gray-600 transition-colors hover:text-gray-950">Home</Link>
          <Link to="/companies" className="text-sm text-gray-600 transition-colors hover:text-gray-950">Companies</Link>
          <Link to="/community" className="text-sm text-gray-600 transition-colors hover:text-gray-950">Community</Link>
          <Link to="/login" className="text-sm text-gray-600 transition-colors hover:text-gray-950">Login</Link>
          <Link to="/signup" className="rounded-lg bg-gray-950 text-white px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}