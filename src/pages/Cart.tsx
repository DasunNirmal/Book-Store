import {motion} from "framer-motion";
import {useSidebar} from "../components/SIdebarContext.tsx";
import {useCart} from "../components/providers/CartProvider.tsx";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {MinusIcon, PlusIcon} from "@heroicons/react/24/outline";
import {Footer} from "../components/Footer.tsx";

export const Cart = () => {

    const { open } = useSidebar();
    const sidebarWidth = open ? 240 : 80;
    const { cartItems, removeFromCart, updateQuantity } = useCart(); // Assuming similar context to bookmarks

    const subtotal = cartItems.reduce(
        (sum, item) => sum + (Number(typeof item.price === 'string' ? item.price.replace('$', '') : item.price) * item.quantity),
        0
    );

    return (
        <motion.div
            initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
            animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
            transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
            className='absolute top-0 right-0 p-8'
        >
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-xl mb-35 flex items-center justify-center h-64 bg-white rounded-xl shadow-sm">Your cart is empty</p>
            ) : (
                <>
                    {/* Cart Items Table */}
                    <div className="overflow-x-auto">
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
                            {cartItems.map((item) => (
                                <tr key={item.title} className="border-b border-slate-800">
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
                                    <td className="py-4 text-rose-500 font-medium">{item.price}</td>
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
                                        ${(Number(typeof item.price === 'string' ? item.price.replace('$', '') : item.price) * item.quantity).toFixed(2)}
                                    </td>
                                    <td className="py-4">
                                        <button
                                            onClick={() => removeFromCart(item.title)}
                                            className="p-2 rounded-full hover:bg-rose-100 text-rose-500 cursor-pointer"
                                        >
                                            <XMarkIcon className="w-5 h-5 cursor-pointer" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Subtotal and Checkout */}
                    <div className="mt-8 border-t border-slate-200 pt-6">
                        <div className="flex justify-end">
                            <div className="w-64">
                                <div className="flex justify-between mb-4">
                                    <span className="text-slate-700">Subtotal:</span>
                                    <span className="text-rose-500 font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 bg-rose-500 text-white rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
                                >
                                    Proceed to Checkout
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Footer />
        </motion.div>
    );
}