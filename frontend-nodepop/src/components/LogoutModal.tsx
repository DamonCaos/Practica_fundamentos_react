import { useAuth } from "../context/AuthContext";
import styles from "./LogoutModal.module.css";

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal = ({ onClose }: LogoutModalProps) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    onClose(); // ✅ Cerrar modal primero
    setTimeout(() => {
      logout(); // ✅ Logout con delay para mejor UX
    }, 300);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Are you sure you want to logout?</h3>
        <div className={styles.buttonContainer}>
          <button onClick={handleLogout} className={styles.confirmButton}>Logout</button>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
