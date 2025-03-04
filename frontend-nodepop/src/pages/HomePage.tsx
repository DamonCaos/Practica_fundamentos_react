import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Nodepop</h1>
      <p className={styles.description}>
        The best marketplace for buying and selling items securely.
      </p>

      <div className={styles.buttonContainer}>
        {!isAuthenticated && (
          <Link to="/login" className={`${styles.button} ${styles.loginButton}`}>
            Login
          </Link>
        )}

        {isAuthenticated ? (
          <>
            <Link to="/adverts" className={`${styles.button} ${styles.viewButton}`}>
              View Adverts
            </Link>
            <Link to="/advert/new" className={`${styles.button} ${styles.createButton}`}>
              Create Advert
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className={`${styles.button} ${styles.viewButton}`}>
              View Adverts
            </Link>
            <Link to="/login" className={`${styles.button} ${styles.createButton}`}>
              Create Advert
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
