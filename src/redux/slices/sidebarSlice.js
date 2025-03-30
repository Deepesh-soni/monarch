import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebarReducer: state => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebarReducer } = sidebarSlice.actions;

export default sidebarSlice.reducer;
