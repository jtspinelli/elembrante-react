import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import lembreteSlice from '../features/lembretes/lembreteSlice';
import sideBarSlice from '../features/sideBar/sideBarSlice';
import editModalSlice from '../features/editModal/editModalSlice';
import UsersSlice from '../features/users/usersSlice';
import LoggedUserSlice from '../features/users/LoggedUserSlice';
import configSlice from '../features/config/configSlice';

const persistedReducer = persistReducer({ key: 'lembretes', storage }, lembreteSlice.reducer);
const persistedUsers = persistReducer({ key:'users', storage }, UsersSlice.reducer);
const persistedLoggedUser = persistReducer({key: 'loggedUser', storage}, LoggedUserSlice.reducer);

const store = configureStore({
	reducer: {
		lembretesReducer: persistedReducer,
		usersReducer: persistedUsers,
		loggedUsersReducer: persistedLoggedUser,
		sideBarReducer: sideBarSlice.reducer,
		editModalReducer: editModalSlice.reducer,
		configReducer: configSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
