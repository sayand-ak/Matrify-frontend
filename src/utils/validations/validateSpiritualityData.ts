import * as Yup from "yup";

export const validateSpiritualityDetails = Yup.object().shape({
    religion: Yup.string()
        .nullable()
        .typeError("Religion must be a string")
        .required("Religion is required")
        .test("notNumberOrEmpty", "Religion cannot be a number or empty", (value) => {
            return typeof value === "string" && value.trim() !== "" && isNaN(Number(value));
        }),
    cast: Yup.string()
        .nullable()
        .test("notNumber", "Cast cannot be a number", (value) => {
            return typeof value !== "number" && isNaN(Number(value));
        }),
    subcast: Yup.string()
        .nullable()
        .test("notNumber", "Subcast cannot be a number", (value) => {
            return typeof value !== "number" && isNaN(Number(value));
        }),
});
