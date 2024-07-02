import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
})

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer