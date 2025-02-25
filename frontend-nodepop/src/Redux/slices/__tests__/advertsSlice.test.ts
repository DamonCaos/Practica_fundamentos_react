import { configureStore } from "@reduxjs/toolkit";
import advertsReducer, { fetchAdverts } from "../advertsSlice";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

// 📌 Test de acciones asíncronas (fetchAdverts)
describe("advertsSlice - async thunk tests", () => {
  let store: any;
  let originalSessionStorage: Storage;

  beforeEach(() => {
    store = configureStore({
      reducer: { adverts: advertsReducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    // 🟢 Guardar el sessionStorage original y mockearlo
    originalSessionStorage = global.sessionStorage;
    Object.defineProperty(global, "sessionStorage", {
      value: {
        getItem: vi.fn(() => "mock-token"),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();

    // 🔴 Restaurar sessionStorage original después de cada test
    Object.defineProperty(global, "sessionStorage", {
      value: originalSessionStorage,
      writable: true,
    });
  });

  it("should fetch adverts successfully", async () => {
    // 🟢 Mock de la API con Vitest
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify([{ id: "1", name: "Mock Advert", price: 100, sale: false, tags: [] }]), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      )
    );

    await store.dispatch(fetchAdverts("")).unwrap(); // ✅ Se usa `.unwrap()` para manejar correctamente la promesa

    const state = store.getState().adverts;
    expect(state.adverts).toHaveLength(1);
    expect(state.adverts[0].name).toBe("Mock Advert");
  });

  it("should handle fetch error", async () => {
    // 🔴 Mock de error en la API con Vitest
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ message: "Error fetching adverts" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        })
      )
    );

    const result = await store.dispatch(fetchAdverts(""));

    // ✅ Verificamos que la acción haya sido rechazada correctamente
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("Error fetching adverts"); 

    // ✅ Verificamos que Redux haya almacenado el error correctamente
    const state = store.getState().adverts;
    expect(state.error).toBe("Error fetching adverts");
  });
});
