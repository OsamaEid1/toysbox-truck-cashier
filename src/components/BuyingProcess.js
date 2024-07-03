import { useEffect, useState } from "react";
import { addNewSell } from "../helpers";

const BuyingProcess = ({ product }) => {
    console.log("object", product);
    const [qtyWillBuy, setQtyWillBuy] = useState(1);
    const [isWithDiscount, setIsWithDiscount] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const DISCOUNT_PERCENTAGE = 0.10;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (+product.stock >= qtyWillBuy) {
            // Calculate Price That Will Pay
            let priceWillPay = isWithDiscount
                    ? product.price * (1 - DISCOUNT_PERCENTAGE)
                    : product.price;

            //  Add New Sell To DB
            const newSell = {
                barcode: product.barcode,
                name: product.name,
                price: priceWillPay,
                qty: qtyWillBuy,
                discount: isWithDiscount ? "نعم" : "لا"
            };
            if(await addNewSell(newSell)) {
                // Notify user about successful sale
                alert('Successful Sale!');
            } else alert("Field Sale!");

        //     // Update Product Stock
        //     const newStock = product.stock - qtyWillBuy;
        //     console.log(newStock);
        //     if(await updateProductStockInDB(product.barcode, newStock)) {
        //         // Notify user about successful sale
        //         alert('Updated Stock Successfully!');
        //     } else alert("Field To Update Stock!");

        } else alert("enter valid quantity!")
    };

    const [isDiscountDisabled, setIsDiscountDisabled] = useState(true);
    useEffect(() => {
        if (product) {
            let newTotalPrice = isWithDiscount ?
                    ((parseFloat(product.price).toFixed() * qtyWillBuy) * (1 - DISCOUNT_PERCENTAGE)) :
                    qtyWillBuy * Math.ceil(parseFloat(product.price));
            setTotalPrice(newTotalPrice);

            const totalPriceWithoutDiscount = qtyWillBuy * Math.ceil(parseFloat(product.price)) < 300;
            if (!totalPriceWithoutDiscount) {
                setIsDiscountDisabled(false)
            } else {
                setIsDiscountDisabled(true)
            }
        }
    },[qtyWillBuy, isWithDiscount, product]);

    return (
        <form onSubmit={handleSubmit} className="bg-green-200 rounded-t-lg pt-5">
            <label className="ms-12 select-none">
                الكمية:
                <input 
                    type="number" 
                    required
                    min={1}
                    max={product?.stock}
                    value={qtyWillBuy} 
                    onChange={(e) => setQtyWillBuy(e.target.value)}
                    className="ms-3 w-12 text-center rounded border border-main-color"
                />
            </label>
            <label className={`me-12 select-none float-end ${isDiscountDisabled ? 'text-gray-500' : ''}`}>
                خصم <span className="font-bold">{DISCOUNT_PERCENTAGE * 100}%</span>
                <input 
                    type="checkbox" 
                    checked={isWithDiscount}
                    disabled= {isDiscountDisabled}
                    onChange={() => setIsWithDiscount(!isWithDiscount)}
                    className="ms-2"
                />
            </label>
            <p className="text-center">إجمالي المبلغ: <span className="font-bold">{totalPrice.toFixed()}$</span></p>
            <button type="submit" className="block w-full bg-green-500 font-bold p-1 my-4 rounded-lg">إتمام الشراء</button>
        </form>
    );
}

export default BuyingProcess;