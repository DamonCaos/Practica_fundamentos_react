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

export const fetchAdverts = createAsyncThunk("adverts/fetchAdverts", async () => {
    const response = await fetch("http://localhost:3001/api/v1/adverts");
    if (!response.ok) {
        throw new Error("Failed to fetch adverts");
    }
    return await response.json();
})

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
    }
})

//selectores

export const selectAdverts = (state: RootState) => state.adverts.adverts;
export const selectAdvertsStatus = (state: RootState) => state.adverts.status;
export const selectAdvertsError = (state: RootState)=> state.adverts.error;

export default advertsSlice.reducer;