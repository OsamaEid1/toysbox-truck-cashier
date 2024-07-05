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

export const getSalesSummary = (salesData) => {
    return countRepeatedSales(salesData);
};
export const getDiscountedSales = (salesData) => {
    const sales = salesData.filter((product) => product.discount === "نعم");
    return sales;
};

export const calculateTotalMoneyForSummary = (sales) => {
    const totalMoney = sales.reduce((total, sale) => {
        return total += sale.totalPrice;
    }, 0);
    return totalMoney;
};
export const calculateTotalMoneyForSalesHistory = (sales) => {
    const totalMoney = sales.reduce((total, sale) => {
        return total += sale.qty * sale.price;
    }, 0);
    return totalMoney;
};
export const calculateTotalMoneyForDiscountedSalesBeforeDiscount = (sales) => {
    const totalMoney = sales.reduce((total, sale) => {
        return total += sale.qty * sale.priceBeforeDiscount;
    }, 0);
    return totalMoney;
};

export const getTotalSoldPiecesForSummarySales = (sales) => {
    return sales.reduce((total, sale) => {
        return total += +sale.totalSoldQty;
    }, 0)
}
export const getTotalSoldPiecesForSalesHistory = (sales) => {
    return sales.reduce((total, sale) => {
        return total += +sale.qty;
    }, 0)
}
export const getTotalSoldPiecesForDiscountedSales = (sales) => {
    return sales.reduce((total, sale) => {
        return total += +sale.qty;
    }, 0)
}

export const createReportTextForSalesSummary = (salesInfo) => {
    const sales = salesInfo.sales;

    let text = `**تقرير بملخص المبيعات** \n`;
    sales.map((sale) => {
        text += `
        اسم المنتج: ${sale.name}
        الكود: ${sale.barcode}
        الكمية المُباعة: ${sale.totalSoldQty}
        عدد مرات البيع: ${sale.numOfRepeatSales}
        إجمالي المبلغ: $${sale.totalPrice}
        
        ------
        `;
    });

    text += `---------------------------------`;
    text += `\n\n إجمالي عدد الأصناف المُباعة: ${salesInfo.totalSoldItems}`;
    text += `\n إجمالي عدد القطع المُباعة: ${salesInfo.totalSoldPieces}`;
    text += `\n إجمالي مبلغ المبيعات: $${salesInfo.totalMoney.toLocaleString()}`;
    text += `\n هذا التقرير تم إصداره في ${new Date().toLocaleString()}`;
    
    return text;
};
export const createReportTextForSalesHistory = (salesInfo) => {
    const sales = salesInfo.sales;

    let text = `**تقرير بسجل عمليات البيع** \n`;
    sales.map((sale) => {
        text += `
        اسم المنتج: ${sale.name}
        الكود: ${sale.barcode}
        سعر القطعة: ${sale.price}
        الكمية المُباعة: ${sale.qty}
        هل يوجد خصم؟ ${sale.discount}
        تاريخ البيع: ${sale.date}

        ------
        `;
    });

    text += `---------------------------------`;
    text += `\n\n إجمالي مبلغ المبيعات: $${salesInfo.totalMoney.toLocaleString()}`;
    text += `\n هذا التقرير تم إصداره في ${new Date().toLocaleString()}`;
    
    return text;
};
export const createReportTextForDiscountedSales = (salesInfo) => {
    const sales = salesInfo.sales;

    let text = `**تقرير بعمليات البيع المُخفضة** \n`;
    sales.map((sale) => {
        text += `
        اسم المنتج: ${sale.name}
        الكود: ${sale.barcode}
        سعر القطعة قبل الخصم: ${sale.priceBeforeDiscount}
        سعر القطعة بعد الخصم: ${sale.price}
        الكمية المُباعة: ${sale.qty}
        تاريخ البيع: ${sale.date}
        ------
        `;
    });

    text += `---------------------------------`;
    text += `\n\n إجمالي عدد عمليات الخصم: ${salesInfo.totalDiscountsSales}`;
    text += `\n إجمالي مبلغ الخصم: $${salesInfo.totalDiscountsMoney.toLocaleString()}`;
    text += `\n من أصل إجمالي مبلغ $${salesInfo.totalMoney.toLocaleString()}`;
    text += `\n هذا التقرير تم إصداره في ${new Date().toLocaleString()}`;
    
    return text;
};

export const createSalesSummaryReport = (sales) => {
    const salesSummary = getSalesSummary(sales);
    const totalMoney = calculateTotalMoneyForSummary(salesSummary);
    const totalSoldPieces = getTotalSoldPiecesForSummarySales(salesSummary); // Number Of All Sold Products
    const totalSoldItems = salesSummary.length; // Number Of The Different Sold Items

    const salesInfo = {
        sales: salesSummary,
        totalMoney: totalMoney,
        totalSoldItems: totalSoldItems,
        totalSoldPieces: totalSoldPieces,
    };

    const text = createReportTextForSalesSummary(salesInfo);
    const name = "تقرير بملخص المبيعات";

    return { text, name };
};
export const createSalesHistoryReport = (sales) => {
    const totalMoney = calculateTotalMoneyForSalesHistory(sales);
    const totalSoldPieces = getTotalSoldPiecesForSalesHistory(sales);

    const salesInfo = {
        sales: sales,
        totalMoney: totalMoney,
        totalSoldPieces: totalSoldPieces,
    };

    const text = createReportTextForSalesHistory(salesInfo);
    const name = "تقرير بسجل عمليات البيع";

    return { text, name };
};
export const createDiscountedSalesReport = (sales) => {
        const DISCOUNT_PERCENTAGE = 0.1;

        const discountedSales = getDiscountedSales(sales);
        const totalMoney = calculateTotalMoneyForDiscountedSalesBeforeDiscount(discountedSales);
        const totalDiscountedSales = discountedSales.length;

        const salesInfo = {
            sales: discountedSales,
            totalMoney: totalMoney,
            totalDiscountsMoney: totalMoney * DISCOUNT_PERCENTAGE,
            totalDiscountsSales: totalDiscountedSales
        }

    const text = createReportTextForDiscountedSales(salesInfo);
    const name = "تقرير بعمليات البيع المُخفضة";

    return { text, name };
};

const encodeText = (text) => {
    const encoder = new TextEncoder();
    return encoder.encode(text);
}
export const exportReport = (reportText, reportName) => {
    const blob = new Blob([encodeText(reportText)], { type: 'text/plain' });
    // Create The Download Link And Download The File
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${reportName}.txt`;
    downloadLink.click();
    // Clean up the temporary URL after download (optional)
    URL.revokeObjectURL(downloadLink.href);
};