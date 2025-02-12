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
  const { id } = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // State for confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setError("Failed to load advert.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
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
      setError("Failed to delete advert.");
    }
  };

  if (loading) return <p>Loading advert...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!advert) return <p>The advert does not exist.</p>;

  return (
    <div>
      <h2>{advert.name}</h2>
      <p>Price: {advert.price} €</p>
      <p>Type: {advert.sale ? "For Sale" : "Wanted"}</p>
      <p>Tags: {advert.tags.join(", ")}</p>
      {advert.photo && <img src={advert.photo} alt={advert.name} width="200" />}
      <br />
      <button onClick={() => navigate(-1)}>Go Back</button>
      <button onClick={() => setIsModalOpen(true)} style={{ marginLeft: "10px", color: "white", backgroundColor: "red" }}>
        Delete Advert
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this advert?</p>
            <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white", marginRight: "10px" }}>Yes, delete</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailAdvertPage;




