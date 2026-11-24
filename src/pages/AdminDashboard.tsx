import { motion } from "framer-motion";
import { useState } from "react";
import {
    BookOpenIcon,
    UserGroupIcon,
    ShoppingCartIcon,
    ChartBarIcon,
    ArrowLeftIcon,
    LockClosedIcon
} from "@heroicons/react/24/outline";
import { BookManagement } from "../components/admin/BookManagement";
import { UserManagement } from "../components/admin/UserManagement";
import { OrderManagement } from "../components/admin/OrderManagement";
import { AdminStats } from "../components/admin/AdminStatus";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

type AdminTab = 'dashboard' | 'books' | 'users' | 'orders';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

    const tabs = [
        { id: 'dashboard' as AdminTab, name: 'Dashboard', icon: ChartBarIcon },
        { id: 'books' as AdminTab, name: 'Books', icon: BookOpenIcon },
        { id: 'users' as AdminTab, name: 'Users', icon: UserGroupIcon },
        { id: 'orders' as AdminTab, name: 'Orders', icon: ShoppingCartIcon },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className='min-h-screen w-full bg-gradient-to-br from-stone-50 to-stone-100'
        >
            {/* Admin Header */}
            <div className="bg-white shadow-sm border-b border-stone-200">
                <div className="px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
                            <p className="text-stone-600 mt-2">Manage your bookstore efficiently</p>
                        </div>
                        <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm font-medium">
                            Admin Mode
                        </span>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="px-8">
                    <div className="flex items-center space-x-1">

                        {/* Admin Tabs */}
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex cursor-pointer items-center px-6 py-3 rounded-t-lg text-sm font-medium transition-all ${
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

                        {/* Back to Store Button */}
                        <Link to="/">
                            <motion.button
                                className="flex items-center cursor-pointer px-4 py-3 mr-4 text-slate-700 hover:text-rose-500 transition-colors rounded-t-lg hover:bg-rose-50"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                Back to Store
                            </motion.button>
                        </Link>
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

// Only signed-in admins can see the dashboard and must be a admin
export const AdminDashboard = () => {
    const { currentUser, openAuthModal } = useAuth();

    if (currentUser?.role === 'admin') {
        return <AdminPanel />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className='min-h-screen w-full bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center p-8'
        >
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LockClosedIcon className="w-8 h-8 text-rose-500" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Admin access only</h1>
                <p className="text-stone-600">
                    {currentUser
                        ? "Your account doesn't have admin permissions. Sign in with an admin account to continue."
                        : 'Sign in with an admin account to manage the bookstore.'}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <Link to="/">
                        <motion.button
                            className="flex items-center justify-center w-full cursor-pointer px-6 py-3 border-2 border-slate-700 text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Back to Store
                        </motion.button>
                    </Link>
                    <motion.button
                        onClick={() => openAuthModal()}
                        className="px-6 py-3 bg-rose-500 text-white rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        {currentUser ? 'Switch Account' : 'Sign In'}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};
