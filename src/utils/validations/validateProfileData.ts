import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
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
    height: Yup.number().positive('Height must be a positive number').integer('Height must be an integer').required('Height is required'),
});