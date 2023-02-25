import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import Lembrete from '../../app/types/Lembrete';
import { RootState } from '../../app/store';

const lembreteAdapter = createEntityAdapter<Lembrete>({
	selectId: (lembrete) => lembrete.id,
});

const lembreteSlice = createSlice({
	name: 'lembretes',
	initialState: lembreteAdapter.getInitialState(),
	reducers: {
		addLembrete: lembreteAdapter.addOne,
		removeLembrete: lembreteAdapter.removeOne,
		updateLembrete: lembreteAdapter.updateOne,
	},
});

export const { selectAll, selectById } = lembreteAdapter.getSelectors(
	(state: RootState) => state.lembretesReducer
);
export const { addLembrete, removeLembrete, updateLembrete } = lembreteSlice.actions;

export default lembreteSlice;
