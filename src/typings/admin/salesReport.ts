interface IUser {
    _id: string;
    username: string;
    email: string;
    phone: string;
    gender: string;
    motherTongue: string;
    state: string;
    city: string;
    image: string;
}

interface ISubscription {
    pid: string;
    amount: number;
    subId: string;
    type: string;
    expiresIn: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

interface IPayment {
    subscription: ISubscription;
}

export interface ISalesReport {
    user: IUser[];
    payments: IPayment[];
    total: number;
}
