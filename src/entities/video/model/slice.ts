import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

interface VideoState {
    file: File | null; // файл может быть или отсутствовать
}

const initialState: VideoState = {
    file: null,
};

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideoFile(state, action: PayloadAction<File>) {
            state.file = action.payload;
        },
        // опционально: очистка
        clearVideoFile(state) {
            state.file = null;
        },
    },
});

export const { setVideoFile, clearVideoFile } = videoSlice.actions;
export default videoSlice.reducer;

// Селекторы
export const selectVideo = (state: RootState) => state.video.file;
