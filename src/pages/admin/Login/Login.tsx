import { validationSchema } from "../../../utils/validations/validateAdminLogin";
import { useFormik } from "formik";
import { AdminLoginType } from "../../../typings/admin/loginType";

import { useNavigate } from "react-router-dom";
import { loginAdminAsync } from "../../../services/adminAPI";
import { setAdminCredentials } from "../../../redux/slices/adminSlices";

import { useAppDispatch } from "../../../hooks/useTypedSelectors";

import { ToastContainer } from "react-toastify";
import showToast from "../../../components/Toast/Toast";

export function Login() {
   
    
    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    
    const formik = useFormik({
        initialValues: {
        email: "",
        password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values: AdminLoginType) => {
        try {
            const response = await dispatch(loginAdminAsync(values)) 
            console.log(response)
            if (response.payload) {
                showToast("success", "Login Successful", () => {
                    localStorage.setItem("adminAccess",response.payload.access);
                    localStorage.setItem("adminRefresh",response.payload.refresh);
                    dispatch(setAdminCredentials(response.payload.data));
                    navigate("/admin/home");
                })
            } else {
                showToast("error", "Something went wrong", () => {
                    navigate("/admin/login");
                })
            }
        } catch (error) {
            alert(error);
        }
        },
    });

    return (
        <div className="h-[100vh] w-[100vw] flex flex-col-reverse md:flex-row justify-center items-center">

            <div className="form-div flex-1 h-full relative">
                <form onSubmit={formik.handleSubmit} className="h-full flex flex-col items-center justify-center gap-10">
                    <img src="/src/assets/images/MATRIFY-removebg-preview.png" alt="" className="absolute top-5 h-[250px] w-[250px]" />
                    <div className="pt-28">
                        <h1 className="text-3xl font-bold font-gillroy">Welcome back</h1>
                        <p className="text-sm text-center pt-2">Please sign in to continue</p>
                    </div>
    
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="py-4 px-4 w-[350px] md:w-3/4 outline-none rounded-md bg-[#2f7cf018] border-[1px]"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    ) : null}

                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="py-4 px-4 outline-none w-[350px] md:w-3/4 rounded-md bg-[#2f7cf018] border-[1px]"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    ) : null}

                    {/* Your submit button */}
                    <button type="submit" className="w-[350px] md:w-3/4 px-5 py-2  md:mt-2 rounded-md bg-[#370A5F] text-white font-semibold">
                        Login
                    </button>
                </form>
            </div>

            <div 
                className="image-div flex-1 items-end py-20 h-full hidden md:flex"
                style={{ backgroundImage: `url(${"../src/assets/images/665.jpg"})`, backgroundSize: 'cover', backgroundPosition: "center"}}
            >
                {/* <h1 className="w-full h-fit bg-red-500 ">Unlock Your Power. Secure the Future.</h1> */}
            </div>
            <ToastContainer/>

        </div>
    )
}