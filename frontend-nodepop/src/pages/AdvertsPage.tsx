import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/AdvertsPage.module.css";
import { useNotification } from "../context/NotificationContext";
import { RootState } from "../redux/types";
import { fetchAdverts } from "../redux/actions";

const AdvertsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adverts, loading, error } = useSelector((state: RootState) => state.adverts);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const { addNotification } = useNotification();
  const [errorShown, setErrorShown] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      console.warn("🔴 No estás autenticado, redirigiendo al login...");
      navigate("/login");
      return;
    }

    console.log("✅ Cargando anuncios...");
    dispatch(fetchAdverts() as any);
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (error && !errorShown) {
      addNotification(error, "error");
      setErrorShown(true);
    }
  }, [error, errorShown, addNotification]);

  return (
    <div className={styles.advertsContainer}>
      <Link to="/adverts/new">
        <button className={styles.createButton}>Create Advert</button>
      </Link>

      <h2 className={styles.title}>Adverts</h2>

      <div className={styles.advertsGrid}>
        {loading ? (
          <p>Loading adverts...</p>
        ) : adverts.length === 0 ? (
          <p>No adverts yet</p>
        ) : (
          adverts.map((advert) => (
            <div key={advert.id} className={styles.advertCard}>
              <Link to={`/adverts/${advert.id}`} className={styles.advertTitle}>
                <h3>{advert.name}</h3>
              </Link>
              <p className={styles.advertPrice}>{advert.price} €</p>
              <p className={styles.advertDetails}>{advert.sale ? "For Sale" : "Looking to Buy"}</p>
              <p className={styles.advertDetails}>Tags: {advert.tags.join(", ")}</p>
              {advert.photo && <img src={advert.photo} alt={advert.name} className={styles.advertImage} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdvertsPage;
