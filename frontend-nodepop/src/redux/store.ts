import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import advertsReducer from "./advertsReducer";
import { RootState } from "./types";

// 🔹 Combinamos los reducers en uno solo
const rootReducer = combineReducers({
  user: userReducer,
  adverts: advertsReducer,
});

// 🔹 Definimos el middleware thunk de forma más flexible
const middleware = [thunk as any]; // 🔴 OJO: any

// 🔹 Configuración de Redux DevTools
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // 🔴 OJO: any

// 🔹 Creamos el store con middleware thunk correctamente tipado
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;
export type { RootState };
