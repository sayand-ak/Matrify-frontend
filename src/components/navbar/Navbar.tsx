import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
// import { SearchBox } from "../searchbox/searchBox";

interface NavbarProps {
    page: string;
}

export default function Navbar({page}: NavbarProps){
    const navigate = useNavigate();
    return (
        <div className="nav w-full items-center justify-between px-5 flex md:px-14 bg-[#fff] z-10">
            <div className="flex">
                <a href="#">
                    <div className="logo-div h-14 w-16 ">

                    </div>
                </a>
                { page!="landing"&&
                <ul className="flex gap-10 items-center bg w-[fit-content] px-5 font-semibold text-[#000] text-[16px]">
                    <li>Home</li>
                    <li>About</li>
                    <li>Blog</li>
                    <li>Gallery</li>
                    <li>Contact</li>
                </ul>}
            </div>


            <div className="flex items-center gap-10 justify-end w-full">
                { page == "landing" &&
                    <div className="flex items-center gap-5 justify-end w-full">
                        <a href="/user/login" className="login-btn px-3 py-2 md:py-3 md:px-5">Log in</a>
                        <button 
                            className="px-3 py-2 md:py-3 md:px-5"
                            onClick={() =>{
                                navigate("/user/register")
                            }}>
                            Sign up
                        </button>
                    </div>
                }

                {  page!="landing"&&
                    <div className="flex items-center gap-10 justify-end w-full">
                        <form action="#" className="bg-white flex px-2 items-center border-[1px] rounded-[5px] overflow-hidden">
                            <IoSearch className="text-[25px] text-[#838181]"/>
                            <input type="text" placeholder="Search here" className="w-[250px] h-[40px] px-4  outline-none"/>
                        </form>

                        {/* <SearchBox/> */}

                        <a href="/user/profile">
                            <div className="relative h-[3.5rem] w-[3.5rem] border-[1px] border-[#f4f4f4] rounded-full nav-profile-icon">
                                
                            </div>
                        </a>
                    </div>
                }           
            </div>
        </div>
    )
}