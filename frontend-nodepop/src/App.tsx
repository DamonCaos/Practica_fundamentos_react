import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdvertsPage from "./pages/AdvertsPage";
import DetailAdvertPage from "./pages/DetailAdvertPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/adverts" element={<AdvertsPage />} />
        <Route path="/advert/new" element={<NewAdvertPage />} />
        <Route path="/advert/:id" element={<DetailAdvertPage />} />
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
