import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: {
    open: true,
    width: 500,
  },
  reducers: {
    setOpen(state, action) {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = sideBarSlice.actions;
export default sideBarSlice;
