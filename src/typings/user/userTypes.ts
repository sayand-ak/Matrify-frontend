import { JwtPayload } from "jwt-decode";

export interface UserData {
    _id: string;
    email?:string,
    phone?:string,
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
    otpVerified?: boolean;
    image?: string;
}

export enum Status {
    Active = 'active',
    Inactive = 'inactive',
}

export interface Subscription{
    _id?: string,
    amount: {
        weekly: number;
        monthly: number;
        yearly: number;
    },
    status: Status;
    updatedAt?: Date;
}

export interface Offer {
    offerId: string;
    title: string;
    description: string;
    offerPercentage: number;
    status: string;
    startsAt: string;
    endsAt: string;
}


