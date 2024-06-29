
export interface NotificationType {
    _id?: string;
    user: string;
    chat: Map<string, number>;  
    interestSend: string[];
    interestReceived: string[];
}
