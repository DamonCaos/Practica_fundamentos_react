import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import LogoutModal from "./LogoutModal"; // ✅ Modal solo se usa aquí
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/adverts" className={styles.link}>Adverts</Link>

        {isAuthenticated ? (
          <>
            <Link to="/advert/new" className={styles.link}>Create Advert</Link>
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

      {/* ✅ El modal solo se muestra si `showLogoutModal` es true */}
      {showLogoutModal && <LogoutModal onClose={() => setShowLogoutModal(false)} />}
    </nav>
  );
};

export default Navbar;
