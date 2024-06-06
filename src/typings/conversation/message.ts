export interface Message {
    _id?: string;
    conversationId: string;
    sender: string;
    text: string;
    createdAt?: string | Date;
}