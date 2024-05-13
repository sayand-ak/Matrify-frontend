// import { useState } from "react";
import { useFormik } from "formik";
import { validateFamilyDetails } from "../../../utils/validations/validationFamilyDetails";
import "./FamilyDetails.css";

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
            <div 
                className="family-form-container flex flex-col-reverse w-full bg-[#5D4D57] h-full md:flex-row md:w-[70vw] md:max-h-[650px] md:rounded-[50px] overflow-hidden"
            >
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                    <form onSubmit={formik.handleSubmit} action="#" className="flex flex-col w-[80%] items-center justify-center md:items-start">
                        <h1 className="heading font-semibold text-3xl pb-3 font-gillroy">Family particular</h1>

                        <div className="w-full flex gap-2">
                            <div className="w-1/2 input-container flex flex-col">
                                <label
                                    htmlFor="famStatus"
                                    className="text-sm font-semibold pb-2"
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
                                    <div className="text-red-500 text-xs h-4">{formik.errors.famStatus}</div>
                                ) : (<div className="h-4"></div>)}

                            </div>

                            <div className="w-1/2 input-container flex flex-col">
                                <label
                                    htmlFor="famType"
                                    className="text-sm font-semibold pb-2"
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
                                    <div className="text-red-500 text-xs h-4">{formik.errors.famType}</div>
                                ) : (<div className="h-4"></div>)}

                            </div>
                        </div>

                        <div className="w-full input-container flex flex-col">
                            <label
                                htmlFor="famValue"
                                className="text-sm font-semibold pb-2"
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
                                    <div className="text-red-500 text-xs h-4">{formik.errors.famValue}</div>
                                ) : (<div className="h-4"></div>)}

                        </div>

                        <div className="w-full input-container flex flex-col">
                            <label
                                htmlFor="maritalStats"
                                className="text-sm font-semibold pb-2"
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
                                    <div className="text-red-500 text-xs h-4">{formik.errors.maritalStats}</div>
                            ) : (<div className="h-4"></div>)}
                                
                        </div>

                        <div className="w-full input-container flex flex-col">
                            <label
                                htmlFor="disabilities"
                                className="text-sm font-semibold pb-2"
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
                                    <div className="text-red-500 text-xs h-4">{formik.errors.disabilities}</div>
                            ) : (<div className="h-4"></div>)}

                        </div>

                        {formik.values.disabilities === "Yes" && (
                            <div className="w-full input-container flex flex-col">
                                <label
                                    htmlFor="description"
                                    className="text-sm font-semibold pb-2"
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
                                    <div className="text-red-500 text-xs h-4">{formik.errors.description}</div>
                                ) : (<div className="h-4"></div>)}
                            </div>
                        )}

                        <div className="flex flex-col w-full items-center">
                            <button
                                type="submit"
                                className="w-[200px] px-5 py-2  md:mt-2 rounded-md bg-[#1b2931] text-white font-semibold"
                            >
                                Proceed
                            </button>
                        </div>
                    </form>
                </div>

                <div
                    className="image-container h-[250px] md:h-full md:flex-1 flex"
                    style={{ backgroundImage: `url(${"../src/assets/images/family.jpg"})` }}
                >
                    <div className="flex flex-col items-center justify-center w-full p-5 h-full md:h-full">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
