import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import orderSliceReducer from "./orderSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import inventorySlice from "./inventorySlice";
import portofolioSlice from "./portofolioSlice";
import financeSlice from "./financeSlice";
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userSliceReducer)
const orderPersistedReducer = persistReducer(persistConfig, orderSliceReducer)
const inventoryPersistedReducer = persistReducer(persistConfig, inventorySlice)
const portofolioPersistedReducer = persistReducer(persistConfig, portofolioSlice)
const financePersistedReducer = persistReducer(persistConfig, financeSlice)
export const store = configureStore({
  reducer: {
    user : persistedReducer,
    order : orderPersistedReducer,
    inventory: inventoryPersistedReducer,
    portofolio: portofolioPersistedReducer,
    finance: financePersistedReducer
  },
  middleware: [thunk]
});

export const persistor = persistStore(store)
