import { useEffect, useState } from "react";
import { WalletType } from "../../../typings/wallet/wallet";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { fetchWalletData } from "../../../services/userAPI";
import { formatDate } from "../../../utils/formateDate";

const Wallet = () => {
    const [walletData, setWalletData] = useState<WalletType | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getWalletData() {
            const data = await dispatch(fetchWalletData());
            if(data.payload.data) {
                setWalletData(data.payload.data);
            }
        }
        getWalletData();
    }, [dispatch]);

    const totalIncome = walletData?.transactions
        .filter(transaction => transaction.type === 'deposit')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpenses = walletData?.transactions
        .filter(transaction => transaction.type === 'withdraw')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    if (!walletData) return (
    <div
        className="h-[700px] w-full"
        style={{backgroundImage: "url(../src/assets/images/empty-wallet.jpg)", backgroundSize: "500px", backgroundPosition: "center", backgroundRepeat: "no-repeat", opacity: "0.7"}}
   >
    
    </div>);

    return (
        <div className="min-h-[90vh] w-full bg-gray-100 p-6">
            <div className="max-w-[60vw] mx-auto ">
                
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-25">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a2 2 0 110 4H7a2 2 0 110-4m12 0H5m7-6v12" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Balance</h2>
                    <p className="text-4xl font-bold">₹{walletData.balance.toFixed(2)}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-25">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m4-4H8" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Total Income</h2>
                    <p className="text-4xl font-bold">₹{totalIncome?.toFixed(2)}</p>
                </div>
                <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-25">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m2-6h2m-2 6v6m4-12a2 2 0 110 4H7a2 2 0 110-4m12 0H5m2 6h6m2 0v6" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
                    <p className="text-4xl font-bold">₹{totalExpenses?.toFixed(2)}</p>
                </div>
            </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Transaction History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-3 text-sm font-semibold tracking-wide text-gray-600">Date</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-gray-600">Type</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-gray-600">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {walletData.transactions.map((transaction) => (
                                    <tr key={transaction._id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3 text-sm text-gray-700">
                                            {formatDate(new Date(transaction.createdAt || "").toString())}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 capitalize">
                                            {transaction.type}
                                        </td>
                                        <td className={`p-3 text-sm font-medium ${
                                            transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            ₹{transaction.amount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wallet;