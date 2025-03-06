import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; 
import userReducer from "./userReducer";
import advertsReducer from "./advertsReducer";
import { RootState } from "./types";

// 🔹 Combinamos los reducers en uno solo
const rootReducer = combineReducers({
  user: userReducer,
  adverts: advertsReducer,
});

// 🔹 Configuración de Redux DevTools
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({ trace: true }) || compose;

// 🔹 Aplicamos correctamente el middleware thunk
const middleware = applyMiddleware(thunk);

// 🔹 Creamos el store con middleware thunk correctamente
const store = createStore(rootReducer, composeEnhancers(middleware));

export default store;
export type { RootState };
