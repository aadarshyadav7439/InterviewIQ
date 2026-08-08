import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between border-b px-10">
      <Link to="/" className="text-2xl font-bold">
        InterviewIQ
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-sm">Home</Link>
        <Link to="/companies" className="text-sm">Companies</Link>
        <Link to="/community" className="text-sm">Community</Link>
        <Link to="/login" className="text-sm">Login</Link>
        <Link to="/signup" className="rounded-lg bg-black text-white px-5 py-2.5 text-sm font-medium">
          Get Started
        </Link>
      </div>
    </nav>
  );
}