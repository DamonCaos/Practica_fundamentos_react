import {
    FETCH_ADVERTS_REQUEST,
    FETCH_ADVERTS_SUCCESS,
    FETCH_ADVERTS_FAILURE,
    AdvertsState,
    AdvertsActionTypes,
  } from "./types";
  
  // 🔹 Estado inicial de anuncios
  const initialState: AdvertsState = {
    adverts: [],
    loading: false,
    error: null,
  };
  
  // 🔹 Reducer para anuncios
  const advertsReducer = (state = initialState, action: AdvertsActionTypes): AdvertsState => {
    switch (action.type) {
      case FETCH_ADVERTS_REQUEST:
        return { ...state, loading: true, error: null };
  
      case FETCH_ADVERTS_SUCCESS:
        return { ...state, loading: false, adverts: action.payload };
  
      case FETCH_ADVERTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default advertsReducer;
  