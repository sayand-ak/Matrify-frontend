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