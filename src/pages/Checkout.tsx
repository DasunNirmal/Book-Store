import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useCart } from "../components/providers/CartProvider.tsx";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AuthModal } from "../components/AuthModel.tsx";
import dataService from "../services/DataServices.ts"; // Import the AuthModal

export const Checkout = () => {
    const { cartItems, closeCheckout, isCheckoutOpen, removeFromCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<string>("card");
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // State for auth modal
    const [user, setUser] = useState<any>(null); // State for user data
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
    const subtotal = cartItems.reduce(
        (sum, item) => sum + (Number(typeof item.price === 'string' ? item.price.replace('$', '') : item.price) * item.quantity),
        0
    );
    const shipping = 5.99;
    const total = subtotal + shipping;

    // Check if user is logged in on component mount
    useState(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    });

    const handlePayment = () => {
        if (!user) {
            // Show auth modal if user is not logged in
            setIsAuthModalOpen(true);
        } else {
            // User is logged in, proceed with payment
            processPayment();
        }
    };

    const handleAuthSuccess = (userData: any) => {
        setUser(userData);
        setIsAuthModalOpen(false);
        // Continue with payment after successful authentication
        processPayment();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const processPayment = () => {
        // Create order in DataService
        const order = dataService.createOrder({
            userId: user?.id || 'guest',
            userName: user?.name || 'Guest User',
            userEmail: user?.email || 'guest@example.com',
            items: cartItems.map(item => ({
                bookId: item.id || '',
                bookTitle: item.title,
                quantity: item.quantity,
                price: typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price
            })),
            shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}, ${formData.country}`
        });

        if (order) {
            alert('Order placed successfully!');
            // Clear cart here
            closeCheckout();
        } else {
            alert('Some items are out of stock!');
        }
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
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
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
                                <div className="w-full lg:w-1/2 bg-stone-50 p-8">
                                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Customer Information</h2>

                                    {/* Contact Information */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-slate-700 mb-4">Contact Information</h3>
                                        <input
                                            type="email"
                                            name="email"
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
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                placeholder="Postal Code"
                                                className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                            />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
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

                                            {paymentMethod === "card" && (
                                                <div className="p-4 border border-stone-300 rounded-lg bg-white space-y-3">
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        placeholder="Card Number"
                                                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                                    />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input
                                                            type="text"
                                                            name="expiry"
                                                            value={formData.expiry}
                                                            onChange={handleInputChange}
                                                            placeholder="MM/YY"
                                                            className="p-3 border border-stone-300 rounded-lg focus:ring-rose-500"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="cvv"
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
                                <div className="w-full lg:w-1/2 bg-stone-300 p-8">
                                    <div className="rounded-xl shadow-sm p-6 sticky top-20">
                                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h2>

                                        {/* Cart Items List */}
                                        <div className="overflow-y-auto mb-4">
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
                                                    <span className="font-medium grid items-center justify-center content-between">
                                                        ${(Number(typeof item.price === 'string' ? item.price.replace('$', '') : item.price) * item.quantity).toFixed(2)}
                                                        <button
                                                            onClick={() => removeFromCart(item.title)}
                                                            className="p-2 text-rose-500 cursor-pointer hover:text-rose-700"
                                                        >
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
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

                                        {/* User Status Indicator */}
                                        {user && (
                                            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                                                <p className="text-sm text-green-800">
                                                    ✅ Signed in as <strong>{user.name}</strong>
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
                                        {!user && (
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

            {/* Auth Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={handleAuthSuccess}
            />
        </>
    );
};