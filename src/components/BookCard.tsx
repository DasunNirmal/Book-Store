import { motion, AnimatePresence } from "framer-motion";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { createPortal } from "react-dom";
import {useBookmark} from "./providers/BookMarkProvider.tsx";
import {useCart} from "./providers/CartProvider.tsx";
import {formatPrice} from "../utils/format.ts";

interface BookCardProps {
    id?: string;
    title: string;
    author: string;
    price: number;
    image: string;
    description?: string; // Add description for the modal
}

export const BookCard = ({ id, title, author, price, image, description = "This book explores fascinating concepts..." }: BookCardProps) => {

    const [isViewOpen, setIsViewOpen] = useState(false);
    const { toggleBookmark, isBookmarked } = useBookmark();
    const isBooked = isBookmarked(title);
    const { addToCart, buyNow } = useCart();

    const handleBookmark = () => {
        toggleBookmark({ id, title, author, price, image, description });
    };

    // Just pass the book data, CartProvider handles stock checking
    const handleAddToCart = () => {
        addToCart({ id, title, author, price, image, description });
    };

    const handleBuyNow = () => {
        buyNow({ id, title, author, price, image, description });
    };

    return (
        <>
            {/* Book Card */}
            {/* Mobile: compact horizontal card. Desktop: tall vertical card. */}
            <div className="relative w-full flex lg:block lg:h-[430px] bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl lg:hover:-translate-y-2">
                <div className="w-24 sm:w-28 shrink-0 self-stretch lg:w-full lg:h-[250px] overflow-hidden">
                    <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url('${image}')` }}
                    ></div>
                </div>
                <div className="p-3 lg:p-4 flex-1 min-w-0">
                    <h3 className="font-semibold text-base lg:text-lg text-slate-800 line-clamp-2 lg:truncate">{title}</h3>
                    <p className="text-sm text-stone-600 mt-1 truncate">{author}</p>
                    <span className="font-bold text-rose-500 text-lg mt-1 lg:mt-2 block">{formatPrice(price)}</span>

                    <div className="flex justify-between items-center mt-3 lg:mt-4">
                        <div className="flex w-full lg:w-auto gap-2 lg:gap-0 lg:space-x-3">
                            {/* Add to Cart Button */}
                            <motion.button
                                className="flex-1 lg:flex-none px-3 lg:px-6 py-2 cursor-pointer rounded-full text-white text-sm whitespace-nowrap"
                                style={{ backgroundColor: "#334155" }}
                                whileHover={{
                                    backgroundColor: "#1e293b",
                                    scale: 1.02,
                                    fontWeight: 500
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </motion.button>

                            {/* View Icon Button */}
                            <motion.button
                                className="p-2 lg:p-2.5 shrink-0 cursor-pointer rounded-full border-2 border-slate-700 text-slate-700"
                                whileHover={{
                                    backgroundColor: "#f1f5f9",
                                    scale: 1.1
                                }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsViewOpen(true)}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <EyeIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                            </motion.button>

                            {/* Bookmark Button */}
                            <motion.button
                                className="p-2 lg:p-2.5 shrink-0 cursor-pointer rounded-full text-white"
                                style={{ backgroundColor: "#f43f5e" }}
                                whileHover={{
                                    backgroundColor: "#be123c",
                                    scale: 1.1
                                }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={handleBookmark}
                            >
                                {isBooked ? <BookmarkSolidIcon className="w-5 h-5 lg:w-6 lg:h-6" /> : <BookmarkIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Book Details Modal */}
            {createPortal(
            <AnimatePresence>  {/*animate an element just before it will be removed (unmounted) from the DOM tree*/}
                {isViewOpen && (
                    <>
                        {/* Blurred Background */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0  bg-opacity-50 backdrop-blur-sm z-50"
                            onClick={() => setIsViewOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{
                                type: "spring",
                                damping: 18,
                                stiffness: 200, // Adjust this for speed (higher = faster)
                                mass: 0.6       // Adjust this for weight (higher = slower)
                        }} className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[90dvh] overflow-y-auto"
                        >
                            <div className="p-4 sm:p-6">
                                {/* Grab handle (mobile) */}
                                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-stone-300 lg:hidden" />

                                {/* Close Button */}
                                <button
                                    onClick={() => setIsViewOpen(false)}
                                    className="absolute top-4 right-4 p-2 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <XMarkIcon className="w-6 h-6 text-gray-700" />
                                </button>

                                {/* Book Content */}
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Book Cover */}
                                    <div className="w-full md:w-1/3 shadow-lg rounded-xl">
                                        <div
                                            className="h-56 md:h-80 rounded-xl shadow-md bg-cover bg-center"
                                            style={{ backgroundImage: `url('${image}')` }}
                                        ></div>
                                    </div>

                                    {/* Book Details */}
                                    <div className="w-full md:w-2/3">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">{title}</h2>
                                        <p className="text-lg text-rose-500 mt-2">by {author}</p>
                                        <span className="text-2xl font-bold text-rose-500 block mt-4">{formatPrice(price)}</span>

                                        <div className="mt-6">
                                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Description</h3>
                                            <p className="text-gray-600">{description}</p>
                                        </div>

                                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                            <motion.button
                                                className="w-full sm:w-auto px-8 py-3 rounded-full cursor-pointer bg-slate-700 text-white hover:bg-slate-800 transition-colors"
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleAddToCart}
                                            >
                                                Add to Cart
                                            </motion.button>
                                            <motion.button
                                                className="w-full sm:w-auto px-8 py-3 rounded-full border-2 cursor-pointer border-rose-700 text-slate-700 hover:bg-rose-500 hover:font-bold hover:text-white transition-colors"
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleBuyNow}
                                            >
                                                Buy Now
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>,
            document.body
            )}
        </>
    );
};