import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/types";
import { logoutUser } from "../redux/actions";
import LogoutModal from "./LogoutModal";
import styles from "./Navbar.module.css";

// ✅ Tipamos correctamente `dispatch`
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const Navbar = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  
  // ✅ Definir `dispatch` como `ThunkDispatch` para que acepte `logoutUser`
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser() as any); // 🔹 Solución temporal para evitar errores ojo ANY 
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
          onConfirm={handleLogout} // ✅ Ahora `handleLogout` está correctamente tipado
        />
      )}
    </nav>
  );
};

export default Navbar;
