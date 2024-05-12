import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserGoogleAuthData, UserLoginType, UserSignupType } from "../typings/user/userTypes";

interface Error{
  response?:{
    data?:{
      message:string
    }
  }
}

const API_URL = "http://localhost:4000/api/user";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

//request interceptor
axiosInstance.interceptors.request.use((config) => {
  
  const token = localStorage.getItem("userAccess");
  console.log('log from request user api', token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//response interceptor
axiosInstance.interceptors.response.use((response) => {
  return response;
},
async (error) => {
  const originalRequest = error.config;
  const refreshToken = localStorage.getItem("userRefresh");
  console.log(error.response.status,"----------",originalRequest,"--------", refreshToken);
  
  if(error.response.status === 401 && !originalRequest._retry && refreshToken) {
    console.log("from user axios.........");

    originalRequest._retry = true;
    try {
      const newAccessToken = await getNewAccessToken(refreshToken); 
      console.log(newAccessToken,"new access token from user axios");
      
      localStorage.setItem('userAccess', newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  console.log("user error response interceptor");
  return Promise.reject(error);
});

async function getNewAccessToken(refreshToken: string) {
  // Implement your logic to fetch a new access token using the refresh token
  // send a POST request to your backend API with the refresh token
  const response = await axiosInstance.post(`${API_URL}/refresh-token`, { refreshToken },{withCredentials: true});
  console.log("response from refresh token route--------------------",response);
  
  return response.data.accessToken; 
}


export const signupUserAsync = createAsyncThunk("/api/user/signup", async (phone:string) => {
  try {
      const response: AxiosResponse = await axiosInstance.post(`${API_URL}/signup`, {
        phone,
      },{withCredentials: true});
      
      return response.data;
  } catch (error) {    
    return (error as Error).response?.data;
  }
});

export const otpVerify = createAsyncThunk("/api/user/otp-verify", async ({username, phone, password, firebaseData}: UserSignupType) => {
  try {
      const response: AxiosResponse = await axiosInstance.post(`${API_URL}/otp-verify`, {
        username,
        phone,
        password,
        firebaseData
      },{withCredentials: true});
      
      return response.data;
  } catch (error) {    
    return (error as Error).response?.data;
  }
});


export const googleAuthLogin = createAsyncThunk("/api/user/googleLogin", async (userData: UserGoogleAuthData) => {
  try {
      const response: AxiosResponse = await axiosInstance.post(`${API_URL}/google-login`, {userData},{withCredentials: true});
      
      return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
});

export const userLogin = createAsyncThunk("/api/user/login", async ({data, password}: UserLoginType) => {
  try {
      const response: AxiosResponse = await axiosInstance.post(`${API_URL}/login`, {
        data: data,
        password: password
      },{withCredentials: true});
      
      return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
});

export const setProfile = createAsyncThunk("/api/user/setProfile", async(formData: FormData) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      `${API_URL}/set-profile`,
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
    return (error as Error).response?.data;
  }
});

export const forgotPassword = createAsyncThunk("/api/user/forgotPassword", async (email: string) => {
  try {
      const response: AxiosResponse = await axiosInstance.post(`${API_URL}/forgot-password`, {
        email
      },{withCredentials: true});
      
      return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
});

export const validateToken = createAsyncThunk("/api/user/validateToken", async (token: string) => {
  try {
      const response: AxiosResponse = await axiosInstance.post(`${API_URL}/validate-token`, {
        token
      },{withCredentials: true});
      
      return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
});

export const resetPassword = createAsyncThunk("/api/user/resetPassword", async ({userId, newPassword}: {userId: string, newPassword: string}) => {
  try {
      const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/reset-password`, {
        userId,
        newPassword
      },{withCredentials: true});
      
      return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
});



