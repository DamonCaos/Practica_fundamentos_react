import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
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
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
      <Route
        path="/adverts"
        element={<PrivateRoute><MainLayout><AdvertsPage /></MainLayout></PrivateRoute>}
      />
      <Route
        path="/advert/new"
        element={<PrivateRoute><MainLayout><NewAdvertPage /></MainLayout></PrivateRoute>}
      />
      <Route
        path="/advert/:id"
        element={<PrivateRoute><MainLayout><DetailAdvertPage /></MainLayout></PrivateRoute>}
      />
      <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
    </Routes>
  );
}

export default App;





