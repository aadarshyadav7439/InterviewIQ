import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-[#fafafa]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        
        <Link to="/" className="text-xl font-semibold tracking-tight text-[#013364]">
          InterviewIQ
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <Link to="/" className="text-base text-gray-500 transition-colors hover:text-[#013364]">Home</Link>
          <a href="#features" className="text-base text-gray-500 transition-colors hover:text-[#013364]">Features</a>
          <Link to="/companies" className="text-base text-gray-500 transition-colors hover:text-[#013364]">Companies</Link>
          <Link to="/community" className="text-base text-gray-500 transition-colors hover:text-[#013364]">Community</Link>
          <Link to="/login" className="text-base text-gray-500 transition-colors hover:text-[#013364]">Login</Link>
          <Link to="/signup" className="rounded-lg bg-[#013364] text-white px-4 py-2 text-base font-medium transition-colors hover:bg-[#081f38]">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}