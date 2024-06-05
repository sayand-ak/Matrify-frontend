import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const CONVERSATION_API_URL = "http://localhost:4000/api/conversation";
const MESSAGE_API_URL = "http://localhost:4000/api/message";


export const getConversations = createAsyncThunk("/api/conversation/getConversations", async (userId: string) => {
    try {
        const response: AxiosResponse = await axios.get(`${CONVERSATION_API_URL}/get-conversation/${userId}`,{ withCredentials: true });
        
        console.log(response);
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const getMessages = createAsyncThunk("/api/conversation/getMessages", async (conversationId: string) => {
    try {
        const response: AxiosResponse = await axios.get(`${MESSAGE_API_URL}/get-message/${conversationId}`,{ withCredentials: true });
        console.log("Message response--------",response);
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});