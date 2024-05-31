export interface ProfileFormData {
    email?: string;
    phone?: string,
    dob: string;
    motherTongue: string;
    state: string;
    district: string;
    gender: string;
    height: number;
  } 

  export interface ProfileEditFormData {
    username: string,
    dob: string;
    motherTongue: string;
    state: string;
    district: string;
    gender: string;
    height: number;
  } 



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

export interface EditFamilyType {
    _id?: string;
    userId?: string;
    familyType?: FamilyType;
    familyStats?: FamilyStats;
    familyValue?: FamilyValue;
    martialStatus?: MartialStatus;
    disabilities?: Disabilities;
    description?: string;
    religion?: string;
    cast?: string;
    subcast?: string;
}

  export interface FormData{
    email?: string;
    phone?: string,
    dob: string;
    motherTongue: string;
    state: string;
    district: string;
    gender: string;
    height: number;
    image: File| null;
  }