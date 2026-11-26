import { motion } from "framer-motion";
import { useAdmin } from "../../context/AdminContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Order } from "../../services/DataServices";
import { OrderTracker } from "../OrderTracker";
import { OrderSummary } from "../OrderSummary";
import { formatDate } from "../../utils/format";
import { statusBadgeClass } from "../../utils/orderStatus";

interface OrderDetailsModalProps {
    orderId: string;
    onClose: () => void;
}

export const OrderDetailsModal = ({ orderId, onClose }: OrderDetailsModalProps) => {
    const { orders, books, updateOrder } = useAdmin();
    // Read from context so the modal stays live if the status changes
    const order = orders.find(o => o.id === orderId);

    if (!order) return null;

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-[calc(100%-2rem)] max-w-2xl max-h-[90dvh] overflow-y-auto"
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Order #{order.id.slice(-6)}</h2>
                            <p className="text-stone-600">
                                {order.userName}{order.userEmail ? ` · ${order.userEmail}` : ''} · {formatDate(order.createdAt)}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6 cursor-pointer text-gray-700" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Status */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Order status</span>
                            <select
                                value={order.status}
                                onChange={(e) => updateOrder(order.id, { status: e.target.value as Order['status'] })}
                                className={`text-sm px-3 py-1 rounded-full border cursor-pointer ${statusBadgeClass(order.status)}`}
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <OrderTracker status={order.status} />

                        <div className="border-t border-stone-200 pt-6">
                            <OrderSummary order={order} books={books} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end pt-6 mt-6 border-t border-stone-200">
                        <motion.button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border-2 border-slate-700 cursor-pointer text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            Close
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};
