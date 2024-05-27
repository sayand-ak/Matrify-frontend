export interface ProfileFormData {
    email?: string;
    phone?: string,
    dob: string;
    motherTongue: string;
    state: string;
    district: string;
    gender: string;
    height: number;
  } 

  export interface ProfileEditFormData {
    username: string,
    dob: string;
    motherTongue: string;
    state: string;
    district: string;
    gender: string;
    height: number;
  } 

  export interface FormData{
    email?: string;
    phone?: string,
    dob: string;
    motherTongue: string;
    state: string;
    district: string;
    gender: string;
    height: number;
    image: File| null;
  }