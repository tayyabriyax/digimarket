import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slices/authSlice";

const authPersistConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});

export const persistor = persistStore(store);
