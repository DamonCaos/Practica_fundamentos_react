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
      const response = await axios.post<{ token: string; user: User }>(
        API_ENDPOINTS.auth.login,
        { email, password }
      );

      const { token, user } = response.data;

      // ✅ Guardamos en sessionStorage o localStorage según "remember"
      if (remember) {
        localStorage.setItem("authToken", token);
      } else {
        sessionStorage.setItem("authToken", token);
      }

      dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      dispatch({
        type: LOGIN_FAILURE,
        payload: axiosError.response?.data?.message || "Login failed",
      });
    }
  };

// 🔴 LOGOUT USER (✅ Ahora como una acción válida para Redux)
export const logoutUser = () => (dispatch: Dispatch<RootAction>) => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");

  dispatch({ type: LOGOUT }); // ✅ Ahora correctamente ejecutado con dispatch
};

// 📢 FETCH ADVERTS
export const fetchAdverts = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch({ type: FETCH_ADVERTS_REQUEST });

  try {
    const token =
      sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get<Advert[]>(API_ENDPOINTS.adverts, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: FETCH_ADVERTS_SUCCESS, payload: response.data });
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    dispatch({
      type: FETCH_ADVERTS_FAILURE,
      payload: axiosError.response?.data?.message || "Failed to fetch adverts",
    });
  }
};

// 🆕 CREATE ADVERT
export const createAdvert =
  (advertData: Advert) => async (dispatch: Dispatch<RootAction>) => {
    dispatch({ type: CREATE_ADVERT_REQUEST });

    try {
      const token =
        sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post<Advert>(API_ENDPOINTS.adverts, advertData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({ type: CREATE_ADVERT_SUCCESS, payload: response.data });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      dispatch({
        type: CREATE_ADVERT_FAILURE,
        payload: axiosError.response?.data?.message || "Failed to create advert",
      });
    }
  };
