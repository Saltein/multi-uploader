import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { Account } from "./types";

// Тип состояния
interface AccountsState {
    accounts: Account[];
    isLoading: boolean;
    error: string | null;
}

const initialState: AccountsState = {
    accounts: [
        { id: "1", platform: "YouTube", username: "myYT", connected: true },
        { id: "2", platform: "TikTok", username: "myTikTok", connected: false },
        { id: "3", platform: "Instagram", username: "myIG", connected: true },
        { id: "4", platform: "VK Clips", username: "myVK", connected: false },
    ],
    isLoading: false,
    error: null,
};

const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        addAccount(state, action: PayloadAction<Account>) {
            state.accounts.push(action.payload);
        },
        removeAccount(state, action: PayloadAction<string>) {
            state.accounts = state.accounts.filter(
                (acc) => acc.id !== action.payload,
            );
        },
        updateAccount(state, action: PayloadAction<Account>) {
            const index = state.accounts.findIndex(
                (acc) => acc.id === action.payload.id,
            );
            if (index !== -1) {
                state.accounts[index] = action.payload;
            }
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setAccounts(state, action: PayloadAction<Account[]>) {
            state.accounts = action.payload;
        },
    },
});

export const {
    addAccount,
    removeAccount,
    updateAccount,
    setLoading,
    setError,
    setAccounts,
} = accountsSlice.actions;

export default accountsSlice.reducer;

// Селекторы
export const selectAccounts = (state: RootState) => state.accounts.accounts;
export const selectConnectedAccounts = (state: RootState) =>
    state.accounts.accounts.filter((acc) => acc.connected);
export const selectNotConnectedAccounts = (state: RootState) =>
    state.accounts.accounts.filter((acc) => !acc.connected);
export const selectAccountsLoading = (state: RootState) =>
    state.accounts.isLoading;
export const selectAccountsError = (state: RootState) => state.accounts.error;
