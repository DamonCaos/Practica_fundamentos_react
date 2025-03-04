import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../styles/AdvertsPage.module.css";
import { useNotification } from "../context/NotificationContext";
import API_BASE_URL from "../config"; 

interface Advert {
  id: string;
  name: string;
  price: number;
  sale: boolean;
  tags: string[];
  photo?: string;
}

const AdvertsPage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    sale: "",
    tag: "",
  });

  useEffect(() => {
    fetchAdverts();
  }, []);

  const fetchAdverts = async () => {
    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

      if (!token) {
        addNotification("You are not authenticated. Please log in.", "error");
        setLoading(false);
        return;
      }

      const queryParams = new URLSearchParams();
      if (filters.name) queryParams.append("name", filters.name);
      if (filters.sale) queryParams.append("sale", filters.sale);
      if (filters.tag) queryParams.append("tags", filters.tag);
      if (filters.minPrice && filters.maxPrice) {
        queryParams.append("price", `${filters.minPrice}-${filters.maxPrice}`);
      }

      const response = await axios.get(`${API_BASE_URL}/v1/adverts?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdverts(response.data);
      addNotification("Adverts loaded successfully!", "success");
    } catch (err) {
      addNotification("Failed to load adverts.", "error");
    } finally {
      setLoading(false);
    }
  };

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
