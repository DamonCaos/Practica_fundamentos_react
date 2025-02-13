import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Nodepop</h1>
      <p className={styles.description}>
        The best marketplace for buying and selling items securely.
      </p>

      <div className={styles.buttonContainer}>
        {!isAuthenticated && (
          <button
            className={`${styles.button} ${styles.loginButton}`}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

        {isAuthenticated ? (
          <>
            <button
              className={`${styles.button} ${styles.viewButton}`}
              onClick={() => navigate("/adverts")}
            >
              View Adverts
            </button>
            <button
              className={`${styles.button} ${styles.createButton}`}
              onClick={() => navigate("/advert/new")}
            >
              Create Advert
            </button>
          </>
        ) : (
          <>
            <button
              className={`${styles.button} ${styles.viewButton}`}
              onClick={() => navigate("/login")}
            >
              View Adverts
            </button>
            <button
              className={`${styles.button} ${styles.createButton}`}
              onClick={() => navigate("/login")}
            >
              Create Advert
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;



