import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/types";
import { logoutUser } from "../redux/actions";
import { useNotification } from "../context/NotificationContext"; // ✅ Importamos `useNotification`
import LogoutModal from "./LogoutModal"; 
import styles from "./Navbar.module.css";

const Navbar = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const { addNotification } = useNotification(); // ✅ Usamos `useNotification`
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser(addNotification) as any); // ✅ Pasamos `addNotification`
    setShowLogoutModal(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/adverts" className={styles.link}>Adverts</Link>

        {isAuthenticated ? (
          <>
            <Link to="/adverts/new" className={styles.link}>Create Advert</Link>
            <button 
              onClick={() => setShowLogoutModal(true)} 
              className={`${styles.link} ${styles.logout}`}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.link}>Login</Link>
        )}
      </div>

      {showLogoutModal && (
        <LogoutModal 
          onClose={() => setShowLogoutModal(false)} 
          onConfirm={handleLogout}
        />
      )}
    </nav>
  );
};

export default Navbar;
