import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../styles/AdvertsPage.module.css"; 
import { useNotification } from "../context/NotificationContext"; // 🟢 Importar contexto de notificaciones

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
  
  const { addNotification } = useNotification(); // 🟢 Usar notificaciones

  // Estado para filtros
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
        addNotification("You are not authenticated. Please log in.", "error"); // 🟢 Notificación de error
        setLoading(false);
        return;
      }

      const queryParams = new URLSearchParams();

      if (filters.name) queryParams.append("name", filters.name);
      if (filters.sale) queryParams.append("sale", filters.sale);
      if (filters.tag) queryParams.append("tag", filters.tag);
      if (filters.minPrice && filters.maxPrice) {
        queryParams.append("price", `${filters.minPrice}-${filters.maxPrice}`);
      }

      const response = await axios.get(`http://localhost:3001/api/v1/adverts?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdverts(response.data);
      addNotification("Adverts loaded successfully!", "success"); // 🟢 Notificación de éxito
    } catch (err) {
      console.error("❌ Error fetching adverts:", err);
      addNotification("Failed to load adverts.", "error"); // 🟢 Notificación de error
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdverts();
  };

  return (
    <div className={styles.advertsContainer}>
      <Link to="/advert/new">
        <button className={styles.createButton}>Create Advert</button>
      </Link>

      <h2 className={styles.title}>Adverts</h2>

      {/* Formulario de filtros */}
      <form onSubmit={handleSubmit} className={styles.filterForm}>
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />
        <select name="sale" value={filters.sale} onChange={handleFilterChange} className={styles.filterSelect}>
          <option value="">All</option>
          <option value="true">Sell</option>
          <option value="false">Buy</option>
        </select>
        <input
          type="text"
          name="tag"
          placeholder="Sort by tag"
          value={filters.tag}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />
        <button type="submit" className={styles.filterButton}>Sort</button>
      </form>

      {/* Lista de anuncios */}
      <div className={styles.advertsGrid}>
        {loading ? (
          <p>Loading adverts...</p>
        ) : adverts.length === 0 ? (
          <p>No adverts yet</p>
        ) : (
          adverts.map((advert) => (
            <div key={advert.id} className={styles.advertCard}>
              <Link to={`/advert/${advert.id}`} className={styles.advertTitle}>
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



