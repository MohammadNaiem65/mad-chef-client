import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	keyword: null,
	uploadDate: null,
	region: null,
	sortBy: null,
	sortOrder: null,
};

const recipeFilterSlice = createSlice({
	name: 'recipeFilter',
	initialState,
	reducers: {
		filterWithKeyword: (state, action) => {
			state.keyword = action.payload;
		},
		filterWithOptions: (state, action) => {
			state.uploadDate = action.payload?.uploadDate;
			state.region = action.payload?.region;
			state.sortBy = action.payload?.sortBy;
			state.sortOrder = action.payload?.sortOrder;
		},
	},
});

export default recipeFilterSlice;
export const { filterWithKeyword, filterWithOptions } =
	recipeFilterSlice.actions;
