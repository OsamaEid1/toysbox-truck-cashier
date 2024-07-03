export const getProducts = async () => {
    try {
        const response = await fetch("db/products.json");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
export const getProductByBarcode = async (barcode) => {
    try {
        const response = await fetch("db/products.json");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        console.log(data);
        const product = data.find((product) => product.barcode === barcode);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
export const searchOnProductByName = (products, targetProductName) => {
    const matchingProducts = []
    products.forEach((product) => {
        const productName = product.name;
        if (productName.toLowerCase().includes(targetProductName.toLowerCase())) {
            matchingProducts.push(product)
        }
    });
    return matchingProducts;
};
export const searchOnProductByBarcode = (products, barcode) => {
    const targetProduct = products.find(product => product.barcode === barcode);
    if (targetProduct) return targetProduct;
    return false;
};
export const addNewSell = async (product) => {
    try {
        // Get sales
        let sales = localStorage.getItem("sales");
        if (sales) {
            sales = JSON.parse(sales);
            sales.push(product);
            // Save product data to localStorage
            localStorage.setItem('sales', JSON.stringify(sales));
        } else {
            // Save product data to localStorage
            localStorage.setItem('sales', JSON.stringify([product]));
        }
        return true;
    } catch (error) {
        console.error('Error while posting data:', error);
        return false;
    }
};

export const countRepeatedSales = (soldProducts) => {
    // Create a map to store the aggregated quantities
    const qtyMap = new Map();

    // Iterate through the products array
    for (const product of soldProducts) {
        const { barcode, qty, price } = product;

        // If the barcode is not in the map, initialize it with the current qty
        if (!qtyMap.has(barcode)) {
            qtyMap.set(barcode, { ...product, totalSoldQty: +qty, totalPrice: Math.ceil(price) * qty, numOfRepeatSales: 1 });
        } else {
            // Otherwise, update the existing entry
            const existingProduct = qtyMap.get(barcode);
            existingProduct.totalSoldQty += +qty;
            existingProduct.numOfRepeatSales++;
            existingProduct.totalPrice += Math.ceil(+price) * qty;
        }
    }

    // Convert the map values back to an array
    const summedProducts = Array.from(qtyMap.values());
    return summedProducts;
}
export const calculateTotalMoneyForSummary = (sales) => {
    let total = 0;
    sales.forEach(sale => {
        total += sale.totalPrice;
        console.log(sale);
    });
    return total;
};
export const calculateTotalMoneyForDetailedSales = (sales) => {
    let total = 0;
    sales.forEach(sale => {
        total += sale.qty * Math.ceil(sale.price);
    });
    return total;
};
export const calculateTotalMoneyForDiscountedSales = (sales) => {
    let total = 0;
    sales.forEach(sale => {
        total += sale.qty * Math.ceil(sale.price);
    });
    return total;
};
// export const postAllProductsWithUpdates = async (products) => {
//     try {
//         const response = await fetch("http://localhost:4000/sales", {
//             method: 'POST',
//             // mode: 'no-cors',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(products),
//         });
//         if (!response.ok) {
//             throw new Error(`Failed to Update Product Stock, And Status Is: ${response.statusText}`);
//         }
        
//         return true;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };

// export const updateProductStockInDB = async (barcode, newStock) => {
//     // Get All Products
//     const products = await getProducts();
//     // Update Product Stock
//     products.forEach((product) => {
//         if (product.barcode === barcode) {
//             product.stock = newStock;
//         }
//     });
//     console.log(products);
//     // Set Updated Products Data And Return Operation State
//     return postAllProductsWithUpdates(products);
// };
