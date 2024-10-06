import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
        },
        removeCredentials: (state) => {
            state.user = null;
            state.accessToken = null;
        },
    },
});

export default authSlice;
export const { setCredentials, removeCredentials } = authSlice.actions;
