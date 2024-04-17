
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"; 
import User from "./slices/userSlice"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
} 

const store = configureStore({
    reducer: {
        User: persistReducer(persistConfig, User)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['some.path.to.ignore'],
            },
        }),
});

const persistedStore = persistStore(store)

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { store, persistedStore, useAppDispatch, useAppSelector };
