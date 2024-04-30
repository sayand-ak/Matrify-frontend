import "./Login.css"

import {  useEffect, useState } from "react";
import { validateEmail } from "../../../utils/validateEmail";
import { validatePhone } from "../../../utils/validatePhone";
import { validatePassword } from "../../../utils/validatePassword";

export function Login() {

    const [ data, setData ] = useState("");
    const [ type, setType ] = useState("");
    const [ password, setPassword ] = useState("");
    const [dataError, setDataError] = useState("");
    const [passwordError, setPasswordError] = useState("");

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
    
    
    function handleLoginSubmit() {
        if (type != "email" && type != "phone") {
          setDataError("Invalid email or phone number");
        } else if (!validatePassword(password)) {
          setPasswordError("Password must be at least 6 characters long");
        } else {
          alert("Login successful!"); // api of successful login
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
                                type="text" 
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

                            <button className="signIn flex gap-2 mt-5 text-sm border-[1px] bg-[#1b2931] text-white font-semibold border-[#ffffff] px-5 py-2 rounded-md w-">
                                <svg
                                    viewBox="0 0 256 262"
                                    preserveAspectRatio="xMidYMid"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height={'20px'}
                                >
                                    <path
                                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                        fill="#4285F4"
                                    ></path>
                                    <path
                                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                        fill="#34A853"
                                    ></path>
                                    <path
                                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                        fill="#FBBC05"
                                    ></path>
                                    <path
                                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                        fill="#EB4335"
                                    ></path>
                                </svg>
                                Sign in with Google
                            </button>
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