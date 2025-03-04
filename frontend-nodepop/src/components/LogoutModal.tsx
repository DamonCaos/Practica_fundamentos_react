import { useAuth } from "../context/AuthContext";
import styles from "./LogoutModal.module.css";

const LogoutModal = () => {
  const { showLogoutModal, setShowLogoutModal, logout } = useAuth();

  if (!showLogoutModal) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to log out?</p>
        <div className={styles.modalButtons}>
          <button onClick={logout} className={styles.confirmButton}>
            Yes, Logout
          </button>
          <button onClick={() => setShowLogoutModal(false)} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
