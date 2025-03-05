import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import axios, { AxiosError } from "axios";
import styles from "../styles/LoginPage.module.css";
import { API_ENDPOINTS } from "../config";

const LoginPage = () => {
  const { login } = useAuth();
  const { addNotification } = useNotification();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Sending login request...");
      const response = await axios.post<{ accessToken: string }>(API_ENDPOINTS.auth.login, {
        email,
        password,
      });

      console.log("Backend response:", response.data);

      const token = response.data.accessToken;
      if (!token) throw new Error("No valid token received.");

      console.log("Token received:", token);
      login(token, remember);

      addNotification("Login successful!", "success");

    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      console.error("Login error:", axiosError.response?.data?.message || axiosError.message);

      addNotification(
        axiosError.response?.data?.message || "Error logging in.",
        "error"
      );
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
