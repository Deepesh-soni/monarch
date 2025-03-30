import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import authInfoSlice from "./slices/auth";
import sidebarReducer from "./slices/sidebarSlice";
import storeInfoSlice from "./slices/storeDetails";

const persistConfig = {
  key: "pamperant",
  storage,
  //   whitelist: ["disclaimer", "package", "appConfig"],
};

const rootReducer = combineReducers({
  auth: authInfoSlice,
  sidebar: sidebarReducer,
  activeStore: storeInfoSlice,
});

// const reducer = (state, action) => {
//     if (action.type === "persist/REHYDRATE") {
//       return { ...state };
//     } else if (action.type === HYDRATE) {
//       const nextState = {
//         ...state, // use previous state
//         auth: action.payload.auth,
//       };
//       return nextState;
//     } else {
//       return rootReducer(state, action);
//     }
//   };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
});

// const middlewares = [thunk];

// const composeEnhancers =
//   process.env.NEXT_PUBLIC_ENV !== "production" &&
//   typeof window === "object" &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//       })
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export const persistor = persistStore(store);

const initStore = () => {
  return store;
};

export const wrapper = createWrapper(initStore, { debug: false });
