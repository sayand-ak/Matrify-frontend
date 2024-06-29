export interface DashboardUserCount {
    totalUsers: number;
    maleUsers: number;
    femaleUsers: number;
    otherUsers: number;
}

export interface DashboardUserRate {
    type: string;
    data: number;
}

export interface DashboardPaymentRate {
    subscriptionType: string;
    total: number;
}

export interface DashboardPaymentRateArrays {
    subscriptionType: string[];
    total: number[];
}