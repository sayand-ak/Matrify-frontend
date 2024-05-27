import "./Table.css";
import { CiCircleMore } from "react-icons/ci";
import { Subscription, Users } from "../../typings/user/userTypes";

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Loader } from "../loader/Loader";
import { CustomModal } from "../modal/CustomModal";
import { useState } from "react";

interface TableProps {
    headers: string[];
    data: (Users | Subscription)[]; 
    isLoading: boolean;
    handlePagination: (direction: string) => void;
    paginationCount: number;
    totalItemsCount: number;
    type: string;
}

export function Table({ headers, data, isLoading, handlePagination, paginationCount, totalItemsCount, type }: TableProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleModalOpen = () => {
        setIsModalOpen(true);
    }



    return (
        <div className="flex flex-col justify-between w-full items-center">
            {isLoading ?
                <Loader dimension={70}/>
                :
                <table className="bg-[#ffffff]">
                    <thead>
                        <tr className="text-center h-[57px]">
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>

                {
                    type == "user" &&  
                    <tbody>
                        {data.length > 0 && data.map((user, index) => (
                            <tr className="text-center h-[60px]" key={index}>
                                <td key={index}>{index}</td>
                                <td>{"username" in user && user.username}</td>
                                <th className="flex justify-center">
                                    
                                    <a href={"image" in user && user.image || "#"} target="_parent">
                                        <img src={"image" in user && user.image ? user.image : "../../src/assets/images/profile.png"} alt="" className="h-16 w-16 rounded-full" />
                                    </a>
                                </th>
                                <td>{"phone" in user && user.phone ? user.phone : "nill"}</td>
                                <td>{"email" in user && user.email ? user.email : "nill"}</td>
                                <td>{new Date("createdAt" in user && user.createdAt || "").toISOString().split('T')[0]}</td>
                                <td>{"otpVerified" in user && user.otpVerified ? "verified" : "not verified"}</td>
                                <td>
                                    <button onClick={handleModalOpen}>
                                        <CiCircleMore className="text-2xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }


                {
                    type == "subscription" &&  
                    <tbody>
                        {data.length > 0 && data.map((data, index) => (
                            <tr className="text-center h-[60px]" key={index}>

                                <td key={index}>{index}</td>
                                
                                <td>{new Date("createdAt" in data && data.createdAt || "").toISOString().split('T')[0]}</td>
                                
                                <td>{"amount" in data && data.amount?.weekly}</td>
                                <td>{"amount" in data && data.amount?.monthly}</td>
                                <td>{"amount" in data && data.amount?.yearly}</td>
                               
                                <td>{"status" in data && data.status}</td>
                               

                            </tr>
                        ))}
                    </tbody>
                }
                </table>
            }
            <CustomModal  isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <div>hello in modal</div>
            </CustomModal>

            <div className="w-full flex items-center justify-end gap-5 py-4 px-5 bg-[#F3F6F7]">
                    <p className="border px-3 rounded-md text-[18px] bg-white">{paginationCount}</p>
                    <p className="text-[15px] font-semibold"> of {Math.ceil(totalItemsCount / 6)} pages</p>
                    <IoIosArrowBack className="text-[18px] w-8 h-8 text-[#000] bg-white rounded-md border" onClick={() => handlePagination("left")} />
                    <IoIosArrowForward className="text-[18px] w-8 h-8 text-[#000] bg-white rounded-md border" onClick={() => handlePagination("right")} />
            </div>
        </div>
    )
}


