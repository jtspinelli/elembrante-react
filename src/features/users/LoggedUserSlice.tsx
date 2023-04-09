import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserViewModel from '../../app/viewModels/UserViewModel';
import { getLembretes } from '../lembretes/thunks';
import Lembrete from '../../app/types/Lembrete';
import { AxiosError } from 'axios';

interface IInitialState {
	loggedUser: UserViewModel | null;
}

const initialState: IInitialState = {
	loggedUser: null
};

const LoggedUserSlice = createSlice({
	name: 'logged-user',
	initialState,
	reducers: {
		setLoggedUser(state, action: PayloadAction<UserViewModel | null>){
			state.loggedUser = action.payload;
		}
	},
	extraReducers({addCase}){
		addCase(getLembretes.fulfilled, onGetLembretesCompleted);
	}
});

function onGetLembretesCompleted(state: IInitialState, action: PayloadAction<Lembrete[] | AxiosError>){
	if(action.payload instanceof AxiosError && action.payload.response?.data === 'Token não encontrado ou inválido.'){
		state.loggedUser = null;
	}
}

export const { setLoggedUser } = LoggedUserSlice.actions;
export default LoggedUserSlice;