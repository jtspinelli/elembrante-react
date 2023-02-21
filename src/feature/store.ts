import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import lembreteSlice from './lembreteSlice';
import sideBarSlice from './sideBarSlice';
import editModalSlice from './editModalSlice';
import UsersSlice from './usersSlice';
import LoggedUserSlice from './LoggedUserSlice';

const persistedReducer = persistReducer({ key: 'lembretes', storage }, lembreteSlice.reducer);
const persistedUsers = persistReducer({ key:'users', storage }, UsersSlice.reducer);
const persistedLoggedUser = persistReducer({key: 'loggedUser', storage}, LoggedUserSlice.reducer);

const store = configureStore({
	reducer: {
		lembretesReducer: persistedReducer,
		usersReducer: persistedUsers,
		loggedUsersReducer: persistedLoggedUser,
		sideBarReducer: sideBarSlice.reducer,
		editModalReducer: editModalSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
