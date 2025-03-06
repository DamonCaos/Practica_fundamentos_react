import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../config";
import { User, Advert, RootAction } from "./types";
import { NavigateFunction } from "react-router-dom";

// 🎯 ACCIONES DISPONIBLES
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const FETCH_ADVERTS_REQUEST = "FETCH_ADVERTS_REQUEST";
export const FETCH_ADVERTS_SUCCESS = "FETCH_ADVERTS_SUCCESS";
export const FETCH_ADVERTS_FAILURE = "FETCH_ADVERTS_FAILURE";

// 🔹 LOGIN USER CON NOTIFICACIÓN Y REDIRECCIÓN
export const loginUser =
  (email: string, password: string, remember: boolean, navigate: NavigateFunction, addNotification: (message: string, type: "success" | "error" | "info") => void) =>
  async (dispatch: Dispatch<RootAction>) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axios.post<{ accessToken: string }>(
        API_ENDPOINTS.auth.login,
        { email, password }
      );

      console.log("🔎 Respuesta del backend:", response.data);

      const { accessToken } = response.data;
      const user: User = { id: email, email, password, token: accessToken };

      console.log("🔎 Token recibido en login:", accessToken);
      console.log("🔎 Usuario construido en login:", user);

      if (!accessToken || !user) throw new Error("Token o usuario no recibido en la respuesta");

      // ✅ Guardamos en sessionStorage o localStorage según "remember"
      if (remember) {
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("authToken", accessToken);
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      console.log("✅ Token y usuario guardados correctamente:", accessToken, user);

      dispatch({ type: LOGIN_SUCCESS, payload: { token: accessToken, user } });

      // ✅ MOSTRAR NOTIFICACIÓN DE ÉXITO
      addNotification("✅ Login successful! Welcome back!", "success");

      // ✅ REDIRECCIÓN AUTOMÁTICA A HOME
      navigate("/");
    } catch (error) {
      console.error("❌ Error en loginUser:", error);
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Login failed",
      });

      // ❌ NOTIFICACIÓN DE ERROR
      addNotification("❌ Login failed. Please check your credentials.", "error");
    }
  };

// 🔴 LOGOUT USER CON NOTIFICACIÓN
export const logoutUser = 
(addNotification: (message: string, type: "success" | "error" | "info") => void) => 
(dispatch: Dispatch<RootAction>) => {
  console.log("🚪 Cerrando sesión...");
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("user");

  dispatch({ type: LOGOUT });

  // ✅ MOSTRAR NOTIFICACIÓN DE LOGOUT
  addNotification("✅ You have been logged out successfully!", "info");
};

// 📢 FETCH ADVERTS
export const fetchAdverts = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch({ type: FETCH_ADVERTS_REQUEST });

  try {
    const token =
      sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

    console.log("🔎 Token utilizado en fetchAdverts:", token);

    if (!token) throw new Error("No authentication token found");

    const response = await axios.get<Advert[]>(API_ENDPOINTS.adverts, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: FETCH_ADVERTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("❌ Error en fetchAdverts:", error);
    dispatch({
      type: FETCH_ADVERTS_FAILURE,
      payload: "Failed to fetch adverts",
    });
  }
};
