// 🔹 Tipo de un anuncio
export interface Advert {
    id: string;
    name: string;
    price: number;
    sale: boolean;
    tags: string[];
    photo?: string;
  }
  
  // 🔹 Estado inicial de anuncios en Redux
  export interface AdvertsState {
    adverts: Advert[];
    loading: boolean;
    error: string | null;
  }
  
  // 🔹 Tipos de acciones para anuncios
  export const FETCH_ADVERTS_REQUEST = "FETCH_ADVERTS_REQUEST";
  export const FETCH_ADVERTS_SUCCESS = "FETCH_ADVERTS_SUCCESS";
  export const FETCH_ADVERTS_FAILURE = "FETCH_ADVERTS_FAILURE";
  
  interface FetchAdvertsRequestAction {
    type: typeof FETCH_ADVERTS_REQUEST;
  }
  
  interface FetchAdvertsSuccessAction {
    type: typeof FETCH_ADVERTS_SUCCESS;
    payload: Advert[];
  }
  
  interface FetchAdvertsFailureAction {
    type: typeof FETCH_ADVERTS_FAILURE;
    payload: string;
  }
  
  export type AdvertsActionTypes =
    | FetchAdvertsRequestAction
    | FetchAdvertsSuccessAction
    | FetchAdvertsFailureAction;
  
  // 🔹 Estado inicial del usuario en Redux
  export interface UserState {
    isAuthenticated: boolean;
    loading: boolean;
    token: string | null;
    error: string | null;
  }
  
  // 🔹 Tipos de acciones para usuario
  export const LOGIN_REQUEST = "LOGIN_REQUEST";
  export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
  export const LOGIN_FAILURE = "LOGIN_FAILURE";
  export const LOGOUT = "LOGOUT";
  
  interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
  }
  
  interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: string; // Token de autenticación
  }
  
  interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string; // Mensaje de error
  }
  
  interface LogoutAction {
    type: typeof LOGOUT;
  }
  
  export type UserActionTypes =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | LogoutAction;
  