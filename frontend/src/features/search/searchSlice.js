import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: "search", 
    initialState: "", 
    reducers: {
        updateSearch: (state, { payload }) => payload.toLowerCase(), 
        clearInput: () => ""
    }
})
export const { updateSearch, clearInput } = searchSlice.actions; 
export default searchSlice.reducer;
export const selectSearch = (state) => state.search;