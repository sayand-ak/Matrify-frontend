// AdminLoginType.ts
export interface AdminLoginType {
    email: string;
    password: string;
  }
  
  // AdminResponseType.ts
  export interface AdminResponseType {
    status: number;
    success: boolean;
    token?: string;
    data?: AdminData;
    message?: string;
  }
  
  interface AdminData {
    payload: {
        data: {
            email: string;
        };
    };
}

 export interface AdminState {
    admin: AdminData | null;
    status: 'idle' | 'loading' | 'success' | 'rejected';
    error?: string | null;
  }