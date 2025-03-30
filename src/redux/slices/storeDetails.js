import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeId: null,
  storeDetails: null,
  storeServices: null,
  storeStylist: null,
  transformedStoreServices: null,
};

export const storeInfoSlice = createSlice({
  name: "storeDetails",
  initialState,
  reducers: {
    setStoreDetails: (state, action) => {
      state.storeDetails = action.payload;
    },
    setStoreStylistList: (state, action) => {
      state.storeStylist = action.payload;
    },
    setStoreServicesList: (state, action) => {
      state.storeServices = action.payload;
    },
    transformStoreServicesList: state => {
      state.transformedStoreServices = state.storeServices?.flatMap(category =>
        category?.services.map(service => ({
          _id: service?._id,
          serviceName: service?.serviceName,
          servicePrice: service?.servicePrice,
        }))
      );
    },
  },
});

export const {
  setStoreDetails,
  setStoreStylistList,
  setStoreServicesList,
  transformStoreServicesList,
} = storeInfoSlice.actions;
export default storeInfoSlice.reducer;
