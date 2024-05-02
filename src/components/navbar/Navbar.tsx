import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(){
    const navigate = useNavigate();
    return (
        <div className="nav bg-white items-center justify-between px-5 flex md:px-14">
            <a href="#" className="hidden md:block">
                <div className="logo-div h-28 w-20">

                </div>
            </a>
            <div className="flex items-center gap-5 justify-end w-full">
                <a href="/user/login" className="login-btn py-3 px-5">Log in</a>
                <button 
                    className="py-3 px-5"
                    onClick={() =>{
                        navigate("/user/register")
                    }}>
                    Sign up
                </button>
            </div>
        </div>
    )
}