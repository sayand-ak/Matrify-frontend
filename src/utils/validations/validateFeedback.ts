import * as Yup from "yup";

export const validateFeedback = Yup.object({
    partner: Yup.string().required("Partner is required"),
    story: Yup.string().required("Story is required"),
    image: Yup.mixed().required("Image is required"),
});