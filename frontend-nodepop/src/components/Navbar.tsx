import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css"; 

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/adverts" className="text-blue-600 hover:underline">
              View Adverts
            </Link>
            <Link to="/advert/new" className="text-green-600 hover:underline">
              Create Advert
            </Link>
            <button
              onClick={logout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
