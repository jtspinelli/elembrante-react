import { getLembretes, archiveLembrete, recoverLembrete, removeLembrete } from './thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Lembrete from '../../app/types/Lembrete';

interface IInitialState {
	lembretes: Lembrete[],
	loading: boolean;
	archiving: boolean;
	recovering: boolean;
	deleting: boolean;
}

const initialState: IInitialState = {
	lembretes: [],
	loading: false,
	archiving: false,
	recovering: false,
	deleting: false
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
		},
		removeOne(state, action: PayloadAction<number>) {
			state.lembretes = state.lembretes.filter(l => l.id !== action.payload);
		},
		undoRemove(state, action: PayloadAction<Lembrete>) {
			state.lembretes = [...state.lembretes, action.payload];
		}
	},
	extraReducers({ addCase }) {
		addCase(getLembretes.pending, loading);
		addCase(getLembretes.fulfilled, set);
		addCase(archiveLembrete.fulfilled, archive);
		addCase(archiveLembrete.pending, setArchiving);
		addCase(recoverLembrete.fulfilled, recover);
		addCase(recoverLembrete.pending, setRecovering);
		addCase(removeLembrete.pending, setDeleting);
		addCase(removeLembrete.fulfilled, setDeleting);
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

function setDeleting(
	state: IInitialState, 
	action:PayloadAction<boolean | undefined, string, { arg: { id: number; accessToken: string; }; requestId: string; requestStatus: 'fulfilled' | 'pending'; }, never>
) {
	state.deleting = action.meta.requestStatus === 'pending';
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
export const { destroyAll, archiveOne, recoverOne, removeOne, undoRemove } = lembreteSlice.actions;

export default lembreteSlice;
