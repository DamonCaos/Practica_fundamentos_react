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
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch adverts");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("Network error while fetching adverts");
    }
  }
);

// 📌 Acción asíncrona para eliminar un anuncio
export const deleteAdvert = createAsyncThunk(
  "adverts/deleteAdvert",
  async (advertId: string, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch(`http://localhost:3001/api/v1/adverts/${advertId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete advert");
      }

      return advertId;
    } catch (error) {
      return rejectWithValue("Network error while deleting advert");
    }
  }
);

// 📌 Acción asíncrona para crear un nuevo anuncio
export const createAdvert = createAsyncThunk(
  "adverts/createAdvert",
  async (
    newAdvert: { name: string; price: number; sale: boolean; tags: string[]; photo?: string },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch("http://localhost:3001/api/v1/adverts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdvert),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to create advert");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("Network error while creating advert");
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
        state.error = action.error.message || null;
      })

      // Eliminar anuncio
      .addCase(deleteAdvert.fulfilled, (state, action) => {
        state.adverts = state.adverts.filter((advert) => advert.id !== action.payload);
      })

      // Crear anuncio
      .addCase(createAdvert.fulfilled, (state, action) => {
        state.adverts.push(action.payload);
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

export const selectForSaleAdverts = createSelector(
  [selectAdverts],
  (adverts) => adverts.filter((advert) => advert.sale)
);

export const selectBuyingAdverts = createSelector(
  [selectAdverts],
  (adverts) => adverts.filter((advert) => !advert.sale)
);

export const selectAdvertsStatus = createSelector(
  [selectAdvertsState],
  (advertsState) => advertsState.status
);

export const selectAdvertsError = createSelector(
  [selectAdvertsState],
  (advertsState) => advertsState.error
);
