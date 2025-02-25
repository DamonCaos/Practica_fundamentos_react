import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAdvert, selectAdvertsStatus } from "../Redux/slices/advertsSilce";
import { AppDispatch } from "../Redux/store";
import styles from "../styles/NewAdvertPage.module.css";
import { useNotification } from "../context/NotificationContext";

const NewAdvertPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const status = useSelector(selectAdvertsStatus); // 🟢 Obtener estado de carga desde Redux

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale: "true",
    tags: "",
    photo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newAdvert = {
      name: formData.name,
      price: Number(formData.price),
      sale: formData.sale === "true",
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      photo: formData.photo.trim() !== "" ? formData.photo : undefined,
    };
  
    try {
      await dispatch(createAdvert(newAdvert)).unwrap();
      addNotification("Advert created successfully!", "success");
      navigate("/adverts");
    } catch (err) {
      console.error("❌ Error creating advert:", err);
      const errorMessage = typeof err === "string" ? err : (err as any)?.message || "Could not create advert.";
      addNotification(errorMessage, "error"); 
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

        <button type="submit" className={`${styles.button} ${styles.createButton}`} disabled={status === "loading"}>
          {status === "loading" ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default NewAdvertPage;
