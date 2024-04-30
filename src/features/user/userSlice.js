import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	_id: null,
	name: null,
	email: null,
	emailVerified: false,
	role: null,
	pkg: 'basic',
	img: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUserData: (state, action) => {
			state._id = action.payload?._id;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.emailVerified = action.payload.emailVerified;
			state.role = action.payload.role;
			state.pkg = action.payload.pkg;
			state.img = action.payload.img;
		},
		removeUserData: (state) => {
			state._id = null;
			state.name = null;
			state.email = null;
			state.emailVerified = false;
			state.role = null;
			state.pkg = 'basic';
			state.img = null;
		},
	},
});

export default userSlice;
export const { addUserData, removeUserData } = userSlice.actions;
