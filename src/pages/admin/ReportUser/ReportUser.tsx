import { Table } from "../../../components/table/Table";
import { Users } from "../../../typings/user/userTypes";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ReportUserType } from "../../../typings/reportUser/reportUser";
import { getReportData, updateReportStatus } from "../../../services/adminAPI";
import showToast from "../../../components/Toast/Toast";
import { ToastContainer } from "react-toastify";

export function ReportUser({value}: {value: Array<Users>}) {

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const headers = [
        "Reported By",
        "Reported ",
        "Reason",
        "Narrative",
        "Screenshot",
        "Reported At",
        "Access",
    ];

    const [reportData, setReportData] = useState<ReportUserType[]>([]);
    const [paginationCount, setPaginationCount] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    useEffect(() => {
        async function getReportUserData() {
            const response = await dispatch(getReportData(paginationCount)); 
            console.log(response, "get report data");
            setIsLoading(true);
            
            setTotalItemsCount(response.payload.totalPages);
            if (response.payload.data) {
                setIsLoading(false);
                setReportData(response.payload.data);
            } else {
                alert(response.payload.message);
            }
        }
        getReportUserData();
    }, [dispatch, paginationCount]);


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

    const displayedData = value?.length > 0 ? value : reportData;
    
    //update report status api calling ..
    async function handleUpdateReportStatus(reportId: string) {
        const response = await dispatch(updateReportStatus(reportId));
        if(response.payload.data) {
            showToast("success", "Report status updated successfully, email send to user");
        } else {
            showToast("error", response.payload.message)
        }
    }

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="table-container h-[fit-content] mt-5 flex rounded-[10px] overflow-x-auto">
                <Table
                    headers={headers}
                    data={displayedData}
                    isLoading={isLoading}
                    handlePagination={handlePagination}
                    paginationCount={paginationCount}
                    totalItemsCount={totalItemsCount}
                    type={"report-user"}
                    handleUpdateReportStatus={handleUpdateReportStatus}
                />
                <ToastContainer/>
            </div>
        </motion.div>
    );
}
