import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdvertsPage from "./pages/AdvertsPage";
import NewAdvertPage from "./pages/NewAdvertPage"; 
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
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
      <Route path="/" element={<Navigate to="/adverts" />} />
    </Routes>
  );
}

export default App;



