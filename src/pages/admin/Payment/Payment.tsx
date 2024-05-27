import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../admin/Home/Home.css";
import { Table } from "../../../components/table/Table";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { addSubscription, listSubscription } from "../../../services/adminAPI";
import { Subscription } from "../../../typings/user/userTypes";
import { CustomModal } from "../../../components/modal/CustomModal";

export function AdminPayment() {
    const [activeTab, setActiveTab] = useState("PLANS");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | string>("");

    const headers = [
        "SL NO",
        "Added At",
        "Weekly",
        "Monthly",
        "Yearly",
        "Status",
    ];

    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [paginationCount, setPaginationCount] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    useEffect(() => {
        async function getSubscriptionData() {
            const response = await dispatch(listSubscription(paginationCount - 1)); 
            console.log(response);
            
            setIsLoading(true);
            
            setTotalItemsCount(response.payload.totalPages);
            if (response.payload.data) {
                setIsLoading(false);
                setSubscriptions(response.payload.data);
            } else {
                alert(response.payload.message);
            }
        }
        getSubscriptionData();
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

    const handleTabClick = (tab:string) => {
        setActiveTab(tab);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    const validationSchema = Yup.object({
        weekly: Yup.number()
            .min(1, 'Weekly amount must be at least 1')
            .required('Weekly amount is required')
            .test('is-less-than-monthly', 'Weekly amount must be less than monthly amount', function (value) {
                return value < this.parent.monthly;
            })
            .test('is-less-than-yearly', 'Weekly amount must be less than yearly amount', function (value) {
                return value < this.parent.yearly;
            }),
        monthly: Yup.number()
            .min(1, 'Monthly amount must be at least 1')
            .required('Monthly amount is required')
            .test('is-less-than-yearly', 'Monthly amount must be less than yearly amount', function (value) {
                return value < this.parent.yearly;
            }),
        yearly: Yup.number()
            .min(1, 'Yearly amount must be at least 1')
            .required('Yearly amount is required'),
    });

    const formik = useFormik({
        initialValues: {
            weekly: 1000,
            monthly: 5000,
            yearly: 10000,
            status: 'active'
        },
        validationSchema,
        onSubmit: async(values) => {
            const subscriptionData = {
                amount:{
                    weekly: values.weekly,
                    monthly: values.monthly,
                    yearly: values.yearly
                },
                status: values.status
            }
            
            const response = await dispatch(addSubscription(subscriptionData));
            if (response.payload.success) {
                setMessage("Subscription added successfully!");
                setMessageType("success");
            } else {
                setMessage(response.payload.message || "An error occurred");
                setMessageType("error");
            }

            setTimeout(() => {
                setMessage("");
                setMessageType("")
            }, 10000);
        },
    });

    return (
        <>
            <div className="payment-tabs h-12 flex font-semibold justify-center gap-20 text-[17px]">
                <button
                    className={activeTab === "PLANS" ? "active-tab" : ""}
                    onClick={() => handleTabClick("PLANS")}
                >
                    PLANS
                </button>
                <button
                    className={activeTab === "OFFERS" ? "active-tab" : ""}
                    onClick={() => handleTabClick("OFFERS")}
                >
                    OFFERS
                </button>
                <button
                    className={activeTab === "HISTORY" ? "active-tab" : ""}
                    onClick={() => handleTabClick("HISTORY")}
                >
                    HISTORY
                </button>
            </div>
            {
                activeTab === "PLANS" &&
                <>
                    <div className="flex justify-end p-5">
                        <button
                            className="font-bold text-[#B28849] px-5 py-2 rounded-lg border-2 border-[#B28849] hover:bg-[#B28849] hover:text-white"
                            onClick={handleModalOpen}
                        >Add Plan</button>
                    </div>
                    <Table 
                        headers={headers}
                        data={subscriptions}
                        isLoading={isLoading}
                        handlePagination={handlePagination}
                        paginationCount={paginationCount}
                        totalItemsCount={totalItemsCount}
                        type={'subscription'}
                    />
                    <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                        <form onSubmit={formik.handleSubmit} className="min-h-[25rem] min-w-[25rem] flex gap-8 flex-col items-center justify-center">
                            <h1 className="text-[25px] font-bold pt-10">Add Subscription Plan</h1>
                            <span className="bg-[#ffdd0088] py-5 text-[14px] w-full px-10 italic text-[#7e5656]">
                                <p className="font-semibold">
                                    CAUTION:
                                </p>
                                 The new amount will be the subscription amount from now...
                            </span>
                            <div className="flex flex-col w-3/4">
                                <label htmlFor="weekly" className="pb-2">Weekly Amount</label>
                                <input
                                    id="weekly"
                                    name="weekly"
                                    type="number"
                                    className="h-10 shadow-sm rounded-lg outline-none px-5"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.weekly}
                                    />
                                {formik.touched.weekly && formik.errors.weekly ? (
                                    <div className="text-red-500 text-sm">{formik.errors.weekly}</div>
                                    ) : null}
                            </div>
                            <div className="flex flex-col w-3/4">
                                <label htmlFor="monthly" className="pb-2">Monthly Amount</label>
                                <input
                                    id="monthly"
                                    name="monthly"
                                    type="number"
                                    className="h-10 shadow-sm rounded-lg outline-none px-5"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.monthly}
                                    />
                                {formik.touched.monthly && formik.errors.monthly ? (
                                    <div className="text-red-500 text-sm">{formik.errors.monthly}</div>
                                    ) : null}
                            </div>

                            <div className="flex flex-col w-3/4">
                                <label htmlFor="yearly" className="pb-2">Yearly Amount</label>
                                <input
                                    id="yearly"
                                    name="yearly"
                                    type="number"
                                    className="h-10 shadow-sm rounded-lg outline-none px-5"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.yearly}
                                    />
                                {formik.touched.yearly && formik.errors.yearly ? (
                                    <div className="text-red-500 text-sm">{formik.errors.yearly}</div>
                                ) : null}
                            </div>
                            
                            <div className="w-full flex flex-col items-center">
                                <button type="submit" className="px-4 py-2 bg-[#B28849] rounded-lg text-white font-bold mb-5">Submit</button>
                                
                                {(
                                    <>
                                    {
                                        messageType == "success" &&
                                        <div className={`${messageType === "success" && "bg-green-400 flex h-10"} w-full items-center justify-center text-[16px]`}>
                                            {message}
                                        </div>
                                    }
                                    {
                                        messageType == "error" &&
                                        <div className={`${messageType === "error" && "bg-red-400 flex h-10"} w-full items-center justify-center text-[16px]`}>
                                            {message}
                                        </div>
                                    }
                                    </>
                                )}

                            </div>


                        </form>
                    </CustomModal>
                </>
            }
        </>
    );
}
