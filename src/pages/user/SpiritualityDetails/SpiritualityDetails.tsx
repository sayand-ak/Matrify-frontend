import { useFormik } from "formik";
import { validateSpiritualityDetails } from "../../../utils/validations/validateSpiritualityData";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { useNavigate } from "react-router-dom";
import { ReligionData } from "../../../typings/Profile/familyDataTypes";
import { addReligion } from "../../../services/userAPI";
import showToast from "../../../components/Toast/Toast";
import { ToastContainer } from "react-toastify";

function SpiritualityDetails() {

    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            religion: "",
            cast: "",
            subcast: "",
        },
        validationSchema: validateSpiritualityDetails,
        onSubmit: async(values) => {
            try {
                const religionData: ReligionData = {
                    userId: user?._id || "",
                    religion: values.religion,
                    cast: values.cast,
                    subcast: values.subcast,
                }
                
                const response = await dispatch(addReligion(religionData));
                if (response.payload.success) {
                    showToast("success", "Religion added successfully", () => {
                        navigate("/collectDocs");
                    })
                }else{
                    showToast("error", "Something went wrong")
                }
                console.log(values);
                // Handle form submission with validated values
                console.log("Profession Form submitted with values:", values);
                // You can perform additional actions like API calls here
                
            } catch (error) {
                navigate("/500");
            }
        },
    });

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="Details-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:max-h-[600px] md:rounded-[50px] overflow-hidden bg-black">
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                    <form onSubmit={formik.handleSubmit} action="#" className="flex flex-col gap-7 w-[80%] items-center justify-center md:items-start mt-12 md:mt-10">
                        <h1 className="heading font-semibold text-3xl font-gillroy">Spiritual background</h1>

                        <div className="w-full input-container flex flex-col">
                            <label
                                htmlFor="religion"
                                className="text-sm font-semibold pb-1"
                            >
                                Religion
                            </label>
                            <select
                                id="religion"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                {...formik.getFieldProps("religion")}
                            >
                                <option value="">Select Religion</option>
                                <option value="Christianity">Christianity</option>
                                <option value="Islam">Islam</option>
                                <option value="Hinduism">Hinduism</option>
                                <option value="Buddhism">Buddhism</option>
                                <option value="Judaism">Judaism</option>
                                <option value="Sikhism">Sikhism</option>
                                <option value="Shinto">Shinto</option>
                                <option value="Taoism">Taoism</option>
                                <option value="Zoroastrianism">Zoroastrianism</option>
                                <option value="Atheism">Atheism</option>
                                
                            </select>

                            {formik.touched.religion && formik.errors.religion ? (
                                <div className="text-red-500 text-xs h-4 px-1">{formik.errors.religion}</div>
                            ) : (<div className="h-4"></div>)}
                        </div>


                        <div className="w-full input-container">
                            <label
                                htmlFor="cast"
                                className="text-sm font-semibold"
                            >
                                Cast (Optional)
                            </label>
                            <input
                                type="text"
                                id="cast"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                {...formik.getFieldProps("cast")}
                            />

                            {formik.touched.cast && formik.errors.cast ? (
                                <div className="text-red-500 text-xs mt-1 h-4">{formik.errors.cast}</div>
                            ) : (<div className="h-4"></div>)}
                        </div>

                        <div className="w-full input-container">
                            <label
                                htmlFor="subcast"
                                className="text-sm font-semibold"
                            >
                                Subcast (Optional)
                            </label>
                            <input
                                type="text"
                                id="subcast"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                {...formik.getFieldProps("subcast")}
                            />

                            {formik.touched.subcast && formik.errors.subcast ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.subcast}</div>
                            ) : null}
                        </div>

                        <div className="flex flex-col w-full justify-center items-center">
                            <button
                                type="submit"
                                className="w-[200px] px-5 py-2  md:mt-2 rounded-md bg-[#1b2931] text-white font-semibold"
                            >
                                Proceed
                            </button>
                        </div>

                    </form>
                </div>

                <ToastContainer/>

                <div
                    className="image-container min-h-[400px] md:h-full flex items-end"
                    style={{ backgroundImage: `url(${"/images/spirituality.jpg"})`, backgroundSize: 'cover'}}
                >
                    <div className="flex flex-col justify-end item-center w-full p-5 h-full md:h-[100px]">
                        <h1 className="text-[#5d5c5ce6] text-center text-lg font-semibold font-gillroy md:text-2xl">
                            Love is the eternal flame in every Heart
                        </h1>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default SpiritualityDetails;