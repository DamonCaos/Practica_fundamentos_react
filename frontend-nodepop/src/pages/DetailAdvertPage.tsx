import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/DetailAdvertPage.module.css";

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
      navigate("/adverts");
    } catch (err) {
      console.error("❌ Error deleting advert:", err);
      setError("Failed to delete advert.");
    }
  };

  if (loading) return <p>Loading advert...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!advert) return <p>The advert does not exist.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{advert.name}</h2>
      <p className={styles.price}>Price: {advert.price} €</p>
      <p className={styles.type}>Type: {advert.sale ? "For Sale" : "Wanted"}</p>
      <p className={styles.tags}>Tags: {advert.tags.join(", ")}</p>
      {advert.photo && <img src={advert.photo} alt={advert.name} className={styles.image} />}
      
      <div className={styles.buttonContainer}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Go Back
        </button>

        {/* Nuevo botón para editar el anuncio */}
        <button onClick={() => navigate(`/advert/${id}/edit`)} className={styles.editButton}>
          Edit Advert
        </button>

        <button onClick={() => setIsModalOpen(true)} className={styles.deleteButton}>
          Delete Advert
        </button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete this advert?</p>
            <div className={styles.modalButtons}>
              <button onClick={handleDelete} className={styles.confirmDeleteButton}>
                Yes, delete
              </button>
              <button onClick={() => setIsModalOpen(false)} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailAdvertPage;





