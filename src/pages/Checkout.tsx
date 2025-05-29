import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {useCart} from "../components/providers/CartProvider.tsx";
import {XMarkIcon} from "@heroicons/react/24/solid";

export const Checkout = () => {

    const { cartItems, closeCheckout, isCheckoutOpen } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<string>("card");

    const countries = ["United States", "Canada", "United Kingdom", "Australia"];
    const subtotal = cartItems.reduce(
        (sum, item) => sum + (Number(typeof item.price === 'string' ? item.price.replace('$', '') : item.price) * item.quantity),
        0
    );
    const shipping = 5.99;
    const total = subtotal + shipping;

    return (
        <AnimatePresence>
            {isCheckoutOpen && (
                <>
                    {/* Blurred Background */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCheckout}
                        className="fixed inset-0  bg-opacity-50 backdrop-blur-sm z-40"
                    />

                    {/* Checkout Modal */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 18,
                            stiffness: 200,
                            mass: 0.6
                        }}
                        className="fixed bottom-0 left-0 right-0  rounded-t-3xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex flex-col lg:flex-row h-full">

                            {/* Close Button */}
                            <button
                                onClick={closeCheckout}
                                className="absolute top-4 right-4 p-2 rounded-full cursor-pointer bg-stone-300 hover:bg-stone-100 transition-colors"
                            >
                                <XMarkIcon className="w-6 h-6 text-gray-700" />
                            </button>


                            {/* Left Side - Customer Details (stone-50) */}
                            <div className="w-full lg:w-1/2 bg-stone-50 p-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Customer Information</h2>

                                {/* Contact Information */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Contact Information</h3>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Shipping Information */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Shipping Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Company (Optional)"
                                        className="w-full p-3 border border-stone-300 rounded-lg mb-4 focus:ring-rose-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="w-full p-3 border border-stone-300 rounded-lg mb-4 focus:ring-rose-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="w-full p-3 border border-stone-300 rounded-lg mb-4 focus:ring-rose-500"
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div className="relative">
                                            <select
                                                className="w-full p-3 border border-stone-300 rounded-lg appearance-none focus:ring-rose-500"
                                            >
                                                <option value="">Country</option>
                                                {countries.map(country => (
                                                    <option key={country} value={country}>{country}</option>
                                                ))}
                                            </select>
                                            <ChevronDownIcon className="w-5 h-5 absolute right-3 top-3.5 text-stone-500" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="State / Province"
                                            className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Postal Code"
                                            className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                        />
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                    />
                                </div>

                                {/* Shipping Method */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Shipping Method</h3>
                                    <div className="p-4 border border-stone-300 rounded-lg bg-white">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-700">Standard Shipping</span>
                                            <span className="font-medium text-rose-500">$5.99</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Payment Method</h3>
                                    <div className="space-y-3">
                                        <div
                                            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === "card" ? "border-rose-500 bg-rose-50" : "border-stone-300"}`}
                                            onClick={() => setPaymentMethod("card")}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border-2 mr-3 ${paymentMethod === "card" ? "bg-rose-500 border-rose-500" : "border-stone-400"}`}></div>
                                                <span className="font-medium">Credit/Debit Card</span>
                                            </div>
                                        </div>
                                        <div
                                            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === "cash" ? "border-rose-500 bg-rose-50" : "border-stone-300"}`}
                                            onClick={() => setPaymentMethod("cash")}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-5 h-5 rounded-full border-2 mr-3 ${paymentMethod === "cash" ? "bg-rose-500 border-rose-500" : "border-stone-400"}`}></div>
                                                <span className="font-medium">Cash on Delivery</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Order Summary (stone-300) */}
                            <div className="w-full lg:w-1/2 bg-stone-300 p-8">
                                <div className="rounded-xl shadow-sm p-6 sticky top-20">
                                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h2>

                                    {/* Cart Items List */}
                                    <div className="max-h-[200px] overflow-y-auto mb-4">
                                        {cartItems.map(item => (
                                            <div key={item.title} className="flex justify-between py-2 border-b border-stone-100">
                                                <div className="flex items-center">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-18 h-20 object-cover rounded mr-3"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium">{item.title}</p>
                                                        <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <span className="font-medium">
                                                    ${(Number(typeof item.price === 'string' ? item.price.replace('$', '') : item.price) * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totals */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-stone-600">Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-stone-600">Shipping</span>
                                            <span>${shipping.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="border-t border-stone-200 pt-3 mb-6">
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span className="text-rose-500">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Payment Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-3 rounded-full text-white font-medium ${paymentMethod === "card" ? "bg-rose-500 hover:bg-rose-600" : "bg-slate-700 hover:bg-slate-800"}`}
                                    >
                                        {paymentMethod === "card" ? "Pay Now" : "Place Order"}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};