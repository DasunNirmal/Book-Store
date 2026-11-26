import {useBookmark} from "./providers/BookMarkProvider.tsx";
import {AnimatePresence, motion} from "framer-motion";
import { TrashIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { createPortal } from "react-dom";
import {useCart} from "./providers/CartProvider.tsx";
import {formatPrice} from "../utils/format.ts";

interface BookmarkCardProps {
    id?: string;
    title: string;
    author: string;
    price: number;
    image: string;
    description?: string;
}

export const BookmarkCard = ({ id, title, author, price, image, description = "No description available" }: BookmarkCardProps) => {

    const { removeBookmark } = useBookmark();
    const [isViewOpen, setIsViewOpen] = useState(false);
    const { addToCart, buyNow } = useCart();

    return (
        <>
            {/* Table-style Bookmark Card */}
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -80, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-white rounded-xl shadow-md overflow-hidden mb-4 sm:mb-6 hover:shadow-xl"
                whileHover={{ y: -2 }}
            >
                <div className="flex flex-row">
                    {/* Book Cover */}
                    <div className="w-28 sm:w-36 md:w-1/4 shrink-0 min-h-[10rem]">
                        <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${image}')` }}
                        ></div>
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 min-w-0 md:w-3/4 p-3 md:p-4 flex flex-col">
                        <div className="flex-grow">
                            <h3 className="text-lg md:text-xl font-bold text-slate-800 line-clamp-2">{title}</h3>
                            <p className="text-sm text-stone-600 mt-1">by {author}</p>
                            <span className="font-bold text-rose-500 text-lg mt-2 block">{formatPrice(price)}</span>
                            <p className="text-gray-600 mt-2 md:mt-3 line-clamp-2 text-sm md:text-base">{description}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 mt-3 md:mt-4">
                            {/* View Button */}
                            <motion.button
                                className="p-2 rounded-full cursor-pointer border-2 border-slate-700 text-slate-700 hover:bg-slate-100"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => setIsViewOpen(true)}
                            >
                                <EyeIcon className="w-5 h-5" />
                            </motion.button>

                            {/* Delete Button */}
                            <motion.button
                                className="p-2 rounded-full cursor-pointer bg-rose-500 text-white hover:bg-rose-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => removeBookmark(title)}
                            >
                                <TrashIcon className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {createPortal(
            <AnimatePresence>
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
                            }} className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[90dvh] overflow-y-auto m-0"
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
                                                onClick={() => addToCart({ id, title, author, price, image, description })}
                                            >
                                                Add to Cart
                                            </motion.button>
                                            <motion.button
                                                className="w-full sm:w-auto px-8 py-3 rounded-full border-2 cursor-pointer border-rose-700 text-slate-700 hover:bg-rose-500 hover:font-bold hover:text-white transition-colors"
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => buyNow({ id, title, author, price, image, description })}
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