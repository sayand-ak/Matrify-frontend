import * as Yup from "yup";

export const validateProfessionDetails = Yup.object().shape({
    highestEducation: Yup.string().required("Highest Education is required"),
    employmentStatus: Yup.string().required("Employment Status is required"),
    occupation: Yup.string().required("Occupation is required"),
    annualIncome: Yup.number()
        .required("Annual Income is required")
        .min(501, "Annual Income must be greater than 500"),
});
