import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: null,
  storeId: null,
};

export const authInfoSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // TODO: to be reverted - DS
    setUser: (state, action) => {
      state.user = { userType: 1, ...action.payload };
    },
    setRefreshedTokens: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setStoreId: (state, action) => {
      state.storeId = action.payload;
    },
    logout: state => {
      state.user = null;
      state.storeId = null;
    },
  },
});

export const { setUser, logout, setRefreshedTokens, setStoreId } =
  authInfoSlice.actions;
export default authInfoSlice.reducer;
