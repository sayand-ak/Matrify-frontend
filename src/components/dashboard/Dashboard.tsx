import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useTypedSelectors";
import { dashboardPaymentRate, dashboardTotalRevenue, dashboardUserCount, dashboardUserRate, findUser } from "../../services/adminAPI";
import { DashboardPaymentRate, DashboardUserCount } from "../../typings/admin/dashboardCount";
import { UserCountCards } from "../userCountCards/UserCountCards";
import { IoFilter } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";
import BarChart from "../chart/BarChart";
import "./dashboard.css";
import { getAllFeedback } from "../../services/feedbackAPI";
import { Feedback, FeedbackAdminType } from "../../typings/feedback/feedback";
import PieChart from "../chart/PieChart";

export function Dashboard() {
    const [userCountData, setUserCountData] = useState<DashboardUserCount>({} as DashboardUserCount);
    // user registration rate state
    const [type, setType] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);
    // payment rate state
    const [subscriptionType, setSubscriptionType] = useState<string[]>([]);
    const [total, setTotal] = useState<number[]>([]);
    //total revenue state
    const [totalRevenue, setTotalRevenue] = useState<number[]>([]);

    const [userRegRateFilter, setUserRegRateFilter] = useState<boolean>(false);
    const [feedbackData, setFeedbackData] = useState<FeedbackAdminType[]>([]);
    const dispatch = useAppDispatch();

    const fetchUserCountData = useCallback(async () => {
        try {
            const response = await dispatch(dashboardUserCount());
            if (response.payload.data) {
                setUserCountData(response.payload.data);
            }
        } catch (error) {
            console.error("Error fetching user count data:", error);
        }
    }, [dispatch]);

    const fetchUserCountRate = useCallback(async (type: string = "month") => {
        try {
            const response = await dispatch(dashboardUserRate(type));
            if (response.payload.data) {
                const keys: string[] = Object.keys(response.payload.data).map(key => key.substring(0, 3));
                const values: number[] = Object.values(response.payload.data);                
    
                setType(keys);
                setData(values);
            }
        } catch (error) {
            console.error("Error fetching user count rate:", error);
        }
    }, [dispatch]);

    const fetchFeedbackData = useCallback(async () => {
        try {
            const response = await dispatch(getAllFeedback());
    
            if (response.payload.data) {
                const feedbackDataPromises = response.payload.data.map(async (data: Feedback) => {
                    const userData = await dispatch(findUser(data.userId));
                    const partnerData = await dispatch(findUser(data.partnerId));
    
                    if (userData.payload.data && partnerData.payload.data) {
                        return {
                            ...data,
                            userId: {
                                username: userData.payload.data.username,
                                userImg: userData.payload.data.image,
                            },
                            partnerId: {
                                username: partnerData.payload.data.username,
                                partnerImg: partnerData.payload.data.image,
                            },
                        };
                    }else {
                        alert("Feedback error")
                    }
    
                    return data;
                });
    
                const updatedFeedbackData = await Promise.all(feedbackDataPromises);
                setFeedbackData(updatedFeedbackData);
            }
        } catch (error) {
            console.error("Error fetching feedback data:", error);
        }
    }, [dispatch]);


    const fetchPaymentRateData = useCallback(async () => {
        try {
            const response = await dispatch(dashboardPaymentRate());
            if(response.payload.data) {
                const paymentRate: DashboardPaymentRate[] = response.payload.data;

                let subscriptionTypeVar: string[] = [];
                let subscriptionTotalVar: number[] = [];

                for (const items of paymentRate) {
                    subscriptionTypeVar.push(items.subscriptionType);
                    subscriptionTotalVar.push(items.total)
                }                

                setSubscriptionType(subscriptionTypeVar);
                setTotal(subscriptionTotalVar);

            } else {
                alert("payment rate error")
            }
        } catch (error) {
            console.log(error);
            
        }
    }, [dispatch]);

    const fetchTotalRevenue = useCallback(async() => {
        try {
            const response = await dispatch(dashboardTotalRevenue());
            if(response.payload.data) {
                const res = response.payload.data[0].total;
                setTotalRevenue(res);
            }
        } catch (error) {
            console.log(error);
            
        }
    }, [dispatch])
        

    useEffect(() => {
        fetchUserCountData();
        fetchUserCountRate();
        fetchFeedbackData();
        fetchPaymentRateData();
        fetchTotalRevenue();
    }, [fetchUserCountData, fetchUserCountRate, fetchFeedbackData, fetchPaymentRateData]);

    useEffect(() => {
    }, [fetchUserCountRate]);

    console.log("data, type",data, type);
    

    return (
        <div className="w-full no-scrollbar z-0 overflow-scroll flex flex-col md:flex-row pt-10">
            <div className="md:w-[60%] flex flex-col items-center gap-10">

                <div className="w-full">
                    <UserCountCards userCountData={userCountData} />
                </div>

                <div className="payment-rate-chart w-[90%] gap-5 pt-10 px-10 flex flex-col rounded-2xl justify-around bg-white">
                    <h1 className="font-semibold text-[#848383]">Payment type rate</h1>
                    <PieChart subscriptionType={subscriptionType} total={total}/>
                </div>

            </div>

            <div className=" flex flex-col gap-7 md:w-[40%] mr-5 min-h-[110vh]">

                <div className="user-rate-div w-full min-h-[40vh] flex flex-col gap-7 justify-center bg-white rounded-2xl px-5">
                    <div className="flex justify-between items-center relative text-[#848383]">
                        <h1 className="font-semibold">Rate of User Registration</h1>
                        <button onClick={() => setUserRegRateFilter(!userRegRateFilter)}>
                            <IoFilter className={`${userRegRateFilter ? "bg-[#9d9c9c57]" : ""} h-8 w-8 p-1  rounded-full`}/>
                        </button>

                        <ul className={`user-rate-filter-list ${userRegRateFilter ? "show" : ""} absolute right-0 top-8 bg-[#f0f0f0a3] flex flex-col gap-2 py-2 rounded-md`}>
                            <li 
                                className="hover:bg-[#9d9c9c57] px-4 py-1"
                                onClick={() => {fetchUserCountRate("week")}}
                                >
                                Weekly
                            </li>
                            <li 
                                className="hover:bg-[#9d9c9c57] px-4 py-1"
                                onClick={() => {fetchUserCountRate("month")}}
                                >
                                Monthly
                            </li>
                            <li 
                                className="hover:bg-[#9d9c9c57] px-4 py-1"
                                onClick={() => {fetchUserCountRate("year")}}
                            >
                                Yearly
                            </li>
                        </ul>

                    </div>

                    <BarChart type={type} data={data} param={"month"}/>
                
                </div>

                <div className="total-revenue bg-white h-[9rem] flex items-center rounded-2xl">
                    <div className="bg-[#FCF6EA] h-[80%] rounded-xl w-1/4 flex items-center justify-center ml-5">
                        <FaIndianRupeeSign className="text-[50px] text-[#ba8a43c2]"/>
                    </div>
                    <div className="flex flex-col pl-5">
                        <p className="text-[40px] text-[#ba8a43c2]">{totalRevenue}</p>
                        <h1 className="text-[15px] text-[#ba8a43c2]">Total Revenue</h1>
                    </div>
                </div>


                <div className="carousel-container">
                    {feedbackData.map((data) => (
                        <div 
                            className="feedback-div min-w-[100%] min-h-[40vh] rounded-2xl flex flex-col justify-between overflow-hidden"
                            style={{backgroundImage: `url(${data.image})`, backgroundSize: "cover", backgroundPosition: "center"}}
                            key={data._id}
                        >

                            <div className="h-[3rem] w-full bg-gradient-to-b from-[#00000088] to-[#00000055] flex items-center pl-5">
                                <h1 className="text-[14px] text-white font-semibold">Success stories</h1>
                            </div>

                            <div className="h-[5rem] w-full bg-gradient-to-b from-[#00000055] to-[#000000] flex">

                                <div className="flex relative items-center h-full pl-5 w-[40%]">
                                    <div 
                                        className="user rounded-full h-16 w-16 bg-gray-300"
                                        style={{backgroundImage: `url(${data.userId.userImg})`, backgroundSize: "cover", backgroundPosition: "center"}}
                                    ></div>
                                    <div 
                                        className="partner absolute left-16 rounded-full h-16 w-16 bg-gray-300"
                                        style={{backgroundImage: `url(${data.partnerId.partnerImg})`, backgroundSize: "cover", backgroundPosition: "center"}}
                                    ></div>
                                </div>

                                <div className="text-[#f4f4f4] h-full flex flex-wrap items-center w-[60%]">
                                    <p className="truncate-three-lines">
                                        {data.story}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                
            </div>
               
        </div>
    );
}
