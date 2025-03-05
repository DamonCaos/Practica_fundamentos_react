import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import store from "./redux/store"; 
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}> {/* 🔹 Envolvemos la app con el Provider de Redux */}
      <BrowserRouter>
        <NotificationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NotificationProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
