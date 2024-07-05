import { useState } from "react";
import {getProductByBarcode, getProducts, searchOnProductByBarcode, searchOnProductByName} from "../helpers";
import BuyingProcess from "../components/BuyingProcess";


const Buy = () => {
    const [isBarcodeChecked, setBarcodeChecked] = useState(true);
    const [searchInputValue, setSearchInputValue] = useState();
    const [isBuyingFormVisible, setIsBuyingFormVisible] = useState(false);
    const [targetProduct, setTargetProduct] = useState();
    const [targetProducts, setTargetProducts] = useState();
    const [inventoryProducts, setInventoryProducts] = useState();
    const [error, setError] = useState();

    const [productToPay, setProductToPay] = useState();
    
    const handleSearchingWithBarcode = async () => {
        if (inventoryProducts) {
                const result = searchOnProductByBarcode(inventoryProducts, searchInputValue);
            if (result) setTargetProduct(result);
            else setError("المنتج غير موجود!");
        } else {
            const result = await getProductByBarcode(searchInputValue);
            if (result) setTargetProduct(result);
            else setError("المنتج غير موجود!");
        }
    }

    const handleSearchingWithName = async () => {
        if (inventoryProducts) {
            const result = searchOnProductByName(inventoryProducts, searchInputValue);
            if (result && result.length) setTargetProducts(result);
            else setError("المنتج غير موجود!");
        } else {
            // Get All Products
            const allProducts = await getProducts();
            if (allProducts) {
                const result = searchOnProductByName(allProducts, searchInputValue);
                if (result && result.length) setTargetProducts(result);
                else setError("المنتج غير موجود!");
                // Set Products Locally For Faster Searching In The Next Time
                setInventoryProducts(allProducts);
            } else alert("لا يمكن البحث بالإسم الآن يمكنك المحاولة بالبحث عن طريق الباركود!")
        }
    }

    const handleSubmit = (e) => {
        // Prevent Reloading
        e.preventDefault();
        // Reset States
        setTargetProduct();
        setError();
        // Handle Search Operations
        if (isBarcodeChecked) handleSearchingWithBarcode()
        else handleSearchingWithName();
    };

    const handleBuyingProcess = (product) => {
        if (isBuyingFormVisible) {
            // Reset States
            setProductToPay("");
            setIsBuyingFormVisible(false);
        }
        setIsBuyingFormVisible(!isBuyingFormVisible);
        setProductToPay(product);
        
    };

    return (
        <div className="mt-11 mb-2">
            {/* Start Search Section */}
            <form className="flex flex-row-reverse justify-center" onSubmit={handleSubmit}>
                <input
                    type={isBarcodeChecked? "number" : "text"}
                    className="border rounded-md w-80 ms-2 px-1 focus:outline-2 focus:outline-yellow-300" 
                    required
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                />
                <div className="flex gap-3">
                    <label className="flex items-center select-none">
                        بالباركود
                        <input type="radio" checked={isBarcodeChecked}  onChange={() => {setBarcodeChecked(!isBarcodeChecked); setSearchInputValue("")}} />
                    </label>
                    <label className="flex items-center select-none">
                        بالإسم
                        <input type="radio" checked={!isBarcodeChecked} onChange={() => {setBarcodeChecked(!isBarcodeChecked); setSearchInputValue("")}} />
                    </label>
                </div>
                <button 
                    type="submit" 
                    className="bg-main-color px-3 py-2 font-bold rounded-md ml-5"
                    >
                        ابحث
                </button>
            </form>
            {/* End Search Section */}
            {/* Start Product Details */}
            <div className="bg-gray-100 mt-12 p-5">
                {!error && targetProduct && (
                <>
                    <p>الكود: {targetProduct.barcode}</p>
                    <p>الإسم: {targetProduct.name}</p>
                    <p className="my-1">السعر: <span className="font-bold">{parseFloat(targetProduct.price).toFixed()}$</span></p>
                    <p>المخزون: {targetProduct.stock}</p>
                    <button
                        className="bg-green-400 px-3 p-1 rounded-lg font-bold w-full my-5"
                        onClick={() => handleBuyingProcess(targetProduct)}
                    >بيع</button>

                    {/* Start Buying Process */}
                    {isBuyingFormVisible && productToPay && (
                        <BuyingProcess product={productToPay} />
                    )}
                    {/* End Buying Process */}
                </>)}
                {/* Start Searching With Name */}
                {!error && targetProducts?.map(product => (
                    <>
                        <p>الكود: {product.barcode}</p>
                        <p>الإسم: {product.name}</p>
                        <p className="my-1">السعر: <span className="font-bold">{parseFloat(product.price).toFixed()}$</span></p>
                        <p>المخزون: {product.stock}</p>
                        <button
                            className="bg-green-400 px-3 p-1 rounded-lg font-bold w-full my-5"
                            onClick={() => handleBuyingProcess(product)}
                        >بيع</button>
                        {/* Start Buying Process */}
                        {isBuyingFormVisible && (product.barcode === productToPay.barcode) && (
                            <BuyingProcess product={productToPay} />
                        )}
                        {/* End Buying Process */}
                    </>
                ))}
                {/* Start Buying Process */}
                {/* {isBuyingFormVisible && (
                    <BuyingProcess targetProduct={targetProduct} />
                )} */}
                {/* End Buying Process */}
                {(!targetProduct || !targetProducts) && error && (<p className="text-red-500">{error}</p>)}
            </div>
            {/* End Product Details */}
        </div>
    );
}

export default Buy;