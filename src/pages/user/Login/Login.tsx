import "./Login.css"

import { useEffect, useState } from "react";
import { validateEmail } from "../../../utils/validateEmail";
import { validatePhone } from "../../../utils/validatePhone";
import { validatePassword } from "../../../utils/validatePassword";
import { GoogleCredentialResponse, GoogleLogin } from '@react-oauth/google';
import { decodeJwt } from "../../../utils/decodeJwt";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { forgotPassword, googleAuthLogin, userLogin } from "../../../services/userAPI";
import { useNavigate } from "react-router-dom";
import { setUserCredentials } from "../../../redux/slices/userSlices";
import showToast from "../../../components/Toast/Toast";
import { ToastContainer } from "react-toastify";
import { CustomModal } from "../../../components/modal/CustomModal";


function Login() {

    const [data, setData] = useState("");
    const [type, setType] = useState("");
    const [password, setPassword] = useState("");
    const [dataError, setDataError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotEmailError, setForgotEmailError] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDataError("");
            setPasswordError("");
        }, 5000); // Clear errors after 5 seconds

        // Cleanup function to clear timeout on unmount
        return () => clearTimeout(timeoutId);
    }, [dataError, passwordError]);


    function validate(field: string, value: string) {
        if (field === "data") {
            if (value.trim() === "") {
                setDataError("This field is required");
            } else if (validateEmail(value) || validatePhone(value)) {
                setType(validateEmail(value) ? "email" : "phone");
                setDataError("");
            } else {
                setDataError("Invalid email or phone number");
                setType("");
            }
            setData(value);
        } else if (field === "password") {
            if (!validatePassword(value)) {
                setPasswordError("Password must be at least 6 characters long");
            } else {
                setPasswordError("");
            }
            setPassword(value);
        } else if (field === "forgotEmail") {
            if (value.trim() === "") {
                setForgotEmailError("This field is required");
            } else if (validateEmail(value)) {
                setForgotEmailError("");
            } else {
                setForgotEmailError("Invalid email");
            }
            setForgotEmail(value);
        }
    }


    async function handleLoginSubmit() {
        try {
            if (type != "email" && type != "phone") {
                setDataError("Invalid email or phone number");
            } else if (!validatePassword(password)) {
                setPasswordError("Password must be at least 6 characters long");
            } else {
                const response = await dispatch(userLogin({ data, password }));
                if (response.payload?.success) {
                    showToast("success", "Login successful", () => {
                        dispatch(setUserCredentials(response.payload.user));

                        localStorage.setItem("userAccess", response.payload.access);
                        localStorage.setItem("userRefresh", response.payload.refresh);

                        if (response.payload.user.profileProgress <= 50) {
                            navigate("/setProfile");
                        } else {
                            if (response.payload.user.subscribed === true) {
                                navigate("/home");
                            } else {
                                navigate("/payment");
                            }
                        }
                    });
                } else {
                    showToast("error", response.payload.message);
                }
            }

        } catch (error) {
            navigate("/500");
        }
    }

    async function googleAuth(credentialResponse: GoogleCredentialResponse) {
        try {
            if (credentialResponse.credential) {
                const userData = decodeJwt(credentialResponse.credential);
                if (userData) {
                    const response = await dispatch(googleAuthLogin(userData));
                    console.log(response);
    
                    if (response.payload.success) {
                        showToast("success", "Login successful", () => {
    
                            dispatch(setUserCredentials(response.payload.user));
                            localStorage.setItem("userAccess", response.payload.access);
                            localStorage.setItem("userRefresh", response.payload.refresh);
                            if (response.payload.user.profileProgress < 50) {
                                navigate("/setProfile");
                            } else {
                                if (response.payload.user.subscribed === true) {
                                    navigate("/home");
                                } else {
                                    navigate("/payment");
                                }
                            }
                        });
                    }
                }
            }
        } catch (error) {
            navigate("/500");
        }
    }

    async function handleForgotPassword() {
        try {
            if (validateEmail(forgotEmail) || forgotEmail.trim() !== "") {
                setForgotEmailError("");
                const response = await dispatch(forgotPassword(forgotEmail));
                if (response.payload.success) {
                    showToast("success", "Password reset link sent to your email", () => {
                        navigate("/login");
                    });
                } else {
                    showToast("error", response.payload.message);
                }
    
            } else {
                setForgotEmailError("Invalid email");
            }
        } catch (error) {
            navigate("/500");
        }
    }


    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="login-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:h-[75vh] bg-black md:rounded-[50px] overflow-hidden">
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                    <form action="#" className="flex flex-col gap-4 w-[80%] items-center md:items-start mt-10 md:mt-16">
                        <h1 className="heading font-semibold text-3xl font-gillroy">Matrify Login</h1>
                        <div className="w-full flex flex-col">
                            <label
                                htmlFor="phone"
                                className="text-sm font-semibold pb-2"
                            >
                                Email or phone number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                placeholder="eg: example@gmail.com / xxxxxxxxxx"
                                value={data}
                                onChange={(e) => validate("data", e.target.value)}
                            />
                            {<span className="text-red-500 text-sm h-4">{dataError}</span>}
                        </div>

                        <div className="w-full flex flex-col">
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold pb-2"
                            >
                                password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                value={password}
                                onChange={(e) => validate("password", e.target.value)}
                                placeholder="*****************"
                            />
                            {<span className="text-red-500 text-sm h-4">{passwordError}</span>}


                            <div className="flex justify-between w-full pt-2">
                                <span className="flex items-center gap-2">
                                    <input type="checkbox" name="remember" id="" />
                                    <label htmlFor="remember" className="text-sm text-[#bcbdbe]">Remember me</label>
                                </span>

                                <a
                                    href="#"
                                    className="text-sm text-[#bcbdbe] hover:text-black"
                                    onClick={() => {
                                        setIsModalOpen(true);
                                    }}
                                >Forgot Password?</a>


                                <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                                    <div className="flex flex-col items-center my-10 px-6 gap-10">
                                        <img src="/src/assets/images/lock_2210233.png" alt="" height={"70rem"} width={"70rem"} />
                                        <h2 className="font-gillroy text-2xl font-semibold md:text-3xl">Forgot Password?</h2>
                                        <p className="text-lg">Please enter your registered email. After verification we will send a link in to the email. Reset your password with the link</p>
                                        <div className="h-[50px] w-full flex flex-col">
                                            <input
                                                type="text"
                                                placeholder="Enter email here"
                                                className="w-full rounded-lg px-5 py-3 outline-none"
                                                onChange={(e) => validate("forgotEmail", e.target.value)}
                                                value={forgotEmail}
                                            />
                                            <span className="h-4 text-sm text-red-600 px-2 py-2">{forgotEmailError}</span>
                                        </div>

                                        <div className="flex justify-between w-full gap-4">
                                            <button
                                                className="w-1/2 px-5 py-3 rounded-md bg-[#1b2931] text-white font-semibold"
                                                onClick={handleForgotPassword}
                                            >
                                                Verify
                                            </button>
                                            <button
                                                className="w-1/2 border-[#1b2931] border-[1px] rounded-md"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </CustomModal>


                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 w-full">
                            <button
                                type="button"
                                className="w-[200px] px-5 py-2 rounded-md bg-[#1b2931] text-white font-semibold"
                                onClick={handleLoginSubmit}
                            >
                                Login
                            </button>

                            <div className="flex items-center gap-2 w-full">
                                <hr className="w-full border-[0.5px] border-[#bcbdbe]" />
                                <span className="text-sm text-[#bcbdbe]"> or </span>
                                <hr className="w-full border-[0.5px] border-[#bcbdbe]" />
                            </div>

                            <ToastContainer />


                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    googleAuth(credentialResponse)
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                promptMomentNotification={() => console.log('Moment notification')}
                                useOneTap={true}
                                containerProps={{ style: { display: 'Inline-block' } }}
                            ></GoogleLogin>


                            <p className="text-black pt-3 text-sm font-gillroy block md:hidden">
                                Don't have an account?
                                <a href="/signup">Sign up</a>
                            </p>
                        </div>

                    </form>
                </div>

                <div 
                    className="image-container h-1/4 md:h-full md:flex-1" 
                    style={{ backgroundImage: `url(${'/images/wedding-rings-black-white.jpg'})` }}
                >
                    <div className="flex flex-col items-center justify-between h-full w-full p-5">
                        <h1 className="text-[#dfdede] text-3xl font-semibold font-gillroy md:pt-12">Welcome to Matrify</h1>
                        <p className="text-white text-sm font-gillroy hidden md:block">
                            Don't have an account?
                            <a href="/register"> Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;