import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ Importamos useNavigate
import { loginUser } from "../redux/actions";
import { useNotification } from "../context/NotificationContext";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Hook para redirigir después del login
  const { addNotification } = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(email, password, remember) as any); // ✅ Esperamos a que Redux maneje la autenticación

      addNotification("Login successful!", "success"); // ✅ Notificación de éxito
      navigate("/"); // ✅ Redirigimos a Home
    } catch (error) {
      addNotification("Error logging in. Please try again.", "error"); // ✅ Notificación de error
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <label className={styles.rememberMe}>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
