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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

      if (!token) {
        setError("You are not authenticated. Please log in.");
        return;
      }

      const updatedAdvert = {
        name: formData.name,
        price: Number(formData.price),
        sale: formData.sale === "true",
        tags: formData.tags.split(",").map(tag => tag.trim()),
        photo: formData.photo.trim() ? formData.photo : null,
      };

      await axios.put(`http://localhost:3001/api/v1/adverts/${id}`, updatedAdvert, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage("Advert updated successfully!");
      setTimeout(() => navigate(`/advert/${id}`), 1500);
    } catch (err) {
      console.error("❌ Error updating advert:", err);
      setError("Could not update the advert.");
    }
  };

  if (loading) return <p>Loading advert...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Advert</h2>

      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <select name="sale" value={formData.sale} onChange={handleChange} className={styles.select}>
          <option value="true">For Sale</option>
          <option value="false">Looking to Buy</option>
        </select>

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="text"
          name="photo"
          placeholder="Image URL (optional)"
          value={formData.photo}
          onChange={handleChange}
          className={styles.input}
        />

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.saveButton}>Save Changes</button>
          <button type="button" onClick={() => navigate(-1)} className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditAdvertPage;
