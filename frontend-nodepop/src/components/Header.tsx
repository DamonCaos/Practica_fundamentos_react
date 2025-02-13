import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Header.module.css"; 
const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.header}>
      <Link to="/" className="text-2xl font-bold">Nodepop</Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/adverts" className="hover:underline">View Adverts</Link>
          </li>
          <li>
            {isAuthenticated ? (
              <button onClick={logout} className="hover:underline">Logout</button>
            ) : (
              <Link to="/login" className="hover:underline">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
