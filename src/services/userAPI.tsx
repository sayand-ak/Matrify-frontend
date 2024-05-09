import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserGoogleAuthData, UserLoginType, UserSignupType } from "../typings/user/userTypes";

const API_URL = "http://localhost:4000/api/user";

interface Error{
  response?:{
    data?:{
      message:string
    }
  }
}

export const signupUserAsync = createAsyncThunk("/api/user/signup", async (phone:string) => {
  try {
      const response: AxiosResponse = await axios.post(`${API_URL}/signup`, {
        phone,
      });
      
      return response.data;
  } catch (error) {    
    return (error as Error).response?.data;
  }
});

export const otpVerify = createAsyncThunk("/api/user/otp-verify", async ({username, phone, password, firebaseData}: UserSignupType) => {
  try {
      const response: AxiosResponse = await axios.post(`${API_URL}/otpVerify`, {
        username,
        phone,
        password,
        firebaseData
      });
      
      return response.data;
  } catch (error) {    
    return (error as Error).response?.data;
  }
});


export const googleAuthLogin = createAsyncThunk("/api/user/googleLogin", async (userData: UserGoogleAuthData) => {
  try {
      const response: AxiosResponse = await axios.post(`${API_URL}/googleLogin`, {userData});
      
      return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
});

export const userLogin = createAsyncThunk("/api/user/googleLogin", async ({data, password}: UserLoginType) => {
  try {
      const response: AxiosResponse = await axios.post(`${API_URL}/login`, {
        data: data,
        password: password
      });
      
      return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
});
