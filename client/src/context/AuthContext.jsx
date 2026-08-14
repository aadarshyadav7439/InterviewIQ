import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setIsRestoring(false);
        return;
      }

      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to restore session:", error);

        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setIsRestoring(false);
      }
    };

    restoreSession();
  }, [token]);

  const login = (newToken, loggedInUser) => {
    localStorage.setItem("token", newToken);

    setToken(newToken);
    setUser(loggedInUser);
    setIsRestoring(false);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
    setIsRestoring(false);
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isRestoring,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}