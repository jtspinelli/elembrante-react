import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserViewModel from './UserViewModel';

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
	}
});

export const { setLoggedUser } = LoggedUserSlice.actions;
export default LoggedUserSlice;