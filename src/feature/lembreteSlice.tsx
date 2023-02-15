import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import Lembrete from './Lembrete';
import { RootState } from './store';

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
export const { addLembrete, removeLembrete } = lembreteSlice.actions;

export default lembreteSlice;
