import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Privacy } from "./types";
import { RootState } from "../../../app/store";

interface UploadState {
    title: string;
    description: string;
    hashtags: string[];
    privacy: Privacy;
    allowComments: boolean;
    scheduledAt: string | null;
}

const initialState: UploadState = {
    title: "",
    description: "",
    hashtags: [],
    privacy: "public",
    allowComments: true,
    scheduledAt: null,
};

const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },
        setHashtags(state, action: PayloadAction<string[]>) {
            state.hashtags = action.payload;
        },
        setScheduledAt(state, action: PayloadAction<string>) {
            state.scheduledAt = action.payload;
        },
        setPrivacy(state, action: PayloadAction<Privacy>) {
            state.privacy = action.payload;
        },
        setAllowComments(state, action: PayloadAction<boolean>) {
            state.allowComments = action.payload;
        },
    },
});

export const {
    setTitle,
    setDescription,
    setHashtags,
    setPrivacy,
    setAllowComments,
    setScheduledAt,
} = uploadSlice.actions;
export default uploadSlice.reducer;

// Селекторы
export const selectUploadData = (state: RootState): UploadState => state.upload;
