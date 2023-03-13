import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const configSlice = createSlice({
	name: 'config',
	initialState: {
		mainWidth: 1000,
		loading: false
	},
	reducers: {
		setWidth(state, action){
			state.mainWidth = action.payload;
		},
		setLoading(state, action: PayloadAction<boolean>){
			state.loading = action.payload;
		}
	}
});

export const { setWidth, setLoading } = configSlice.actions;
export default configSlice;
