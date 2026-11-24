import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { User } from "../../services/DataServices";

interface UserFormProps {
    user?: User | null;
    onClose: () => void;
}

export const UserForm = ({ user, onClose }: UserFormProps) => {
    const { users, addUser, updateUser } = useAdmin();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: 'user' as 'user' | 'admin'
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                address: user.address || '',
                role: user.role
            });
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent duplicate emails
        const duplicate = users.some(
            u => u.email.toLowerCase() === formData.email.toLowerCase() && u.id !== user?.id
        );
        if (duplicate) {
            setError('A user with this email already exists');
            return;
        }

        if (user) {
            updateUser(user.id, formData);
        } else {
            addUser(formData);
        }
        onClose();
    };

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
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">
                            {user ? 'Edit User' : 'Add New User'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6 cursor-pointer text-gray-700" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-slate-700 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        setError('');
                                    }}
                                    className="w-full px-4 py-3 border-2 border-slate-700 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-slate-700 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Role *
                                </label>
                                <select
                                    required
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                                    className="w-full px-4 py-3 border-2 border-slate-700 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Address
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-slate-700 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-4 py-2">
                                {error}
                            </p>
                        )}

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-stone-200">
                            <motion.button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 border-2 border-slate-700 cursor-pointer text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                                whileTap={{ scale: 0.95 }}
                            >
                                Cancel
                            </motion.button>

                            <motion.button
                                type="submit"
                                className="px-6 py-3 bg-rose-500 text-white rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
                                whileTap={{ scale: 0.95 }}
                            >
                                {user ? 'Update User' : 'Add User'}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    );
};