import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { workersSlice } from "./workers";
import { historySlice } from "./history";
import { operatorSlice } from "./operator";
import { gasStationSlice } from "./station";

const rootReducer = combineReducers({
    auth: authSlice,
    workers: workersSlice,
    history: historySlice,
    operator: operatorSlice,
    station: gasStationSlice
})

export default rootReducer