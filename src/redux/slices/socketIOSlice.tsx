import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

// Define the types used for socket users
interface SocketUserType {
    userId: string;
    socketId: string;
}

// Define the initial state for the socket slice
interface SocketState {
    socket: Socket | null;
    isConnected: boolean;
    usersOnline: SocketUserType[];
}

// Define the initial state
const initialState: SocketState = {
    socket: null,
    isConnected: false,
    usersOnline: [],
};

// Create the socket slice
const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket(state, action) {
            state.socket = action.payload;
        },
        setIsConnected(state, action) {
            state.isConnected = action.payload;
        },
        setUsersOnline(state, action) {
            state.usersOnline = action.payload;
        },
        addUser(state, action) {
            state.usersOnline.push(action.payload);
        },
        removeUser(state, action) {
            state.usersOnline = state.usersOnline.filter(user => user.userId !== action.payload);
        },
    },
});

// Export actions and reducer
export const { setSocket, setIsConnected, setUsersOnline, addUser, removeUser } = socketSlice.actions;
export { socketSlice };
