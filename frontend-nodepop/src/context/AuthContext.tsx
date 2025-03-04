import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./NotificationContext"; 

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, remember: boolean) => void;
  logout: () => void;
  showLogoutModal: boolean;
  setShowLogoutModal: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false); // ✅ Estado del modal
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // ✅ Usamos el sistema de notificaciones

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string, remember: boolean) => {
    if (remember) {
      localStorage.setItem("authToken", token);
    } else {
      sessionStorage.setItem("authToken", token);
    }
    setIsAuthenticated(true);
    navigate("/"); // ✅ Redirigir a la home después del login
  };

  const logout = () => {
    console.log("🔴 Logging out...");
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setShowLogoutModal(false); // ✅ Cerrar el modal automáticamente
    addNotification("Logout successful!", "success"); // ✅ Mensaje de éxito
    navigate("/"); // ✅ Redirigir a la home después del logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, showLogoutModal, setShowLogoutModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
