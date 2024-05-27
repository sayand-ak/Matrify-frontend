import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup
    .string()
    .required('Phone number is required') 
    .length(10, 'Phone number must be 10 digits') ,
    dob: Yup.string()
    .required('Date of Birth is required')
    .test('isEighteenYearsBack', 'Must be 18 years old or older', (value) => {
      if (!value) {
        return true; 
      }
      const eighteenYearsInMilliseconds = 18 * 365.25 * 24 * 60 * 60 * 1000;
      const today = new Date();
      const eighteenYearsAgo = new Date(today.getTime() - eighteenYearsInMilliseconds);
      const dobDate = new Date(value);
      return dobDate <= eighteenYearsAgo; 
    }),
    motherTongue: Yup.string().min(2, 'Mother tongue must be at least 2 characters').required('Mother tongue     is required'),
    state: Yup.string().min(2, 'State must be at least 2 characters').required('State is required'),
    district: Yup.string().min(2, 'District must be at least 2 characters').required('District is required'),
    gender: Yup.string().required('Gender is required'),
    height: Yup.number()
    .positive('Height must be a positive number')
    .integer('Height must be an integer')
    .min(100, 'Height must be at least 100 cm')
    .max(300, 'Height cannot exceed 300 cm')
    .required('Height is required')
  });

export const editProfileSchema = Yup.object().shape({
    username: Yup.string()
    .required('Username is required')
    .min(2, 'Username must be at least 2 characters'),
    dob: Yup.string()
    .required('Date of Birth is required')
    .test('isEighteenYearsBack', 'Must be 18 years old or older', (value) => {
      if (!value) {
        return true; 
      }
      const eighteenYearsInMilliseconds = 18 * 365.25 * 24 * 60 * 60 * 1000;
      const today = new Date();
      const eighteenYearsAgo = new Date(today.getTime() - eighteenYearsInMilliseconds);
      const dobDate = new Date(value);
      return dobDate <= eighteenYearsAgo; 
    }),
    motherTongue: Yup.string().min(2, 'Mother tongue must be at least 2 characters').required('Mother tongue     is required'),
    state: Yup.string().min(2, 'State must be at least 2 characters').required('State is required'),
    district: Yup.string().min(2, 'District must be at least 2 characters').required('District is required'),
    gender: Yup.string().required('Gender is required'),
    height: Yup.number()
    .positive('Height must be a positive number')
    .integer('Height must be an integer')
    .min(100, 'Height must be at least 100 cm')
    .max(300, 'Height cannot exceed 300 cm')
    .required('Height is required')
  });