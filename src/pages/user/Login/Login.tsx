import "./Login.css"

import {  useEffect, useState } from "react";
import { validateEmail } from "../../../utils/validateEmail";
import { validatePhone } from "../../../utils/validatePhone";
import { validatePassword } from "../../../utils/validatePassword";
import { GoogleCredentialResponse, GoogleLogin } from '@react-oauth/google';
import { decodeJwt } from "../../../utils/decodeJwt";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { googleAuthLogin, userLogin } from "../../../services/userAPI";
import { useNavigate } from "react-router-dom";
import { setUserCredentials } from "../../../redux/slices/userSlices";
import showToast from "../../../components/Toast/Toast";
import { ToastContainer } from "react-toastify";


export function Login() {

    const [ data, setData ] = useState("");
    const [ type, setType ] = useState("");
    const [ password, setPassword ] = useState("");
    const [dataError, setDataError] = useState("");
    const [passwordError, setPasswordError] = useState("");

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
        }
      }
    
    
    async function handleLoginSubmit() {
        if (type != "email" && type != "phone") {
          setDataError("Invalid email or phone number");
        } else if (!validatePassword(password)) {
          setPasswordError("Password must be at least 6 characters long");
        } else {
          const response = await dispatch(userLogin({data, password}));
          console.log(response);
          
          if(response.payload.success){
            showToast("success", "Login successful", () => {
                navigate("/user/home");
            });
          }else{
            showToast("error", response.payload.message);
          }
          
        }
    }

    async function googleAuth(credentialResponse: GoogleCredentialResponse){
        if (credentialResponse.credential) {
            const userData = decodeJwt(credentialResponse.credential);
            if (userData) {
                const response = await dispatch(googleAuthLogin(userData));
                if(response.payload.message == "new user") {
                    dispatch(setUserCredentials(response.payload.user));
                    navigate("/user/setProfile");
                }else{
                    dispatch(setUserCredentials(response.payload.user));
                    navigate("/user/home")
                }
                
            }
        }
    }

    
    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="login-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:h-[70vh] bg-black md:rounded-[50px] overflow-hidden">
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                    <form action="#" className="flex flex-col gap-6 w-[80%] items-center md:items-start mt-20">
                        <h1 className="heading font-semibold text-3xl font-gillroy">Matrify Login</h1>
                        <div className="w-full relative">
                            <label 
                                htmlFor="phone" 
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            > 
                                Email or phone number
                            </label>
                            <input 
                                type="text"    
                                id="phone"           
                                className="py-4 px-4 outline-none w-full rounded-md"
                                value={data}
                                onChange={(e) => validate("data", e.target.value)}
                            />
                            {dataError && <span className="text-red-500 text-sm">{dataError}</span>}
                        </div>

                        <div className="w-full relative">
                            <label 
                                htmlFor="password" 
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            > 
                                password
                            </label>
                            <input 
                                type="password" 
                                id="password"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                value={password}
                                onChange={(e) => validate("password", e.target.value)}
                            />
                            {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}


                            <div className="flex justify-between w-full pt-2">
                                <span className="flex items-center gap-2">
                                    <input type="checkbox" name="remember" id="" />
                                    <label htmlFor="remember" className="text-sm text-[#bcbdbe]">Remember me</label>
                                </span>
                                <a href="#" className="text-sm text-[#bcbdbe] hover:text-black">Forgot Password?</a>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 w-full">
                            <button 
                                type="button" 
                                className="w-[200px] px-5 py-2 rounded-md bg-[#1b2931] text-white font-semibold hover:bg-[#999999]"
                                onClick={handleLoginSubmit}
                            >
                                Login
                            </button>
                            
                            <div className="flex items-center gap-2 w-full">
                                <hr className="w-full border-[0.5px] border-[#bcbdbe]"/>
                                <span className="text-sm text-[#bcbdbe]"> or </span>
                                <hr className="w-full border-[0.5px] border-[#bcbdbe]"/>
                            </div>

                            <ToastContainer/>


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

                                
                            <p className="text-black pt-3 text-sm font-gillroy block md:hidden">Don't have an account? Sign up</p>
                        </div>

                    </form>
                </div>

                <div className="image-container h-1/4 md:h-full md:flex-1" style={{ backgroundImage: `url(${'../src/assets/images/wedding-rings-black-white.jpg'})` }}>
                    <div className="flex flex-col items-center justify-between h-full w-full p-5">
                        <h1 className="text-[#dfdede] text-3xl font-semibold font-gillroy md:pt-12">Welcome to Matrify</h1>
                        <p className="text-white text-sm font-gillroy hidden md:block">
                            Don't have an account? 
                            <a href="/user/register"> Sign up</a>
                        </p>
                    </div>
                </div>                
            </div>
        </div>
    )
}