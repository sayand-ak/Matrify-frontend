import { InterestSend, InterestReceived } from './../user/userTypes';
export interface ProfessionData {
  userId: string;
  education: string;
  empStatus: string;
  occupation: string;
  annualIncome: number;
}

export interface DocsData {
  userId: string;
  educationDocs: File,
  professionDocs: File
}


interface StripeReqDataType {
  subId: string,
  pid: string,
  type: string,
  amount: number,
  userId: string,
  createdAt?: Date,
  expiresIn?: Date
}


export interface UserProfile {
  _id: string,
  createdAt: string;
  district: string;
  dob: string;
  email: string;
  gender: string;
  height: number;
  image?: string;
  motherTongue: string;
  otpVerified: boolean;
  phone: string;
  profileProgress: number;
  state: string;
  updatedAt: string;
  username: string;
  preferences: Array<string>;
  subscribed?: boolean,
  subscription?: Array<StripeReqDataType>
  interestSend: Array<InterestSend>;
  interestReceived: Array<InterestReceived>;
}

export interface UserProfession {
  annualIncome: number;
  createdAt: string;
  education: string;
  educationDoc?: string;
  empStatus: string;
  occupation: string;
  professionDoc?: string;
  updatedAt: string;
}

export interface UserFamily {
  cast: string;
  createdAt: string;
  description?: string;
  disabilities: string;
  familyStats: string;
  familyType: string;
  familyValue: string;
  martialStatus: string;
  religion: string;
  subcast: string;
  updatedAt: string;
}

