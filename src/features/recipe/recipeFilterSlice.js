import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	keyword: null,
	uploadDate: null,
	region: null,
	sortBy: null,
};

const recipeFilterSlice = createSlice({
	name: 'recipeFilter',
	initialState,
	reducers: {
		filterWithKeyword: (state, action) => {
			state = { ...state, keyword: action.payload };
		},
		filterWithOptions: (state, action) => {
			state = {
				...state,
				uploadDate: action.payload?.uploadDate,
				region: action.payload?.region,
				sortBy: action.payload?.sortBy,
			};
		},
	},
});

export default recipeFilterSlice;
export const { filterWithKeyword, filterWithOptions } =
	recipeFilterSlice.actions;
