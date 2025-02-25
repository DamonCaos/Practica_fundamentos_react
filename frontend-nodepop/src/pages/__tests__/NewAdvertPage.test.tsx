import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import advertsReducer from "../../Redux/slices/advertsSlice";
import NewAdvertPage from "../NewAdvertPage";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "../../context/NotificationContext"; // ✅ Importar el Provider

// 📌 Función para envolver en `Provider` y `NotificationProvider`
const renderWithProviders = (ui: JSX.Element) => {
  const store = configureStore({
    reducer: { adverts: advertsReducer },
  });

  return render(
    <Provider store={store}>
      <NotificationProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </NotificationProvider>
    </Provider>
  );
};

describe("NewAdvertPage", () => {
  it("should render the form", () => {
    renderWithProviders(<NewAdvertPage />);

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tags/i)).toBeInTheDocument();
  });

  it("should show an error if the form is submitted with empty fields", () => {
    renderWithProviders(<NewAdvertPage />);

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
  });
});
