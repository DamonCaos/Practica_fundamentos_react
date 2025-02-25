import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import advertsReducer from "./slices/advertsSlice"; 

export const store = configureStore({
  reducer: {
    user: userReducer,
    adverts: advertsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production", 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
