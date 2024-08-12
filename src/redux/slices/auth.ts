import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitiaBaseState, ISlice, IUser, IWork, InitialObjectType } from "../../types";
import { PRIMARY_API } from "../../axios";









const initialState: IInitiaBaseState<IWork> = {
    data: null,
    isLoading: false,
    isError: false

}


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.data = payload
        },
        logout: (state) => {
            state.data = null
            localStorage.removeItem('prmToken')
        }
    },
    extraReducers(builder) {
        builder
            .addCase(FetchProfileAuth.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(FetchProfileAuth.rejected, (state, { payload }) => {
                localStorage.removeItem('prmToken')
                state.isError = true
                state.isLoading = false
                window.location.replace('/auth')
            })
            .addCase(FetchProfileAuth.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isError = false
            })
            .addCase(FetchProfileLogin.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(FetchProfileLogin.rejected, (state, { payload }) => {
                localStorage.removeItem('prmToken')
                state.isError = true
                state.isLoading = false

            })
            .addCase(FetchProfileLogin.fulfilled, (state, { payload }) => {
                localStorage.setItem('prmToken', payload.token)
                state.isLoading = false
                state.data = payload.works
                state.isError = false
            })
    },
})


export const FetchProfileAuth = createAsyncThunk('auth/FetchProfileAuth', async (_, { rejectWithValue }) => {
    const TOKEN = localStorage.getItem('prmToken')
    if (!TOKEN) return rejectWithValue({ data: 'Forbidden' })
    try {
        const { data } = await PRIMARY_API.get('/accounts/profile/')
        return data
    } catch (e) {
        return rejectWithValue(e)
    }
})



export const FetchProfileLogin = createAsyncThunk('login/FetchProfileLogin', async (payload: InitialObjectType, { rejectWithValue }) => {
    try {
        const { data } = await PRIMARY_API.post('/accounts/employees/login/', payload)
        return data
    } catch (e) {
        return rejectWithValue('Неверный логин или пароль')
    }
})




export const authSlice = AuthSlice.reducer
const AuthActions = AuthSlice.actions
export default AuthActions