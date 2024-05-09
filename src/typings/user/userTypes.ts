import { JwtPayload } from "jwt-decode";

export interface UserData {
    payload: {
        data: {
            email: string;
        };
    };
}

export interface UserState {
    user: UserData | null;
    status: 'idle' | 'loading' | 'success' | 'rejected';
    error?: string | null;
}

export interface UserSignupType {
    username: string;
    phone: string;
    password: string;
    firebaseData: unknown
}

export interface UserLoginType {
    data: string;
    password: string;
}

export interface UserGoogleAuthData {
    data: JwtPayload;
    phone?: string; 
}

export interface Users{
    username: string;
    email?: string;
    phone?: string;
    createdAt: string;
    otpVerified: boolean
}
