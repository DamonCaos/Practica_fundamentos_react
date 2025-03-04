import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/NewAdvertPage.module.css";
import { useNotification } from "../context/NotificationContext";
import { API_ENDPOINTS } from "../config"; // ✅ Importamos las rutas centralizadas

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale: "true",
    tags: [] as string[], // Ahora es un array de strings
    photo: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Cargar tags desde la API al montar el componente
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.tags); // ✅ Usamos la URL centralizada
        setAvailableTags(response.data);
      } catch (err) {
        console.error("❌ Error fetching tags:", err);
        addNotification("Failed to load tags.", "error");
      }
    };

    fetchTags();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Manejador para los checkboxes de tags
  const handleTagChange = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

      if (!token) {
        addNotification("You are not authenticated. Please log in.", "error");
        setLoading(false);
        return;
      }

      const advertData = {
        name: formData.name,
        price: Number(formData.price),
        sale: formData.sale === "true",
        tags: formData.tags,
        photo: formData.photo.trim() || undefined,
      };

      console.log("📤 Creating advert:", advertData);

      const response = await axios.post(API_ENDPOINTS.adverts, advertData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newAdvertId = response.data.id;
      addNotification("Advert created successfully!", "success");
      navigate(`/adverts/${newAdvertId}`);
    } catch (err: any) {
      console.error("❌ Error creating advert:", err.response?.data || err.message);
      addNotification(err.response?.data?.message || "Could not create advert.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>New Advert</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className={styles.input} />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className={styles.input} />
        <select name="sale" value={formData.sale} onChange={handleChange} className={styles.select}>
          <option value="true">Sell</option>
          <option value="false">Buy</option>
        </select>

        {/* ✅ Checkboxes para los tags */}
        <div className={styles.tagsContainer}>
          <p>Tags:</p>
          {availableTags.length > 0 ? (
            availableTags.map((tag) => (
              <label key={tag} className={styles.tagLabel}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={formData.tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                {tag}
              </label>
            ))
          ) : (
            <p>Loading tags...</p>
          )}
        </div>

        <input type="text" name="photo" placeholder="Image URL (optional)" value={formData.photo} onChange={handleChange} className={styles.input} />

        <button type="submit" className={`${styles.button} ${styles.createButton}`} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default NewAdvertPage;
