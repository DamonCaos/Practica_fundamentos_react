import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



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
  const [error, setError] = useState("");

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
        setError("No estás autenticado. Inicia sesión.");
        setLoading(false);
        return;
      }

      // Construir la URL con filtros
      const queryParams = new URLSearchParams();
      if (filters.name) queryParams.append("name", filters.name);
      if (filters.minPrice) queryParams.append("price_gte", filters.minPrice);
      if (filters.maxPrice) queryParams.append("price_lte", filters.maxPrice);
      if (filters.sale) queryParams.append("sale", filters.sale);
      if (filters.tag) queryParams.append("tag", filters.tag);

      const response = await axios.get(`http://localhost:3001/api/v1/adverts?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdverts(response.data);
    } catch (err) {
      console.error("❌ Error al obtener anuncios:", err);
      setError("Error al cargar los anuncios.");
    } finally {
      setLoading(false);
    }
  };

  // Manejo de cambios en filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Manejo de envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdverts();
  };

  if (loading) return <p>Loading adverts....</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!adverts.length) return <p>No adverts yet</p>;

  return (
    <div>
        <Link to= '/advert/new'>
            <button>Create Advert</button>
        </Link>
      <h2>Adverts</h2>

      {/* Formulario de filtros */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
        <select name="sale" value={filters.sale} onChange={handleFilterChange}>
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
        />
        <button type="submit">Sort</button>
      </form>
      <ul>
        {adverts.map((advert) => (
        <li key={advert.id}>
        <Link to={`/advert/${advert.id}`}>
        <h3>{advert.name}</h3>
        </Link>
      <p>{advert.price} €</p>
      <p>{advert.sale ? "Venta" : "Compra"}</p>
      <p>Tags: {advert.tags.join(", ")}</p>
      {advert.photo && <img src={advert.photo} alt={advert.name} width="150" />}
    </li>
  ))}
</ul>
     

    </div>
  );
};

export default AdvertsPage;

