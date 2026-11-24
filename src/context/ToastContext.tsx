import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookmarkIcon, CheckIcon, ExclamationTriangleIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/solid";

export type ToastType = 'success' | 'error' | 'bookmark' | 'cart';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

const TOAST_DURATION = 3200;
const MAX_TOASTS = 3;

const styles: Record<ToastType, { border: string; iconBg: string; iconColor: string }> = {
    success: { border: 'border-rose-500', iconBg: 'bg-rose-100', iconColor: 'text-rose-500' },
    bookmark: { border: 'border-rose-500', iconBg: 'bg-rose-100', iconColor: 'text-rose-500' },
    cart: { border: 'border-slate-700', iconBg: 'bg-slate-100', iconColor: 'text-slate-700' },
    error: { border: 'border-red-600', iconBg: 'bg-red-100', iconColor: 'text-red-600' }
};

const icons = {
    success: CheckIcon,
    bookmark: BookmarkIcon,
    cart: ShoppingCartIcon,
    error: ExclamationTriangleIcon
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const nextId = useRef(1);

    const dismiss = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = nextId.current++;
        setToasts(prev => [...prev, { id, message, type }].slice(-MAX_TOASTS));
        window.setTimeout(() => dismiss(id), TOAST_DURATION);
    }, [dismiss]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="fixed top-6 right-6 z-[80] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => {
                        const Icon = icons[toast.type];
                        const style = styles[toast.type];
                        return (
                            <motion.div
                                key={toast.id}
                                layout
                                initial={{ opacity: 0, x: 80 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 80 }}
                                transition={{ type: "spring", damping: 18, stiffness: 200, mass: 0.6 }}
                                className={`pointer-events-auto flex items-center gap-3 bg-white rounded-xl shadow-lg border-l-4 ${style.border} px-4 py-3 w-[calc(100vw-3rem)] max-w-sm`}
                            >
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${style.iconBg}`}>
                                    <Icon className={`w-5 h-5 ${style.iconColor}`} />
                                </div>
                                <p className="text-sm font-medium text-slate-800 flex-1">{toast.message}</p>
                                <button
                                    onClick={() => dismiss(toast.id)}
                                    className="p-1 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                                    aria-label="Dismiss"
                                >
                                    <XMarkIcon className="w-4 h-4 text-gray-500" />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
