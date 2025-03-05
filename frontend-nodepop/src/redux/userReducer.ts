import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    UserState,
    UserActionTypes,
  } from "./types";
  
  // 🔹 Estado inicial del usuario
  const initialState: UserState = {
    isAuthenticated: false,
    loading: false,
    user : null,
    error: null,
    token: null,
  };
  
  // 🔹 Reducer para autenticación del usuario
  const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
  
      case LOGIN_SUCCESS:
        return { ...state, loading: false, isAuthenticated: true, token: action.payload };
  
      case LOGIN_FAILURE:
        return { ...state, loading: false, isAuthenticated: false, error: action.payload };
  
      case LOGOUT:
        return { ...state, isAuthenticated: false, token: null };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  