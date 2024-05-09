import { SidebarItem } from './SidebarItem';
import "./Sidebar.css";
import { RxDashboard } from 'react-icons/rx';
import { LuUser2 } from 'react-icons/lu';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { MdOutlinePayments } from 'react-icons/md';
import { MdOutlineFeedback } from 'react-icons/md';
import { GiVerticalBanner } from 'react-icons/gi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { MdOutlineDelete } from 'react-icons/md';
import { IoLogOutOutline } from 'react-icons/io5';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useTypedSelectors';
import { adminLogout } from '../../redux/slices/adminSlices';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    onClickItem: (itemName: string) => void;
    showMobileSidebar: boolean;
    toggleMobileSidebar: () => void; 
    getUsersData: () => void
}

export default function Sidebar({ onClickItem, showMobileSidebar, getUsersData }: SidebarProps) {
    const [selected, setSelected] = useState<string>("Dashboard");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleItemClick = async(itemName:string) => {
        setSelected(itemName === selected ? "Dashboard" : itemName); 
        onClickItem(itemName); 
        if(itemName === "Users"){
            getUsersData();
        }
        if(itemName === "Logout"){
            dispatch(adminLogout());
            navigate("/admin/login");
        }
    };

    return (
        <div className={`sidebar  transition duration-1000 ease-in bg-[#F4F7F9] w-[15rem] top-[4.4rem] md:h-[100vh] md:w-[20%] md:block md:fixed md:top-0 z-10 ${showMobileSidebar ? 'fixed' : 'hidden'}`}>
            <div className="heading md:flex items-center justify-start pl-5 h-40 gap-2 hidden ">
                <img src="/src/assets/images/logo.png" className="h-20 w-20" alt="" />
                <h1 className="font-gillroy text-[40px] text-[#a48351]">Matrify</h1>
            </div>
            <div className="options">
                <ul className="flex flex-col gap-8">
                    <SidebarItem
                        icon={RxDashboard}
                        text="Dashboard"
                        className={undefined}
                        onClick={() => handleItemClick("Dashboard")}
                        selected={selected === "Dashboard"} // Check if this item is selected
                    />
                    <SidebarItem
                        icon={LuUser2}
                        text="Users"
                        className={undefined}
                        onClick={() => handleItemClick("Users")}
                        selected={selected === "Users"} // Check if this item is selected
                    />
                    <SidebarItem
                        icon={MdOutlineReportGmailerrorred}
                        text="Report Request"
                        className={undefined}
                        onClick={() => handleItemClick("Report Request")}
                        selected={selected === "Report Request"} // Check if this item is selected
                    />
                    <SidebarItem
                        icon={MdOutlinePayments}
                        text="Payment"
                        className={undefined}
                        onClick={() => handleItemClick("Payment")}
                        selected={selected === "Payment"} // Check if this item is selected
                    />
                    <SidebarItem
                        icon={MdOutlineFeedback}
                        text="Feedback"
                        className={undefined}
                        onClick={() => handleItemClick("Feedback")}
                        selected={selected === "Feedback"} // Check if this item is selected
                    />
                    <SidebarItem
                        icon={GiVerticalBanner}
                        text="Banner"
                        className={undefined}
                        onClick={() => handleItemClick("Banner")}
                        selected={selected === "Banner"} // Check if this item is selected
                    />
                    <SidebarItem
                        icon={MdOutlineLocalOffer}
                        text="Offers"
                        className={undefined}
                        onClick={() => handleItemClick("Offers")}
                        selected={selected === "Offers"} // Check if this item is selected
                    />
                    <li className="px-10">
                        <hr />
                    </li>
                    <SidebarItem
                        icon={MdOutlineDelete}
                        text="Delete Account"
                        className="text-red-700 hidden md:flex"
                        onClick={() => handleItemClick("Delete Account")}
                        selected={selected === "Delete Account"} // Check if this item is selected
                    />
                    <SidebarItem
                        icon={IoLogOutOutline}
                        text="Logout"
                        className="text-red-700 hidden md:flex"
                        onClick={() => handleItemClick("Logout")}
                        selected={selected === "Logout"} // Check if this item is selected
                    />
                </ul>
            </div>
        </div>
    );
}
