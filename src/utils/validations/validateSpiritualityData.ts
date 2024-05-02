import * as Yup from "yup";

// Define the validation schema using Yup
export const validateSpiritualityDetails = Yup.object().shape({
    religion: Yup.string().required("Religion is required"),
    cast: Yup.string(),
    subcast: Yup.string(),
});