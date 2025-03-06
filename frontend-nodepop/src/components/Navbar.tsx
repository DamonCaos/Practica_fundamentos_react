import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/types";
import { logoutUser } from "../redux/actions";
import LogoutModal from "./LogoutModal"; // ✅ Modal de confirmación
import styles from "./Navbar.module.css";

const Navbar = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()); // 🔹 Usamos Redux para manejar el logout
    setShowLogoutModal(false); // 🔹 Cerramos el modal tras hacer logout
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

      {/* ✅ Modal de Logout, asegurándonos de que se cierra correctamente */}
      {showLogoutModal && (
        <LogoutModal 
          onClose={() => setShowLogoutModal(false)} 
          onConfirm={handleLogout} // 🔹 Logout con Redux
        />
      )}
    </nav>
  );
};

export default Navbar;
