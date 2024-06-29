import { DashboardUserCount } from "../../typings/admin/dashboardCount"
import { FiUser } from "react-icons/fi";
import { IoMdFemale } from "react-icons/io";
import { PiGenderMaleBold } from "react-icons/pi";
import { MdTransgender } from "react-icons/md";
import "./userCount.css"

interface UserCountCardsProps {
    userCountData: DashboardUserCount
}


export function UserCountCards(userCountData: UserCountCardsProps) {
    return (
        <div className="user-count-div grid grid-cols-2 grid-rows-2 gap-6 px-10 h-[200px]">

            <div className="total-users bg-[#daa351be] flex-1 rounded-2xl flex items-center overflow-hidden">
                <div className="bg-[#fff] h-[80%] mx-3 rounded-xl w-1/4 flex items-center justify-center">
                    <FiUser className="text-[50px] text-[#ba8a43c2]"/>
                </div>

                <div className="flex flex-col items-start justify-center px-2 text-white">
                    <p className="text-[30px]">{userCountData.userCountData.totalUsers}</p>
                    <p className="text-sm">Total users</p>
                </div>
            </div>

            <div className="male-users bg-[#daa351] flex-1 rounded-2xl flex items-center overflow-hidden">
                <div className="bg-[#fcf6ea] h-[80%] mx-3 rounded-xl w-1/4 flex items-center justify-center">
                    <PiGenderMaleBold className="text-[50px] text-[#ba8a43c2]"/>
                </div>

                <div className="flex flex-col items-start justify-center px-2 text-[#ba8a43]">
                    <p className="text-[30px]">{userCountData.userCountData.maleUsers}</p>
                    <p className="text-sm">Male users</p>
                </div>
            </div>

            <div className="female-users bg-[#daa351] flex-1 rounded-2xl flex items-center overflow-hidden">
                <div className="bg-[#fcf6ea] h-[80%] mx-3 rounded-xl w-1/4 flex items-center justify-center">
                    <IoMdFemale className="text-[50px] text-[#ba8a43c2]"/>
                </div>

                <div className="flex flex-col items-start justify-center px-2 text-[#ba8a43]">
                    <p className="text-[30px]">{userCountData.userCountData.femaleUsers}</p>
                    <p className="text-sm">Female users</p>
                </div>
            </div>

            <div className="other-users bg-[#daa351] flex-1 rounded-2xl flex items-center overflow-hidden">
                <div className="bg-[#fcf6ea] h-[80%] mx-3 rounded-xl w-1/4 flex items-center justify-center">
                    <MdTransgender className="text-[50px] text-[#ba8a43c2]"/>
                </div>

                <div className="flex flex-col items-start justify-center px-2 text-[#ba8a43]">
                    <p className="text-[30px]">{userCountData.userCountData.otherUsers}</p>
                    <p className="text-sm">Other users</p>
                </div>
            </div>

        </div>
    )
}