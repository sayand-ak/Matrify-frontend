// import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { CiUser } from "react-icons/ci";
import { CiPercent } from "react-icons/ci";
import { PiPhoneCallThin } from "react-icons/pi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { CiChat1 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { MdOutlineBlock } from "react-icons/md";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import { LuPlus } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import "./Profile.css";
import { addPreferences, userProfile } from "../../../services/userAPI";
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

import 'react-circular-progressbar/dist/styles.css';
import ProfileSection from "../../../components/profileSection/ProfileSection";
import { EditFormModal } from "../../../components/editFrom/EditForm";
import { PaymentHistory } from "../PaymentHistory/PaymentHistory";



export function Profile() {

    const [showProfile, setShowProfile] = useState<boolean>(true);
    const [showPayment, setShowPayment] = useState<boolean>(false);

    const [selectedTab, setSelectedTab] = useState<string>("profile");
    
    const [userData, setUserData] = useState<Array<UserProfile & UserFamily & UserProfession>>();


    const [isFormVisible, setIsFormVisible] = useState(false);

    const [preferences, setPreferences] = useState<string>("");
    const [preferencesError, setPreferencesError] = useState("");
    const [sidebarToggle, setSidebarToggle] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    

  const handleAddPreferencesClick = () => {
    setIsFormVisible(!isFormVisible); 
  };


    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.user.user?._id);
    
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

    };

    useEffect(() => {
        const fetchUserData = async() => {
            if(userId){
                const response = await dispatch(userProfile(userId));
                console.log(response);
                
                if(response.payload.success){
                    setUserData(response.payload.data);
                }
            }
        }
        fetchUserData();
    },[dispatch, userId]);

    const handleTabSelect = (tab: string, event:React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setSelectedTab(tab);
    }


    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    function calculateAgeInYears(dobString: string): number | null {

        if (!dobString) {
          return null; 
        }
      
        try {
          const dob = new Date(dobString);
      
          const today = new Date();
      
          let age = today.getFullYear() - dob.getFullYear();
          const months = today.getMonth() - dob.getMonth();
      
          if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
            age--; 
          }
      
          return age;
        } catch (error) {
          console.error("Error parsing date string:", error);
          return null;
        }
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

    return (
        <div className="flex flex-col w-full overflow-hidden relative">

            {/* navbar */}
            <div className="z-10 hidden md:block">
                <Navbar page="profile"/>
            </div>

            {/* sidebar in mobile view */}
            <div className={`bg-white transition-transform duration-300 ease-in-out ${sidebarToggle ? "fixed translate-x-0" : "fixed -translate-x-full"} md:hidden w-[70vw] h-[100vh] z-10`}>
                <CgMenuLeft className="text-2xl text-black ml-10 mt-5 block" onClick={showSidebar}/>
                <Sidebar
                    role="user"
                    items={items}
                    onClickItem={handleSidebarItemClick} 
                />
            </div>


            <div className="flex">

                {/* sidebar in normal view */}
                <div className="hidden md:flex max-w-[20rem]">
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

                                <div className="w-full md:w-[93%] min-h-[41.1rem] bg-[#fff] border-[1px] flex flex-col justify-center items-center md:rounded-lg overflow-hidden">

                                    {/* the cover image div */}
                                    <div className="w-full bg-[#bfbdb9] h-[30%]" style={{backgroundImage: "url('../src/assets/images/bgprofile.jpg')", backgroundSize: "cover"}}>
                                        <CgMenuLeft className="text-2xl rounded-full text-white ml-4 mt-5 block md:hidden" onClick={showSidebar}/>
                                    </div>

                                    <div className="w-full h-[33%] relative">
                                        <div 
                                            className="rounded-full h-48 w-48 absolute top-[-100px] left-10 border-[5px] border-white z-0"
                                            style={{
                                                backgroundImage: `url(${userData?.[0].image ?? "../../src/assets/images/profile.png"})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        ></div>

                                        <div className="w-full absolute top-[90px] left-16 flex flex-col justify-between overflow-x-auto">
                                            
                                            <div className="flex flex-col gap-2 ">
                                                <h1 className="text-[20px] font-semibold pt-2">{userData?.[0].username} ({calculateAgeInYears(userData?.[0].dob || "")})</h1>
                                                <h1 className="text-[13px] md:text-[12px] lg:text-[14px] text-[#00000069]">{userData?.[0].email}</h1>
                                                <h1 className="flex items-center gap-2 text-[13px] md:text-[12px] lg:text-[14px] text-[#00000069]"><SlCalender />Joined At: {formatDate(userData?.[0].createdAt || "")}</h1>
                                            </div>
                                        </div>

                                        <button 
                                            className="absolute right-4 md:right-10 top-5 px-3 py-1 md:px-5 md:py-2 border-[1px] text-[12px] md:text-[15px] font-semibold text-[#C2A170] border-[#C2A170] border-solid rounded-3xl hover:bg-[#C2A170] hover:text-white"
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            Edit profile
                                        </button>

                                        {/* Edit form modal */}
                                        <EditFormModal userData={userData} isModalOpen={isModalOpen} setIsModalOpen={() => setIsModalOpen(false)}/>

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
                                            `${formatDate(userData?.[0].dob || "")}`,
                                            userData?.[0].gender || 'N/A',
                                            `${userData?.[0].state || 'N/A'}, ${userData?.[0].district || 'N/A'}`,
                                            `${userData?.[0].height || 'N/A'} cm`,
                                            userData?.[0].motherTongue || 'N/A',
                                            ]}
                                        />
                                        )}

                                        {selectedTab === 'profession' && (
                                        <ProfileSection
                                            icons={[PiGraduationCapLight, MdEngineering, MdSensorOccupied, RiMoneyRupeeCircleLine, SlDocs]}
                                            headings={['Highest education:', 'Employee status:', 'Occupation:', 'Annual income:', 'Documents added:']}
                                            data={[
                                            userData?.[1].education || 'N/A',
                                            userData?.[1].empStatus || 'N/A',
                                            userData?.[1].occupation || 'N/A',
                                            userData?.[1].annualIncome || 'N/A',
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
                                            `${userData?.[2].familyType || 'N/A'} and ${userData?.[2].familyStats || 'N/A'}`,
                                            userData?.[2].familyValue || 'N/A',
                                            userData?.[2].martialStatus || 'N/A',
                                            `${userData?.[2].disabilities || 'N/A'}, (${userData?.[2].description || 'N/A'})`,
                                            `${userData?.[2].religion || 'N/A'}, ${userData?.[2].cast || 'N/A'}`,
                                            ]}
                                        />
                                        )}

                                        {selectedTab === 'preferences' &&
                                        (
                                            userData?.[0].preferences.length || 0 > 0 ? 
                                                (<div className="w-full h-full flex flex-col gap-4 pl-16 pt-5">
                                                    {(userData?.[0].preferences.length || 0) < 5 ? 
                                                        <h1 className="text-[20px] font-semibold w-[95%] flex items-center justify-between">
                                                            You can add {5 - (userData?.[0].preferences.length || 0)} more preferences
                                                            <button className="px-3 py-1 md:px-5 md:py-2 border-[1px] text-[12px] md:text-[15px] font-semibold text-red-800 border-red-800 border-solid rounded-3xl hover:bg-red-800 hover:text-white">Delete</button>
                                                        </h1>
                                                        :
                                                        <h1 className="text-[20px] font-semibold w-[95%] flex items-center justify-between">
                                                            Your Preferences
                                                            <button className="px-3 py-1 md:px-5 md:py-2 border-[1px] text-[12px] md:text-[15px] font-semibold text-red-800 border-red-800 border-solid rounded-3xl hover:bg-red-800 hover:text-white">Delete</button>
                                                        </h1>}
                                                    {
                                                        userData?.[0].preferences?.map((preference, index) => (
                                                            <div className="flex gap-5">
                                                                <span>{index + 1} ) </span>
                                                                <p className="text-[17px]" key={index}>{preference}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </div>) : 
                                                (<div className="w-full h-full flex flex-col justify-center items-center">
                                                    <img src="../src/assets/images/empty.png" alt="" className="h-3/4 w-1/4 opacity-[0.7]" />
                                                <p className="text-gray-400">No preferences added</p> 
                                                </div>)
                                        )}
                                    </div>

                                </div>
                            </div>


                            <div className="w-full xl:w-[35%] xl:py-7 px-2 md:px-7 xl:px-0 items-start gap-3 md:gap-7 flex-row xl:flex-col flex py-5">
                                <div className="progress-card h-[12rem] md:h-[15rem] bg-[#fbfbfb] flex flex-col justify-center items-center gap-3 rounded-lg w-[90%]">
                                    <h1 className="text-[15px] md:text-[18px] text-center px-2 font-semibold">Complete your profile for exact matches...</h1>
                                    <CircularProgressbar
                                        value={(userData?.[0].profileProgress || 0) } 
                                        text={`${(userData?.[0].profileProgress || 0)}%`} 
                                        className="h-[40%]" 
                                        styles={buildStyles({
                                            pathColor: "#EAC991",
                                            textColor: "#E7B10A",
                                            trailColor: "#d6d6d6",
                                        })}
                                    />

                                </div>

                                { (userData?.[0].preferences.length || 0) < 5 && 
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
                        </div>


                    )
                }

                {
                    //if payment section is selected payment history page is displayed
                    showPayment && (
                        <PaymentHistory userData={userData}/>
                    )
                }
            </div>

        </div>
    )
}