import { useEffect, useState } from "react";
import { WalletType } from "../../../typings/wallet/wallet";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { fetchWalletData } from "../../../services/userAPI";
import { formatDate } from "../../../utils/formateDate";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
    const [walletData, setWalletData] = useState<WalletType | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function getWalletData() {
            try {
                const data = await dispatch(fetchWalletData());
                if(data.payload.data) {
                    setWalletData(data.payload.data);
                }
                
            } catch (error) {
                navigate("/500");
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
            <div className="w-[80vw] md:w-[60vw] mx-auto">
                
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                <div className="bg-gradient-to-br min-h-[150px] from-[#BC9063] to-[#F8CC87] rounded-xl shadow-lg text-white relative overflow-hidden hover:scale-110 transition-all duration-200 p-7">
                    <h2 className="text-xl font-semibold mb-5">Balance</h2>
                    <p className="text-4xl font-bold">₹{walletData.balance.toFixed(2)}</p>
                </div>

                <div className="bg-gradient-to-br from-[#BC9063] to-[#F8CC87] rounded-xl shadow-lg p-7 text-white relative overflow-hidden hover:scale-110 transition-all duration-200">
                    <h2 className="text-xl font-semibold mb-5">Total Income</h2>
                    <p className="text-4xl font-bold">₹{totalIncome?.toFixed(2)}</p>
                </div>

                <div className="bg-gradient-to-br from-[#BC9063] to-[#F8CC87] rounded-xl shadow-lg p-7 text-white relative overflow-hidden hover:scale-110 transition-all duration-200">
                    <h2 className="text-xl font-semibold mb-5">Total Expenses</h2>
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
                                        <td className="p-3 text-sm text-gray-700 py-5">
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