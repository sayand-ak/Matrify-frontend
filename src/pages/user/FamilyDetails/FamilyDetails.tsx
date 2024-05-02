// import { useState } from "react";
import { useFormik } from "formik";
import { validateFamilyDetails } from "../../../utils/validations/validationFamilyDetails";

export function FamilyDetails() {
    // Define options for dropdowns
    const familyStatusOptions = ["High", "Medium", "Stable", "Low"];
    const familyTypeOptions = ["Nuclear", "Joint"];
    const familyValueOptions = ["Moderate", "High", "Low", "Orthodox", "Atheist", "Liberal", "Conservative"];
    const maritalStatusOptions = ["Single", "Divorced", "Widowed"];
    const disabilitiesOptions = ["No", "Yes"];

    const formik = useFormik({
        initialValues: {
            famStatus: "",
            famType: "",
            famValue: "",
            maritalStats: "",
            disabilities: "",
            description: ""
        },
        validationSchema: validateFamilyDetails,
        onSubmit: (values) => {
            console.log(values)
            // Handle form submission with validated values
            console.log("Family Form submitted with values:", values);
            // You can perform additional actions like API calls here
        },
    });

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="familyDetails-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:max-h-[600px] md:rounded-[50px] overflow-hidden bg-[#000000f1]">
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                    <form onSubmit={formik.handleSubmit} action="#" className="flex flex-col gap-6 w-[80%] items-center justify-center md:items-start mt-12 md:mt-10">
                        <h1 className="heading font-semibold text-2xl font-gillroy">Family particular</h1>

                        <div className="w-full flex gap-2">
                            <div className="w-1/2 input-container relative">
                                <label
                                    htmlFor="famStatus"
                                    className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                                >
                                    Family Status
                                </label>
                                <select
                                    id="famStatus"
                                    className="px-4 py-4 outline-none w-full rounded-md"
                                    {...formik.getFieldProps("famStatus")}
                                >
                                    {familyStatusOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                {formik.touched.famStatus && formik.errors.famStatus ? (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.famStatus}</div>
                                ) : null}

                            </div>

                            <div className="w-1/2 input-container relative">
                                <label
                                    htmlFor="famType"
                                    className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                                >
                                    Family Type
                                </label>
                                <select
                                    id="famType"
                                    className="px-4 py-4 outline-none w-full rounded-md"
                                    {...formik.getFieldProps("famType")}
                                >
                                    {familyTypeOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                {formik.touched.famType && formik.errors.famType ? (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.famType}</div>
                                ) : null}

                            </div>
                        </div>

                        <div className="w-full input-container relative">
                            <label
                                htmlFor="famValue"
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            >
                                Family Value
                            </label>
                            <select
                                id="famValue"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                {...formik.getFieldProps("famValue")}
                            >
                                {familyValueOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {formik.touched.famValue && formik.errors.famValue ? (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.famValue}</div>
                                ) : null}

                        </div>

                        <div className="w-full input-container relative">
                            <label
                                htmlFor="maritalStats"
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            >
                                Marital Status
                            </label>
                            <select
                                id="maritalStats"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                {...formik.getFieldProps("maritalStats")}
                            >
                                {maritalStatusOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {formik.touched.maritalStats && formik.errors.maritalStats ? (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.maritalStats}</div>
                            ) : null}
                                
                        </div>

                        <div className="w-full input-container relative">
                            <label
                                htmlFor="disabilities"
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            >
                                Any disabilities
                            </label>
                            <select
                                id="disabilities"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                {...formik.getFieldProps("disabilities")}
                            >
                                {disabilitiesOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {formik.touched.disabilities && formik.errors.disabilities ? (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.disabilities}</div>
                            ) : null}

                        </div>

                        {formik.values.disabilities === "Yes" && (
                            <div className="w-full input-container relative">
                                <label
                                    htmlFor="description"
                                    className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                                >
                                    Description
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    className="py-4 px-4 outline-none w-full rounded-md"
                                    {...formik.getFieldProps("description")}
                                />

                                {formik.touched.description && formik.errors.description ? (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
                                ) : null}
                            </div>
                        )}

                        <div className="flex flex-col w-full">
                            <button
                                type="submit"
                                className="w-[100px] px-5 py-2  md:mt-2 rounded-md bg-[#dd742a] text-white font-semibold"
                            >
                                Proceed
                            </button>
                        </div>
                    </form>
                </div>

                <div
                    className="image-container h-[250px] md:h-full md:flex-1 flex"
                    style={{ backgroundImage: `url(${"../src/assets/images/family.jpeg"})` }}
                >
                    <div className="flex flex-col items-center justify-between w-full p-5 h-full md:h-[180px]">
                        <h1 className="text-white text-xl font-semibold font-gillroy md:text-3xl text-center">
                            Make the data open and reliable.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
