import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface Advert {
  id: string;
  name: string;
  price: number;
  sale: boolean;
  tags: string[];
  photo?: string;
}

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth();
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdverts();
  }, []);

  const fetchAdverts = async () => {
    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
  
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Solo añadir headers si hay token
  
      const response = await axios.get("http://localhost:3001/api/v1/adverts", { headers });
  
      setAdverts(response.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.warn("🔴 Unauthorized: Showing empty list instead.");
        setAdverts([]); // Si no está autenticado, mostramos una lista vacía
      } else {
        console.error("❌ Error fetching adverts:", err);
        setError("Failed to load adverts.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) return <p>Loading adverts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Welcome to Nodepop</h1>

      {/* Navigation buttons */}
      <nav>
        {!isAuthenticated && (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        {isAuthenticated && (
          <>
            <Link to="/advert/new">
              <button>Create Advert</button>
            </Link>
            <button onClick={logout} style={{ backgroundColor: "red", color: "white" }}>
              Logout
            </button>
          </>
        )}
      </nav>

      <h2>Adverts</h2>
      <ul>
        {adverts.map((advert) => (
          <li key={advert.id}>
            {/* Si está autenticado, puede ir al detalle del anuncio */}
            {isAuthenticated ? (
              <Link to={`/advert/${advert.id}`}>
                <h3>{advert.name}</h3>
              </Link>
            ) : (
              /* Si no está autenticado, lo mandamos a login */
              <span onClick={() => navigate("/login")} style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>
                <h3>{advert.name}</h3>
              </span>
            )}
            <p>Price: {advert.price} €</p>
            <p>Type: {advert.sale ? "For Sale" : "Wanted"}</p>
            <p>Tags: {advert.tags.join(", ")}</p>
            {advert.photo && <img src={advert.photo} alt={advert.name} width="150" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

