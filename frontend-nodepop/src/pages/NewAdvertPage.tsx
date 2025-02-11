import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale: "true",
    tags: "",
    photo: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

      if (!token) {
        setError("No estás autenticado. Inicia sesión.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/api/v1/adverts",
        {
          name: formData.name,
          price: Number(formData.price),
          sale: formData.sale === "true",
          tags: formData.tags.split(",").map(tag => tag.trim()), // Convierte string a array
          photo: formData.photo || null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Anuncio creado:", response.data);
      navigate("/adverts"); // Redirigir a la lista de anuncios tras crear
    } catch (err) {
      console.error("Error al crear anuncio:", err);
      setError("No se pudo crear el anuncio.");
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Anuncio</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} required />
        <select name="sale" value={formData.sale} onChange={handleChange}>
          <option value="true">Venta</option>
          <option value="false">Compra</option>
        </select>
        <input type="text" name="tags" placeholder="Tags (separados por comas)" value={formData.tags} onChange={handleChange} />
        <input type="text" name="photo" placeholder="URL de la imagen (opcional)" value={formData.photo} onChange={handleChange} />
        <button type="submit">Crear Anuncio</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default NewAdvertPage;
