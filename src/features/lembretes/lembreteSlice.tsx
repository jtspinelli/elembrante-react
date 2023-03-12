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
		}
	},
	extraReducers({ addCase }) {
		addCase(getLembretes.pending, loading);
		addCase(getLembretes.fulfilled, set);
	}
});

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
export const { destroyAll } = lembreteSlice.actions;

export default lembreteSlice;
