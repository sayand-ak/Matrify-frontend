import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../typings/user/userTypes";

const getStoredUserInfo = () => {
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
        setUserCredentials: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        userLogout: (state) => {
            state.user = null;
            localStorage.removeItem('user')
        },
    },
    extraReducers() {
       
    },
});

export const { setUserCredentials, userLogout } = userSlice.actions;

export { userSlice };
