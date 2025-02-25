import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdvertsPage from "./pages/AdvertsPage";
import DetailAdvertPage from "./pages/DetailAdvertPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import EditAdvertPage from "./pages/EditAdvertPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Página de Inicio */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      {/* Página de Login */}
      <Route
        path="/login"
        element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        }
      />

      {/* Listado de Anuncios (Requiere Autenticación) */}
      <Route
        path="/adverts"
        element={
          <PrivateRoute>
            <MainLayout>
              <AdvertsPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Crear Nuevo Anuncio (Requiere Autenticación) */}
      <Route
        path="/advert/new"
        element={
          <PrivateRoute>
            <MainLayout>
              <NewAdvertPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Detalle de Anuncio (Requiere Autenticación) */}
      <Route
        path="/advert/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <DetailAdvertPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Editar Anuncio (Requiere Autenticación) */}
      <Route
        path="/advert/:id/edit"
        element={
          <PrivateRoute>
            <MainLayout>
              <EditAdvertPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Página 404 */}
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
