import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import reducers from "./reducers/index";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
   return {
      getItem(_key) {
         return Promise.resolve(null);
      },
      setItem(_key, value) {
         return Promise.resolve(value);
      },
      removeItem(_key) {
         return Promise.resolve();
      },
   };
};

const storage =
   typeof window !== "undefined"
      ? createWebStorage("local")
      : createNoopStorage();

const persistConfig = {
   key: "fazzpay",
   storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export const persistedStore = persistStore(store);
export default store;
