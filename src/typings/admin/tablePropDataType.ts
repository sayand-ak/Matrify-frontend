import { Subscription, Users } from "../user/userTypes";

export enum Status {
    Active = 'active',
    Inactive = 'inactive',
}

export interface Data extends Users , Subscription{
    
}
