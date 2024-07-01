// src/features/peerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PeerState {
    peer: RTCPeerConnection | null;
    remoteStream: MediaStream | null;
}

const initialState: PeerState = {
    peer: null,
    remoteStream: null,
};

const peerSlice = createSlice({
    name: 'peer',
    initialState,
    reducers: {
        setPeer(state, action: PayloadAction<RTCPeerConnection | null>) {
            state.peer = action.payload;
        },
        setRemoteStream(state, action: PayloadAction<MediaStream | null>) {
            state.remoteStream = action.payload;
        },
        clearPeer(state) {
            state.peer = null;
            state.remoteStream = null;
        },
    },
});

export const { setPeer, setRemoteStream, clearPeer } = peerSlice.actions;

export { peerSlice };
