import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/adverts" className={styles.link}>Adverts</Link>

        {isAuthenticated ? (
          <>
            <Link to="/advert/new" className={styles.link}>Create Advert</Link>
            <button onClick={logout} className={`${styles.link} ${styles.logout}`}>Logout</button>
          </>
        ) : (
          <Link to="/login" className={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
