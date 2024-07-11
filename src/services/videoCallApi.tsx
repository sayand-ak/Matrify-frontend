import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { VideoCallData } from "../typings/videoCall/videoCall";

const VIDEO_CALL_API_URL = process.env.VIDEO_CALL_API_URL;


 export const newCall = createAsyncThunk("/api/newCall", async(videoCallData: VideoCallData) => {
    try {
        const response = await axios.post(`${VIDEO_CALL_API_URL}/new-call`, videoCallData, {withCredentials: true});
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
 });


 export const changeCallStatus = createAsyncThunk("/api/changeCallStatus", async({roomId, status}: {roomId: string, status: string}) => {
    try {
        const response = await axios.patch(`${VIDEO_CALL_API_URL}/change-call-status`, {roomId: roomId, status: status}, {withCredentials: true});
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const getCallStatus = createAsyncThunk("/api/getCallStatus", async(roomId: string) => {
    try {
        const response = await axios.get(`${VIDEO_CALL_API_URL}/get-call-status/${roomId}`, {withCredentials: true});
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const getCallHistory = createAsyncThunk("/api/getCallHistory", async(userId: string) => {
    try {
        const response = await axios.get(`${VIDEO_CALL_API_URL}/get-call-history/${userId}`, {withCredentials: true});
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});


