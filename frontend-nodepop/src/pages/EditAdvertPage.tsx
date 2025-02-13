import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/EditAdvertPage.module.css";

const EditAdvertPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale: "true",
    tags: "",
    photo: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

      const advert = response.data;
      setFormData({
        name: advert.name,
        price: advert.price.toString(),
        sale: advert.sale.toString(),
        tags: advert.tags.join(", "),
        photo: advert.photo || "",
      });

      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching advert:", err);
      setError("Could not load the advert.");
    }
  };

  if (loading) return <p>Loading advert...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Advert</h2>
      {/* Formulario aquí */}
    </div>
  );
};

export default EditAdvertPage;
