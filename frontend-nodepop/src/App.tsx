import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdvertsPage from "./pages/AdvertsPage";
/* import DetailAdvertPage from "./pages/DetailAdvertPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import NotFoundPage from "./pages/NotFoundPage"; */
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas privadas */}
      <Route
        path="/adverts"
        element={
          <PrivateRoute>
            <AdvertsPage />
          </PrivateRoute>
        }
      />
      {/* 
      <Route
        path="/advert/new"
        element={
          <PrivateRoute>
            <NewAdvertPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/advert/:id"
        element={
          <PrivateRoute>
            <DetailAdvertPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
      */}

      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/adverts" />} />
    </Routes>
  );
}

export default App;


