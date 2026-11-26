import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useCart } from "../components/providers/CartProvider.tsx";
import { CheckCircleIcon, CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import dataService, { Order, User } from "../services/DataServices.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useToast } from "../context/ToastContext.tsx";
import { formatPrice } from "../utils/format.ts";

const SHIPPING_FEE = 5.99;

export const Checkout = () => {
    const { cartItems, closeCheckout, isCheckoutOpen, removeFromCart, clearCart } = useCart();
    const { currentUser, openAuthModal } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>("card");
    const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        city: '',
        country: '',
        state: '',
        postalCode: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        nameOnCard: ''
    });

    const countries = ["United States", "Canada", "United Kingdom", "Australia"];
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cartItems.length > 0 ? SHIPPING_FEE : 0;
    const total = subtotal + shipping;

    // Pre-fill the form with the signed-in user's details (never overwrite what they typed)
    useEffect(() => {
        if (!currentUser) return;
        setFormData(prev => ({
            ...prev,
            email: prev.email || currentUser.email,
            firstName: prev.firstName || currentUser.name.split(' ')[0] || '',
            lastName: prev.lastName || currentUser.name.split(' ').slice(1).join(' '),
            phone: prev.phone || currentUser.phone || '',
            address: prev.address || currentUser.address || ''
        }));
    }, [currentUser]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePayment = () => {
        if (cartItems.length === 0) {
            showToast('Your cart is empty', 'error');
            return;
        }
        if (!formData.address.trim() || !formData.city.trim() || !formData.country || !formData.postalCode.trim()) {
            showToast('Please fill in your address, city, country and postal code', 'error');
            return;
        }

        if (!currentUser) {
            // After signing in, continue with the payment automatically
            openAuthModal((signedInUser) => processPayment(signedInUser));
        } else {
            processPayment(currentUser);
        }
    };

    const processPayment = (buyer: User) => {
        const shippingAddress = [
            formData.address,
            formData.city,
            `${formData.state} ${formData.postalCode}`.trim(),
            formData.country
        ].filter(part => part && part.trim()).join(', ');

        const order = dataService.createOrder({
            userId: buyer.id,
            userName: buyer.name,
            userEmail: buyer.email,
            items: cartItems.map(item => ({
                bookId: item.id || '',
                bookTitle: item.title,
                quantity: item.quantity,
                price: item.price
            })),
            shippingAddress,
            shipping,
            paymentMethod
        });

        if (order) {
            clearCart();
            closeCheckout();
            setFormData(prev => ({ ...prev, cardNumber: '', expiry: '', cvv: '', nameOnCard: '' }));
            setPlacedOrder(order);
        } else {
            showToast('Some items are out of stock. Please review your cart.', 'error');
        }
    };

    const goTo = (path: string) => {
        setPlacedOrder(null);
        navigate(path);
    };

    return (
        <>
            <AnimatePresence>
                {isCheckoutOpen && (
                    <>
                        {/* Blurred Background */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeCheckout}
                            className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40"
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
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[92dvh] overflow-y-auto"
                        >
                            <div className="flex flex-col lg:flex-row h-full">

                                {/* Close Button */}
                                <button
                                    onClick={closeCheckout}
                                    className="absolute top-4 right-4 p-2 rounded-full cursor-pointer bg-stone-300 hover:bg-stone-100 transition-colors z-10"
                                >
                                    <XMarkIcon className="w-6 h-6 text-gray-700" />
                                </button>

                                {/* Left Side - Customer Details */}
                                <div className="w-full lg:w-1/2 bg-stone-50 p-4 pt-6 sm:p-8">
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 pr-12">Customer Information</h2>

                                    {/* Contact Information */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-slate-700 mb-4">Contact Information</h3>
                                        <input
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            inputMode="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
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
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="First Name"
                                                className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                            />
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="Last Name"
                                                className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            placeholder="Company (Optional)"
                                            className="w-full p-3 border border-stone-300 rounded-lg mb-4 focus:ring-rose-500"
                                        />
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Address"
                                            className="w-full p-3 border border-stone-300 rounded-lg mb-4 focus:ring-rose-500"
                                        />
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="City"
                                            className="w-full p-3 border border-stone-300 rounded-lg mb-4 focus:ring-rose-500"
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div className="relative">
                                                <select
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
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
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                placeholder="State / Province"
                                                className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                            />
                                            <input
                                                type="text"
                                                name="postalCode"
                                                autoComplete="postal-code"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                placeholder="Postal Code"
                                                className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                            />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            autoComplete="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
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
                                                <span className="font-medium text-rose-500">{formatPrice(SHIPPING_FEE)}</span>
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

                                            {paymentMethod === "card" && (
                                                <div className="p-4 border border-stone-300 rounded-lg bg-white space-y-3">
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        inputMode="numeric"
                                                        autoComplete="cc-number"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        placeholder="Card Number"
                                                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                                    />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input
                                                            type="text"
                                                            name="expiry"
                                                            inputMode="numeric"
                                                            autoComplete="cc-exp"
                                                            value={formData.expiry}
                                                            onChange={handleInputChange}
                                                            placeholder="MM/YY"
                                                            className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="cvv"
                                                            inputMode="numeric"
                                                            autoComplete="cc-csc"
                                                            value={formData.cvv}
                                                            onChange={handleInputChange}
                                                            placeholder="CVV"
                                                            className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="nameOnCard"
                                                        value={formData.nameOnCard}
                                                        onChange={handleInputChange}
                                                        placeholder="Name on Card"
                                                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                                    />
                                                </div>
                                            )}

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

                                {/* Right Side - Order Summary */}
                                <div className="w-full lg:w-1/2 bg-stone-300 p-4 sm:p-8">
                                    <div className="rounded-xl shadow-sm p-2 sm:p-6 lg:sticky lg:top-20">
                                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">Order Summary</h2>

                                        {/* Cart Items List */}
                                        <div className="overflow-y-auto mb-4">
                                            <AnimatePresence initial={false}>
                                            {cartItems.map(item => (
                                                <motion.div
                                                    key={item.title}
                                                    layout
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0, x: -60, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex justify-between py-2 border-b border-stone-100 overflow-hidden">
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
                                                    <span className="font-medium grid items-center justify-center content-between">
                                                        {formatPrice(item.price * item.quantity)}
                                                        <button
                                                            onClick={() => removeFromCart(item.title)}
                                                            className="p-2 text-rose-500 cursor-pointer hover:text-rose-700"
                                                        >
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
                                                    </span>
                                                </motion.div>
                                            ))}
                                            </AnimatePresence>
                                        </div>

                                        {/* Totals */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between">
                                                <span className="text-stone-600">Subtotal</span>
                                                <span>{formatPrice(subtotal)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-stone-600">Shipping</span>
                                                <span>{formatPrice(shipping)}</span>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div className="border-t border-stone-200 pt-3 mb-6">
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Total</span>
                                                <span className="text-rose-500">{formatPrice(total)}</span>
                                            </div>
                                        </div>

                                        {/* User Status Indicator */}
                                        {currentUser && (
                                            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                                                <p className="flex items-center gap-2 text-sm text-green-800">
                                                    <CheckCircleIcon className="w-5 h-5 shrink-0" />
                                                    <span>Signed in as <strong>{currentUser.name}</strong></span>
                                                </p>
                                            </div>
                                        )}

                                        {/* Payment Button */}
                                        <motion.button
                                            onClick={handlePayment}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full py-3 rounded-full text-white cursor-pointer font-medium ${paymentMethod === "card" ? "bg-rose-500 hover:bg-rose-600" : "bg-slate-700 hover:bg-slate-800"}`}
                                        >
                                            {paymentMethod === "card" ? "Pay Now" : "Place Order"}
                                        </motion.button>

                                        {/* Sign In Prompt for Guest Users */}
                                        {!currentUser && (
                                            <p className="text-sm text-stone-600 text-center mt-3">
                                                You'll need to create an account to complete your purchase
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Order placed confirmation */}
            <AnimatePresence>
                {placedOrder && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-[65]"
                            onClick={() => setPlacedOrder(null)}
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-[65] w-[calc(100%-2rem)] max-w-md"
                        >
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckIcon className="w-8 h-8 text-rose-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Order placed!</h2>
                                <p className="text-stone-600">
                                    Thank you! Your order <span className="font-semibold text-slate-800">#{placedOrder.id.slice(-6)}</span> for{' '}
                                    <span className="font-semibold text-rose-500">{formatPrice(placedOrder.total)}</span> is confirmed.
                                    You can follow its progress under My Orders in your account.
                                </p>

                                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                                    <motion.button
                                        onClick={() => goTo('/discover')}
                                        className="px-6 py-3 border-2 border-slate-700 cursor-pointer text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Keep Shopping
                                    </motion.button>
                                    <motion.button
                                        onClick={() => goTo('/user')}
                                        className="px-6 py-3 bg-rose-500 text-white rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View My Orders
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
