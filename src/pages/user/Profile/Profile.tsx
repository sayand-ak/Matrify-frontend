// import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { CiUser } from "react-icons/ci";
import { CiPercent } from "react-icons/ci";
import { PiPhoneCallThin } from "react-icons/pi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { CiChat1 } from "react-icons/ci";
import { MdOutlineBlock } from "react-icons/md";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import { LuPlus } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import "./Profile.css";
import { addPreferences, blockUser, sendInterest, unblockUser, userProfile } from "../../../services/userAPI";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { UserFamily, UserProfession, UserProfile } from "../../../typings/Profile/professionDataType";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { PiGenderMale } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { CiLineHeight } from "react-icons/ci";
import { LuLanguages } from "react-icons/lu";

import { PiGraduationCapLight } from "react-icons/pi";
import { MdEngineering } from "react-icons/md";
import { MdSensorOccupied } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { SlDocs } from "react-icons/sl";
import { IoEyeOutline } from "react-icons/io5";

import { MdFamilyRestroom } from "react-icons/md";
import { PiCrossLight } from "react-icons/pi";
import { GiBigDiamondRing } from "react-icons/gi";
import { TbDisabled } from "react-icons/tb";
import { PiStarOfDavidLight } from "react-icons/pi";
import { CgMenuLeft } from "react-icons/cg";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";


import 'react-circular-progressbar/dist/styles.css';
import ProfileSection from "../../../components/profileSection/ProfileSection";
import { EditFormModal } from "../../../components/editFrom/EditForm";
import { PaymentHistory } from "../PaymentHistory/PaymentHistory";
import { EditFamilyFormModal } from "../../../components/editFrom/EditFamilyForm";
import { setUserCredentials, userLogout } from "../../../redux/slices/userSlices";
import { useNavigate, useParams } from "react-router-dom";
import { calculateAgeInYears } from "../../../utils/calculateAgeInYears";
import { formatDate } from "../../../utils/formateDate";
import { MoreOptionsBtn } from "../../../components/moreOptionsBtn/MoreOptionsBtn";
import { InterestReceived, InterestSend } from "../../../typings/user/userTypes";
import InterestLogs from "../InterestLogs/InterestLogs";
import { MdReportGmailerrorred } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import showToast from "../../../components/Toast/Toast";
import { ToastContainer } from "react-toastify";
import { CgUnblock } from "react-icons/cg";
import { BlockedUsers } from "../BlockedUsers/BlockedUsers";



interface RouteParams extends Record<string, string | undefined>  {
    id: string; 
    user: string
}

