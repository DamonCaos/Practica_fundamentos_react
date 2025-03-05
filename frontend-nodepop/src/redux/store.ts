import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import  advertsReducer  from "./advertsReducer"; // Lo crearemos luego
import  userReducer  from "./userReducer"; // Lo crearemos luego
//import { composeWithDevTools } from "redux-devtools-extension";

// 🔹 Combinar los reducers (anuncios y usuario)
const rootReducer = combineReducers({
  adverts: advertsReducer,
  user: userReducer,
});

// 🔹 Crear el store con middleware para manejar acciones asíncronas
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// 🔹 Tipado del estado global
export type RootState = ReturnType<typeof rootReducer>;
