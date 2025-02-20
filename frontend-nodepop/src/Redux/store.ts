import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        //reducers
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: false,
        }),
        devTools: process.env.NODE_ENV !== 'production',
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;