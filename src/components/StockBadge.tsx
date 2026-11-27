// Same colours as the admin stock pills: green = plenty, yellow = running low, red = none left
export const LOW_STOCK_LIMIT = 10;

export const StockBadge = ({ stock }: { stock?: number }) => {
    if (stock === undefined) return null;

    if (stock <= 0) {
        return <span className="px-2 py-0.5 rounded-full text-xs whitespace-nowrap bg-red-100 text-red-800">Out of stock</span>;
    }
    if (stock <= LOW_STOCK_LIMIT) {
        return <span className="px-2 py-0.5 rounded-full text-xs whitespace-nowrap bg-yellow-100 text-yellow-800">Only {stock} in stock</span>;
    }
    return <span className="px-2 py-0.5 rounded-full text-xs whitespace-nowrap bg-green-100 text-green-800">In stock</span>;
};
