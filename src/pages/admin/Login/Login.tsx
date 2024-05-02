import { useState } from "react";
import { validateEmail } from "../../../utils/validateEmail";
import { validatePassword } from "../../../utils/validatePassword";


export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    function validate(type: string, value: string) {
        if (type === "email") {
            if (!validateEmail(value)) {
                setEmailErr("Invalid email entry");
                setEmail(value);
            } else {
                setEmailErr("");
                setEmail(value);
            }
        } else {
            if (!validatePassword(value)) {
                setPasswordErr("Invalid password entry");
                setPassword(value);
            } else {
                setPasswordErr("");
                setPassword(value);
            }
        }
    }


    return (
        <div className="h-[100vh] w-[100vw] flex flex-col-reverse md:flex-row justify-center items-center">

            <div className="form-div flex-1 h-full relative">
                <form action="#" className="h-full flex flex-col items-center justify-center gap-10">
                    <img src="/src/assets/images/MATRIFY-removebg-preview.png" alt="" className="absolute top-5 h-[250px] w-[250px]" />
                    <div className="pt-28">
                        <h1 className="text-3xl font-bold font-gillroy">Welcome back</h1>
                        <p className="text-sm text-center pt-2">Please sign in to continue</p>
                    </div>
                    <div className="w-[350px] md:w-3/4 input-container flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-semibold"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="py-4 px-4 outline-none w-full rounded-md bg-[#2f7cf018] border-[1px]"
                            value={email}
                            onChange={(e) => {validate("email", e.target.value)}}
                        />
                        {emailErr && <span className="text-red-500 text-sm">{emailErr}</span>}
                    </div>

                    <div className="w-full md:w-3/4 input-container flex flex-col gap-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {validate("password", e.target.value)}}
                            className="py-4 px-4 outline-none w-full rounded-md bg-[#2f7cf018] border-[1px]"
                        />
                        {passwordErr &&<span className="text-red-500 text-sm">{passwordErr}</span>}
                    </div>

                    <div className="flex flex-col w-full md:w-3/4 items-center">
                        <button
                            type="submit"
                            className="w-full px-5 py-2  md:mt-2 rounded-md bg-[#004071] text-white font-semibold"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>

            <div 
                className="image-div flex-1 h-full hidden md:block"
                style={{ backgroundImage: `url(${"../src/assets/images/padlock-with-keyhole-icon.jpg"})`, backgroundSize: 'cover'}}
            >
            </div>

        </div>
    )
}