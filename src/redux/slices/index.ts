import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { workersSlice } from "./workers";
import { historySlice } from "./history";
import { operatorSlice } from "./operator";


const rootReducer = combineReducers({
    auth: authSlice,
    workers: workersSlice,
    history: historySlice,
    operator: operatorSlice
})

export default rootReducer