import { createSlice } from "@reduxjs/toolkit";
import { loginAdminAsync } from "../../services/adminAPI";
import { AdminState } from "../../typings/admin/loginType";

const getStoredAdminInfo = () => {
    try {
        const storedInfo = localStorage.getItem('admin');
        return storedInfo ? JSON.parse(storedInfo) : null;
    } catch (error) {
        console.error('Error parsing admin info from local storage:', error);
        return null;
    }
};

const adminInitialState: AdminState = {
    admin: getStoredAdminInfo() ,
    status: 'idle',
};

const adminSlice = createSlice({
    name: 'admin',
    initialState: adminInitialState,
    reducers: {
        setAdminCredentials: (state, action) => {
            state.admin = action.payload;
            localStorage.setItem('admin', JSON.stringify(action.payload))
        },
        adminLogout: (state) => {
            state.admin = null;
            localStorage.removeItem('admin')
        },
    },
    extraReducers(builder) {
        builder.addCase(loginAdminAsync.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(loginAdminAsync.fulfilled, (state, action) => {
            state.status = "success"
            state.admin = action.payload
            state.error = null
        })
        builder.addCase(loginAdminAsync.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
    },
});

export const { setAdminCredentials, adminLogout } = adminSlice.actions;

export { adminSlice };
