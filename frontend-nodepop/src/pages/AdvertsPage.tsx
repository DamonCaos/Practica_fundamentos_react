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

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        
        if (!token) {
          setError("No estás autenticado. Inicia sesión.");
          setLoading(false);
          return;
        }
  
        const response = await axios.get("http://localhost:3001/api/v1/adverts", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setAdverts(response.data);
      } catch (err) {
        setError("Error al cargar los anuncios. Verifica tu sesión.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAdverts();
  }, []);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!adverts.length) return <p>No adverts</p>;

  return (
    <div>
      <h2>Adverts</h2>
      <ul>
        {adverts.map((advert) => (
          <li key={advert.id}>
            <Link to={`/advert/${advert.id}`}>
              <img
                src={advert.photo || "/placeholder.jpg"}
                alt={advert.name}
                width="150"
              />
              <h3>{advert.name}</h3>
              <p>{advert.price} €</p>
              <p>{advert.sale ? "Sell" : "Buy"}</p>
              <p>{advert.tags.join(", ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvertsPage;
