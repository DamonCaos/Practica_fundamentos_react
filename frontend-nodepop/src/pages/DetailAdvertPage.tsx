import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Advert {
  id: string;
  name: string;
  price: number;
  sale: boolean;
  tags: string[];
  photo?: string;
}

const DetailAdvertPage = () => {
  const { id } = useParams(); // Get the advert ID from the URL
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdvert();
  }, []);

  const fetchAdvert = async () => {
    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

      if (!token) {
        setError("You are not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:3001/api/v1/adverts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdvert(response.data);
    } catch (err) {
      console.error("❌ Error fetching advert:", err);
      setError("Could not load the advert.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this advert?");
    if (!confirmDelete) return;

    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

      if (!token) {
        setError("You are not authenticated. Please log in.");
        return;
      }

      await axios.delete(`http://localhost:3001/api/v1/adverts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Advert deleted");
      navigate("/adverts"); // Redirect after deletion
    } catch (err) {
      console.error("❌ Error deleting advert:", err);
      setError("Could not delete the advert.");
    }
  };

  if (loading) return <p>Loading advert...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!advert) return <p>The advert does not exist.</p>;

  return (
    <div>
      <h2>{advert.name}</h2>
      <p>Price: {advert.price} €</p>
      <p>Type: {advert.sale ? "For Sale" : "Looking to Buy"}</p>
      <p>Tags: {advert.tags.join(", ")}</p>
      {advert.photo && <img src={advert.photo} alt={advert.name} width="200" />}
      <br />
      <button onClick={() => navigate(-1)}>Go Back</button>
      <button onClick={handleDelete} style={{ marginLeft: "10px", color: "white", backgroundColor: "red" }}>
        Delete Advert
      </button>
     <button onClick={() => navigate(`/advert/${advert.id}/edit`)} style={{ marginLeft: "10px" }}>
        Edit Advert
        </button>

    </div>
  );
};

export default DetailAdvertPage;


