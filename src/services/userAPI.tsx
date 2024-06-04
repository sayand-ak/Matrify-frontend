import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserGoogleAuthData, UserLoginType, UserSignupType } from "../typings/user/userTypes";
import { ProfessionData } from "../typings/Profile/professionDataType";
import { FamilyData, ReligionData } from "../typings/Profile/familyDataTypes";

interface Error {
    response?: {
        data?: {
            message: string
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
        console.log(error.response.status, "----------", originalRequest, "--------", refreshToken);

        if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
            console.log("from user axios.........");

            originalRequest._retry = true;
            try {
                const newAccessToken = await getNewAccessToken(refreshToken);
                console.log(newAccessToken, "new access token from user axios");

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
    const response = await axiosInstance.post(`${API_URL}/refresh-token`, { refreshToken }, { withCredentials: true });
    console.log("response from refresh token route--------------------", response);

    return response.data.accessToken;
}


export const signupUserAsync = createAsyncThunk("/api/user/signup", async (phone: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/signup`, {
            phone,
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const otpVerify = createAsyncThunk("/api/user/otp-verify", async ({ username, phone, password, firebaseData }: UserSignupType) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/otp-verify`, {
            username,
            phone,
            password,
            firebaseData
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});


export const googleAuthLogin = createAsyncThunk("/api/user/googleLogin", async (userData: UserGoogleAuthData) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/google-login`, { userData }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const userLogin = createAsyncThunk("/api/user/login", async ({ data, password }: UserLoginType) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/login`, {
            data: data,
            password: password
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const setProfile = createAsyncThunk("/api/user/setProfile", async (formData: FormData) => {
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
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const validateToken = createAsyncThunk("/api/user/validateToken", async (token: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/validate-token`, {
            token
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const resetPassword = createAsyncThunk("/api/user/resetPassword", async ({ userId, newPassword }: { userId: string, newPassword: string }) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/reset-password`, {
            userId,
            newPassword
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const setProfessionData = createAsyncThunk("/api/user/setProfessionData", async (professionData: ProfessionData) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/set-profession`, {
            professionData
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const setFamilyData = createAsyncThunk("/api/user/setFamilyData", async (familyData: FamilyData) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/set-family-details`, {
            familyData
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});


export const addDocs = createAsyncThunk("/api/user/addDocs", async (formData: FormData) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/add-docs `,
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

export const addReligion = createAsyncThunk("/api/user/addReligion", async (religionData: ReligionData) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/add-religion `,
            religionData
            , { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});


export const getStateApiAccessToken = async () => {
    try {
        const response: AxiosResponse = await axios.get(
            "https://www.universal-tutorial.com/api/getaccesstoken",
            {
                headers: {
                    "api-token": process.env.STATE_API_KEY,
                    "Accept": "application/json",
                    "user-email": "sayandak2002@gmail.com"
                }
            }
        );
        return response.data;
    } catch (error) {
        // Handle errors here
        console.error("Error fetching access token:", error);
        return null; // Or throw an error or handle it based on your needs
    }
};

export const getStatesApi = async (accessToken: string) => {
    try {
        const response: AxiosResponse = await axios.get(
            `https://www.universal-tutorial.com/api/cities/india`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Accept": "application/json",
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log("error in states data");

        return null
    }
}


export const getCitiesApi = async (accessToken: string, selectedState: string) => {
    try {
        const response: AxiosResponse = await axios.get(
            `https://www.universal-tutorial.com/api/cities/${selectedState}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Accept": "application/json",
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log("error in states data");

        return null
    }
}

export const userProfile = createAsyncThunk("/api/user/users-profile", async (userId: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/profile/${userId}`, { withCredentials: true });

        return response.data;

    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const addPreferences = createAsyncThunk("/api/user/add-preferences", async (preference: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/add-preferences`, { preference: preference }, { withCredentials: true });

        return response.data;

    } catch (error) {
        return (error as Error).response?.data;
    }
});


export const editProfile = createAsyncThunk("/api/user/editProfile", async (formData: FormData) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(
            `${API_URL}/edit-user-details`,
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

export const getActiveSubscription = createAsyncThunk("/api/user/getActiveSubscription", async () => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/get-active-subscription`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const createSubscriptionSession = createAsyncThunk("/api/user/createSubscriptionSession", async ({ subId, type, amount, userId }: { subId: string, type: string, amount: number, userId: string }) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/create-checkout-session`, { subId: subId, type: type, amount: amount, userId: userId }, { withCredentials: true });
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});

export const findActiveOffer = createAsyncThunk("/api/user/findActiveOffer", async () => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/get-active-offer`)
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});



export const searchPartner = createAsyncThunk("/api/user/searchPartner", async (text: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/search-partner/${text}`)
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});

export const saveSearchData = createAsyncThunk("/api/user/saveSearchData", async (searchData: { text: string, date: Date, searchResult: string[] }) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/add-search-data`, searchData, { withCredentials: true })
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});


export const editFamilyData = createAsyncThunk("/api/user/editFamilyData", async (familyData: FamilyData) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/edit-family-details`, familyData, { withCredentials: true })
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});

export const getMatches = createAsyncThunk("/api/user/getMatches", async ({ matchBase, matchKey, matchData }: { matchBase: string, matchKey: string, matchData: string }) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/get-matches?matchBase=${matchBase}&matchKey=${matchKey}&matchData=${matchData}`, { withCredentials: true })
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});

export const sendInterest = createAsyncThunk("/api/user/sendInterest", async (targetUserId: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/send-interest`, {targetUserId: targetUserId}, { withCredentials: true })
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});

export const updateInterestStatus = createAsyncThunk("/api/user/updateInterestStatus", async ({targetUserId, status}: {targetUserId: string, status: string}) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/update-interest-status`, {targetUserId: targetUserId, status: status}, { withCredentials: true })
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});