import { createSlice } from '@reduxjs/toolkit';
import Lembrete from '../../app/types/Lembrete';

interface IInitialState {
	modalOpen: boolean;
	lembrete: Lembrete | null;
}

const initialState: IInitialState = {
	modalOpen: false,
	lembrete: null
};

const editModalSlice = createSlice({
	name: 'editModal',
	initialState,
	reducers: {
		setModalOpen(state, action){
			state.modalOpen = action.payload;
		},
		setLembrete(state, action){
			state.lembrete = action.payload;
		}
	}
});

export const { setModalOpen, setLembrete } = editModalSlice.actions;
export default editModalSlice;