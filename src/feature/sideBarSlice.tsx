import { createSlice } from "@reduxjs/toolkit";

export const sideBarWidth = 500;

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: {
    open: true,
    width: sideBarWidth,
  },
  reducers: {
    setOpen(state, action) {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = sideBarSlice.actions;
export default sideBarSlice;
