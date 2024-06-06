import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message } from "yup";

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

export const getMessages = createAsyncThunk("/api/message/getMessages", async (conversationId: string) => {
    try {
        const response: AxiosResponse = await axios.get(`${MESSAGE_API_URL}/get-message/${conversationId}`,{ withCredentials: true });
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const sendMessages = createAsyncThunk("/api/message/getMessages", async (messageData: Message) => {
    try {
        const response: AxiosResponse = await axios.post(`${MESSAGE_API_URL}/send-message`, {messageData},{ withCredentials: true });
        console.log("Message response--------",response);
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const startConversation = createAsyncThunk("/api/conversation/add-conversation", async ({senderId, receiverId}: {senderId: string, receiverId: string}) => {
    try {
        const response: AxiosResponse = await axios.post(`${CONVERSATION_API_URL}/add-conversation`, {senderId, receiverId},{ withCredentials: true });
        console.log("conversation start response--------",response);
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});