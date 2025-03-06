import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/types";
import { fetchAdverts } from "../redux/actions";
import styles from "../styles/AdvertsPage.module.css";

const AdvertsPage = () => {
  const dispatch = useDispatch();
  const { adverts, loading, error } = useSelector((state: RootState) => state.adverts);

  useEffect(() => {
    dispatch(fetchAdverts() as any);
  }, [dispatch]);

  return (
    <div className={styles.advertsContainer}>
      <Link to="/adverts/new">
        <button className={styles.createButton}>Create Advert</button>
      </Link>

      <h2 className={styles.title}>Adverts</h2>

      {/* 🔹 Mostramos un spinner mientras carga */}
      {loading && <p className={styles.loading}>Loading adverts...</p>}

      {/* 🔹 Mostramos mensaje de error si algo falla */}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.advertsGrid}>
        {!loading && adverts.length === 0 ? (
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
