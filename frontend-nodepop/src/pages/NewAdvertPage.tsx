import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/NewAdvertPage.module.css";
import { useNotification } from "../context/NotificationContext"; // 🟢 Importar el contexto de notificaciones

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // 🟢 Usar el sistema de notificaciones
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale: "true",
    tags: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false); // 🟢 Estado para indicar si está cargando

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 🟢 Activar el estado de carga

    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

      if (!token) {
        addNotification("You are not authenticated. Please log in.", "error"); // 🟢 Notificación de error
        setLoading(false);
        return;
      }

      const advertData: any = {
        name: formData.name,
        price: Number(formData.price),
        sale: formData.sale === "true",
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };

      if (formData.photo.trim() !== "") {
        advertData.photo = formData.photo;
      }

      console.log("📤 Creating advert:", advertData);

      await axios.post("http://localhost:3001/api/v1/adverts", advertData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      addNotification("Advert created successfully!", "success"); // 🟢 Notificación de éxito
      navigate("/adverts");
    } catch (err: any) {
      console.error("❌ Error creating advert:", err.response?.data || err.message);
      addNotification(err.response?.data?.message || "Could not create advert.", "error"); // 🟢 Notificación de error
    } finally {
      setLoading(false); // 🟢 Desactivar estado de carga
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
        <input type="text" name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} className={styles.input} />
        <input type="text" name="photo" placeholder="Image URL (optional)" value={formData.photo} onChange={handleChange} className={styles.input} />
        
        <button type="submit" className={`${styles.button} ${styles.createButton}`} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default NewAdvertPage;

