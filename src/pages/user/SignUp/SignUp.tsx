import { useEffect, useRef, useState } from "react";
import { validatePassword } from "../../../utils/validatePassword";
import { validatePhone } from "../../../utils/validatePhone";
import { validateUsername } from "../../../utils/validateUsername";
import "./SignUp.css";
import { CustomModal } from "../../../components/modal/CustomModal";
import { useNavigate } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { otpVerify, signupUserAsync } from "../../../services/userAPI";
import { onSignInSubmit } from "../../../services/firebase/auth";
import { ToastContainer } from "react-toastify";
import { ConfirmationResult, signInWithPhoneNumber } from "firebase/auth";
import showToast from "../../../components/Toast/Toast";


export function SignUp() {
    const [uname, setUname] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [unameErr, setUnameErr] = useState("");
    const [phoneErr, setPhoneErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [rePasswordErr, setRePasswordErr] = useState("");

    const [ confirmationResult, setConfirmationResult ] = useState<ConfirmationResult>();
    const submitBtn = useRef<HTMLButtonElement>(null)
    const [otp, setOtp] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    function validate(field: string, value: string) {
        if (field === "uname") {
            
            if(!validateUsername(value)){
                setUnameErr("Username is invalid");
            }else{
                setUnameErr("");
            }
            setUname(value);
        }
        if (field === "phone") {
            if(!validatePhone(value)){
                setPhoneErr("Phone number is invalid");
            }else{
                setPhoneErr("");
            }
            setPhone(value);
        }
        if (field === "password") {
            if(!validatePassword(value)){
                setPasswordErr("Password is invalid");
            }else{
                setPasswordErr("");
            }
            setPassword(value);
        }
        if (field === "repassword") {
            if(value !== password){
                setRePasswordErr("Password doesn't match");
            }else{
                setRePasswordErr("");
            }
            setRePassword(value);
        }
    }

    async function handleRegisterSubmit(){
        if(!uname || !phone || !password){
            setRePasswordErr("Please fill all the fields");
        } else {
            setRePasswordErr("");
            const response = await dispatch(signupUserAsync(phone));
            console.log(response);
            
            if(response.payload.success){
                const otpIncome = await onSignInSubmit(submitBtn.current);            
                
                if (otpIncome) {
                    setConfirmationResult(await signInWithPhoneNumber(otpIncome?.auth, "+91"+phone, otpIncome?.recaptchaVerifier));
    
                    //setting timer 
                    const currentTime = new Date();
                    const oneMinuteLater = new Date(currentTime.getTime() + (1 * 60000));
                    localStorage.setItem("expireTime", oneMinuteLater.toString());
    
                    const expireTimeString = localStorage.getItem("expireTime");
                    if (expireTimeString) {
                        const expireTime = new Date(expireTimeString);
                    
                        // Calculate remaining time
                        const currentTime = new Date();
                        const timeDifference = expireTime.getTime() - currentTime.getTime();
                        const remainingSeconds = Math.floor(timeDifference / 1000);
                    
                        // Start the timer if there is remaining time
                        if (remainingSeconds > 0) {
                            setRemainingTime(remainingSeconds);
                    
                            const interval = setInterval(() => {
                                setRemainingTime(prevTime => (prevTime && prevTime > 0) ? prevTime - 1 : null);
                            }, 1000);
                            setTimerInterval(interval);
                        } else {
                            // Handle case when remaining time is not positive
                            console.log("The remaining time is not positive.");
                        }
                    } 
                    
                    setIsModalOpen(true);
                } else {
                    alert("Firebase error");
                }
            }else{
                showToast("error", response.payload.message);
            }
        }
    }
    

    async function handleOTPVerification(){
        if(otp && confirmationResult){
            confirmationResult.confirm(otp)
                .then(async (result) => {
                if(result.user){     
                                                            
                    const response = await dispatch(otpVerify({
                        username: uname,
                        phone: phone, 
                        password: password,
                        firebaseData: result.user
                    }));

                    if(response.payload.success){
                        showToast("success", response.payload.message, () => {
                            navigate("/user/login");
                        });
                        
                    }else{
                        showToast("error", response.payload.message);
                    }

                }
                })
                .catch((error) => {
                console.log(error);
                
                });
        }else{
            alert("invalid OTP")
        }
    }

    useEffect(() => {
        if (remainingTime === 0) {
            clearInterval(timerInterval!); // Clear the interval when time is up
        }
    }, [remainingTime, timerInterval]);

    return(
        <div className="h-[100vh] flex items-center justify-center">
            <div className="signup-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:h-[70vh] md:rounded-[50px] overflow-hidden">
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                    <form action="#" className="flex flex-col gap-6 w-[80%] items-center md:items-start mt-12 md:mt-16">
                        <h1 className="heading font-semibold text-2xl font-gillroy">Create Your Account</h1>
                        <div className="w-full input-container relative" id="username-div">
                            <label 
                                htmlFor="username" 
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            >
                                Username
                            </label>
                            <input 
                                type="text" 
                                id="username" 
                                className="px-4 py-4 outline-none w-full rounded-md"
                                value={uname}
                                onChange={(e) => validate("uname", e.target.value)}
                            />
                            {unameErr && <span className="text-red-500 text-sm">{unameErr}</span>}
                        </div>

                        <div className="w-full input-container relative">
                            <label 
                                htmlFor="phone" 
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            > 
                                Phone number
                            </label>
                            <input 
                                type="text" 
                                id="phone"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                value={phone}
                                onChange={(e) => validate("phone", e.target.value)}
                            />
                            {phoneErr && <span className="text-red-500 text-sm">{phoneErr}</span>}
                        </div>

                        <div className="w-full input-container relative">
                        <label 
                                htmlFor="password" 
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            > 
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="password"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                value={password}
                                onChange={(e) => validate("password", e.target.value)}
                            />
                            {passwordErr && <span className="text-red-500 text-sm">{passwordErr}</span>}
                        </div>

                        <div className="w-full input-container relative">
                        <label 
                                htmlFor="re-enterPassword" 
                                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                            > 
                                Re-enter password
                            </label>
                            <input 
                                type="password" 
                                id="re-enterPassword"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                value={rePassword}
                                onChange={(e) => validate("repassword", e.target.value)}
                            />
                            {rePasswordErr && <span className="text-red-500 text-sm">{rePasswordErr}</span>}
                        </div>

                        <div className="flex flex-col w-full">
                            <button 
                                id="signupBtn"
                                type="button" 
                                ref={submitBtn}
                                className="signup w-[100px] px-5 py-2  md:mt-5 rounded-md bg-[#dd742a] text-white font-semibold"
                                onClick={handleRegisterSubmit}
                            >
                                Sign Up
                            </button>

                            <p className="text-black text-sm font-gillroy pt-3 block md:hidden">
                                Already have an account?
                                <a href="/user/login"> Login</a>
                            </p>

                        </div>

                    </form>
                </div>

                <div className="image-container h-[250px] md:h-full md:flex-1 flex items-end" style={{ backgroundImage: `url(${'../src/assets/images/married-couple-holding-hands-silhouette.jpg'})` }}>
                    <div className="flex flex-col items-center justify-between w-full p-5 h-full md:h-[180px]">
                        <h1 className="text-white text-2xl font-semibold font-gillroy md:text-3xl">Get Start with MATRIFY</h1>
                        <p className="text-white text-sm font-gillroy hidden md:block">
                            Already have an account?
                            <a href="/user/login"> Login</a>
                        </p>
                    </div>
                </div>                
            </div>

            <ToastContainer/>

            <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col items-center mt-10 px-6 gap-10">
                    <h2 className="font-gillroy text-2xl font-semibold md:text-3xl">Matrify OTP Verification</h2>
                    <p className="text-lg">Please enter the OTP (one time password) send to your registered phone number to complete the verification.</p>
                    <div className="h-[50px] w-full flex items-center justify-center">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} 
                        className="mx-[3px] md:mx-3"
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "5px",
                            border: "1px solid #dd742a",
                            fontSize: "20px",
                            fontWeight: "bold",
                            textAlign: "center",
                            outline: "none",
                        }}/>}
                    />
                    </div>
                    <div className="flex justify-between w-full">
                        <p>Remaining Time: 00:{remainingTime}</p>
                        <a className="text-blue-500">Resend OTP?</a>
                    </div>
                    <div className="flex justify-between w-full gap-4">
                        <button 
                            className="w-1/2 px-5 py-3 rounded-md bg-[#dd742a] text-white font-semibold hover:bg-[#999999]"
                            onClick={handleOTPVerification}
                        >
                        Verify
                        </button>
                        <button 
                            className="w-1/2 border-[#dd742a] border-[1px] rounded-md"
                             onClick={() => setIsModalOpen(false)}
                        >
                        Cancel
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    )
}