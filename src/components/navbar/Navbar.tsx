import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { IoSearch } from "react-icons/io5";
import { LegacyRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { Users } from "../../typings/user/userTypes";
import { searchPartner, saveSearchData, getUserNotifications } from "../../services/userAPI";
import { FaHistory } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { NotificationType } from "../../typings/notifications/notificationType";
import { NavbarToggleDiv } from "../NavbarToggleDiv/NavbarToggleDiv";
import { MdOutlineMoreVert } from "react-icons/md";



interface NavbarProps {
    page: string;
}

export default function Navbar({page}: NavbarProps){

    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState<Users[]>([]);
    const [value] = useDebounce(searchData, 1000);
    const [searchUserIds, setSearchUserIds] = useState<string[] | []>([]);
    const [notifications, setNotifications] = useState<NotificationType | null>(null);

    const [isHovered, setIsHovered] = useState(false);


    const dispatch = useAppDispatch();

    const selector = useAppSelector(state => state.user.user);

    // Convert chat object to Map if needed
    const chatMap = useMemo(() => {
        if (notifications && notifications.chat) {
            return notifications.chat instanceof Map
                ? notifications.chat
                : new Map(Object.entries(notifications.chat));
        }
        return new Map();
    }, [notifications]);

     // Compute the number of unread messages
     const unreadMessagesCount = useMemo(() => {
        let count = 0;
        for (const value of chatMap.values()) {
            if (value > 1) {
                count += value;
            }
        }
        return count;
    }, [chatMap]);

    // Compute the number of interest requests
    const interestRequestsCount = useMemo(() => {
        return notifications?.interestReceived.length ?? 0;
    }, [notifications]);

    // Total notifications count
    const totalNotificationsCount = useMemo(() => {
        return unreadMessagesCount + interestRequestsCount;
    }, [unreadMessagesCount, interestRequestsCount]);
    const handleGetNotifications = useCallback(async() => {
      const response = await dispatch(getUserNotifications());      
      setNotifications(response.payload.data);
      
    }, [dispatch, notifications])

    useEffect(() => {
      handleGetNotifications();
    }, []);


    useEffect(() => {
        if (searchData.length > 0) {
            const ids = searchData.map(user => user._id).filter((id): id is string => id !== undefined);
            setSearchUserIds(ids);
        } else {
            setSearchUserIds([]);
        }
      }, [searchData]);
      

    const searchRef:LegacyRef<HTMLDivElement> = useRef(null);    

    // handle search focus event 
    const handleSearchFocus = () => {

        if (searchRef.current) {
            searchRef.current.style.display = 'block';
            searchRef.current.style.transform = 'scaleY(1)';
        }
    };

    //handle search blur event
    const handleSearchBlur = () => {

        if (searchRef.current) {
            searchRef.current.style.transform = 'scaleY(0)';
        }
    };

    //search for user using username
    async function handleSearch (text: string) {
        if(text.trim() != ""){
            setSearch(text);
            const response = await dispatch(searchPartner(text));
            console.log(response);
            
            if (response.payload.data) {
                setSearchData(response.payload.data);                
            }else{
                setSearchData([])
            }
        }else{
            setSearch(text);
            setSearchData([]);
        }
    }

    async function handleSaveSearchData() {
        const searchData: {text: string, date: Date, searchResult: string[]} = {
          text: search,
          date: new Date(),
          searchResult: searchUserIds,
        };
      
        try {
            if(search.trim() != "") {
                const response = await dispatch(saveSearchData(searchData));

                const user = localStorage.getItem("user");
                if (user && response.payload.data) {
                  const userData = JSON.parse(user);
                  userData.searchHistory = response.payload.data;
                  localStorage.setItem("user", JSON.stringify(userData));
            }
        }

        } catch (error) {
          console.error("Error saving search data:", error);
          // Handle error by displaying a message or something similar
        }
      }
      
    const navigate = useNavigate();
    return (
           
            <div className="navbar w-full items-center justify-between px-5 flex md:px-14 bg-transparent z-10 relative">
                <div className="flex">
                    <a href="#">
                        <div className="logo-div h-14 w-16 hidden sm:flex">

                        </div>
                    </a>

                    { page!="landing"&&
                        <ul className={`lg:flex hidden gap-14 items-center w-[fit-content] pl-10 font-semibold ${page == "home" ? "text-[#ffffff73]" : "text-[#000]" } text-[16px]`}>
                            <li className={`${page === "home" && "hover:text-white"} cursor-pointer`}>
                                <a href="/home">Home</a>
                            </li>
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
                            <a href="/login" className="login-btn px-2 py-1 md:py-3 md:px-5">Log in</a>
                            <button 
                                className="px-3 py-2 md:py-3 md:px-5"
                                onClick={() =>{
                                    navigate("/register")
                                }}>
                                Sign up
                            </button>
                        </div>
                    }

                    {  page!="landing" &&  
                        <div className={`flex items-center gap-2 sm:gap-10 justify-end`}>
                            {
                                page == "home" && 
                                <form 
                                    action="#" 
                                    className={`relative flex  px-2 py-1 items-center ${page === "home" && "hover:text-white"} text-[#ffffff73] rounded-t-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-gray-400`}
                                    onSubmit={handleSaveSearchData}
                                >
                                    <IoSearch className="text-[22px]"/>

                                    <input
                                        type="text"
                                        placeholder="Search by username"
                                        className="md:w-[343px] h-[40px] px-5 outline-none bg-transparent"
                                        onFocus={handleSearchFocus}
                                        onBlur={handleSearchBlur}
                                        onChange={(e) => {
                                            handleSearch(e.target.value)
                                        }}
                                        value={search}
                                    />

                                    <div
                                        className="absolute scale-y-0 transition-transform top-[48px] left-0 min-h-14 max-h-[40vh] w-[255px] md:w-[382px] overflow-y-scroll no-scrollbar bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 py-3"

                                        style={{
                                            transitionDuration: '0.2s',
                                            transformOrigin: 'top',
                                            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px'
                                        }}
                                        ref={searchRef}
                                    >
                                        <span className="text-[#fff] flex items-center px-2 font-poppins">
                                            {search.length <=0 && (
                                                <div className="flex flex-col gap-3 w-full h-full">
                                                    {selector?.searchHistory.length === 0 ? (
                                                        <span className="flex items-center gap-3">
                                                            <FaHistory className="text-gray-300 text-[14px]"/>

                                                            <p>No Search yet</p>
                                                        </span>
                                                    ) : (
                                                        selector?.searchHistory?.map((searchHistory, index) => (
                                                            <a 
                                                                key={index} 
                                                                className="flex gap-5 items-center cursor-pointer w-fill hover:bg-[#ffffff3b] py-1 px-2"
                                                                onClick={() => {setSearch(searchHistory.text)}}
                                                            >
                                                                <FaHistory className="text-gray-300 text-[14px]"/>

                                                                {searchHistory.text}
                                                            </a>
                                                        ))
                                                    )}
                                                </div>
                                            )}
                                             {
                                                search.length > 0 &&(
                                                    <div className="flex flex-col gap-2 w-full">
                                                        {value.length > 0 ? (
                                                            value.map(user => (
                                                                <a href={`/profile/${user._id}`} key={user._id} >
                                                                    <div 
                                                                        className="flex gap-5 items-center hover:bg-[#ffffff3b] my-2 py-2 px-4"
                                                                    >
                                                                        <img src={user.image} className="h-14 w-14 rounded-full" alt="" />
                                                                        <p>{user.username}</p>
                                                                    </div>
                                                                </a>
                                                            ))
                                                        ) : (
                                                            <div className="h-full w-full flex items-center gap-4">
                                                                <BiInfoCircle className="text-gray-300 text-[24px]"/>
                                                                <p>No match found!</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    )
                                                }
                                        </span>

                                    </div>

                                </form>
                            }

                            <a href={`/profile/${selector?._id}`} className="hidden sm:flex">
                                <div
                                    className="relative w-14 h-14 border-[1.5px] border-gray-400 rounded-full cursor-pointer"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <img
                                        src={selector?.image ?? "/default-profile-pic.jpg"}
                                        alt="Profile"
                                        className="w-full h-full object-cover rounded-full"
                                        
                                    />
                                </div>

                                {totalNotificationsCount > 0 ? (
                                    <div className="bounce2 absolute -top-1 right-1 bg-red-500 rounded-full text-white text-sm w-5 h-5 flex items-center justify-center">
                                        {totalNotificationsCount}
                                    </div>
                                ) : null}
                            </a>

                            <MdOutlineMoreVert 
                            className="text-white text-[25px] block sm:hidden"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            />
                            
                            {(isHovered) && (
                                <NavbarToggleDiv />
                            )}

                        </div>
                    }           
                </div>
            </div>
    )
}