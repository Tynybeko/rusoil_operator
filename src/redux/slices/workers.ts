import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISlice, IWork } from "../../types";
import { PRIMARY_API } from "../../axios";



const initialState: ISlice<IWork[]> = {
    data: null,
    isLoading: false,
    isError: false,
}


const WorkersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(FetchWorkers.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(FetchWorkers.rejected, (state, { payload }) => {
                state.isError = true
                state.isLoading = false
                state.data = null
            })
            .addCase(FetchWorkers.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.data = payload
                state.isError = false
            })
    },
})


export const FetchWorkers = createAsyncThunk('auth/FetchWorkers', async (payload: { [key: string]: any }, { rejectWithValue }) => {
    try {
        const { data } = await PRIMARY_API.get('/works/', {
            params: payload
        })
        return data
    } catch (e) {
        return rejectWithValue(e)
    }
})




export const workersSlice = WorkersSlice.reducer
const WorkersAction = WorkersSlice.actions
export default WorkersAction