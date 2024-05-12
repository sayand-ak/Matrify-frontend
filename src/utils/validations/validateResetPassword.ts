import * as Yup from 'yup';

 // Define the validation schema using Yup
 export const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), ""], 'Passwords must match')
      .required('Confirm password is required'),
  });