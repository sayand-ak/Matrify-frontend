import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminLoginType } from "../typings/admin/loginType";


const API_URL = process.env.ADMIN_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {

    const token = localStorage.getItem("adminAccess");
    console.log('log from request admin api', token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


axiosInstance.interceptors.response.use(
    (response) => {

        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('adminRefresh');

        if (error.response.status === 401 && !originalRequest._retry && refreshToken) {

            console.log('from response axios');

            originalRequest._retry = true;
            try {
                console.log('from try catch response');

                const newAccessToken = await getNewAccessToken(refreshToken);
                localStorage.setItem('adminAccess', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        console.log('from response error');

        return Promise.reject(error);
    }
);


async function getNewAccessToken(refreshToken: string) {
    // Implement your logic to fetch a new access token using the refresh token
    // send a POST request to your backend API with the refresh token
    const response = await axiosInstance.post(`${API_URL}/refresh-token`, { refreshToken }, { withCredentials: true });
    console.log("response from refresh token route--------------------", response);

    return response.data.accessToken;
}


export const loginAdminAsync = createAsyncThunk("/api/admin/login", async ({ email, password }: AdminLoginType) => {
    const response: AxiosResponse = await axiosInstance.post(`${API_URL}/login`, {
        email,
        password,
    }, { withCredentials: true });

    console.log(response);

    return response.data;
});

export const listUser = createAsyncThunk("/api/admin/list-users", async (count: number) => {
    try{
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/list-users/page?count=${count}`, { withCredentials: true });
    
        return response.data;
    } catch(error) {
        return (error as Error).message;
    }
});

export const searchUser = createAsyncThunk("/api/admin/search-users", async (searchTxt: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/search-user/text?expr=${searchTxt}`, { withCredentials: true });
    
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const listSubscription = createAsyncThunk("/api/admin/list-subscription", async (count: number) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/list-subscriptions/page?count=${count}`, { withCredentials: true });
    
        return response.data;
        
    } catch (error) {
        return (error as Error).message;
    }
});



interface AddSubscriptionPayload {
    amount: {
        weekly: number;
        monthly: number;
        yearly: number;
    },
    status: string;
}

export const addSubscription = createAsyncThunk('admin/addSubscription', async (subscriptionData: AddSubscriptionPayload) => {
    try {
        const response: AxiosResponse = await axios.post(
            `${API_URL}/add-subscription`,
            subscriptionData,
            { withCredentials: true }
        );
        return response.data;
        
    } catch (error) {
        return (error as Error).message;
    }
}
);

interface AddSubscriptionOfferPayload {
    title: string;
    description: string;
    offerPercentage: number;
    startsAt: string;
    endsAt: string;
}


export const addSubscriptionOffer = createAsyncThunk('admin/addSubscriptionOffer', async (offerData: AddSubscriptionOfferPayload) => {
    try {
        const response: AxiosResponse = await axios.post(
            `${API_URL}/add-offers`,
            offerData,
            { withCredentials: true }
        );
        return response.data;
        
    } catch (error) {
        return (error as Error).message;
    }
}
);

export const listSubscriptionOffers = createAsyncThunk("/api/admin/list-subscription-offers", async (count: number) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/list-subscription-offers/page?count=${count}`, { withCredentials: true });
    
        return response.data;
        
    } catch (error) {
        return (error as Error).message;
    }
});

export const listPaymentHistory = createAsyncThunk("/api/admin/list-payment-history", async (count: number) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/list-payment-history/page?count=${count}`, { withCredentials: true });
    
        return response.data;
        
    } catch (error) {
        return (error as Error).message;
    }
});


export const getReportData = createAsyncThunk("/api/getReportData", async (count: number) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/get-report-data/page?count=${count}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const updateReportStatus = createAsyncThunk("/api/updateReportStatus", async (reportId: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/update-report-status/?reportId=${reportId}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const dashboardUserCount = createAsyncThunk("/api/dashboardUserCount", async () => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/dashboard-user-count`, { withCredentials: true })
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const dashboardUserRate = createAsyncThunk("/api/dashboardUserRate", async (type: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/dashboard-user-rate/${type}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const findUser = createAsyncThunk("/api/findUser", async (id: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/find-user/${id}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const dashboardPaymentRate = createAsyncThunk("/api/dashboardPaymentRate", async () => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/payment-method-rate`, { withCredentials: true })
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const dashboardTotalRevenue = createAsyncThunk("/api/dashboardTotalRevenue", async () => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/dashboard-total-revenue`, { withCredentials: true })
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const salesReport = createAsyncThunk("/api/salesReport", async (type: string = "") => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/sales-report/${type}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});

export const blockUser = createAsyncThunk("/api/blockUser", async (userId: string = "") => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/block-user/${userId}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
});