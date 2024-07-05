import { JwtPayload } from "jwt-decode";

export interface BlockedUsers {
    user: string,
    blockedAt: Date,
  }

export interface UserData {
    _id: string;
    email?:string,
    phone?:string,
    username?:string,
    dob?:string;
    state?:string,
    gender?: string;
    height: number;
    district?:string,
    searchHistory: SearchHistory[];
    image: string;
    blockedUsers?: Array<BlockedUsers>;
    subscribed?: boolean
    likedProfiles: Array<string>;
    deleted: boolean;
    isBlocked: boolean;
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

export interface SearchHistory {
    text: string,
    date: Date,
    searchResults: string[]
}

export interface Users{
    username: string;
    email?: string;
    phone?: string;
    createdAt: string;
    otpVerified?: boolean;
    image?: string;
    searchResult?: SearchHistory;
    _id?: string 
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

interface SubscriptionArray {
    pid?: string,
    subId: string, 
    type: string, 
    amount: number, 
    userId: string,
    status: string,
    createdAt?: Date,
    expiresIn?: Date
}

export interface PaymentHistory {
    username: string;
    subscription: Array<SubscriptionArray>
}

export interface InterestSend {
    sendTo: string;
    sendOn: Date;
    status: string;
}
export interface InterestReceived {
    sendBy: string;
    receivedOn: Date;
    status: string;
}

