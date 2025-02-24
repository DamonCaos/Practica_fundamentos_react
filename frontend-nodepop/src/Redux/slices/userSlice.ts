import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    isLogged: boolean;
    username: string | null;
    token: string | null;
};

const initialState: UserState = {
    isLogged: false,
    username: null,
    token: localStorage.getItem('token') || null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isLogged = true;
            state.username = action.payload.username;
            state.token = action.payload.token;

            localStorage.setItem('token', action.payload.token);
        },

        logout(state) {
            state.isLogged = false;
            state.username = null;
            state.token = null;

            localStorage.removeItem('token');
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;