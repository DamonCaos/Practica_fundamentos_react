import { createContext, useContext, useState, ReactNode } from "react";
import styles from "../styles/Notification.module.css"; 

//  Definir tipo de notificación
type NotificationType = "success" | "error" | "info";

//  Estructura de una notificación
interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

//  Contexto y proveedor
interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Función para agregar una notificación
  const addNotification = (message: string, type: NotificationType) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Eliminar automáticamente después de 3 segundos
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook para usar las notificaciones
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
