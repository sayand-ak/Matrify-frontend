interface TextMessage {
    type: "text";
    value: string;
}

interface AudioMessage {
    type: "audio";
    file: File | string;
}

interface ImageMessage {
    type: "image";
    file: File | string;
}

export type MessageData = TextMessage | AudioMessage | ImageMessage;

export interface Message {
    _id?: string;
    conversationId: string;
    sender: string;
    data: MessageData;
    createdAt?: Date;
}
