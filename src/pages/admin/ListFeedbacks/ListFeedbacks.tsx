import { Table } from "../../../components/table/Table";
import { FeedbackResponse } from "../../../typings/feedback/feedback";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { archiveFeedback, limitListFeedback } from "../../../services/feedbackAPI";

export function ListFeedback() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const [checkedFeedbacks, setCheckedFeedbacks] = useState<string[]>([]);

    const [activeFeedbacks, setActiveFeedbacks] = useState<FeedbackResponse[]>([]); 
    const [archivedFeedbacks, setArchivedFeedbacks] = useState<FeedbackResponse[]>([]); 

    const headers = [
        "SL NO",
        "User",
        "Partner",
        "Story",
        "Image",
        "Created At",
    ];

    const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
    const [paginationCount, setPaginationCount] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [showArchived, setShowArchived] = useState(false); 
    const [rerenderFlag, setRerenderFlag] = useState(false); 


    useEffect(() => {
        async function getFeedbacksData() {
            const response = await dispatch(limitListFeedback(paginationCount - 1));
            setIsLoading(true);

            setTotalItemsCount(response.payload.totalPages);
            if (response.payload.data) {
                setIsLoading(false);
                const fetchedFeedbacks = response.payload.data;
                const active = fetchedFeedbacks.filter((feedback: FeedbackResponse) => !feedback.isArchived);
                const archived = fetchedFeedbacks.filter((feedback: FeedbackResponse) => feedback.isArchived);
                setActiveFeedbacks(active);
                setArchivedFeedbacks(archived);
                setFeedbacks(active)
            } else {
                alert(response.payload.message);
            }
        }
        getFeedbacksData();
    }, [paginationCount, rerenderFlag]);

    

    const handlePagination = async (direction: string) => {
        let newPaginationCount = paginationCount;
        if (direction === "left" && paginationCount > 1) {
            newPaginationCount -= 1;
        } else if (direction === "right" && paginationCount < Math.ceil(totalItemsCount / 6)) {
            newPaginationCount += 1;
        } else {
            return;
        }

        setPaginationCount(newPaginationCount);
    };

    const handleItemCheck = (feedbackId: string) => {
        setCheckedFeedbacks(prev => [...prev, feedbackId]);
    }

    const handleArchiveFeedback = async () => {
        const response = await dispatch(archiveFeedback(checkedFeedbacks));
        if (response.payload.data) {
            const updatedArchived = archivedFeedbacks.concat(response.payload.data);
            setArchivedFeedbacks(updatedArchived);
            setCheckedFeedbacks([]);
            setRerenderFlag(prev => !prev); 
        } else {
            alert(response.payload.message);
        }
    }

    const toggleShowArchived = () => {
        setShowArchived(prev => !prev); 
        if (!showArchived) {
            setFeedbacks(archivedFeedbacks); 
        } else {
            setFeedbacks(activeFeedbacks); 
        }
    }

    console.log(checkedFeedbacks);
    

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-10"
        >
            <div className="w-full flex justify-end px-10 pb-5 gap-5">
                {
                    checkedFeedbacks.length > 0 && (
                        <button 
                            className="bg-[#E2B77B] px-4 py-2 rounded-lg text-white font-semibold"
                            onClick={handleArchiveFeedback}
                        >
                            {showArchived ? "Unarchive" : "Archive"}
                        </button>
                    )
                }

                <button 
                    className="bg-[#E2B77B] px-4 py-2 rounded-lg text-white font-semibold"
                    onClick={toggleShowArchived} // Toggle showArchived state on button click
                >
                    {showArchived ? "View active" : "View archived"}
                </button>
            </div>
            <div className="table-container h-[fit-content] mx-10 flex rounded-[10px] overflow-x-auto">
                <Table
                    headers={headers}
                    data={feedbacks}
                    isLoading={isLoading}
                    handlePagination={handlePagination}
                    paginationCount={paginationCount}
                    totalItemsCount={totalItemsCount}
                    handleItemCheck={handleItemCheck}
                    type={"feedback"}
                />
            </div>
        </motion.div>
    );
}
