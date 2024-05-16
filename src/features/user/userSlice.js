import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUserData: (state, action) => {
			Object.assign(state, {...state, ...action.payload});
		},
		removeUserData: (state) => {
			Object.assign(state, {});
		},
	},
});

export default userSlice;
export const { addUserData, removeUserData } = userSlice.actions;
