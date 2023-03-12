import { getLembretes, archiveLembrete, recoverLembrete } from './thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Lembrete from '../../app/types/Lembrete';

interface IInitialState {
	lembretes: Lembrete[],
	loading: boolean;
	archiving: boolean;
	recovering: boolean;
}

const initialState: IInitialState = {
	lembretes: [],
	loading: false,
	archiving: false,
	recovering: false
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
		addCase(archiveLembrete.fulfilled, archive);
		addCase(archiveLembrete.pending, setArchiving);
		addCase(recoverLembrete.fulfilled, recover);
		addCase(recoverLembrete.pending, setRecovering);
	}
});

function archive(state: IInitialState, action: PayloadAction<number>) {
	if(action.payload < 0) return;

	const lembrete = state.lembretes.find(l => l.id === action.payload);
	if(!lembrete) return;

	lembrete.arquivado = true;
	state.archiving = false;
}

function recover(state: IInitialState, action: PayloadAction<number>) {
	if(action.payload < 0) return;

	const lembrete = state.lembretes.find(l => l.id === action.payload);
	if(!lembrete) return;

	lembrete.arquivado = false;
	state.recovering = false;
}

function setArchiving(state: IInitialState) {
	state.archiving = true;
}

function setRecovering(state: IInitialState) {
	state.recovering = true;
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
