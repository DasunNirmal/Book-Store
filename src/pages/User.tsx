import { useState } from "react";
import {useSidebar} from "../components/SIdebarContext.tsx";
import {motion} from "framer-motion";
import {TrashIcon} from "@heroicons/react/24/solid";
import {PencilIcon} from "@heroicons/react/24/outline";
import {Footer} from "../components/Footer.tsx";

export const User = () => {
    const {open} = useSidebar();
    const sidebarWidth = open ? 240 : 80;
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Book Street, Library City"
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        //would typically call an API to save the changes
    };

    const handleDeleteAccount = () => {
        //account deletion logic here
        if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            console.log("Account deletion initiated");
        }
    };

    return (
        <>
            <motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='absolute top-0 right-0 p-8'
            >
                <div className="max-w-4xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-8">Account Settings</h1>

                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-slate-800">Profile Information</h2>
                            {!isEditing ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
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
                                        className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                                    >
                                        Save Changes
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
                                    >
                                        Cancel
                                    </motion.button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="p-3 bg-stone-100 rounded-lg">{userData.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="p-3 bg-stone-100 rounded-lg">{userData.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="p-3 bg-stone-100 rounded-lg">{userData.phone}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="address"
                                        value={userData.address}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="p-3 bg-stone-100 rounded-lg">{userData.address}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-100">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">Danger Zone</h2>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h3 className="font-medium text-slate-700">Delete Account</h3>
                                <p className="text-sm text-stone-600">Once you delete your account, there is no going back.</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDeleteAccount}
                                className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                            >
                                <TrashIcon className="w-5 h-5" />
                                Delete Account
                            </motion.button>
                        </div>
                    </div>
                </div>

                <Footer/>
            </motion.div>
        </>
  )
}