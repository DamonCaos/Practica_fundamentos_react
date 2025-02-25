import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import advertsReducer from "../../Redux/slices/advertsSlice";
import AdvertsPage from "../AdvertsPage";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "../../context/NotificationContext";

// 📌 Función para envolver en `Provider` y `NotificationProvider`
const renderWithProviders = async (ui: JSX.Element, preloadedState = {}) => {
  const store = configureStore({
    reducer: { adverts: advertsReducer },
    preloadedState,
  });

  await act(async () => {
    render(
      <Provider store={store}>
        <NotificationProvider>
          <BrowserRouter>{ui}</BrowserRouter>
        </NotificationProvider>
      </Provider>
    );
  });

  return store; // ✅ Ahora retorna el store para poder hacer pruebas más precisas
};

describe("AdvertsPage", () => {
  it("should render a loading message when adverts are loading", async () => {
    await act(async () => {
      await renderWithProviders(<AdvertsPage />, { adverts: { adverts: [], status: "loading", error: null } });
    });

    expect(await screen.findByTestId("loading-message")).toBeInTheDocument(); // ✅ Asegura que espera correctamente la actualización del DOM
  });

  it("should render an error message if fetching adverts fails", async () => {
    await act(async () => {
      await renderWithProviders(<AdvertsPage />, { adverts: { adverts: [], status: "failed", error: "No authentication token found" } });
    });

    expect(screen.getByTestId("error-message")).toHaveTextContent("Error: No authentication token found"); // ✅ Ahora busca el mensaje real de Redux
  });

  it("should render a list of adverts when adverts are available", async () => {
    const mockAdverts = [
      { id: "1", name: "Advert 1", price: 100, sale: true, tags: [] },
      { id: "2", name: "Advert 2", price: 200, sale: false, tags: [] },
    ];

    await act(async () => {
      await renderWithProviders(<AdvertsPage />, { adverts: { adverts: mockAdverts, status: "idle", error: null } });
    });

    expect(screen.getByText(/advert 1/i)).toBeInTheDocument();
    expect(screen.getByText(/advert 2/i)).toBeInTheDocument();
  });
});
