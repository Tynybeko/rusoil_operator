import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISlice, IWorkSpaces, InitialObjectType } from "../../types";
import { PRIMARY_API } from "../../axios";




const initialState: ISlice<IWorkSpaces[]> = {
    data: null,
    isLoading: false,
    isError: false
}

const HistorySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(FetchHistory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(FetchHistory.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(FetchHistory.fulfilled, (state, { payload }) => {
                state.isError = false
                state.data = payload
                state.isLoading = false
            })
    },
})


export const FetchHistory = createAsyncThunk('history/FetchHistory', async (payload: InitialObjectType, { rejectWithValue }) => {
    try {
        const { data } = await PRIMARY_API.get('/work-spaces/', {
            params: { ...payload }
        })
        return data
    } catch (e) {
        return rejectWithValue(e)
    }
})






export const historySlice = HistorySlice.reducer
const historyActions = HistorySlice.actions
export default historyActions