import styles from "./LogoutModal.module.css";

interface LogoutModalProps {
  onClose: () => void;
  onConfirm: () => void; // ✅ Añadimos esta prop
}

const LogoutModal = ({ onClose, onConfirm }: LogoutModalProps) => {
  const handleLogout = () => {
    onClose(); // ✅ Cerrar modal primero
    setTimeout(() => {
      onConfirm(); // ✅ Ahora llama a Redux
    }, 300);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Are you sure you want to logout?</h3>
        <div className={styles.buttonContainer}>
          <button onClick={handleLogout} className={styles.confirmButton}>
            Logout
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
