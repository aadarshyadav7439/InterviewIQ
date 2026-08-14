import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isRestoring } = useAuth();

  if (isRestoring) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}