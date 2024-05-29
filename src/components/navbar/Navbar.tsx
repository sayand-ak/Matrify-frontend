import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
import { LegacyRef, useRef, useState } from "react";
import { RxCountdownTimer } from "react-icons/rx";


interface NavbarProps {
    page: string;
}

export default function Navbar({page}: NavbarProps){
    const [searchData, setSearchData] = useState(null);
    const searchRef:LegacyRef<HTMLDivElement> = useRef(null);

    // handle search focus event 
    const handleSearchFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        if(event.target.parentElement) event.target.parentElement.style.borderBottom = '0.2px solid #F5F5F5';

        if (searchRef.current) {
            searchRef.current.style.display = 'block';
            searchRef.current.style.transform = 'scaleY(1)';
        }
    };

    //handle search blur event
    const handleSearchBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        if(event.target.parentElement) event.target.parentElement.style.borderBottom = 'none';

        if (searchRef.current) {
            searchRef.current.style.transform = 'scaleY(0)';
        }
    };




    const navigate = useNavigate();
    return (
        <div className="nav w-full items-center justify-between px-5 flex md:px-14 bg-transparent">
            <div className="flex">
                <a href="#">
                    <div className="logo-div h-14 w-16 ">

                    </div>
                </a>

                { page!="landing"&&
                    <ul className={`lg:flex hidden gap-14 items-center bg w-[fit-content] pl-10 font-semibold ${page == "home" ? "text-[#ffffff73]" : "text-[#000]" } text-[16px]`}>
                        <li className={`${page === "home" && "hover:text-white"} cursor-pointer`}>Home</li>
                        <li className={`${page === "home" && "hover:text-white"} cursor-pointer`}>About</li>
                        <li className={`${page === "home" && "hover:text-white"} cursor-pointer`}>Blog</li>
                        <li className={`${page === "home" && "hover:text-white"} cursor-pointer`}>Gallery</li>
                        <li className={`${page === "home" && "hover:text-white"} cursor-pointer`}>Contact</li>
                    </ul>
                }

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

                {  page!="landing" &&  
                    <div className={`flex items-center gap-10 justify-end w-full`}>
                        {
                            page == "home" && 
                            <form 
                                action="#" 
                                className={`relative flex px-2 py-1 items-center ${page === "home" && "hover:text-white"} text-[#ffffff73]`}
                                onSubmit={() => alert()}
                            >
                                <IoSearch className="text-[22px]"/>

                                <input
                                    type="text"
                                    placeholder="Search here"
                                    className="w-[250px] h-[40px] px-4 outline-none bg-transparent"
                                    onFocus={handleSearchFocus}
                                    onBlur={handleSearchBlur}
                                />

                                <div
                                    className="bg-[#4b4b4b45] absolute scale-y-0 transition-transform top-[50px] left-0 min-h-20 w-[290px]"
                                    style={{
                                        transitionDuration: '0.2s',
                                        transformOrigin: 'top',
                                    }}
                                    ref={searchRef}
                                >
                                    <span className="text-[#979393] flex items-center gap-3 pt-2 px-2 font-gillroy">
                                        {searchData == null ? (
                                            <>
                                                <RxCountdownTimer />
                                                <p>No Search yet</p>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </div>

                            </form>
                        }

                        <a href="/user/profile" className="opacity-[0.8] hover:opacity-[1]">
                            <div className="relative h-[3.5rem] w-[3.5rem] rounded-full nav-profile-icon">
                                
                            </div>
                        </a>
                    </div>
                }           
            </div>
        </div>
    )
}