import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitiaBaseState, ISlice, IUser, IWork, IWorkProccess, InitialObjectType } from "../../types";
import { API, PRIMARY_API } from "../../axios";




interface IOperator extends ISlice<IWorkProccess[]> {
    changed: null | IUser
}

const initialState: IOperator = {
    data: null,
    changed: null,
    isLoading: false,
    isError: false
}

const OperatorSlice = createSlice({
    name: 'operator',
    initialState,
    reducers: {
        add(state, { payload }) {
            if (state.data) {
                state.data.results = [...state.data.results, payload]
            }
        },
        remove(state, { payload }) {
            if (state.data) {
                state.data.results = state.data.results.filter(item => item.id != payload.id)
            }
        },
        login(state, { payload }) {
            if (state.data) {
                state.changed = payload
            }
        },
        logout(state) {
            localStorage.removeItem('scnToken')
            state.changed = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(FetchWorkProccess.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(FetchWorkProccess.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(FetchWorkProccess.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.data = payload
            })
        builder
            .addCase(FetchAuthOperator.pending, (state) => {
                state.isLoading = true
                state.isError = false

            })
            .addCase(FetchAuthOperator.rejected, (state) => {
                state.isLoading = false
                state.isError = true
                state.changed = null
                localStorage.removeItem('scnToken')
            })
            .addCase(FetchAuthOperator.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.isError = false
                state.changed = payload
            })
    },
})



export const FetchWorkProccess = createAsyncThunk('operator/FetchWorkProccess', async (payload: InitialObjectType, { rejectWithValue }) => {
    try {
        const { data } = await PRIMARY_API.get('/work-process/', {
            params: payload
        })
        return data
    } catch (e: any) {
        return rejectWithValue(e)
    }
})

export const FetchAuthOperator = createAsyncThunk('operator/FetchAuthOperator', async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get('/accounts/profile/')
        return data
    } catch (e) {
        return rejectWithValue(e)
    }
})


export const operatorSlice = OperatorSlice.reducer
const OperatorActions = OperatorSlice.actions
export default OperatorActions



