import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { VideoCallData } from "../typings/videoCall/videoCall";

const VIDEO_CALL_API_URL = "http://localhost:4000/api/video-call";


 export const newCall = createAsyncThunk("/api/newCall", async(videoCallData: VideoCallData) => {
    try {
        const response = await axios.post(`${VIDEO_CALL_API_URL}/new-call`, videoCallData);
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
 })