export function Profile() {

    const [showProfile, setShowProfile] = useState<boolean>(true);
    const [showPayment, setShowPayment] = useState<boolean>(false);
    const [showInterestLogs, setShowInterestLogs] = useState<boolean>(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showBlockedUsers, setShowBlockedUsers] = useState<boolean>(false);

    const [userData, setUserData] = useState<{ profile?: UserProfile; family?: UserFamily; profession?: UserProfession }>();
    const [preferences, setPreferences] = useState<string>("");
    const [preferencesError, setPreferencesError] = useState("");
    
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [selectedTab, setSelectedTab] = useState<string>("profile");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [likeBtnColor, setLikeBtnColor] = useState<string>("00000039");

    const { id } = useParams<RouteParams>();    
    const curUser = useAppSelector(state => state.user.user);

    const [sendInterestButtonLabel, setSendInterestButtonLabel] = useState<string>("Send interest");

    const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

    const [isLoggedUser, setIsLoggedUser] = useState<boolean>(true);


    const handleAddPreferencesClick = () => {
        setIsFormVisible(!isFormVisible); 
    };    
    
    const items:Array<{name: string, icon: IconType}> = [
        { name: "Profile", icon: CiUser },
        { name: "Interest Shared", icon: CiPercent },
        { name: "Call logs", icon: PiPhoneCallThin },
        { name: "Payments", icon: HiOutlineCurrencyRupee },
        { name: "Chat", icon: CiChat1 },
        { name: "Likes", icon: CiHeart  },
        { name: "Blocked", icon: MdOutlineBlock  },
    ];

    const handleSidebarItemClick = (itemName: string) => {
        if (itemName === "Profile") {
            setShowProfile(true)
        } else {
            setShowProfile(false);
        }

        if (itemName === "Payments") {
            setShowPayment(true);
        }else{
            setShowPayment(false);
        }

        if (itemName === "Interest Shared") {
            setShowInterestLogs(true);
        }else{
            setShowInterestLogs(false);
        }

        if (itemName === "Chat") {
            navigate("/chat")
        }
        
        if (itemName === "Blocked") {
            setShowBlockedUsers(true);
        }else{
            setShowBlockedUsers(false);
        }

        if (itemName === "Logout") {
            dispatch(userLogout());
            navigate("/login")
        }
    };

    useEffect(() => {
        const fetchUserData = async() => {
            if (id) {
                const response = await dispatch(userProfile(id));
                
                if (response.payload.success) {
                    const data = response.payload.data;
                    console.log(data);

                    setUserData({
                        profile: data[0],
                        profession: data[1],
                        family: data[2],
                    });

                    if(userData?.profile?._id === curUser?._id) {
                        setIsLoggedUser(true);
                    }else{
                        setIsLoggedUser(false);
                    }

                } else {
                    alert("profile api calling error")
                }
            }
        }
        fetchUserData();

    }, [curUser?._id, dispatch, id, userData?.profile?._id]);
    
    useEffect(() => {
        if(userData?.profile && userData?.profile.interestReceived.some((interestData: InterestReceived) => interestData.sendBy === curUser?._id && interestData.status === "pending")){
            setSendInterestButtonLabel("Waiting to accept...");
        }else if(userData?.profile && userData?.profile.interestReceived.some((interestData: InterestReceived) => interestData.sendBy === curUser?._id && interestData.status === "accepted")){
            setSendInterestButtonLabel("Interest Accepted...");
        }
        else if(userData?.profile && userData?.profile.interestSend.some((interestData: InterestSend) => interestData.sendTo === curUser?._id && interestData.status === "accepted")){
            setSendInterestButtonLabel("Interest accepted...");
        }
    }, [userData?.profile, curUser?._id]);

    const handleTabSelect = (tab: string, event:React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setSelectedTab(tab);
    }
    

    const handleAddPreferences = async() => {
        if (/^[a-zA-Z\s]+$/.test(preferences)) {
            setPreferencesError(""); 
            const response = await dispatch(addPreferences(preferences));

            window.location.reload();
            console.log(response);
        } else {
            setPreferencesError("Please enter only characters.");
        }
    };

    function showSidebar() {
        setSidebarToggle(!sidebarToggle)
    }

    async function handleSendInterest() {
        if (sendInterestButtonLabel == "Send interest" && userData?.profile?.subscribed) {
            const response = await dispatch(sendInterest(id || ""));
    
            if (response.payload.success) {
                setSendInterestButtonLabel("Waiting to Accept...");
            } 
        } else {
            showToast("error", "You are not subscribed , please subscribe to send interest")
        }
    }

    async function handleBlockUser() {
        if(userData?.profile?._id){
            const response = await dispatch(blockUser(userData?.profile?._id))
            if(response.payload.success){
                console.log("block response",response.payload.data);
                
                dispatch(setUserCredentials(response.payload.data))                
                showToast('success', 'User blocked successfully')
            } else {
                showToast('error', 'Something went wrong', )
            }
        }
    }

    async function handleUnblockUser() {
        if(userData?.profile?._id){
            const response = await dispatch(unblockUser(userData?.profile?._id))
            if(response.payload.success){
                console.log("unblock response",response.payload.data)
                dispatch(setUserCredentials(response.payload.data))  
                showToast('success', 'User unblocked successfully')
            } else {
                showToast('error', 'Something went wrong', () => {
                    window.location.reload()
                }
            )}
        }
    }
        

    return (
        <div className="flex flex-col w-full overflow-hidden relative">

            {/* navbar */}
            <div className="z-10 hidden md:block">
                <Navbar page="profile"/>
            </div>

            {/* sidebar in mobile view */}
            <div className={`bg-white transition-transform duration-300 ease-in-out ${sidebarToggle && isLoggedUser ? "fixed translate-x-0" : "fixed -translate-x-full"} md:hidden w-[70vw] h-[100vh] z-10`}>
                <CgMenuLeft className="text-2xl text-black ml-10 mt-5 block" onClick={showSidebar}/>
                <Sidebar
                    role="user"
                    items={items}
                    onClickItem={handleSidebarItemClick} 
                />
            </div>


            <div className="flex">

                {/* sidebar in normal view */}
                <div className={`hidden max-w-[20rem] ${isLoggedUser ? "md:flex":""}`}>
                    <Sidebar 
                        role="user"
                        items={items}
                        onClickItem={handleSidebarItemClick} 
                    />     
                </div>

                {
                    //if profile is selected show default profile page
                    showProfile && (

                        <div className="w-full flex bg-[#F5F2EC] flex-col xl:flex-row">

                            <div className="w-full flex justify-center py-0 md:py-7">

                                <div className={`w-full ${isLoggedUser ? "md:w-[93%]" : "md:w-[70%]"} min-h-[45.1rem] bg-[#fff] border-[1px] flex flex-col justify-center items-center md:rounded-lg overflow-hidden`}>

                                    {/* the cover image div */}
                                    <div className="w-full h-[30%]" style={{backgroundImage: "url('/src/assets/images/bgprofile.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
                                        <CgMenuLeft className={`text-2xl rounded-full text-white ml-4 mt-5 md:hidden ${isLoggedUser ? "block" : "hidden"}`} onClick={showSidebar}/>
                                    </div>

                                    <div className="w-full h-[33%] relative">
                                        <div 
                                            className="rounded-full h-48 w-48 absolute top-[-100px] left-10 border-[5px] border-white z-0"
                                            style={{
                                                backgroundImage: `url(${userData?.profile?.image ?? "../../src/assets/images/profile.png"})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundColor: "#f4f4f4"
                                            }}
                                        ></div>

                                        <div className="w-full absolute top-[90px] left-16 flex flex-col justify-between overflow-x-auto">
                                            
                                            <div className="flex flex-col gap-2 ">
                                                <h1 className="text-[20px] font-semibold pt-2 flex items-center gap-5">
                                                    {userData?.profile?.username} ({calculateAgeInYears(userData?.profile?.dob || "")})
                                                    {
                                                        ! isLoggedUser && (
                                                            <FaHeart 
                                                                className={`text-[26px] text-[#${likeBtnColor}]`}
                                                                onClick={() => {setLikeBtnColor("FF0000")}}
                                                            />
                                                        )
                                                    }
                                                </h1>

                                                <h1 
                                                    className="text-[13px] md:text-[12px] lg:text-[14px] text-[#00000069]"
                                                >
                                                    {userData?.profile?.email}
                                                </h1>
                                                
                                                <h1 
                                                    className="flex items-center gap-2 text-[13px] md:text-[12px] lg:text-[14px] text-[#00000069]"
                                                >
                                                    <SlCalender />
                                                    Joined At: {formatDate(userData?.profile?.createdAt || "")}
                                                </h1>
                                            </div>
                                        </div>


                                        {/* if the profile is for user show edit btn and if its for match show match options */}
                                        {
                                            isLoggedUser ? (
                                                <button 
                                                    className="absolute right-4 md:right-10 top-5 px-3 py-1 md:px-5 md:py-2 border-[1px] text-[12px] md:text-[15px] font-semibold text-[#C2A170] border-[#C2A170] border-solid rounded-3xl hover:bg-[#C2A170] hover:text-white"
                                                    onClick={() => setIsModalOpen(true)}
                                                >
                                                    Edit profile
                                                </button>
                                            ) : (

                                                <div className="absolute flex items-center gap-5 right-4 md:right-10 top-5 font-semibold text-[#C2A170]">
                                                    <button 
                                                        className="border-[1px] text-[15px] h-10 rounded-lg px-3 border-[#c2a17085]"
                                                        onClick={handleSendInterest}
                                                    >
                                                        {sendInterestButtonLabel}
                                                    </button>
                                                    <button onClick={() => setShowMoreOptions(!showMoreOptions)}>
                                                        <MoreOptionsBtn/>
                                                    </button>
                                                    {
                                                        showMoreOptions &&
                                                        <div className="w-56 rounded-md bg-[#f4f4f4] shadow-md min-h-20 absolute right-0 top-14 showMoreOptions-visible transition-opacity">
                                                            <IoMdArrowDropup className="absolute top-[-21px] right-0 text-[35px] text-[#f4f4f4]"/>

                                                            
                                                            <ul className="pl-3 pt-2 flex flex-col gap-4 text-[#969393]">
                                                                {
                                                                    curUser?.blockedUsers?.some((data) => data.user === userData?.profile?._id) ?
                                                                    (<li className="flex items-center gap-3 cursor-pointer hover:text-green-500">
                                                                        <CgUnblock className="text-[23px]"/>
                                                                        <button onClick={handleUnblockUser}>
                                                                            Unblock user
                                                                        </button>
                                                                    </li>
                                                                    ) : (
                                                                        <li className="flex items-center gap-3 cursor-pointer hover:text-red-500">
                                                                        <MdBlock className="text-[23px]"/>
                                                                        <button onClick={handleBlockUser}>
                                                                            Block user
                                                                        </button>
                                                                    </li>
                                                                    )
                                                                }
                                                                <li className="flex items-center gap-3 cursor-pointer hover:text-red-500">
                                                                    <MdReportGmailerrorred className="text-[23px]"/>
                                                                    <a href={`/reportUser/${userData?.profile?._id}`}>
                                                                        Report user
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    }

                                                </div>

                                            )
                                        }

                                        {/* Edit form modal */}
                                        {
                                            selectedTab === "profile" && (
                                                <EditFormModal
                                                    userData={userData}
                                                    isModalOpen={isModalOpen}
                                                    setIsModalOpen={setIsModalOpen}
                                                />
                                            )
                                        }
                                        {
                                            selectedTab === "family" && (
                                                <EditFamilyFormModal
                                                    userData={userData}
                                                    isModalOpen={isModalOpen}
                                                    setIsModalOpen={setIsModalOpen}
                                                />
                                            )
                                        }

                                    </div>

                                    {/* tab for navigating between profile data */}
                                    <div className="w-full flex justify-center border-b-[2px]">
                                        <ul className="flex justify-between font-semibold text-[16px] w-full px-5 md:px-16 py-1">
                                            <li>
                                                <a 
                                                    href=""
                                                    className= {`${selectedTab === "profile" && "border-b-[5px] border-[#E8C68F]"} cursor-pointer`}
                                                    onClick={(e) => handleTabSelect("profile", e)}
                                                >
                                                    About
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    className= {`${selectedTab === "profession" && "border-b-[5px] border-[#E8C68F]"} cursor-pointer`}
                                                    onClick={(e) => handleTabSelect("profession", e)}
                                                >
                                                    Profession
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    className= {`${selectedTab === "family" && "border-b-[5px] border-[#E8C68F]"} cursor-pointer`}
                                                    onClick={(e) => handleTabSelect("family", e)}
                                                >
                                                    Family
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    className= {`${selectedTab === "preferences" && "border-b-[5px] border-[#E8C68F]"} cursor-pointer`}
                                                    onClick={(e) => handleTabSelect("preferences", e)}
                                                >
                                                    Preferences
                                                </a>
                                            </li>
                                        </ul>

                                    </div>

                                    <div className="w-full bg-[#ffffff] min-h-[40%] flex items-center">
                                        
                                    {/* actual profile data */}
                                    {selectedTab === 'profile' && (
                                        <ProfileSection
                                            icons={[LiaBirthdayCakeSolid, PiGenderMale, CiLocationOn, CiLineHeight, LuLanguages]}
                                            headings={['Date of birth:', 'Gender:', 'Location:', 'Height:', 'Mother Tongue:']}
                                            data={[
                                            `${formatDate(userData?.profile?.dob || "")}`,
                                            userData?.profile?.gender || 'N/A',
                                            `${userData?.profile?.state || 'N/A'}, ${userData?.profile?.district || 'N/A'}`,
                                            `${userData?.profile?.height || 'N/A'} cm`,
                                            userData?.profile?.motherTongue || 'N/A',
                                            ]}
                                        />
                                        )}

                                        {selectedTab === 'profession' && (
                                        <ProfileSection
                                            icons={[PiGraduationCapLight, MdEngineering, MdSensorOccupied, RiMoneyRupeeCircleLine, SlDocs]}
                                            headings={['Highest education:', 'Employee status:', 'Occupation:', 'Annual income:', 'Documents added:']}
                                            data={[
                                            userData?.profession?.education || 'N/A',
                                            userData?.profession?.empStatus || 'N/A',
                                            userData?.profession?.occupation || 'N/A',
                                            userData?.profession?.annualIncome || 'N/A',
                                            <p className="flex gap-2 flex-col">
                                                <a className="text-blue-500 flex items-center gap-3" target="_parent">
                                                education doc <IoEyeOutline />
                                                </a>
                                                <a className="text-blue-500 flex items-center gap-3" target="_parent">
                                                profession doc <IoEyeOutline />
                                                </a>
                                            </p>
                                            ]}
                                        />
                                        )}

                                        {selectedTab === 'family' && (
                                        <ProfileSection
                                            icons={[MdFamilyRestroom, PiCrossLight, GiBigDiamondRing, TbDisabled, PiStarOfDavidLight]}
                                            headings={['Family:', 'Family Value:', 'Marital Status:', 'Disabilities:', 'Religious Details:']}
                                            data={[
                                            `${userData?.family?.familyType || 'N/A'} and ${userData?.family?.familyStats || 'N/A'}`,
                                            userData?.family?.familyValue || 'N/A',
                                            userData?.family?.martialStatus || 'N/A',
                                            `${userData?.family?.disabilities || 'N/A'}, (${userData?.family?.description || 'N/A'})`,
                                            `${userData?.family?.religion || 'N/A'}, ${userData?.family?.cast || 'N/A'}`,
                                            ]}
                                        />
                                        )}

                                        {selectedTab === 'preferences' &&
                                        (
                                            userData?.profile?.preferences.length || 0 > 0 ? 
                                                (<div className="w-full h-full flex flex-col gap-4 pl-16 pt-5">
                                                    {(userData?.profile?.preferences.length || 0) < 5 ? 
                                                        <h1 className="text-[20px] font-semibold w-[95%] flex items-center justify-between">
                                                            You can add {5 - (userData?.profile?.preferences.length || 0)} more preferences
                                                            <button className="px-3 py-1 md:px-5 md:py-2 border-[1px] text-[12px] md:text-[15px] font-semibold text-red-800 border-red-800 border-solid rounded-3xl hover:bg-red-800 hover:text-white">Delete</button>
                                                        </h1>
                                                        :
                                                        <h1 className="text-[20px] font-semibold w-[95%] flex items-center justify-between">
                                                            Your Preferences
                                                            <button className="px-3 py-1 md:px-5 md:py-2 border-[1px] text-[12px] md:text-[15px] font-semibold text-red-800 border-red-800 border-solid rounded-3xl hover:bg-red-800 hover:text-white">Delete</button>
                                                        </h1>}
                                                    {
                                                        userData?.profile?.preferences?.map((preference, index) => (
                                                            <div className="flex gap-5">
                                                                <span>{index + 1} ) </span>
                                                                <p className="text-[17px]" key={index}>{preference}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </div>) : 
                                                (<div className="w-full h-full flex flex-col justify-center items-center">
                                                    <img src="/src/assets/images/empty.png" alt="" className="h-3/4 w-1/4 opacity-[0.7]" />
                                                <p className="text-gray-400">No preferences added</p> 
                                                </div>)
                                        )}
                                    </div>

                                </div>
                            </div>

                            {
                                isLoggedUser && (
                                    <div className="w-full xl:w-[35%] xl:py-7 px-2 md:px-7 xl:px-0 items-start gap-3 md:gap-7 flex-row xl:flex-col flex py-5">
                                        <div className="progress-card h-[12rem] md:h-[15rem] bg-[#fbfbfb] flex flex-col justify-center items-center gap-3 rounded-lg w-[90%]">
                                            <h1 className="text-[15px] md:text-[18px] text-center px-2 font-semibold">Complete your profile for exact matches...</h1>
                                            <CircularProgressbar
                                                value={(userData?.profile?.profileProgress || 0) } 
                                                text={`${(userData?.profile?.profileProgress || 0)}%`} 
                                                className="h-[40%]" 
                                                styles={buildStyles({
                                                    pathColor: "#EAC991",
                                                    textColor: "#E7B10A",
                                                    trailColor: "#d6d6d6",
                                                })}
                                            />

                                        </div>

                                        { (userData?.profile?.preferences.length || 0) < 5 && 
                                            (<div className="progress-card h-[12rem] md:h-[15rem] bg-[#fbfbfb] flex flex-col justify-center items-center gap-7 rounded-lg  w-[90%]">
                                                <h1 className="text-[15px] md:text-[18px] text-center font-semibold">Add your Preferences</h1>
                                                <button 
                                                    className={`border-[4px] border-[#EAC991] rounded-full ${
                                                        isFormVisible ? 'hidden' : ''}`}
                                                    onClick={handleAddPreferencesClick}
                                                >
                                                    <LuPlus className="text-[70px] text-[#EAC991]"/>
                                                </button>

                                                <div className={`items-center justify-center flex-col gap-6 w-full ${
                                                    isFormVisible ? 'flex' : 'hidden'
                                                }`}>
                                                    <input 
                                                        type="text" 
                                                        className="bg-[#f4f4f4] outline-none border-[1px] w-[90%] min-h-[40px] text-sm px-2 rounded-md" 
                                                        placeholder="Enter preferences"
                                                        value={preferences}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value) {
                                                                setPreferencesError("");
                                                                setPreferences(value);
                                                            } else {
                                                                setPreferences("");
                                                                setPreferencesError("Preferences cannot be empty"); // Set an error message when the input is empty
                                                            }
                                                        }}
                                                    />
                                                    {preferencesError && <div className="text-red-500 text-sm">{preferencesError}</div>}
                                                    <div className="flex justify-between w-[13rem]">
                                                        <button 
                                                            className="font-semibold px-5 py-1 border-[1px] text-[#fff] border-solid rounded-3xl bg-[#EAC991]"
                                                            onClick={handleAddPreferences}
                                                        >Add</button>
                                                        <button 
                                                            className="font-semibold px-5 py-1 border-[1px] text-[#EAC991] border-[#EAC991] border-solid rounded-3xl" 
                                                            onClick={handleAddPreferencesClick}
                                                        >Cancel</button>
                                                    </div>
                                                </div>
                                        
                                        </div>)
                                    }

                                    </div>
                                )
                            }
                        </div>


                    )
                }

                {
                    //if payment section is selected payment history page is displayed
                    showPayment && (
                        <PaymentHistory userData={userData}/>
                    )
                }

                {
                    //if interest log section is selected payment history page is displayed
                    showInterestLogs && (
                        <InterestLogs interestSend={userData?.profile?.interestSend || []} interestReceived={userData?.profile?.interestReceived || []}/>
                    )
                }

                {
                    showBlockedUsers && (
                        <BlockedUsers/>
                    )
                }
            </div>
            <ToastContainer/>

        </div>
    )
}