enum PreferredAction{
    block = "block",
    report = "report"
}

export interface ReportUserType {
    _id?: string;
    reportingUserId: string
    reportedUserId: string;
    reason: string;
    narrative: string;
    screenshot: string;
    preferredAction: PreferredAction,
    access: string;
    createdAt: string
}