import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import {
    MagnifyingGlassIcon,
    EyeIcon
} from "@heroicons/react/24/outline";

export const OrderManagement = () => {
    const { orders, updateOrder, deleteOrder } = useAdmin();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = orders.filter(order =>
        order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleStatusChange = (orderId: string, newStatus: string) => {
        updateOrder(orderId, { status: newStatus });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Order Management</h2>
                <p className="text-stone-600">Manage customer orders and track status</p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-700 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-700 rounded-full bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Order ID</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Items</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Total</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                        <AnimatePresence>
                            {filteredOrders.map((order, index) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="hover:bg-stone-50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-slate-800">#{order.id.slice(-6)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-stone-600">{order.userName}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-stone-600">
                                            {order.books.length} item{order.books.length !== 1 ? 's' : ''}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-rose-500">${order.total}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-stone-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <motion.button
                                                onClick={() => {/* View order details */}}
                                                className="p-2 rounded-full border-2 border-slate-700 text-slate-700 hover:bg-slate-100"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500">No orders found</p>
                        <p className="text-gray-400">No orders match your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};