import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Book, Order } from "../services/DataServices.ts";
import { formatPrice } from "../utils/format.ts";

interface OrderSummaryProps {
    order: Order;
    books: Book[];
}

export const OrderSummary = ({ order, books }: OrderSummaryProps) => {

    const subtotal = order.books.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Orders placed before shipping was saved: work it out from the total
    const shipping = order.shipping ?? Math.max(Math.round((order.total - subtotal) * 100) / 100, 0);

    return (
        <div className="space-y-6">
            {/* Items */}
            <div className="divide-y divide-stone-200">
                {order.books.map((item) => {
                    const book = books.find(b => b.id === item.bookId);
                    return (
                        <div key={item.bookId} className="flex items-center justify-between py-3">
                            <div className="flex items-center">
                                {book ? (
                                    <div
                                        className="w-12 h-16 rounded bg-cover bg-center mr-4 shadow-sm"
                                        style={{ backgroundImage: `url('${book.image}')` }}
                                    />
                                ) : (
                                    <div className="w-12 h-16 rounded bg-stone-100 flex items-center justify-center mr-4">
                                        <BookOpenIcon className="w-6 h-6 text-stone-400" />
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{item.title}</p>
                                    <p className="text-xs text-stone-500">
                                        Qty: {item.quantity} × {formatPrice(item.price)}
                                    </p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-slate-800">
                                {formatPrice(item.price * item.quantity)}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-stone-600">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>
                {shipping > 0 && (
                    <div className="flex justify-between">
                        <span className="text-stone-600">Shipping</span>
                        <span>{formatPrice(shipping)}</span>
                    </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t border-stone-200 pt-3">
                    <span>Total</span>
                    <span className="text-rose-500">{formatPrice(order.total)}</span>
                </div>
            </div>

            {/* Delivery + payment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-stone-100 rounded-lg">
                    <p className="text-xs font-medium text-stone-500 mb-1">Delivery address</p>
                    <p className="text-sm text-slate-800">{order.shippingAddress || '—'}</p>
                </div>
                <div className="p-3 bg-stone-100 rounded-lg">
                    <p className="text-xs font-medium text-stone-500 mb-1">Payment</p>
                    <p className="text-sm text-slate-800">
                        {order.paymentMethod === 'cash'
                            ? 'Cash on delivery'
                            : order.paymentMethod === 'card'
                                ? 'Credit / debit card'
                                : '—'}
                    </p>
                </div>
            </div>
        </div>
    );
};
