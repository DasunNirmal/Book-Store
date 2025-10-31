import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import {
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
    UserIcon
} from "@heroicons/react/24/outline";

export const UserManagement = () => {
    const { users, updateUser, deleteUser } = useAdmin();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRoleChange = (userId: string, newRole: 'user' | 'admin') => {
        updateUser(userId, { role: newRole });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
                <p className="text-stone-600">Manage user accounts and permissions</p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-700 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-700 rounded-full bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Role</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Joined</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                        <AnimatePresence>
                            {filteredUsers.map((user, index) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="hover:bg-stone-50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                                                <UserIcon className="w-5 h-5 text-rose-500" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-slate-800">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-stone-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value as 'user' | 'admin')}
                                            className={`text-sm px-3 py-1 rounded-full border ${
                                                user.role === 'admin'
                                                    ? 'bg-rose-100 text-rose-800 border-rose-200'
                                                    : 'bg-blue-100 text-blue-800 border-blue-200'
                                            }`}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-stone-600">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <motion.button
                                                onClick={() => {/* Edit functionality */}}
                                                className="p-2 rounded-full border-2 border-slate-700 text-slate-700 hover:bg-slate-100"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </motion.button>

                                            <motion.button
                                                onClick={() => deleteUser(user.id)}
                                                disabled={user.role === 'admin'} // Prevent deleting admin
                                                className={`p-2 rounded-full ${
                                                    user.role === 'admin'
                                                        ? 'bg-gray-300 cursor-not-allowed'
                                                        : 'bg-rose-500 hover:bg-rose-700'
                                                } text-white`}
                                                whileHover={{ scale: user.role !== 'admin' ? 1.1 : 1 }}
                                                whileTap={{ scale: user.role !== 'admin' ? 0.9 : 1 }}
                                            >
                                                <TrashIcon className="w-4 h-4" />
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
                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500">No users found</p>
                        <p className="text-gray-400">No users match your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};