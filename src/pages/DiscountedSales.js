import { useEffect, useState } from "react";
import { calculateTotalMoneyForDiscountedSalesBeforeDiscount, getDiscountedSales } from "../helpers";

const DiscountedSales = () => {
    const DISCOUNT_PERCENTAGE = 0.10;

    const [discountedSales, setDiscountedSales] = useState();
    const [error, setError] = useState();
    const [totalMoney, setTotalMoney] = useState(0);

    // Get All Discounted Sales
    const handleDiscountedSales = () => {
        let sales = localStorage.getItem("sales");
        if (sales) {
            sales = JSON.parse(sales);
            if (sales) {
                const result = getDiscountedSales(sales);
                if (result.length === 0) setError("لم تتم أي عمليات بيع مخفّضة حتى الآن !")
                else {
                    setDiscountedSales(result);
                    setTotalMoney(calculateTotalMoneyForDiscountedSalesBeforeDiscount(result));
                };
            } else setError("لم تتم أي عملية بيع بعد !");
        }
    };
    useEffect(() => {
        handleDiscountedSales();
    },[])

    return (
        <>
            {/* Start Sales */}
            {discountedSales?.map(product => (
                <div className="flex justify-between p-3 mb-2 bg-gray-200 rounded-md">
                    <div className="">
                        <p>الإسم: <span className="font-bold">{product.name}</span></p>
                        <p>الكود: <span className="font-bold">{product.barcode}</span></p>
                        <p>سعر القطعة قبل الخصم: <span className="font-bold">{product.priceBeforeDiscount}$</span></p>
                        <p>سعر القطعة بعد الخصم: <span className="font-bold">{product.price}$</span></p>
                        <p>الكمية المباعة: <span className="font-bold">{product.qty}</span></p>
                        {product.qty > "1" && (<p>إجمالي المبلغ: <span className="font-bold">{product.price * product.qty}$</span></p>)}
                        <p>تاريخ البيع: <span className="font-bold">{product.date}</span></p>
                    </div>
                </div>
            ))}
            {/* End Sales */}

            {!discountedSales && error && (<p className="text-gray-600 font-semibold">{error}</p>)}

            {/* Start Total Money */}
            <div
                className="mt-4 p-2 bg-yellow-400 rounded-md flex gap-5"
            >
                <p>
                    إجمالي عدد عمليات الخصم:    
                    <span className="font-bold ms-1"> 
                        {discountedSales?.length}
                    </span>
                </p>
                <p>
                    إجمالي الخصم:    
                    <span className="font-bold ms-1"> 
                        {(totalMoney * DISCOUNT_PERCENTAGE).toLocaleString()}$
                    </span>
                </p>
                <p>
                    من أصل إجمالي مبلغ     
                    <span className="font-bold ms-1">
                        {totalMoney.toLocaleString()}$
                    </span>
                </p>
            </div>
            {/* End Total Money */}
        </>
    );
}

export default DiscountedSales;