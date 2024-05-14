import * as Yup from "yup";

export const validateFamilyDetails = (disabilities: string) => {
  return Yup.object().shape({
    famStatus: Yup.string().required("Family Status is required"),
    famType: Yup.string().required("Family Type is required"),
    famValue: Yup.string().required("Family Value is required"),
    maritalStats: Yup.string().required("Marital Status is required"),
    disabilities: Yup.string().required("Disabilities status is required"),
    description: disabilities === "Yes" ? Yup.string().required("Description is required when disabilities are Yes") : Yup.string().notRequired(),
  });
};
