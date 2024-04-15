import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';
import recipeFilterSlice from '../features/recipe/recipeFilterSlice';

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		[authSlice.name]: authSlice.reducer,
		[recipeFilterSlice.name]: recipeFilterSlice.reducer,
	},
	devTools: import.meta.env.DEV,
	middleware: (getDefaultMiddlewares) =>
		getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
