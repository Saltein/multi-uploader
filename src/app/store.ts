import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./model/slice";
import accountsReducer from "../entities/account/model/slice";
import videoReducer from "../entities/video/model/slice";
import uploadReducer from "../processes/upload/model/slice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        accounts: accountsReducer,
        video: videoReducer,
        upload: uploadReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
