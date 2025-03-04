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
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />

      <Route path="/adverts" element={<PrivateRoute><MainLayout><AdvertsPage /></MainLayout></PrivateRoute>} />
      <Route path="/adverts/new" element={<PrivateRoute><MainLayout><NewAdvertPage /></MainLayout></PrivateRoute>} />
      <Route path="/adverts/:id" element={<PrivateRoute><MainLayout><DetailAdvertPage /></MainLayout></PrivateRoute>} />

      <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
    </Routes>
  );
}

export default App;
