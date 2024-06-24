export interface Feedback {
    _id?: string;
    userId: string;
    partnerId: string;
    story: string;
    image: string;
    createdAt: Date;
}

export interface FeedbackResponse {
    _id: string;
    userId: {
        username: string;
    };
    partnerId: {
        username: string;
    };
    story: string;
    image: string;
    createdAt: Date;
}

