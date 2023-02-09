import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/es/storage";
import lembreteSlice from "./lembreteSlice";

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, lembreteSlice.reducer)

const store = configureStore({
    reducer: {
        lembretesReducer: persistedReducer
    }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default store;