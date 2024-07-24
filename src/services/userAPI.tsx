import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserGoogleAuthData, UserLoginType, UserSignupType } from "../typings/user/userTypes";
import { ProfessionData } from "../typings/Profile/professionDataType";
import { FamilyData, ReligionData } from "../typings/Profile/familyDataTypes";
import { checkIfUserIsBlocked } from "./checkIfUserIsBlocked";
// import { checkIfUserIsBlocked } from "./checkIfUserIsBlocked";

interface Error {
    response?: {
        data?: {
            message: string
        }
    }
}

const API_URL = process.env.USER_API_URL;


const axiosInstance = axios.create({
    baseURL: API_URL,
});

//request interceptor
axiosInstance.interceptors.request.use(async(config) => {
    const isUserAllowed = await checkIfUserIsBlocked();

    if (!isUserAllowed) {
        window.location.href = "/"
        return Promise.reject("user is blocked");
    }

    const token = localStorage.getItem("userAccess");
    // console.log('log from request user api', token);

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
        // console.log(error.response.status, "----------", originalRequest, "--------", refreshToken);

        if (error.response.data.error === 'User is blocked') {
            alert("You are blocked by admin...")
            window.location.href = "/login"; 
            return Promise.reject(new Error("User is blocked"));
        }

        if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
            // console.log("from user axios.........");

            originalRequest._retry = true;
            try {
                const newAccessToken = await getNewAccessToken(refreshToken);
                // console.log(newAccessToken, "new access token from user axios");

                localStorage.setItem('userAccess', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        } 
        // console.log("user error response interceptor");
        return Promise.reject(error);
});

async function getNewAccessToken(refreshToken: string) {
    // Implement your logic to fetch a new access token using the refresh token
    // send a POST request to your backend API with the refresh token
    const response = await axiosInstance.post(`${API_URL}/refresh-token`, { refreshToken }, { withCredentials: true });
    // console.log("response from refresh token route--------------------", response);

    return response.data.accessToken;
}


export const signupUserAsync = createAsyncThunk("/api/signup", async (phone: string) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}/signup`, {
            phone,
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});


export const otpVerify = createAsyncThunk("/api/otp-verify", async ({ username, phone, password, firebaseData }: UserSignupType) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}/otp-verify`, {
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


export const googleAuthLogin = createAsyncThunk("/api/googleLogin", async (userData: UserGoogleAuthData) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}/google-login`, { userData }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const userLogin = createAsyncThunk("/api/login", async ({ data, password }: UserLoginType) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}/login`, {
            data: data,
            password: password
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const setProfile = createAsyncThunk("/api/setProfile", async (formData: FormData) => {
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

export const forgotPassword = createAsyncThunk("/api/forgotPassword", async (email: string) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}/forgot-password`, {
            email
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const validateToken = createAsyncThunk("/api/validateToken", async (token: string) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}/validate-token`, {
            token
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const resetPassword = createAsyncThunk("/api/resetPassword", async ({ userId, newPassword }: { userId: string, newPassword: string }) => {
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

export const setProfessionData = createAsyncThunk("/api/setProfessionData", async (professionData: ProfessionData) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/set-profession`, {
            professionData
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const setFamilyData = createAsyncThunk("/api/setFamilyData", async (familyData: FamilyData) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/set-family-details`, {
            familyData
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});


export const addDocs = createAsyncThunk("/api/addDocs", async (formData: FormData) => {
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

export const addReligion = createAsyncThunk("/api/addReligion", async (religionData: ReligionData) => {
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

export const userProfile = createAsyncThunk("/api/users-profile", async (userId: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/profile/${userId}`, { withCredentials: true });

        return response.data;

    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const addPreferences = createAsyncThunk("/api/add-preferences", async (preference: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/add-preferences`, { preference: preference }, { withCredentials: true });

        return response.data;

    } catch (error) {
        return (error as Error).response?.data;
    }
});


export const editProfile = createAsyncThunk("/api/editProfile", async (formData: FormData) => {
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

export const getActiveSubscription = createAsyncThunk("/api/getActiveSubscription", async () => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/get-active-subscription`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return (error as Error).response?.data;
    }
});

export const createSubscriptionSession = createAsyncThunk("/api/createSubscriptionSession", async ({ subId, type, amount, userId }: { subId: string, type: string, amount: number, userId: string }) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/create-checkout-session`, { subId: subId, type: type, amount: amount, userId: userId }, { withCredentials: true });
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});

export const findActiveOffer = createAsyncThunk("/api/findActiveOffer", async () => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/get-active-offer`)
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});



export const searchPartner = createAsyncThunk("/api/searchPartner", async (text: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/search-partner/${text}`)
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});

export const saveSearchData = createAsyncThunk("/api/saveSearchData", async (searchData: { text: string, date: Date, searchResult: string[] }) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/add-search-data`, searchData, { withCredentials: true })
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});


export const editFamilyData = createAsyncThunk("/api/editFamilyData", async (familyData: FamilyData) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/edit-family-details`, familyData, { withCredentials: true })
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});

export const getMatches = createAsyncThunk("/api/getMatches", async ({ matchBase, matchKey, matchData }: { matchBase: string, matchKey: string, matchData: string }) => {
    try {        
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/get-matches?matchBase=${matchBase}&matchKey=${matchKey}&matchData=${matchData}`, { withCredentials: true })
        return response.data;
    } catch (error) {

        return (error as Error).response?.data;
    }
});

export const sendInterest = createAsyncThunk("/api/sendInterest", async (targetUserId: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/send-interest`, {targetUserId: targetUserId}, { withCredentials: true })
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});

export const updateInterestStatus = createAsyncThunk("/api/updateInterestStatus", async ({targetUserId, status}: {targetUserId: string, status: string}) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/update-interest-status`, {targetUserId: targetUserId, status: status}, { withCredentials: true })
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});

export const blockUser = createAsyncThunk("/api/blockUser", async (blockUserId: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/block-user`, {blockUserId: blockUserId}, { withCredentials: true })
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});

export const unblockUser = createAsyncThunk("/api/unblockUser", async (blockUserId: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/unblock-user`, {blockUserId: blockUserId}, { withCredentials: true })
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});

export const reportUser = createAsyncThunk("/api/reportUser", async(reportData: FormData) => {
    try {
        const response: AxiosResponse = await axiosInstance.post(`${API_URL}/report-user`, reportData, { withCredentials: true })
        return response.data;
    } catch(error) {
        return (error as Error).response?.data;
    }
});

export const likeUser = createAsyncThunk("/api/likeUser", async(targetUserId: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/like-user`, {targetUserId: targetUserId}, { withCredentials: true })
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});

export const deleteUser = createAsyncThunk("/api/deleteUser", async() => {
    try {
        const response: AxiosResponse = await axiosInstance.patch(`${API_URL}/delete-account`, {}, { withCredentials: true })
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});

export const getPossibleFilterValues = createAsyncThunk("/api/getPossibleFilterValues", async(filterKey: string) => {
    try {
        const response: AxiosResponse = await axiosInstance.get(`${API_URL}/filter-values/${filterKey}`, )
        return response.data;
        }catch(error) {
        return (error as Error).response?.data;
    }
});

export const getUserNotifications = createAsyncThunk("/api/getUserNotifications", async() => {
    try {
        const response: AxiosResponse = await axios.get(`${API_URL}/get-user-notifications`, { withCredentials: true })
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});

export const checkRefundAvailability = createAsyncThunk("/api/checkRefundAvailability", async() => {
    try {
        const response: AxiosResponse = await axios.get(`${API_URL}/check-refund-availability`, { withCredentials: true })
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});

export const refundSubscription = createAsyncThunk("/api/refundSubscription", async({amount, pid}: {amount: number, pid: string}) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}/refund-subscription`, {amount: amount, pid: pid}, { withCredentials: true })
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});

export const fetchWalletData = createAsyncThunk("/api/fetchWalletData", async() => {
    try {
        const response: AxiosResponse = await axios.get(`${API_URL}/get-wallet-data`, { withCredentials: true })

        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});

export const walletPayment = createAsyncThunk("/api/walletPayment", async({ subId, type, amount, userId }: { subId: string, type: string, amount: number, userId: string }) => {
    try {
        const response: AxiosResponse = await axios.post(`${API_URL}/wallet-payment`, { subId, type, amount, userId }, { withCredentials: true })
        
        return response.data;
    }catch(error) {
        return (error as Error).response?.data;
    }
});
