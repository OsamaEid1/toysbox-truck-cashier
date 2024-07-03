import { useEffect, useState } from "react";
import Popup from "../components/Popup";
import { calculateTotalMoneyForDetailedSales, countRepeatedSales } from "../helpers";

const DetailedSales = () => {
    const [soldProducts, setSoldProducts] = useState([]);
    const [productToDelete, setProductToDelete] = useState();
    const [productQtyToDelete, setProductQtyToDelete] = useState();
    const [productDiscountToDelete, setProductDiscountToDelete] = useState();
    const [popupVisible, setPopupVisible] = useState(false);
    const [totalMoney, setTotalMoney] = useState(0);

    // Set Initial Sold Products And Total Money
    const sales = localStorage.getItem("sales");
    useEffect(() => {
        if (sales) {
            let salesData = JSON.parse(sales);
            setSoldProducts(salesData);
            setTotalMoney(calculateTotalMoneyForDetailedSales(salesData));
        }
    },[]);

    const handleDeletion = (productBarcode, qty, discount) => {
        setPopupVisible(true);
        setProductToDelete(productBarcode);
        setProductQtyToDelete(qty);
        setProductDiscountToDelete(discount);
    };
    const deleteProduct = () => {
        const updatedSales = []

        // Update Sold Products
        let sucssDelte = false;
        soldProducts.map((product) => {
            if((product.barcode !== productToDelete) && (product.qty !== productQtyToDelete)  && (product.discount !== productDiscountToDelete)) {
                updatedSales.push(product);
            } else {
                if (!sucssDelte) {
                    sucssDelte = true;
                } else {
                    updatedSales.push(product);
                    sucssDelte = true;
                }
            }
        });
        // Update Local Sales State
        setSoldProducts(updatedSales);
        // Recalculate Total Money
        setTotalMoney(calculateTotalMoneyForDetailedSales(updatedSales));
        // Update LocaleStorage
        localStorage.setItem("sales", JSON.stringify(updatedSales));
        // Close Modal and Reset State
        setPopupVisible(false);
    };

    return (
        <div className="p-3 mb-2 bg-gray-100 rounded-md mt-11">
            {/* Start Sales */}
            {soldProducts && soldProducts.map(product => (
                <div className="flex justify-between p-3 mb-2 bg-gray-200 rounded-md">
                    <div className="">
                        <p>الإسم: <span className="font-bold">{product.name}</span></p>
                        <p>الكود: <span className="font-bold">{product.barcode}</span></p>
                        <p>الكمية المباعة: <span className="font-bold">{product.qty}</span></p>
                        {product.discount === "نعم" ? (
                            <p>سعر القطعة بعد الخصم: <span className="font-bold">{product.price}$</span></p>
                        ) : (
                            <p>سعر القطعة: <span className="font-bold">{product.price}$</span></p>
                        )}
                        <p>هل يوجد خصم؟ <span className="font-bold">{product.discount}</span></p>
                    </div>
                    <div className="">
                        {/* <button
                            className="block mb-3 transition duration-200 hover:bg-blue-300 hover:text-white"
                            >
                                Edit
                        </button> */}
                        <button
                            className="p-1 rounded-full bg-red-500 transition duration-200 hover:bg-red-800 hover:text-white"
                            onClick={() => handleDeletion(product.barcode)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="white" enable-background="new 0 0 55 55" viewBox="0 0 55 55" id="trash"><path d="M43.19,7.97h-8.42V5.51c0-1.66-1.35-3.01-3.01-3.01h-8.52c-1.66,0-3.01,1.35-3.01,3.01v2.46h-8.42
                                c-2.32,0-4.22,1.89-4.22,4.22v4.14c0,0.55,0.45,1,1,1h2.09v30.96c0,2.33,1.89,4.22,4.21,4.22H40.1c2.33,0,4.22-1.89,4.22-4.22
                                V17.32h2.09c0.55,0,1-0.45,1-1v-4.14C47.41,9.86,45.52,7.97,43.19,7.97z M22.23,5.51c0-0.56,0.45-1.01,1.01-1.01h8.52
                                c0.56,0,1.01,0.45,1.01,1.01v2.46H22.23V5.51z M42.32,48.28c0,1.23-0.99,2.22-2.22,2.22H14.89c-1.22,0-2.21-0.99-2.21-2.22V17.32
                                h29.64V48.28z M45.41,15.32H9.59v-3.14c0-1.22,0.99-2.22,2.22-2.22h31.39c1.22,0,2.22,0.99,2.22,2.22V15.32z"></path><path d="M30.77 46.5c.55 0 1-.45 1-1V22.32c0-.55-.45-1-1-1s-1 .45-1 1V45.5C29.77 46.05 30.22 46.5 30.77 46.5zM24.23 46.5c.55 0 1-.45 1-1V22.32c0-.55-.45-1-1-1s-1 .45-1 1V45.5C23.23 46.05 23.67 46.5 24.23 46.5zM37.32 46.5c.55 0 1-.45 1-1V22.32c0-.55-.45-1-1-1s-1 .45-1 1V45.5C36.32 46.05 36.77 46.5 37.32 46.5zM17.68 46.5c.55 0 1-.45 1-1V22.32c0-.55-.45-1-1-1s-1 .45-1 1V45.5C16.68 46.05 17.13 46.5 17.68 46.5z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
            {/* End Sales */}

            {/* Start Popup Container */}
            {popupVisible &&
                <Popup
                    text={`هل أنت متأكد من أنك تريد حذف المنتج الذي باركوده:  (${productToDelete}) ?`}
                    options={true}
                    confirmFun={deleteProduct}
                    closePopupFun={() => setPopupVisible(false)}
                />}
            {/* End Popup Container */}

            {/* Start Total Money */}
            {/* End Total Money */}
            <div className="p-2 bg-yellow-400 rounded-md"
                >
                    إجمالي مبلغ المبيعات:  
                <span className="font-bold ms-1">
                    {totalMoney.toLocaleString()}$
                </span>
            </div>
        </div>
    );
}

export default DetailedSales;