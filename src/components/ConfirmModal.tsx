import { motion, AnimatePresence } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    error?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal = ({
                                 isOpen, title, message, confirmLabel = "Confirm", error, onConfirm, onCancel
                             }: ConfirmModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-[70]"
                        onClick={onCancel}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-[70] w-full max-w-md"
                    >
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ExclamationTriangleIcon className="w-8 h-8 text-rose-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
                            <p className="text-stone-600">{message}</p>

                            {error && (
                                <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-4 py-2 mt-4">
                                    {error}
                                </p>
                            )}

                            <div className="flex justify-center space-x-4 mt-8">
                                <motion.button
                                    onClick={onCancel}
                                    className="px-6 py-3 border-2 border-slate-700 cursor-pointer text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    onClick={onConfirm}
                                    className="px-6 py-3 bg-rose-500 text-white rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {confirmLabel}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};