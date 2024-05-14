import { useFormik } from "formik";
import { validateProfessionDetails } from "../../../utils/validations/validateProfessionData";
import "./ProfessionDetails.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { ProfessionData } from "../../../typings/Profile/professionDataType";
import { setProfessionData } from "../../../services/userAPI";
import showToast from "../../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export function ProfessionDetails() {

    const educationOptions = ["High School", "Bachelor's Degree", "Master's Degree", "Doctorate"];
    const employmentOptions = ["Employed", "Unemployed", "Self-employed"];

    const user = useAppSelector((state) => state.user.user);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    

    const formik = useFormik({
        initialValues: {
            highestEducation: "",
            employmentStatus: "",
            occupation: "",
            annualIncome: "",
        },
        validationSchema: validateProfessionDetails,
        onSubmit: async(values) => {
            const professionData: ProfessionData = {
                userId:  user && user._id ? user._id : "",
                education: values.highestEducation,
                empStatus: values.employmentStatus,
                occupation: values.occupation,
                annualIncome: Number(values.annualIncome),
            }
            const response = await dispatch(setProfessionData(professionData));

            if(response.payload.success){
                showToast("success", "Profession Details Updated Successfully", () => {
                    navigate("/user/setFamilyDetails")
                })
            }else{
                showToast("error", response.payload.message)
            }
        },
    });

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="professionDetails-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:max-h-[600px] md:rounded-[50px] overflow-hidden bg-[#000000f1]">
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                    <form onSubmit={formik.handleSubmit} action="#" className="flex flex-col gap-1 w-[80%] items-center justify-center md:items-start mt-10 md:mt-5">
                        <h1 className="heading font-semibold text-2xl md:text-3xl font-gillroy pb-2">Profession and Education</h1>

                            <div className="w-full input-container flex flex-col">
                                <label
                                    htmlFor="highestEducation"
                                    className="text-sm font-semibold pb-1"
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
                                    <div className="text-red-500 text-xs h-4">{formik.errors.highestEducation}</div>
                                ) : (<div className="h-4"></div>)}
                            </div>

                            <div className="w-full input-container flex flex-col">
                                <label
                                    htmlFor="employmentStatus"
                                    className="text-sm font-semibold pb-1"
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
                                    <div className="text-red-500 text-xs h-4">{formik.errors.employmentStatus}</div>
                                ) : (<div className="h-4"></div>)}
                            </div>

                        <div className="w-full input-container flex flex-col">
                            <label
                                htmlFor="occupation"
                                className="text-sm font-semibold pb-2"
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
                                <div className="text-red-500 text-xs h-4">{formik.errors.occupation}</div>
                            ) : (<div className="h-4"></div>)}
                        </div>

                        <div className="w-full input-container flex flex-col">
                            <label
                                htmlFor="annualIncome"
                                className="text-sm font-semibold pb-2"
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
                                <div className="text-red-500 text-xs h-4">{formik.errors.annualIncome}</div>
                            ) : (<div className="h-4"></div>)}
                        </div>

                        <div className="flex flex-col w-full items-center">
                            <button
                                type="submit"
                                className="w-[200px] px-5 py-2  md:mt-2 rounded-md bg-[#1b2931] text-white font-semibold mb-5"
                            >
                                Proceed
                            </button>
                        </div>
                        <ToastContainer/>

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
