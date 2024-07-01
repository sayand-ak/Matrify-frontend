import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const FEEDBACK_API_URL = "http://localhost:4000/api/feedback";


 export const addFeedback = createAsyncThunk("/api/addFeedback", async(formData: FormData) => {
    try {
        const response = await axios.post(
            `${FEEDBACK_API_URL}/add-feedback`, 
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
 });


 export const getFeedback = createAsyncThunk("/api/getFeedback", async() => {
    try {
        const response = await axios.get(`${FEEDBACK_API_URL}/get-user-feedback`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
 });

 export const getAllFeedback = createAsyncThunk("/api/getAllFeedback", async() => {
    try {
        const response = await axios.get(`${FEEDBACK_API_URL}/get-all-feedback`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
 });
 
 export const limitListFeedback = createAsyncThunk("/api/limitListFeedback", async(count: number) => {
    try {
        const response = await axios.get(`${FEEDBACK_API_URL}/limit-find-feedback/page?count=${count}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
 });
 
 export const archiveFeedback = createAsyncThunk("/api/archiveFeedback", async(feedbackId: string[]) => {
    try {
        const response = await axios.patch(`${FEEDBACK_API_URL}/archive-feedback`, {feedbackId}, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
 });