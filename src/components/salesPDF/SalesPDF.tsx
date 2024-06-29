import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../utils/formateDate';
import { ISalesReport } from '../../typings/admin/salesReport';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {
    width: "14%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: 5,
    fontSize: 10
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20
  }
});

interface Props {
    salesReportData: ISalesReport | null;
}

const DownloadDropdown: React.FC<Props> = ({ salesReportData }) => {
    const [showDropdown, setShowDropdown] = useState(false);

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

    const SalesReportPDF = () => (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>Sales Report</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>PID</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Username</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Amount</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Type</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Expires In</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Created At</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Updated At</Text></View>
                    </View>
                    {salesReportData?.payments.map((payment, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{payment.subscription.pid}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{salesReportData.user[index]?.username}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{payment.subscription.amount}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{payment.subscription.type}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{formatDate(payment.subscription.expiresIn)}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{formatDate(payment.subscription.createdAt)}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{formatDate(payment.subscription.updatedAt)}</Text></View>
                        </View>
                    ))}
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>{salesReportData?.total}</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Total</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
                    </View>
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="relative">
            <button className="px-4 py-2 bg-[#caa05c] text-white rounded-xl" onClick={() => setShowDropdown(!showDropdown)}>Download</button>
            {showDropdown && (
                <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={downloadExcel}>Download Excel</li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        <PDFDownloadLink document={<SalesReportPDF />} fileName="sales_report.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                        </PDFDownloadLink>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default DownloadDropdown;
