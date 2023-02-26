import { createSlice } from '@reduxjs/toolkit';

const configSlice = createSlice({
	name: 'config',
	initialState: {
		mainWidth: 1000
	},
	reducers: {
		setWidth(state, action){
			state.mainWidth = action.payload;
		}
	}
});

export const { setWidth } = configSlice.actions;
export default configSlice;
