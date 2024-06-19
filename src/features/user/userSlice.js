import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	_id: null,
	name: null,
	email: null,
	emailVerified: null,
	role: null,
	img: null,
	createdAt: null,
	updatedAt: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUserData: (state, action) => {
			Object.assign(state, action.payload);
		},
		removeUserData: (state) => {
			Object.assign(state, {
				_id: null,
				name: null,
				email: null,
				emailVerified: null,
				role: null,
				img: null,
				createdAt: null,
				updatedAt: null,
			});
		},
	},
});

export default userSlice;
export const { addUserData, removeUserData } = userSlice.actions;
