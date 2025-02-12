import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdvertsPage from "./pages/AdvertsPage";
import DetailAdvertPage from "./pages/DetailAdvertPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/adverts"
        element={
          <PrivateRoute>
            <AdvertsPage />
          </PrivateRoute>
        }
      />
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
    </Routes>
  );
}

export default App;




