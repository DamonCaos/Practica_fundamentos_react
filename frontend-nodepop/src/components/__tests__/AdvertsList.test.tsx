import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import advertsReducer from "../../Redux/slices/advertsSlice";
import AdvertsList from "../AdvertsList";
import { BrowserRouter } from "react-router-dom";

// 📌 Función para envolver en `Provider`
const renderWithProviders = (ui: JSX.Element, preloadedState = {}) => {
  const store = configureStore({
    reducer: { adverts: advertsReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("AdvertsList", () => {
  it("should render a list of adverts", () => {
    const mockAdverts = [
      { id: "1", name: "Advert 1", price: 100, sale: true, tags: [] },
      { id: "2", name: "Advert 2", price: 200, sale: false, tags: [] },
    ];

    renderWithProviders(<AdvertsList adverts={mockAdverts} />);

    expect(screen.getByText(/advert 1/i)).toBeInTheDocument();
    expect(screen.getByText(/advert 2/i)).toBeInTheDocument();
  });

  it("should render a message when there are no adverts", () => {
    renderWithProviders(<AdvertsList adverts={[]} />);

    expect(screen.getByText(/no adverts yet/i)).toBeInTheDocument();
  });

  it("should have links to advert details", () => {
    const mockAdverts = [
      { id: "1", name: "Advert 1", price: 100, sale: true, tags: [] },
    ];

    renderWithProviders(<AdvertsList adverts={mockAdverts} />);

    expect(screen.getByText(/advert 1/i).closest("a")).toHaveAttribute("href", "/advert/1");
  });
});
