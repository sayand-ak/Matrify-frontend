import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../typings/user/userTypes";
import { userLogin } from "../../services/userAPI";

const getStoredUserInfo = (): UserState['user'] | null => {
    try {
        const storedInfo = localStorage.getItem('user');
        return storedInfo ? JSON.parse(storedInfo) : null;
    } catch (error) {
        console.error('Error parsing user info from local storage:', error);
        return null;
    }
};

const userInitialState: UserState = {
    user: getStoredUserInfo() ,
    status: 'idle',
};

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUserCredentials: (state, action: PayloadAction<UserState['user']>) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        userLogout: (state) => {
            state.user = null;
            localStorage.removeItem('user')
        },
    },
    extraReducers(builder) {
        builder.addCase(userLogin.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.status = "success"
            state.user = action.payload
            state.error = null
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
}});

export const { setUserCredentials, userLogout } = userSlice.actions;

export { userSlice };
