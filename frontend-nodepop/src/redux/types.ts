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

export const CREATE_ADVERT_REQUEST = "CREATE_ADVERT_REQUEST";
export const CREATE_ADVERT_SUCCESS = "CREATE_ADVERT_SUCCESS";
export const CREATE_ADVERT_FAILURE = "CREATE_ADVERT_FAILURE";

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

// 🔹 Agregamos las acciones de creación de anuncios
interface CreateAdvertRequestAction {
    type: typeof CREATE_ADVERT_REQUEST;
}

interface CreateAdvertSuccessAction {
    type: typeof CREATE_ADVERT_SUCCESS;
    payload: Advert;
}

interface CreateAdvertFailureAction {
    type: typeof CREATE_ADVERT_FAILURE;
    payload: string;
}

// 🔹 Actualizamos `AdvertsActionTypes` para incluir las nuevas acciones
export type AdvertsActionTypes =
    | FetchAdvertsRequestAction
    | FetchAdvertsSuccessAction
    | FetchAdvertsFailureAction
    | CreateAdvertRequestAction
    | CreateAdvertSuccessAction
    | CreateAdvertFailureAction;

// 🔹 Tipo de un usuario
export interface User {
    id: string;
    email: string;
    password: string;
    token: string;
}

// 🔹 Estado inicial del usuario en Redux
export interface UserState {
    isAuthenticated: boolean;
    loading: boolean;
    token: string | null;
    user: User | null;
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
    payload: {
        token: string;
        user: User;
    };
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

// 🔹 Tipo de acciones para el usuario
export type UserActionTypes =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | LogoutAction;

// 🔹 Tipo de estado global
export interface RootState {
    user: UserState;
    adverts: AdvertsState;
}

// 🔹 Agregamos `AdvertsActionTypes` a `RootAction`
export type RootAction = UserActionTypes | AdvertsActionTypes;
