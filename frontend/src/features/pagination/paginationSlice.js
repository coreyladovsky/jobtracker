import { createSlice } from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
    name: "pagination",
    initialState: { startIdx: 0, endIdx: 15}, 
    reducers: {
        updateNumberOfRows: (state, { payload }) => {
            state["endIdx"] = state.startIdx + Number(payload);
        },
        nextPage: (state, { payload }) => {
            const diff = state.endIdx - state.startIdx;;
            state["startIdx"] = payload;
            state["endIdx"] = payload + diff; 
        }
    }
})

export const { updateNumberOfRows, nextPage } = paginationSlice.actions;
export default paginationSlice.reducer;

export const selectPagination = (state) => state.pagination;