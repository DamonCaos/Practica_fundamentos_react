import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createSelector } from "reselect";

// 📌 Interfaz del estado de un anuncio
interface Advert {
  id: string;
  name: string;
  price: number;
  photo?: string;
  tags: string[];
  sale: boolean;
}

// 📌 Estado global de anuncios
interface AdvertsState {
  adverts: Advert[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// 📌 Estado inicial
const initialState: AdvertsState = {
  adverts: [],
  status: "idle",
  error: null,
};

// 📌 Acción asíncrona para obtener los anuncios desde la API con filtros
export const fetchAdverts = createAsyncThunk(
  "adverts/fetchAdverts",
  async (filters: string = "", { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch(`http://localhost:3001/api/v1/adverts?${filters}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        let errorMessage = "Failed to fetch adverts";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = "Invalid response format from server";
        }
        return rejectWithValue(errorMessage);
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error while fetching adverts");
    }
  }
);

// 📌 Slice de anuncios
const advertsSlice = createSlice({
  name: "adverts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener anuncios
      .addCase(fetchAdverts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdverts.fulfilled, (state, action) => {
        state.status = "idle";
        state.adverts = action.payload;
      })
      .addCase(fetchAdverts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string || "Unknown error"; // ✅ Se asegura que el error sea un string
      });
  },
});

export default advertsSlice.reducer;

// 📌 Selectores optimizados con reselect
const selectAdvertsState = (state: RootState) => state.adverts;

export const selectAdverts = createSelector(
  [selectAdvertsState],
  (advertsState) => advertsState.adverts
);

export const selectAdvertsStatus = createSelector(
  [selectAdvertsState],
  (advertsState) => advertsState.status
);

export const selectAdvertsError = createSelector(
  [selectAdvertsState],
  (advertsState) => advertsState.error
);
