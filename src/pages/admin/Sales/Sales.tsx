import { useCallback, useEffect, useState } from "react";
import "./sales.css";
import { ISalesReport } from "../../../typings/admin/salesReport";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { salesReport } from "../../../services/adminAPI";
import { formatDate } from "../../../utils/formateDate";
import LineChart from "../../../components/chart/LineChart";
import { IoFilterOutline } from "react-icons/io5";
import * as XLSX from "xlsx";
import DownloadDropdown from "../../../components/salesPDF/SalesPDF";

interface Data {
    labels: string[],
    datasets: {
        label: string,
        data: number[],
        fill: boolean,
        borderColor: string,
        tension: number,
    }[],
}

const Sales = () => {
    const [salesReportData, setSalesReportData] = useState<ISalesReport | null>(null);
    const [amounts, setAmounts] = useState<number[]>([]);
    const [dates, setDates] = useState<string[]>([]);
    const [userRegRateFilter, setUserRegRateFilter] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const fetchSalesReportData = useCallback(async (type?: string) => {
        const response = await dispatch(salesReport(type || ""));
        if (response.payload.data) {
            setSalesReportData(response.payload.data[0]);
        } else {
            setSalesReportData(null);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchSalesReportData("");
    }, [fetchSalesReportData]);

    useEffect(() => {
        if (salesReportData) {
            const amountsArray = salesReportData.payments.map(payment => payment.subscription.amount);
            const datesArray = salesReportData.payments.map(payment => formatDate(payment.subscription.createdAt));
            setAmounts(amountsArray);
            setDates(datesArray);
        } else {
            setAmounts([]);
            setDates([]);
        }
    }, [salesReportData]);

    // Chart.js configuration
    const data: Data = {
        labels: dates,
        datasets: [
            {
                label: "Amount",
                data: amounts,
                fill: false,
                borderColor: "#B28846",
                tension: 0.1
            }
        ]
    };

    const downloadExcel = () => {
        if (!salesReportData) return;

        const data = salesReportData.payments.map((payment, index) => ({
            PID: payment.subscription.pid,
            Username: salesReportData.user[index]?.username,
            Amount: payment.subscription.amount,
            Type: payment.subscription.type,
            "Expires In": formatDate(payment.subscription.expiresIn),
            "Created At": formatDate(payment.subscription.createdAt),
            "Updated At": formatDate(payment.subscription.updatedAt)
        }));

        data.push({
            PID: '',
            Username: '',
            Amount: salesReportData.total,
            Type: 'Total',
            "Expires In": '',
            "Created At": '',
            "Updated At": ''
        });

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
        XLSX.writeFile(wb, "sales_report.xlsx");
    };

    return (
        <div className="sales flex flex-col items-center">

            <div className="w-[95%] flex justify-end my-5">
                <DownloadDropdown salesReportData={salesReportData}/>
            </div>

            <div className="line-chart w-[95%] h-[80vh] flex flex-col pt-10 bg-white rounded-2xl px-10">
                <div className="text-[#848383] flex justify-between relative">
                    <h1 className="font-semibold text-[25px] ">Sales Rate</h1>
                    <button onClick={() => { setUserRegRateFilter(!userRegRateFilter) }}>
                        <IoFilterOutline className={`${userRegRateFilter ? "bg-gray-300" : ""} text-[40px] font-bold rounded-lg outline outline-slate-300 p-1`} />
                    </button>

                    <ul className={`sales-filter-list ${userRegRateFilter ? "show" : ""} hidden absolute right-0 top-10 bg-[#f0f0f0a3] py-2 rounded-md cursor-pointer`}>
                        <li
                            className="hover:bg-[#9d9c9c57] px-4 py-1"
                            onClick={() => { fetchSalesReportData("week") }}
                        >
                            Weekly
                        </li>
                        <li
                            className="hover:bg-[#9d9c9c57] px-4 py-1"
                            onClick={() => { fetchSalesReportData("month") }}
                        >
                            Monthly
                        </li>
                        <li
                            className="hover:bg-[#9d9c9c57] px-4 py-1"
                            onClick={() => { fetchSalesReportData("year") }}
                        >
                            Yearly
                        </li>
                    </ul>
                </div>
                {amounts.length > 0 ? (
                    <LineChart data={data} />
                ) : (
                    <div className="h-full w-full flex justify-center items-center">
                        <p>No sales data available.</p>
                    </div>
                )}
            </div>
            <div className="w-full pt-10 min-h-[90vh]">
                <table className="w-[95%] mx-auto bg-white mb-0">
                    <thead>
                        <tr className="h-14">
                            <th>PID</th>
                            <th>Username</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Expires In</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {salesReportData && salesReportData.payments.length > 0 ? (
                            salesReportData.payments.map((payment, index) => (
                                <tr key={index} className="h-20 hover:bg-[#f4f4f4]">
                                    <td>{payment.subscription.pid}</td>
                                    <td>{salesReportData.user[index]?.username}</td>
                                    <td>{payment.subscription.amount}</td>
                                    <td>{payment.subscription.type}</td>
                                    <td>{formatDate(payment.subscription.expiresIn)}</td>
                                    <td>{formatDate(payment.subscription.createdAt)}</td>
                                    <td>{formatDate(payment.subscription.updatedAt)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr className="h-20 hover:bg-[#f4f4f4]">
                                <td colSpan={6} className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="sticky">
                    <span>Total:</span>
                    <h3 className="text-[30px] font-semibold"> {salesReportData ? salesReportData.total : 0}(₹)</h3>
                </div>

            </div>
        </div>
    );
};

export default Sales;
