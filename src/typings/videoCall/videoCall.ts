export interface VideoCallData {
    _id?: string;
    caller: string;
    receiver: string;
    roomId?: string;
    createdAt?: Date;
    endedAt?: Date;
}