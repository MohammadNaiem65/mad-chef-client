import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	_id: null,
	name: null,
	email: null,
	emailVerified: null,
	role: null,
	pkg: null,
	img: null,
	createdAt: null,
	updatedAt: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUserData: (state, action) => {
			state._id = action.payload._id;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.emailVerified = action.payload.emailVerified;
			state.role = action.payload.role;
			state.pkg = action.payload.pkg;
			state.img = action.payload.img;
			state.createdAt = action.payload.createdAt;
			state.updatedAt = action.payload.updatedAt;
		},
		removeUserData: (state) => {
			Object.assign(state, {
				_id: null,
				name: null,
				email: null,
				emailVerified: null,
				role: null,
				pkg: null,
				img: null,
				createdAt: null,
			});
		},
	},
});

export default userSlice;
export const { addUserData, removeUserData } = userSlice.actions;
