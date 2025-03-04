import { ReactNode } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Notification from "../components/Notification"; 
import LogoutModal from "../components/LogoutModal"; // ✅ Importamos el modal de logout
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <Navbar />
      <Notification />
      <LogoutModal /> {/* ✅ Añadimos el modal de logout */}
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
