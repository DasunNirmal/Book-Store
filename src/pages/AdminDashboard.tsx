import { motion } from "framer-motion";
import { useSidebar } from "../components/SIdebarContext.tsx";
import { useState } from "react";
import {
    BookOpenIcon,
    UserGroupIcon,
    ShoppingCartIcon,
    ChartBarIcon
} from "@heroicons/react/24/outline";
import { BookManagement } from "../components/admin/BookManagement";
import { UserManagement } from "../components/admin/UserManagement";
import { OrderManagement } from "../components/admin/OrderManagement";
import { AdminStats } from "../components/admin/AdminStatus";

type AdminTab = 'dashboard' | 'books' | 'users' | 'orders';

export const AdminDashboard = () => {
    const { open } = useSidebar();
    const sidebarWidth = open ? 240 : 80;
    const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

    const tabs = [
        { id: 'dashboard' as AdminTab, name: 'Dashboard', icon: ChartBarIcon },
        { id: 'books' as AdminTab, name: 'Books', icon: BookOpenIcon },
        { id: 'users' as AdminTab, name: 'Users', icon: UserGroupIcon },
        { id: 'orders' as AdminTab, name: 'Orders', icon: ShoppingCartIcon },
    ];

    return (
        <motion.div
            initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
            animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
            transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
            className='min-h-screen absolute top-0 right-0 bg-gradient-to-br from-stone-50 to-stone-100'
        >
            {/* Admin Header */}
            <div className="bg-white shadow-sm border-b border-stone-200">
                <div className="px-8 py-6">
                    <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
                    <p className="text-stone-600 mt-2">Manage your bookstore efficiently</p>
                </div>

                {/* Tab Navigation */}
                <div className="px-8">
                    <div className="flex space-x-1">
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-6 py-3 rounded-t-lg text-sm font-medium transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-rose-500 text-white'
                                        : 'text-slate-700 hover:text-rose-500 hover:bg-rose-50'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <tab.icon className="w-5 h-5 mr-2" />
                                {tab.name}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
                {activeTab === 'dashboard' && <AdminStats />}
                {activeTab === 'books' && <BookManagement />}
                {activeTab === 'users' && <UserManagement />}
                {activeTab === 'orders' && <OrderManagement />}
            </div>
        </motion.div>
    );
};