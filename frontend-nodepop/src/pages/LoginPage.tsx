import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import styles from "../styles/LoginPage.module.css";

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
      console.log("Sending login request...");
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      console.log("Backend response:", response.data);

      const token = response.data.accessToken;

      if (!token) {
        throw new Error("No valid token received.");
      }

      console.log("Token received:", token);
      login(token, remember);
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Error logging in.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
        <label className={styles.rememberMe}>
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          Remember me
        </label>
        <button type="submit" className={styles.button}>Login</button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default LoginPage;


