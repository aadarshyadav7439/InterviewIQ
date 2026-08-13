import { createContext, useContext, useState,  useEffect } from "react";
import { getProfile } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const data = await getProfile(token);
        setUser(data.user);
      } catch (error) {
        console.log("Failed to fetch user:", error);
        logout();
      }
    };
    fetchUser();
  }, [token]);

  const login = (token,user) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
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