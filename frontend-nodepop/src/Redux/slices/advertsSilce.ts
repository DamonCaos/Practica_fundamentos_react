import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../store";


//interfaz del estado

interface Advert {
    id: string;
    name: string;
    price: number;
    photo: string;
    tags: string[];
    
};

interface AdvertsState {
    adverts: Advert[];
    status: "idle" | "loading" | "failed";
    error: string | null;

};

//Estado inicial

const initialState: AdvertsState = {
    adverts: [],
    status: "idle",
    error: null,
};

//Acciom asincrona para obtener los anuncios de la API

export const fetchAdverts = createAsyncThunk("adverts/fetchAdverts", async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
  
      if (!token) {
        return rejectWithValue("No authentication token found");
      }
  
      const response = await fetch("http://localhost:3001/api/v1/adverts", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // 🟢 Asegurar que enviamos el token
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

  });
  

// accion para eliminar anuncios

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
          "Authorization": `Bearer ${token}`,
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

// Accion para crear anuncio nuevo

export const createAdvert = createAsyncThunk(
    "adverts/createAdvert",
    async (
      newAdvert: { name: string; price: number; sale: boolean; tags: string[]; photo?: string },
      { rejectWithValue }
    ) => {
      try {
        const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
  
        if (!token) {
          return rejectWithValue("No auth token found");
        }
  
        const response = await fetch("http://localhost:3001/api/v1/adverts", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
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
        return rejectWithValue("Network error");
      }
    }
  );
  

//Slice de anuncios

const advertsSlice = createSlice({
    name: "adverts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAdverts.pending, (state) => {
            state.status = "loading"

        })
        .addCase(fetchAdverts.fulfilled, (state, action) => {
            state.status = "idle"
            state.adverts = action.payload;
        })
        .addCase(fetchAdverts.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message || null;
        })
        .addCase(deleteAdvert.fulfilled, (state, action) => {
            state.adverts = state.adverts.filter((advert) => advert.id !== action.payload);
        })
        .addCase(createAdvert.fulfilled, (state, action) => {
            state.adverts.push(action.payload);
        });
    }
})

//selectores

export const selectAdverts = (state: RootState) => state.adverts.adverts;
export const selectAdvertsStatus = (state: RootState) => state.adverts.status;
export const selectAdvertsError = (state: RootState)=> state.adverts.error;

export default advertsSlice.reducer;