import { Table } from "../../../components/table/Table";
import { Users } from "../../../typings/user/userTypes";
import { listUser } from "../../../services/adminAPI";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { useEffect, useState } from "react";

export function ListUser({value}: {value: Array<Users>}) {

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const headers = [
        "SL NO",
        "Username",
        "Profile",
        "Phone",
        "Email",
        "Joined At",
        "Otp Verified",
        "More",
    ];

    const [users, setUsers] = useState<Users[]>([]);
    const [paginationCount, setPaginationCount] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

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


    const displayedData = value?.length > 0 ? value : users;


    return (
        <div className="table-container h-[fit-content] mt-5 flex rounded-[10px] overflow-x-auto">
            <Table
                headers={headers}
                data={displayedData}
                isLoading={isLoading}
                handlePagination={handlePagination}
                paginationCount={paginationCount}
                totalItemsCount={totalItemsCount}
                type={"user"}
            />
        </div>
    );
}
