import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	devTools: import.meta.env.DEV,
	middleware: (getDefaultMiddlewares) =>
		getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
