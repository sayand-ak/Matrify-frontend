
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { adminSlice } from "../slices/adminSlices";
import { userSlice } from "../slices/userSlices";
import { socketSlice } from "../slices/socketIOSlice";
import { peerSlice } from "../slices/videoCallSlice";

const rootReducer = combineReducers({
    admin: adminSlice.reducer,
    user: userSlice.reducer,
    socket: socketSlice.reducer,
    peer: peerSlice.reducer
})
const store  = configureStore({
    reducer: rootReducer
})


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;