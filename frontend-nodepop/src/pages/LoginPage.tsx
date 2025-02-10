import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Enviando solicitud de login...");
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      console.log("Respuesta del backend:", response.data);

      const token = response.data.token;

      if (!token) {
        throw new Error("No se recibió un token válido.");
      }

      console.log("Token recibido:", token);
      login(token, remember);
    } catch (err: any) {
      console.error("Error en login:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error al iniciar sesión.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Recordar sesión
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
