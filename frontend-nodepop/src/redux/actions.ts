import { Dispatch } from "redux";
import axios from "axios";
import { API_ENDPOINTS } from "../config";
import { User, Advert } from "./types";

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
export const loginUser = (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
  
    try {
      const response = await axios.post<{ accessToken: string; user: User }>(API_ENDPOINTS.auth.login, {
        email,
        password,
      });
  
      const { accessToken, user } = response.data;
  
      sessionStorage.setItem("authToken", accessToken);
  
      dispatch({ type: LOGIN_SUCCESS, payload: { token: accessToken, user } });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: "Login failed" });
    }
  };
  

// 🔴 LOGOUT USER
export const logoutUser = () => {
  sessionStorage.removeItem("authToken");
  return { type: LOGOUT };
};

// 📢 FETCH ADVERTS
export const fetchAdverts = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_ADVERTS_REQUEST });

  try {
    const response = await axios.get<Advert[]>(API_ENDPOINTS.adverts, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("authToken")}` },
    });

    dispatch({ type: FETCH_ADVERTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_ADVERTS_FAILURE, payload: "Failed to fetch adverts" });
  }
};

// 🆕 CREATE ADVERT
export const createAdvert = (advertData: Advert) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_ADVERT_REQUEST });

  try {
    const response = await axios.post<Advert>(API_ENDPOINTS.adverts, advertData, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("authToken")}` },
    });

    dispatch({ type: CREATE_ADVERT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_ADVERT_FAILURE, payload: "Failed to create advert" });
  }
};
