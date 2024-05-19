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
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUserData: (state, action) => {
			state._id = action._id;
			state.name = action.name;
			state.email = action.email;
			state.emailVerified = action.emailVerified;
			state.role = action.role;
			state.pkg = action.pkg;
			state.img = action.img;
			state.createdAt = action.createdAt;
		},
		removeUserData: (state) => {
			Object.assign(state, {
				_id: undefined,
				name: undefined,
				email: undefined,
				emailVerified: undefined,
				role: undefined,
				pkg: undefined,
				img: undefined,
				createdAt: undefined,
			});
		},
	},
});

export default userSlice;
export const { addUserData, removeUserData } = userSlice.actions;
