import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions";
import { RootState } from "../redux/types";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(email, password, remember) as any);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>

      {/* 🔹 Muestra un loading mientras se hace login */}
      {loading && <p className={styles.loading}>Logging in...</p>}

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

        {/* 🔹 Botón deshabilitado si está cargando */}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 🔹 Mensaje de error si el login falla */}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
