import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./model/slice";
import accountsReducer from "../entities/account/model/slice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        accounts: accountsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
