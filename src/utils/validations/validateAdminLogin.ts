import * as Yup from "yup";


export const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //     "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long"
    // )
    .required("Password is required"),
});