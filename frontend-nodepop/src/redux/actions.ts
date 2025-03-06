import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../config";
import { User, Advert, RootAction } from "./types";

// 🎯 ACCIONES DISPONIBLES
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const FETCH_ADVERTS_REQUEST = "FETCH_ADVERTS_REQUEST";
export const FETCH_ADVERTS_SUCCESS = "FETCH_ADVERTS_SUCCESS";
export const FETCH_ADVERTS_FAILURE = "FETCH_ADVERTS_FAILURE";

export const CREATE_ADVERT_REQUEST = "CREATE_ADVERT_REQUEST";
export const CREATE_ADVERT_SUCCESS = "CREATE_ADVERT_SUCCESS";
export const CREATE_ADVERT_FAILURE = "CREATE_ADVERT_FAILURE";

// 🔹 ACTION CREATORS

// 🔐 LOGIN USER
export const loginUser =
  (email: string, password: string, remember: boolean) =>
  async (dispatch: Dispatch<RootAction>) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axios.post(API_ENDPOINTS.auth.login, { email, password });

      console.log("🔎 Respuesta completa del backend:", response.data);

      const { accessToken } = response.data; // ✅ Token recibido
      const user = { id: email, email, password, token: accessToken }; // ✅ Creamos un objeto `User` completo

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
    } catch (error) {
      console.error("❌ Error en loginUser:", error);
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Login failed",
      });
    }
  };




// 🔴 LOGOUT USER
export const logoutUser = () => (dispatch: Dispatch<RootAction>) => {
  console.log("🚪 Cerrando sesión...");
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("user");

  dispatch({ type: LOGOUT });
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
