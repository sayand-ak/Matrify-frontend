import { useFormik } from "formik";
import { validateProfessionDetails } from "../../../utils/validations/validateProfessionData";

export function ProfessionDetails() {

    const educationOptions = ["High School", "Bachelor's Degree", "Master's Degree", "Doctorate"];
    const employmentOptions = ["Employed", "Unemployed", "Self-employed"];

    const formik = useFormik({
        initialValues: {
            highestEducation: "",
            employmentStatus: "",
            occupation: "",
            annualIncome: "",
        },
        validationSchema: validateProfessionDetails,
        onSubmit: (values) => {
            alert(values)
            console.log(values)
            // Handle form submission with validated values
            console.log("Profession Form submitted with values:", values);
            // You can perform additional actions like API calls here
        },
    });

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="familyDetails-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:max-h-[600px] md:rounded-[50px] overflow-hidden bg-[#000000f1]">
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                    <form onSubmit={formik.handleSubmit} action="#" className="flex flex-col gap-8 w-[80%] items-center justify-center md:items-start mt-12 md:mt-10">
                        <h1 className="heading font-semibold text-3xl font-gillroy">Profession and Education</h1>


                            <div className="w-full input-container relative">
                                <label
                                    htmlFor="highestEducation"
                                    className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                                >
                                    Highest Education
                                </label>
                                <select
                                    id="highestEducation"
                                    className="px-4 py-4 outline-none w-full rounded-md"
                                    {...formik.getFieldProps("highestEducation")}
                                >
                                    {educationOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                {formik.touched.highestEducation && formik.errors.highestEducation ? (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.highestEducation}</div>
                                ) : null}
                            </div>

                            <div className="w-full input-container relative">
                                <label
                                    htmlFor="employmentStatus"
                                    className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                                >
                                    Employment Status
                                </label>
                                <select
                                    id="employmentStatus"
                                    className="px-4 py-4 outline-none w-full rounded-md"
                                    {...formik.getFieldProps("employmentStatus")}
                                >
                                    {employmentOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                {formik.touched.employmentStatus && formik.errors.employmentStatus ? (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.employmentStatus}</div>
                                ) : null}
                            </div>

                        <div className="w-full input-container relative">
                            <label
                                htmlFor="occupation"
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            >
                                Occupation
                            </label>
                            <input
                                type="text"
                                id="occupation"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                {...formik.getFieldProps("occupation")}
                            />

                            {formik.touched.occupation && formik.errors.occupation ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.occupation}</div>
                            ) : null}
                        </div>

                        <div className="w-full input-container relative">
                            <label
                                htmlFor="annualIncome"
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            >
                                Annual Income(₹)
                            </label>
                            <input
                                type="number"
                                id="annualIncome"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                {...formik.getFieldProps("annualIncome")}
                            />

                            {formik.touched.annualIncome && formik.errors.annualIncome ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.annualIncome}</div>
                            ) : null}
                        </div>

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
                    className="image-container h-[250px] md:h-full md:flex-1 flex justify-center items-center"
                    style={{ backgroundImage: `url(${"../src/assets/images/profession.jpg"})`}}
                >
                </div>
                
            </div>
        </div>
    );
}
