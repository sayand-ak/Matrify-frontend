import { useFormik } from "formik";
import { validateSpiritualityDetails } from "../../../utils/validations/validateSpiritualityData";

export function SpiritualityDetails() {
    const formik = useFormik({
        initialValues: {
            religion: "",
            cast: "",
            subcast: "",
        },
        validationSchema: validateSpiritualityDetails,
        onSubmit: (values) => {
            alert(values)
            console.log(values);
            // Handle form submission with validated values
            console.log("Profession Form submitted with values:", values);
            // You can perform additional actions like API calls here
        },
    });

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="familyDetails-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:max-h-[600px] md:rounded-[50px] overflow-hidden bg-black">
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                    <form onSubmit={formik.handleSubmit} action="#" className="flex flex-col gap-10 w-[80%] items-center justify-center md:items-start mt-12 md:mt-10">
                        <h1 className="heading font-semibold text-3xl font-gillroy">Spiritual background</h1>

                        <div className="w-full input-container relative">
                            <label
                                htmlFor="religion"
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            >
                                Religion
                            </label>
                            <input
                                type="text"
                                id="religion"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                {...formik.getFieldProps("religion")}
                            />

                            {formik.touched.religion && formik.errors.religion ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.religion}</div>
                            ) : null}
                        </div>

                        <div className="w-full input-container relative">
                            <label
                                htmlFor="cast"
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
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
                                <div className="text-red-500 text-xs mt-1">{formik.errors.cast}</div>
                            ) : null}
                        </div>

                        <div className="w-full input-container relative">
                            <label
                                htmlFor="subcast"
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
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
                    className="image-container h-[300px] md:h-full md:flex-1 flex items-end"
                    style={{ backgroundImage: `url(${"../src/assets/images/spirituality.jpeg"})` }}
                >
                    <div className="flex flex-col justify-center w-full p-5 h-full md:h-[100px]">
                        <h1 className="text-[#b5b4b4] text-lg font-semibold font-gillroy md:text-2xl">
                            Love is the eternal flame in every Heart
                        </h1>
                    </div>
                </div>

            </div>
        </div>
    );
}
