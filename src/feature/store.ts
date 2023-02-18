import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import lembreteSlice from './lembreteSlice';
import sideBarSlice from './sideBarSlice';
import editModalSlice from './editModalSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, lembreteSlice.reducer);

const store = configureStore({
	reducer: {
		lembretesReducer: persistedReducer,
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
