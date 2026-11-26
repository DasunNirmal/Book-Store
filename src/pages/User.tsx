import { useEffect, useState } from "react";
import { useSidebar } from "../components/SIdebarContext.tsx";
import { motion } from "framer-motion";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";
import { Footer } from "../components/Footer.tsx";
import { useAuth } from "../context/AuthContext";
import { ConfirmModal } from "../components/ConfirmModal.tsx";
import { MyOrders } from "../components/MyOrders.tsx";
import { Link } from "react-router";

export const User = () => {
    const { open, sidebarWidth } = useSidebar();
    const { currentUser, openAuthModal, updateProfile, deleteAccount } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

    // Load the logged-in user's details into the form
    useEffect(() => {
        if (currentUser && !isEditing) {
            setFormData({
                name: currentUser.name,
                email: currentUser.email,
                phone: currentUser.phone || '',
                address: currentUser.address || ''
            });
        }
    }, [currentUser, isEditing]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const result = updateProfile(formData);
        if (!result.ok) {
            setError(result.message || 'Could not save changes');
            return;
        }
        setError('');
        setIsEditing(false);
    };

    const handleCancel = () => {
        setError('');
        setIsEditing(false);
    };

    const handleDeleteAccount = () => {
        const result = deleteAccount();
        if (!result.ok) {
            setDeleteError(result.message || 'Could not delete account');
            return;
        }
        setDeleteError('');
        setIsDeleteOpen(false);
    };

    const closeDeleteModal = () => {
        setDeleteError('');
        setIsDeleteOpen(false);
    };

    const fields = [
        { label: 'Full Name', name: 'name', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Phone Number', name: 'phone', type: 'tel' },
        { label: 'Address', name: 'address', type: 'text' },
    ] as const;

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='absolute top-16 lg:top-0 right-0 p-4 sm:p-6 lg:p-8'
            >
                <div className="max-w-4xl mx-auto mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 sm:mb-8">Account Settings</h1>

                    {!currentUser ? (
                        /* Signed-out state */
                        <div className="flex flex-col items-center justify-center h-80 bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                                <UserIcon className="w-8 h-8 text-rose-500" />
                            </div>
                            <p className="text-xl text-gray-500 mb-2">You're not signed in</p>
                            <p className="text-gray-400 mb-6">Sign in or create an account to manage your profile</p>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => openAuthModal()}
                                className="px-8 py-3 bg-rose-500 text-white rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
                            >
                                Sign In / Create Account
                            </motion.button>
                        </div>
                    ) : (
                        <>
                            {/* Profile Card */}
                            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Profile Information</h2>
                                    {!isEditing ? (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-rose-500 cursor-pointer text-white rounded-lg hover:bg-rose-600 transition-colors"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                            Edit Profile
                                        </motion.button>
                                    ) : (
                                        <div className="flex gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleSave}
                                                className="px-4 py-2 bg-rose-500 text-white cursor-pointer rounded-lg hover:bg-rose-600 transition-colors"
                                            >
                                                Save Changes
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleCancel}
                                                className="px-4 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                                            >
                                                Cancel
                                            </motion.button>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-4 py-2 mb-6">
                                        {error}
                                    </p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {fields.map(field => (
                                        <div key={field.name}>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">{field.label}</label>
                                            {isEditing ? (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="p-3 bg-stone-100 rounded-lg min-h-[48px]">
                                                    {formData[field.name] || '—'}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order history and tracking */}
                            <MyOrders userId={currentUser.id} />

                            {/* Admin shortcut */}
                            {currentUser.role === 'admin' && (
                                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                                            <ShieldCheckIcon className="w-6 h-6 text-rose-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-slate-700">Admin Dashboard</h3>
                                            <p className="text-sm text-stone-600">Manage books, users and orders.</p>
                                        </div>
                                    </div>
                                    <Link to="/admin">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-rose-500 text-white cursor-pointer rounded-lg hover:bg-rose-600 transition-colors"
                                        >
                                            Open Dashboard
                                        </motion.button>
                                    </Link>
                                </div>
                            )}

                            {/* Danger Zone */}
                            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-rose-100">
                                <h2 className="text-xl font-semibold text-slate-800 mb-4">Danger Zone</h2>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h3 className="font-medium text-slate-700">Delete Account</h3>
                                        <p className="text-sm text-stone-600">Once you delete your account, there is no going back.</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsDeleteOpen(true)}
                                        className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                        Delete Account
                                    </motion.button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <Footer/>
            </motion.div>

            <ConfirmModal
                isOpen={isDeleteOpen}
                title="Delete your account?"
                message="This will permanently remove your account. This action cannot be undone."
                confirmLabel="Yes, Delete"
                error={deleteError}
                onConfirm={handleDeleteAccount}
                onCancel={closeDeleteModal}
            />
        </motion.div>
    )
}