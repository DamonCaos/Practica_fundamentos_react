import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, remember: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("rememberMe") === "true";
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("rememberMe") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string, remember: boolean) => {
    if (remember) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
    setIsAuthenticated(true);
    navigate("/"); // Redirigir a la home tras iniciar sesión
  };

  const logout = () => {
    console.log("🔴 Logging out...");
    localStorage.removeItem("rememberMe");
    setIsAuthenticated(false);
    navigate("/"); // Redirigir tras logout
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
