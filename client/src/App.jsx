import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import InterviewLayout from "./layouts/InterviewLayout";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Interview from "./pages/Interview";
import Reports from "./pages/Reports";
import Companies from "./pages/Companies";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* public pages */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/community" element={<Community />} />
          </Route>

          {/* Dashboard pages */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Interview page */}
          <Route element={<InterviewLayout />}>
            <Route path="/interview" element={<Interview />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
