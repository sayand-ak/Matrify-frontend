import "./Table.css";
import { CiCircleMore } from "react-icons/ci";
import { Users } from "../../typings/user/userTypes";

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useAppDispatch } from "../../hooks/useTypedSelectors";
import { useEffect, useState } from "react";
import { listUser } from "../../services/adminAPI";
import { Loader } from "../loader/Loader";
import { CustomModal } from "../modal/CustomModal";


export function Table({searchData}: {searchData: Users[]}) {

    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


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

    const [users, setUsers] = useState<Users[]>([]);
    const [paginationCount, setPaginationCount] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const dispatch = useAppDispatch();

    console.log(searchData);
    
    const displayedUsers = searchData?.length > 0 ? searchData : users;

    console.log(displayedUsers);
    

    useEffect(() => {
        async function getUsersData() {
            const response = await dispatch(listUser(paginationCount - 1)); 
            console.log(response);
            setIsLoading(true);
            
            setTotalItemsCount(response.payload.totalPages);
            if (response.payload.data) {
                setIsLoading(false);
                setUsers(response.payload.data);
            } else {
                alert(response.payload.message);
            }
        }
        getUsersData();
    }, [paginationCount]);



    const handlePagination = async (direction: string) => {
        let newPaginationCount = paginationCount;
        if (direction === "left" && paginationCount > 1) { // Adjust logic for left pagination
            newPaginationCount -= 1;
        } else if (direction === "right" && paginationCount < Math.ceil(totalItemsCount / 6)) {
            newPaginationCount += 1;
        } else {
            return;
        }

        setPaginationCount(newPaginationCount); 
    };

    const handleMoreClick = () => {
        
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

                    <tbody>
                        {displayedUsers.length > 0 && displayedUsers.map((user, index) => (
                            <tr className="text-center h-[60px]" key={index}>
                                <td key={index}>{index}</td>
                                <td>{user.username}</td>
                                <th className="flex justify-center">
                                    <a href={user.image} target="_parent">
                                        <img src={user.image ? user.image : "../../src/assets/images/profile.png"} alt="" className="h-16 w-16 rounded-full" />
                                    </a>
                                </th>
                                <td>{user.phone ? user.phone : "nill"}</td>
                                <td>{user.email ? user.email : "nill"}</td>
                                <td>{new Date(user.createdAt).toISOString().split('T')[0]}</td>
                                <td>{user.otpVerified ? "verified" : "not verified"}</td>
                                <td>
                                    <button onClick={handleMoreClick}>
                                        <CiCircleMore className="text-2xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
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


