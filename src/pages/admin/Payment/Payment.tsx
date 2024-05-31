import { useEffect, useState } from "react";
import { useFormik } from "formik";
import "../../admin/Home/Home.css";
import { Table } from "../../../components/table/Table";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { addSubscription, addSubscriptionOffer, listPaymentHistory, listSubscription, listSubscriptionOffers } from "../../../services/adminAPI";
import { Subscription } from "../../../typings/user/userTypes";
import { CustomModal } from "../../../components/modal/CustomModal";
import { validationSchema, validateSubscriptionOfferData } from "../../../utils/validations/validateSubsctiptionData";
import { motion } from "framer-motion";

export function AdminPayment() {
    const [activeTab, setActiveTab] = useState("PLANS");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | string>("");

    const [offers, setOffers] = useState([]); // State to store offers
    const [paymentHistory, setPaymentHistory] = useState([]); // State to store payment history
    
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [paginationCount, setPaginationCount] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    const headers = [
        "SL NO",
        "Added At",
        "Weekly",
        "Monthly",
        "Yearly",
        "Status",
    ];

    const offerHeaders = [
        "Offer ID",
        "Title",
        "Description",
        "Offer %",
        "Status",
        "Starts At",
        "Ends At"
    ];

    const paymentHistoryHeaders = [
        "Payment ID",
        "Username",
        "amount",
        "Paid At",
        "Expires At",
    ];


    useEffect(() => {
        async function getSubscriptionData() {
            setIsLoading(true);
            const response = await dispatch(listSubscription(paginationCount - 1));
            setIsLoading(false);
            if (response.payload.data) {
                setSubscriptions(response.payload.data);
                setTotalItemsCount(response.payload.totalPages);
            } else {
                alert(response.payload.message);
            }
        }

        async function getOffersData() {
            setIsLoading(true);
            const response = await dispatch(listSubscriptionOffers(paginationCount - 1));
            setIsLoading(false);            
            if (response.payload.data) {                
                setOffers(response.payload.data);                
                setTotalItemsCount(response.payload.totalPages);
            } else {
                alert(response.payload.message);
            }
        }

        async function getPaymentHistoryData() {
            setIsLoading(true);
            const response = await dispatch(listPaymentHistory(paginationCount - 1));
            setIsLoading(false);            
            if (response.payload.data) {                
                setPaymentHistory(response.payload.data);                
                setTotalItemsCount(response.payload.totalPages);
            } else {
                alert(response.payload.message);
            }
        }

        if (activeTab === "PLANS") {
            getSubscriptionData();
        } else if (activeTab === "OFFERS") {
            getOffersData();
        } else if (activeTab === "HISTORY") {
            getPaymentHistoryData();
        }
    }, [activeTab, paginationCount, dispatch]);

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

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            weekly: 1000,
            monthly: 5000,
            yearly: 10000,
            status: 'active'
        },
        validationSchema,
        onSubmit: async (values) => {
            const subscriptionData = {
                amount: {
                    weekly: values.weekly,
                    monthly: values.monthly,
                    yearly: values.yearly
                },
                status: values.status
            };

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
                setMessageType("");
            }, 10000);
        },
    });

    const offerFormik = useFormik({
        initialValues: {
            title: '',
            description: '',
            offerPercentage: 0,
            startsAt: '',
            endsAt: '',
        },
        validationSchema: validateSubscriptionOfferData,
        onSubmit: async (values) => {
            const offerData = {
                title: values.title,
                description: values.description,
                offerPercentage: values.offerPercentage,
                startsAt: values.startsAt,
                endsAt: values.endsAt,
            };

            const response = await dispatch(addSubscriptionOffer(offerData));
            if (response.payload.success) {
                setMessage("Subscription offer added successfully!");
                setMessageType("success");
            } else {
                setMessage(response.payload.message || "An error occurred");
                setMessageType("error");
            }

            setTimeout(() => {
                setMessage("");
                setMessageType("");
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

            {/* Add Plan Section */}
            {activeTab === "PLANS" && (
                <motion.div
                key={activeTab ? activeTab : "empty"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-end p-5">
                        <button
                            className="font-bold px-5 py-2 rounded-lg bg-[#E7C68F] hover:bg-[#c2a169] text-white"
                            onClick={handleModalOpen}
                        >
                            Add Plan
                        </button>
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
                                <p className="font-semibold">CAUTION:</p>
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
                                {message && (
                                    <div className={`${messageType === "success" ? "bg-green-400" : "bg-red-400"} flex w-full justify-center items-center text-white p-2 text-[14px]`}>
                                        {message}
                                    </div>
                                )}
                            </div>
                        </form>
                    </CustomModal>
                </motion.div>
            )}

            {/* Add Offer Section */}
            {activeTab === "OFFERS" && (
                <motion.div
                    key={activeTab ? activeTab : "empty"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-end p-5">
                        <button
                            className="font-bold px-5 py-2 rounded-lg  bg-[#E7C68F] hover:bg-[#c2a169] text-white"
                            onClick={handleModalOpen}
                        >
                            Add Offer
                        </button>
                    </div>
                    <Table
                        headers={offerHeaders} 
                        data={offers}
                        isLoading={isLoading}
                        handlePagination={handlePagination}
                        paginationCount={paginationCount}
                        totalItemsCount={totalItemsCount}
                        type={'offer'}
                    />
                    <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                        <form onSubmit={offerFormik.handleSubmit} className="min-h-[25rem] min-w-[25rem] flex gap-8 flex-col items-center justify-center">
                            <h1 className="text-[25px] font-bold pt-10">Add Subscription Offer</h1>
                            <span className="bg-[#ffdd0088] py-5 text-[14px] w-full px-10 italic text-[#7e5656]">
                                <p className="font-semibold">CAUTION:</p>
                                Adding a new offer will update the offers list immediately...
                            </span>
                            <div className="flex flex-col w-3/4">
                                <label htmlFor="title" className="pb-2">Offer Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="h-10 shadow-sm rounded-lg outline-none px-5"
                                    onChange={offerFormik.handleChange}
                                    onBlur={offerFormik.handleBlur}
                                    value={offerFormik.values.title}
                                />
                                {offerFormik.touched.title && offerFormik.errors.title ? (
                                    <div className="text-red-500 text-sm">{offerFormik.errors.title}</div>
                                ) : null}
                            </div>
                            <div className="flex flex-col w-3/4">
                                <label htmlFor="description" className="pb-2">Offer Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    className="h-10 shadow-sm rounded-lg outline-none px-5"
                                    onChange={offerFormik.handleChange}
                                    onBlur={offerFormik.handleBlur}
                                    value={offerFormik.values.description}
                                />
                                {offerFormik.touched.description && offerFormik.errors.description ? (
                                    <div className="text-red-500 text-sm">{offerFormik.errors.description}</div>
                                ) : null}
                            </div>
                            <div className="flex flex-col w-3/4">
                                <label htmlFor="offerPercentage" className="pb-2">Offer Percentage</label>
                                <input
                                    id="offerPercentage"
                                    name="offerPercentage"
                                    type="number"
                                    className="h-10 shadow-sm rounded-lg outline-none px-5"
                                    onChange={offerFormik.handleChange}
                                    onBlur={offerFormik.handleBlur}
                                    value={offerFormik.values.offerPercentage}
                                />
                                {offerFormik.touched.offerPercentage && offerFormik.errors.offerPercentage ? (
                                    <div className="text-red-500 text-sm">{offerFormik.errors.offerPercentage}</div>
                                ) : null}
                            </div>
                            
                            <div className="flex gap-2">

                                <div className="flex flex-col w-3/4">
                                    <label htmlFor="startsAt" className="pb-2">Starts At</label>
                                    <input
                                        id="startsAt"
                                        name="startsAt"
                                        type="date"
                                        className="h-10 shadow-sm rounded-lg outline-none px-5"
                                        onChange={offerFormik.handleChange}
                                        onBlur={offerFormik.handleBlur}
                                        value={offerFormik.values.startsAt}
                                    />
                                    {offerFormik.touched.startsAt && offerFormik.errors.startsAt ? (
                                        <div className="text-red-500 text-sm">{offerFormik.errors.startsAt}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col w-3/4">
                                    <label htmlFor="endsAt" className="pb-2">Ends At</label>
                                    <input
                                        id="endsAt"
                                        name="endsAt"
                                        type="date"
                                        className="h-10 shadow-sm rounded-lg outline-none px-5"
                                        onChange={offerFormik.handleChange}
                                        onBlur={offerFormik.handleBlur}
                                        value={offerFormik.values.endsAt}
                                    />
                                    {offerFormik.touched.endsAt && offerFormik.errors.endsAt ? (
                                        <div className="text-red-500 text-sm">{offerFormik.errors.endsAt}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <button type="submit" className="px-4 py-2 bg-[#B28849] rounded-lg text-white font-bold mb-5">Submit</button>
                                {message && (
                                    <div className={`${messageType === "success" ? "bg-green-400" : "bg-red-400"} flex w-full justify-center items-center text-white p-2 text-[14px]`}>
                                        {message}
                                    </div>
                                )}
                            </div>
                        </form>
                    </CustomModal>
                </motion.div>
            )}
            {
                activeTab == "HISTORY" && (
                    <motion.div
                        key={activeTab ? activeTab : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="my-10"
                    >
                        <Table
                            headers={paymentHistoryHeaders} 
                            data={paymentHistory}
                            isLoading={isLoading}
                            handlePagination={handlePagination}
                            paginationCount={paginationCount}
                            totalItemsCount={totalItemsCount}
                            type={'history'}
                        />
                    </motion.div>
                )
            }
        </>
    );
}
