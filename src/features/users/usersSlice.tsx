import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import User from '../../app/types/User';

const usersAdapter = createEntityAdapter<User>({
	selectId: (user) => user.id
});


const UsersSlice = createSlice({
	name: 'users',
	initialState: usersAdapter.getInitialState(),
	reducers: {
		add: usersAdapter.addOne,
		addAll: usersAdapter.addMany
	}
});

export const { selectAll } = usersAdapter.getSelectors((state: RootState) => state.usersReducer);
export const { add, addAll } = UsersSlice.actions;
export default UsersSlice;
