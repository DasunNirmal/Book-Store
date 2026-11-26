import {AnimatePresence, motion} from "framer-motion";
import {useSidebar} from "../components/SIdebarContext.tsx";
import {useCart} from "../components/providers/CartProvider.tsx";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {MinusIcon, PlusIcon} from "@heroicons/react/24/outline";
import {Footer} from "../components/Footer.tsx";
import {formatPrice} from "../utils/format.ts";

export const Cart = () => {

    const { open, sidebarWidth } = useSidebar();
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const { openCheckout } = useCart();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='absolute top-16 lg:top-0 right-0 p-4 sm:p-6 lg:p-8'
            >
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 lg:mb-8">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-500 text-xl mb-35 flex items-center justify-center h-64 bg-white rounded-xl shadow-sm">
                        Your cart is empty
                    </motion.p>
                ) : (
                    <>
                        {/* Mobile: one card per book */}
                        <div className="lg:hidden">
                            <AnimatePresence initial={false}>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.title}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -80, height: 0, marginBottom: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex gap-3 bg-white rounded-xl shadow-md p-3 mb-4 overflow-hidden"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-20 h-28 object-cover rounded shrink-0"
                                        />
                                        <div className="flex-1 min-w-0 flex flex-col">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <h3 className="font-semibold text-slate-800 line-clamp-2">{item.title}</h3>
                                                    <p className="text-sm text-stone-600 truncate">{item.author}</p>
                                                </div>
                                                <motion.button
                                                    whileTap={{ scale: 0.85 }}
                                                    onClick={() => removeFromCart(item.title)}
                                                    aria-label={`Remove ${item.title}`}
                                                    className="p-2 -mr-1 -mt-1 rounded-full text-rose-500 active:bg-rose-100 cursor-pointer shrink-0"
                                                >
                                                    <XMarkIcon className="w-5 h-5" />
                                                </motion.button>
                                            </div>

                                            <span className="text-rose-500 font-medium mt-1">{formatPrice(item.price)}</span>

                                            <div className="mt-auto pt-2 flex items-center justify-between">
                                                <div className="flex items-center rounded-full border-2 border-slate-700">
                                                    <motion.button
                                                        whileTap={{ scale: 0.85 }}
                                                        onClick={() => updateQuantity(item.title, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        aria-label="Decrease quantity"
                                                        className="p-2 rounded-full cursor-pointer disabled:opacity-40"
                                                    >
                                                        <MinusIcon className="w-4 h-4 text-slate-700" />
                                                    </motion.button>
                                                    <span className="w-7 text-center text-sm">{item.quantity}</span>
                                                    <motion.button
                                                        whileTap={{ scale: 0.85 }}
                                                        onClick={() => updateQuantity(item.title, item.quantity + 1)}
                                                        aria-label="Increase quantity"
                                                        className="p-2 rounded-full cursor-pointer"
                                                    >
                                                        <PlusIcon className="w-4 h-4 text-slate-700" />
                                                    </motion.button>
                                                </div>
                                                <span className="font-bold text-slate-800">
                                                    {formatPrice(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Desktop: table */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                <tr className="border-b-2 border-slate-800">
                                    <th className="text-left py-4 text-slate-700">Book</th>
                                    <th className="text-left py-4 text-slate-700">Price</th>
                                    <th className="text-left py-4 text-slate-700">Quantity</th>
                                    <th className="text-left py-4 text-slate-700">Total</th>
                                    <th className="text-left py-4 text-slate-700">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <AnimatePresence initial={false}>
                                {cartItems.map((item, index) => (
                                    <motion.tr
                                        key={item.title}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-slate-800">
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-25 h-28 object-cover rounded mr-4"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-slate-800">{item.title}</h3>
                                                    <p className="text-sm text-stone-600">{item.author}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-rose-500 font-medium">{formatPrice(item.price)}</td>
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => updateQuantity(item.title, item.quantity - 1)}
                                                    className="p-1 rounded-full hover:bg-slate-100"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <MinusIcon className="w-4 h-4 text-slate-700 cursor-pointer" />
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.title, item.quantity + 1)}
                                                    className="p-1 rounded-full hover:bg-slate-100"
                                                >
                                                    <PlusIcon className="w-4 h-4 text-slate-700 cursor-pointer" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-4 text-rose-500 font-medium">
                                            {formatPrice(item.price * item.quantity)}
                                        </td>
                                        <td className="py-4">
                                            <button
                                                onClick={() => removeFromCart(item.title)}
                                                className="p-2 rounded-full hover:bg-rose-100 text-rose-500 cursor-pointer"
                                            >
                                                <XMarkIcon className="w-5 h-5 cursor-pointer" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                                </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        {/* Subtotal and Checkout */}
                        <div className="mt-6 lg:mt-8 lg:border-t border-slate-200 lg:pt-6">
                            <div className="flex justify-end">
                                <div className="w-full lg:w-64 bg-white lg:bg-transparent rounded-xl shadow-md lg:shadow-none p-4 lg:p-0">
                                    <div className="flex justify-between mb-4">
                                        <span className="text-slate-700">Subtotal:</span>
                                        <span className="text-rose-500 font-bold">{formatPrice(subtotal)}</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 bg-rose-500 text-white rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
                                        onClick={openCheckout}
                                    >
                                        Proceed to Checkout
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="mt-12 lg:mt-0">
                    <Footer />
                </div>
            </motion.div>
        </motion.div>
    );
}
