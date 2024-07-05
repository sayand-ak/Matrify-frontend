import { useEffect, useRef, useState } from "react";
import "./Payment.css";
import React from 'react';
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { createSubscriptionSession, fetchWalletData, findActiveOffer, getActiveSubscription } from "../../../services/userAPI";
import { Offer, Subscription } from "../../../typings/user/userTypes";
import { BsSkipBackward } from "react-icons/bs";
import { PayButton } from "../../../components/PayButton/PayButton";
import { Footer } from "../../../components/footer/Footer";
import RefundPolicyModal from "../../../components/refundPolicyModal/RefundPolicyModal";
import { WalletType } from "../../../typings/wallet/wallet";


interface RefObj {
    week: React.MutableRefObject<HTMLDivElement | null>;
    month: React.MutableRefObject<HTMLDivElement | null>;
    year: React.MutableRefObject<HTMLDivElement | null>;
}

function Payment () {

    const weeklyRef = useRef<HTMLDivElement | null>(null);
    const monthlyRef = useRef<HTMLDivElement | null>(null);
    const yearlyRef = useRef<HTMLDivElement | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenType, setIsOpenType] = useState<string>("");

    const [walletData, setWalletData] = useState<WalletType | null>(null);


    const [subscriptionAmt, setSubscriptionAmt] = useState<Subscription>();

    const [offers, setOffers] = useState<Offer | null>();
    const selector = useAppSelector((state) => state.user.user)

    const tickSvg = <svg width="28" height="16" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-1.28785e-05 10.4497L7.20947 17.6592L9.03603 15.8326L1.82654 8.62314L-1.28785e-05 10.4497Z" fill="black"/>
                        <path d="M22.7001 2.16841L20.8735 0.341797L12.6893 8.53241L14.5159 10.359L22.7001 2.16841Z" fill="black"/>
                        <path d="M28.1799 0.341797L14.5095 14.0057L9.12654 8.62275L7.29993 10.4494L14.5095 17.6589L30 2.16841L28.1799 0.341797Z" fill="#D39316"/>
                    </svg>


    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchActiveSubscription(){
            const response = await dispatch(getActiveSubscription());
            
            setSubscriptionAmt(response.payload.data)
            const offers = await dispatch(findActiveOffer());
            setOffers(offers.payload.data);

        }
        
        fetchActiveSubscription()
    },[dispatch]);    



    function activeOption(selected: string) {
        const refs:RefObj = {
            week: weeklyRef,
            month: monthlyRef,
            year: yearlyRef,
        };
    
        Object.keys(refs).forEach((key) => {
            if (key === selected) {
                refs[key as keyof RefObj].current?.classList.add("active-payment");
            } else {
                refs[key as keyof RefObj].current?.classList.remove("active-payment");
            }
        });
    }

    async function handleSubscriptionPayments(subscriptionType: string, userId: string){
        switch(subscriptionType){
            case "weekly" : {
                if(subscriptionAmt?.amount.weekly){
                    const response = await dispatch(createSubscriptionSession({subId: subscriptionAmt._id || "", type: subscriptionType, amount:subscriptionAmt?.amount.weekly, userId: userId}))
                    
                    if(response.payload.data){
                        window.location.href = response.payload.data;
                    } else {
                        alert("payment error");
                    }
                }
                break;
            }
            case "monthly" : {
                if(subscriptionAmt?.amount.monthly){
                    const response = await dispatch(createSubscriptionSession({subId: subscriptionAmt._id || "", type: subscriptionType, amount: subscriptionAmt?.amount.monthly , userId: userId}))
                    if(response.payload.data){
                        window.location.href = response.payload.data;
                    } else {
                        alert("payment error");
                    }
                }
                break;
            }
            case "yearly" : {
                if(subscriptionAmt?.amount.yearly){
                    const response = await dispatch(createSubscriptionSession({subId: subscriptionAmt._id || "", type: subscriptionType, amount: subscriptionAmt?.amount.yearly , userId: userId}))
                    if(response.payload.data){
                        window.location.href = response.payload.data;
                    } else{
                        alert("payment error");
                    }
                }
                break;
            }
        }
    }

    const getWalletData = async () => {
        const response = await dispatch(fetchWalletData());
        if(response.payload.data) {
            setWalletData(response.payload.data);
        } else {
            alert("wallet api error...");
        }
    }

    useEffect(() => {
        getWalletData();
    },[dispatch]);
    
    

    return (
        <div className="min-h-[100vh] font-rubik">

            <a href="/home" className="absolute top-5 right-5 flex gap-2 text-[15px] text-[#9a9797] cursor-pointer">
                SKIP
                <BsSkipBackward className="text-[20px]"/>
            </a>

            <div className="flex flex-col items-center gap-5 pt-5">
                <div className="flex items-center gap-2">
                    <img src="../src/assets/images/logo.png"className="h-[5rem] md:h-[5rem] lg:h-[6rem]" alt="" />
                    <h2 className="logo-heading text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-semibold">MATRIFY</h2>
                </div>
                <h2 className="text-center text-[1.5rem] md:text-[2.2rem] lg:text-[3.5rem]">Select your plan and Upgrade to Premium</h2>
                <p 
                    className="w-full text-center text-[1rem] md:text-[1.3rem] lg:text-[1.7rem] text-[#707070]"
                >You will be able to access advance interaction features</p>

                {
                    offers?.status === "active" &&
                    <p className="text-[35px] font-bold text-[#C59D77]">Get {offers?.offerPercentage}% off on our {offers?.title}</p>
                }
                
            </div>

            <div className="payment-card-container min-h-[35rem] flex-col lg:flex-row flex gap-10 items-center justify-around sm:px-10 md:px-40 lg:px-20 my-10">

                {/* weekly subscription div (div--1) */}
                <div 
                    className="weekly w-3/4 md:w-full my-10 rounded-xl flex-grow-1"
                    onClick={() => activeOption("week")}
                    ref={weeklyRef}
                >
                    <div className="flex flex-col gap-5 items-center py-10">
                        <h3 className="text-[30px]">Weekly</h3>
                        <p className="text-[5rem]">₹{subscriptionAmt?.amount.weekly}</p>
                        <ul className="flex flex-col gap-5">
                            <li className="flex gap-2">
                                {tickSvg}
                                <p>Enable the message feature </p>
                            </li>
                            <li className="flex gap-2">
                                {tickSvg}
                                <p>Use the voice call feature   </p>
                            </li>
                            <li className="flex gap-2">
                                {tickSvg}
                                <p>Know more via video call </p>
                            </li>
                        </ul>

                        <div className="flex flex-col gap-5 items-center justify-center pt-5">
                            <PayButton handleSubscriptionPayment={() => handleSubscriptionPayments("weekly", selector?._id as string)}/>
                            <a 
                                className="text-[12px] underline cursor-pointer"
                                onClick={() => {
                                    setIsOpen(true);
                                    setIsOpenType("weekly")
                                }}
                            >terms and conditions</a>
                        </div>

                    </div>
                </div>

                {/* monthly subscription div (div--2) */}
                <div 
                    className="monthly w-3/4 md:w-full rounded-xl flex flex-col overflow-hidden flex-grow-1"
                    onClick={() => activeOption("month")}
                    ref={monthlyRef}
                >
                    {/* decorations */}
                    <div className="h-[45px] bg-[#D2B480]">
                        <p 
                            className="font-bold text-[25px] flex items-center justify-center h-full text-white"
                        >Most popular</p>
                    </div>

                    {/* contents */}
                    <div className="h-[80%]">
                        <div className="flex flex-col gap-5 items-center py-8">
                            <h3 className="text-[30px]">Monthly</h3>
                            <p className="text-[5rem]">₹{subscriptionAmt?.amount.monthly}</p>


                            <ul className="flex flex-col gap-5">
                                <li className="flex gap-2">
                                    {tickSvg}
                                    <p>Enable the message feature </p>
                                </li>
                                <li className="flex gap-2">
                                    {tickSvg}
                                    <p>Use the voice call feature   </p>
                                </li>
                                <li className="flex gap-2">
                                    {tickSvg}
                                    <p>Know more via video call </p>
                                </li>
                            </ul>

                            <div className="flex flex-col gap-5 items-center justify-center pt-5">
                                <PayButton handleSubscriptionPayment={() => handleSubscriptionPayments("monthly", selector?._id as string)}/>
                                <a 
                                    className="text-[12px] underline cursor-pointer"
                                    onClick={() => {
                                        setIsOpen(true);
                                        setIsOpenType("monthly")
                                    }}
                                >terms and conditions</a>
                            </div>

                        </div>
                    </div>

                    {/* decorations */}
                    <div className="h-[45px] bg-[#D2B480]"></div>

                </div>

                {/* yearly subscription div (div--3) */}
                <div 
                    className="yearly w-3/4 md:w-full my-10 rounded-xl flex-grow-1"
                    onClick={() => activeOption("year")}
                    ref={yearlyRef}
                >
                    <div className="flex flex-col gap-5 items-center py-10">
                        <h3 className="text-[30px]">Yearly</h3>
                        <p className="text-[5rem]">₹{subscriptionAmt?.amount.yearly}</p>

                        <ul className="flex flex-col gap-5">
                            <li className="flex gap-2">
                                {tickSvg}
                                <p>Enable the message feature </p>
                            </li>
                            <li className="flex gap-2">
                                {tickSvg}
                                <p>Use the voice call feature   </p>
                            </li>
                            <li className="flex gap-2">
                                {tickSvg}
                                <p>Know more via video call </p>
                            </li>
                        </ul>

                        <div className="flex flex-col gap-5 items-center justify-center pt-5">
                            <PayButton handleSubscriptionPayment={() => handleSubscriptionPayments("yearly", selector?._id as string)}/>
                            <a 
                                className="text-[12px] underline cursor-pointer"
                                onClick={() => {
                                    setIsOpen(true);
                                    setIsOpenType("yearly")
                                }}
                            >terms and conditions</a>
                        </div>
                    </div>

                </div>

            </div>

            <RefundPolicyModal 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                isOpenType={isOpenType} 
                onRequestClose={() => {}}
            />

            <Footer/>
        </div>
    )
}

export default Payment;