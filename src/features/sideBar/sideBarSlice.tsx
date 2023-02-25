import { createSlice } from '@reduxjs/toolkit';

export const sideBarWidth = '300px';

const sideBarSlice = createSlice({
	name: 'sidebar',
	initialState: {
		open: false,
		width: sideBarWidth,
	},
	reducers: {
		setOpen(state, action) {
			state.open = action.payload;
		},
	},
});

export const { setOpen } = sideBarSlice.actions;
export default sideBarSlice;
