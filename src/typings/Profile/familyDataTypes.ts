
enum FamilyStats {
    high = 'high',
    stable = 'stable',
    low = 'low',
    medium = 'medium',
}

enum FamilyType {
    nuclear = 'nuclear',
    join = 'join',
}

enum FamilyValue {
    moderate = 'moderate',
    high = 'high',
    low = 'low',
    orthodox ='orthodox',
    atheist = 'atheist',
    conservative = 'conservative',
}

enum MartialStatus{
    single = 'single',
    divorced = 'divorced',
    widowed = 'widowed',
}

enum Disabilities{
    yes = 'yes',
    no = 'no'
}

export interface FamilyData {
    _id?: string;
    userId: string;
    familyType: FamilyType | string
    familyStats: FamilyStats | string;
    familyValue: FamilyValue | string
    martialStatus: MartialStatus | string;
    disabilities: Disabilities | string;
    description?:string;
   
}


export interface ReligionData {
    userId: string;
    religion: string;
    cast?: string;
    subcast?: string;
}