export enum WalletTransactionType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
}

export interface WalletTransaction {
    _id?: string;
    amount: number;
    type: WalletTransactionType;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface WalletType {
    _id?: string;
    userId: string;
    balance: number;
    transactions: WalletTransaction[];
    createdAt?: Date;
    updatedAt?: Date;
}