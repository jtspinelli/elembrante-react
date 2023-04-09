import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLembretes } from '../lembretes/thunks';
import { AxiosError } from 'axios';
import Lembrete from '../../app/types/Lembrete';

const configSlice = createSlice({
	name: 'config',
	initialState: {
		mainWidth: 1000,
		loading: false,
		serverError: false
	},
	reducers: {
		setWidth(state, action){
			state.mainWidth = action.payload;
		},
		setLoading(state, action: PayloadAction<boolean>){
			state.loading = action.payload;
		},
		clearServerError(state){
			state.serverError = false;
		}		
	},
	extraReducers({addCase}){
		addCase(getLembretes.fulfilled, checkStatus);
	}
});

function checkStatus(state: {mainWidth: number, loading: boolean, serverError: boolean}, action: PayloadAction<Lembrete[] | AxiosError>){
	if(action.payload instanceof AxiosError && action.payload.response?.status === 500){
		state.serverError = true;
	}
}

export const { setWidth, setLoading, clearServerError } = configSlice.actions;
export default configSlice;
