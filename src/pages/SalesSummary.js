import { useEffect, useState } from "react";
import Popup from "../components/Popup";
import { calculateTotalMoneyForSummary, countRepeatedSales, getSalesSummary, getTotalSoldPiecesForDiscountedSales, getTotalSoldPiecesForSummarySales } from "../helpers";

const SalesSummary = () => {
    const [soldProducts, setSoldProducts] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0);
    const [totalSoldPieces, setTotalSoldPieces] = useState(0);


    // Set Initial Sold Products And Total Money
    useEffect(() => {
        const sales = localStorage.getItem("sales");
        if (sales) {
            let salesData = JSON.parse(sales);
            salesData = getSalesSummary(salesData);
            setTotalMoney(calculateTotalMoneyForSummary(salesData));
            setTotalSoldPieces(getTotalSoldPiecesForSummarySales(salesData));
            setSoldProducts(salesData);
        }
    },[]);

    console.log(soldProducts);

    return (
        <>
            {/* Start Sales Section */}
            {soldProducts && soldProducts.map(product => (
                <div className="flex justify-between p-3 mb-2 bg-gray-200 rounded-md">
                    <div className="">
                        <p>الإسم: <span className="font-bold">{product.name}</span></p>
                        <p>الكود: <span className="font-bold">{product.barcode}</span></p>
                        <p>سعر القطعة: <span className="font-bold">{Math.ceil(product.price)}$</span></p>
                        <p>الكمية المباعة: <span className="font-bold">{product.totalSoldQty}</span></p>
                        <p>عدد مرات البيع: <span className="font-bold">{product.numOfRepeatSales}</span></p>
                        <p>إجمالي المبلغ: <span className="font-bold">{product.totalPrice}$</span></p>
                    </div>
                    <div className="">
                        {/* <button
                            className="block mb-3 transition duration-200 hover:bg-blue-300 hover:text-white"
                            >
                                Edit
                        </button> */}
                    </div>
                </div>
            ))}
            {/* End Sales Section */}

            {/* Start Total Money */}
            <div className="p-2 bg-yellow-400 rounded-md flex gap-5"
                >
                    <div>
                            إجمالي مبلغ المبيعات:  
                        <span className="font-bold ms-1">
                            {totalMoney.toLocaleString()}$
                        </span>
                    </div>
                    <div>
                        عدد الأصناف:
                        <span className="font-bold ms-1">
                            {soldProducts ? soldProducts.length : 0}
                        </span>
                    </div>
                    <div>
                        عدد القطع المُباعة:
                        <span className="font-bold ms-1">
                            {totalSoldPieces}
                        </span>
                    </div>
            </div>
            {/* End Total Money */}
        </>
    );
}

export default SalesSummary;