import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLembretes } from './thunks';
import Lembrete from '../../app/types/Lembrete';

interface IInitialState {
	lembretes: Lembrete[],
	loading: boolean;
}

const initialState: IInitialState = {
	lembretes: [],
	loading: false
};

const lembreteSlice = createSlice({
	name: 'lembretes',
	initialState,
	reducers: {	
		destroyAll(state){
			state.lembretes = [];
		},
		archiveOne(state, action: PayloadAction<number>) {
			const lembrete = state.lembretes.find(l => l.id === action.payload);
			if(!lembrete) return;

			lembrete.arquivado = true;
		},
		recoverOne(state, action: PayloadAction<number>) {
			const lembrete = state.lembretes.find(l => l.id === action.payload);
			if(!lembrete) return;

			lembrete.arquivado = false;
		}
	},
	extraReducers({ addCase }) {
		addCase(getLembretes.pending, loading);
		addCase(getLembretes.fulfilled, set);
		// addCase(archiveOne.fulfilled, archiveLembrete);
	}
});

function archiveLembrete(state: IInitialState, action: PayloadAction<number>) {
	if(action.payload < 0) return;

	const lembrete = state.lembretes.find(l => l.id === action.payload);
	if(!lembrete) return;

	lembrete.arquivado = true;
}

function loading(state: IInitialState){
	state.loading = true;
}

function set(
	state: IInitialState,
	action: PayloadAction<Lembrete[]>
) {
	state.lembretes = action.payload;
	state.loading = false;
}

export const { lembretes } = lembreteSlice.getInitialState();
export const { destroyAll, archiveOne, recoverOne } = lembreteSlice.actions;

export default lembreteSlice;
