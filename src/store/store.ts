import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore, type Persistor } from "redux-persist";

import userStore from "./user/user";
import adminStore from "./admin/admin";

const userPersistConf = { key: 'user', storage }
const adminPersistConf = { key: 'admin', storage }

const rootReducer = combineReducers({ user: persistReducer(userPersistConf, userStore), admin: persistReducer(adminPersistConf, adminStore) })

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] }
  })
})

export const persistor: Persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch