import { useEffect, useState } from "react";
import { createSalesHistoryReport, createDiscountedSalesReport, createSalesSummaryReport, exportReport} from "../helpers";

const SalesReports = () => {
    // Report Info
    const [reportText, setReportText] = useState();
    const [reportName, setReportName] = useState();

    // Load All Sales
    const [sales, setSales] = useState();
    useEffect(() => {
        const salesData = localStorage.getItem("sales");
        if (salesData) {
            setSales(JSON.parse(salesData));
        }
    }, []);

    const handleExportSalesSummeryReport = () => {
        if (sales) {
            const { text, name } = createSalesSummaryReport(sales);
            setReportText(text);
            setReportName(name);
        } else alert("لا توجد أي عملية بيع بعد!");
    };
    const handleExportSalesHistoryReport = () => {
        if (sales) {
            const { text, name } = createSalesHistoryReport(sales);
            setReportText(text);
            setReportName(name);
        } else alert("لا توجد أي عملية بيع بعد!");
    };
    const handleExportDiscountedSalesReport = () => {
        if (sales) {
            const { text, name } = createDiscountedSalesReport(sales);
            setReportText(text);
            setReportName(name);
        } else alert("لا توجد أي عملية بيع بعد!");
    };

    return (
        <div className="p-3 mb-2 bg-gray-100 rounded-md mt-11">
            {/* Start Export Report Options  */}
            <div className="flex justify-between">
                <button
                    className="p-2 rounded-md text-white bg-teal-400 hover:bg-teal-500 duration-300 tex-white"
                    onClick={handleExportSalesSummeryReport}
                >
                    تصدير تقرير بمُلخص المبيعات
                </button>
                <button
                    className="p-2 rounded-md text-white bg-teal-400 hover:bg-teal-500 duration-300  tex-white"
                    onClick={handleExportSalesHistoryReport}
                >
                    تصدير تقرير بتفاصيل عمليات البيع
                </button>
                <button
                    className="p-2 rounded-md text-white bg-teal-400 hover:bg-teal-500 duration-300 tex-white"
                    onClick={handleExportDiscountedSalesReport}
                >
                    تصدير تقرير بالمبيعات المُخفّضة
                </button>
            </div>
            {/* End Export Report Options  */}
            {/* Start Report Download  */}
            {reportText && (
                <div className="mt-5">
                    <p>تم إصدار {reportName} بنجاح.</p>
                    <button
                        className="bg-green-500 hover:bg-green-600 duration-300 text-white font-bold mt-2 rounded-md w-full text-center py-2"
                        onClick={() => exportReport(reportText, reportName)}
                    >
                        تحميل التقرير
                    </button>
                </div>
            )}
            {/* Start Report Download  */}
        </div>
    );
}

export default SalesReports;