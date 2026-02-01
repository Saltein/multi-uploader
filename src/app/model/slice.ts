import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppPage } from "../model/types";
import { APP_PAGES } from "../pages";

interface AppState {
    currentPage: AppPage;
}

const initialState: AppState = {
    currentPage: APP_PAGES[0], // "home"
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<AppPage>) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setCurrentPage } = appSlice.actions;
export default appSlice.reducer;

export const selectCurrentPage = (state: { app: AppState }) =>
    state.app.currentPage;
