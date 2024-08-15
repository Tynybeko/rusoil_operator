import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GasStations, IInitiaBaseState, IWorkProccess } from "../../types";
import { API } from "../../axios";



const initialState: IInitiaBaseState<IWorkProccess> = {
    data: null,
    isError: false,
    isLoading: false
}



const GasStationSlice = createSlice({
    name: 'station',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(FetchGetStation.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(FetchGetStation.rejected, (state) => {
                state.isError = true
                state.isLoading = false
                state.data = null
            })
            .addCase(FetchGetStation.fulfilled, (state, { payload }) => {
                state.isError = false
                state.isLoading = false
                state.data = payload
            })
    },
})




export const FetchGetStation = createAsyncThunk('station/FetchGetStation', async (station: number) => {
    try {
        const { data } = await API.get('/work-process/' + station)
        return Promise.resolve(data)
    } catch (e) {
        return Promise.reject(e)
    }
})

export const gasStationSlice = GasStationSlice.reducer