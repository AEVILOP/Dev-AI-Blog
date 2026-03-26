// TODO: Implement AuthContext (authentication state management)
import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../../infrastructure/apiClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/api/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/github`;
  };

  const logout = async () => {
    try { await apiClient.post("/api/auth/logout"); }
    catch (err) { console.error("Logout error:", err); }
    finally { setUser(null); }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};