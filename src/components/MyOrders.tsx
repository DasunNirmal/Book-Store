import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router";
import { ChevronDownIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useAdmin } from "../context/AdminContext";
import { OrderTracker } from "./OrderTracker";
import { OrderSummary } from "./OrderSummary";
import { formatDate, formatPrice } from "../utils/format";
import { statusBadgeClass, statusLabel } from "../utils/orderStatus";

export const MyOrders = ({ userId }: { userId: string }) => {
    // Orders come from the shared context, so a status change made by the admin shows up here live
    const { orders, books } = useAdmin();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const myOrders = orders
        .filter(order => order.userId === userId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">My Orders</h2>
                <span className="text-stone-600">
                    {myOrders.length} {myOrders.length === 1 ? 'order' : 'orders'}
                </span>
            </div>

            {myOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                        <ShoppingBagIcon className="w-8 h-8 text-rose-500" />
                    </div>
                    <p className="text-xl text-gray-500 mb-2">You haven't placed any orders yet</p>
                    <p className="text-gray-400 mb-6">Orders you place will show up here so you can follow them.</p>
                    <Link to="/discover">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-3 bg-rose-500 text-white rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
                        >
                            Browse Books
                        </motion.button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {myOrders.map(order => {
                        const isExpanded = expandedId === order.id;
                        const itemCount = order.books.reduce((sum, item) => sum + item.quantity, 0);

                        return (
                            <motion.div
                                key={order.id}
                                layout
                                className="border-2 border-stone-200 rounded-xl p-3 sm:p-5"
                            >
                                {/* Order header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Order #{order.id.slice(-6)}</h3>
                                        <p className="text-sm text-stone-600">
                                            Placed on {formatDate(order.createdAt)} · {itemCount} {itemCount === 1 ? 'item' : 'items'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`inline-block px-3 py-1 text-sm rounded-full ${statusBadgeClass(order.status)}`}>
                                            {statusLabel(order.status)}
                                        </span>
                                        <span className="text-lg font-bold text-rose-500">{formatPrice(order.total)}</span>
                                    </div>
                                </div>

                                {/* Progress */}
                                <OrderTracker status={order.status} />

                                {/* Details toggle */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                                    className="flex items-center gap-1 mt-6 text-rose-500 hover:text-rose-600 font-medium cursor-pointer"
                                >
                                    {isExpanded ? 'Hide details' : 'View details'}
                                    <ChevronDownIcon className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ type: "spring", damping: 18, stiffness: 200, mass: 0.6 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-6 mt-4 border-t border-stone-200">
                                                <OrderSummary order={order} books={books} />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
