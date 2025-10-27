// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./Login/toolkit/slice/AutenticacionRedux";
// export const store = configureStore({
//   reducer: {
//     auth: authReducer,

//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa localStorage
import authReducer from "./Login/toolkit/slice/AutenticacionRedux";

// 1️⃣ Combina tus reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// 2️⃣ Configura redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Qué reducers quieres guardar (puedes agregar más)
};

// 3️⃣ Crea el reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Crea el store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Necesario para redux-persist
    }),
});

// 5️⃣ Crea el persistor
export const persistor = persistStore(store);

// Tipos de Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
