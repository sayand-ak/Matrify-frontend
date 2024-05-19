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



export interface UserProfile {
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
  
