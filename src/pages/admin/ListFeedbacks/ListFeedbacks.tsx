import { Table } from "../../../components/table/Table";
import { FeedbackResponse } from "../../../typings/feedback/feedback";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { limitListFeedback } from "../../../services/feedbackAPI";

export function ListFeedback() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        async function getFeedbacksData() {
            const response = await dispatch(limitListFeedback(paginationCount - 1));
            setIsLoading(true);

            setTotalItemsCount(response.payload.totalPages);
            if (response.payload.data) {
                setIsLoading(false);
                setFeedbacks(response.payload.data);
            } else {
                alert(response.payload.message);
            }
        }
        getFeedbacksData();
    }, [paginationCount]);

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

    console.log(feedbacks);
    

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="table-container h-[fit-content] mt-10 mx-10 flex rounded-[10px] overflow-x-auto">
                <Table
                    headers={headers}
                    data={feedbacks}
                    isLoading={isLoading}
                    handlePagination={handlePagination}
                    paginationCount={paginationCount}
                    totalItemsCount={totalItemsCount}
                    type={"feedback"}
                />
            </div>
        </motion.div>
    );
}
