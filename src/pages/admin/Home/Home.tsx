// Import necessary components and icons
import Sidebar from "../../../components/sidebar/Sidebar";
import { useState } from 'react';
import { Table } from "../../../components/table/Table";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { TfiViewListAlt } from "react-icons/tfi";

import "./Home.css";
import { Dashboard } from "../../../components/dashboard/Dashboard";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { listUser } from "../../../services/adminAPI";
import { Users } from "../../../typings/user/userTypes";



export function Home() {
    const [showTable, setShowTable] = useState(false);
    const [showDashboard, setShowDashboard] = useState(true);
    const [showMobileSidebar, setShowMobileSidebar] = useState(true);

    const [users, setUsers] = useState<Users[]>([]);
    const [userHeader, setHeader] = useState<string[]>([]);

    const dispatch = useAppDispatch();

    const selector = useAppSelector((state) => state.admin);
    const email = selector?.admin?.payload?.data.email;
    

    const handleSidebarItemClick = (itemName: string) => {
    
        if (itemName === "Users") {
            setShowTable(true);
        } else {
            setShowTable(false);
        }

        if (itemName === "Dashboard") {
            setShowDashboard(true);
        }else{
            setShowDashboard(false);
        }
    };

    const toggleMobileSidebar = () => {
        setShowMobileSidebar(!showMobileSidebar);
    };


    async function getUsersData(){
        const response = await dispatch(listUser());
        if(response.payload.data){
            const headers = [
                "SL NO",
                "Username",
                "Profile",
                "Phone",
                "Email",
                "Joined At",
                "Otp Verified",
                "More"
            ]
            setUsers(response.payload.data)
            setHeader(headers);
            
            
        }else
        {
            console.log(response.payload.message)
        }
    }

    return (
        <div className="flex flex-col gap-4 md:justify-start md:items-start relative">
            {/* Pass necessary props to the Sidebar component */}
        
            <Sidebar 
                onClickItem={handleSidebarItemClick} 
                showMobileSidebar={showMobileSidebar} 
                toggleMobileSidebar={toggleMobileSidebar} 
                getUsersData={getUsersData}
            />

            <div className="nav h-[10vh] md:w-[80%] fixed z-0 md:ml-[20%] flex items-center justify-between px-3 md:px-8">
                {/* Toggle button for sidebar in mobile view */}
                <TfiViewListAlt className="md:hidden" onClick={toggleMobileSidebar} />

                <input type="text" className="bg-[#fff] w-[250px] md:w-[300px] pl-5 py-3 rounded-[5px] outline-none" placeholder="Search here..." />

                <div className="profile h-12 w-12 md:h-14 md:w-14 rounded-full" style={{ backgroundImage: "url(../../src/assets/images/profile.png)", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                <p className="email absolute right-0 text-[0.8rem] top-16 bg-[#e7e4e4] px-2 py-1 rounded-sm hidden">{email}</p>

            </div>

            {
                showDashboard &&
                <Dashboard/>
            }

            {
                showTable && 
                <>
                <div className="overflow-scroll bg-[#F4F7F9] h-[fit-content] md:w-[75%] z-0 mt-[25%] md:mt-[10%] md:ml-[23%] flex flex-col items-center justify-between py-3 rounded-[10px] md:px-8">
                    {<Table userData={users} userHeader={userHeader}/>}
                </div>

                <div className="w-full flex items-center justify-end px-10 gap-5">
                    <IoMdArrowDropleftCircle className="text-3xl text-[#bebbbb]" />
                    1
                    <IoMdArrowDroprightCircle className="text-3xl text-[#bebbbb]" />
                    out of 10
                </div>
                </>
            }
        </div>
    )
}
