import { configureStore } from "@reduxjs/toolkit";
import lembreteSlice from "./lembreteSlice";

const store = configureStore({
    reducer: {
        lembretesReducer: lembreteSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;