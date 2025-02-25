import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdverts,
  selectAdverts,
  selectAdvertsStatus,
  selectAdvertsError,
} from "../Redux/slices/advertsSlice";
import { AppDispatch } from "../Redux/store";
import AdvertsList from "../components/AdvertsList";
import { useNotification } from "../context/NotificationContext";
import styles from "../styles/AdvertsPage.module.css";
import { Link } from "react-router-dom";

const AdvertsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const adverts = useSelector(selectAdverts);
  const status = useSelector(selectAdvertsStatus);
  const error = useSelector(selectAdvertsError);
  const { addNotification } = useNotification();

  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    sale: "",
    tag: "",
  });

  useEffect(() => {
    dispatch(fetchAdverts(""));
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🟢 Construir la URL con los filtros aplicados
    const queryParams = new URLSearchParams();

    if (filters.name) queryParams.append("name", filters.name);
    if (filters.minPrice) queryParams.append("price", `${filters.minPrice}-`);
    if (filters.maxPrice) queryParams.append("price", `-${filters.maxPrice}`);
    if (filters.sale) queryParams.append("sale", filters.sale);
    if (filters.tag) queryParams.append("tags", filters.tag);

    console.log("🟢 Fetching adverts with filters:", queryParams.toString());

    // 🟢 Modificamos Redux para aceptar los filtros como argumento
    dispatch(fetchAdverts(queryParams.toString()));
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
        <select
          name="sale"
          value={filters.sale}
          onChange={handleFilterChange}
          className={styles.filterSelect}
        >
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
        <button type="submit" className={styles.filterButton}>
          Sort
        </button>
      </form>

      {/* Muestra los anuncios usando AdvertsList */}
      {status === "loading" && <p>Loading adverts...</p>}
      {error && <p>Error: {error}</p>}
      <AdvertsList adverts={adverts} />
    </div>
  );
};

export default AdvertsPage;
