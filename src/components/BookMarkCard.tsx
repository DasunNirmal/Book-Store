import {useBookmark} from "./BookMarkProvider.tsx";
import {AnimatePresence, motion} from "framer-motion";
import { TrashIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface BookmarkCardProps {
    title: string;
    author: string;
    price: string | number;
    image: string;
    description?: string;
}

export const BookmarkCard = ({ title, author, price, image, description = "No description available" }: BookmarkCardProps) => {
    const { removeBookmark } = useBookmark();
    const [isViewOpen, setIsViewOpen] = useState(false);

    return (
        <>
            {/* Table-style Bookmark Card */}
            <motion.div
                className="w-full bg-white rounded-xl shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                whileHover={{ y: -2 }}
            >
                <div className="flex flex-col md:flex-row">
                    {/* Book Cover */}
                    <div className="w-full md:w-1/4 h-48 md:h-auto">
                        <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${image}')` }}
                        ></div>
                    </div>

                    {/* Book Details */}
                    <div className="w-full md:w-3/4 p-4 flex flex-col">
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                            <p className="text-sm text-stone-600 mt-1">by {author}</p>
                            <span className="font-bold text-rose-500 text-lg mt-2 block">{price}</span>
                            <p className="text-gray-600 mt-3 line-clamp-2">{description}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 mt-4">
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
                            }} className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto m-0"
                        >
                            <div className="p-6">
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
                                            className="h-64 md:h-80 rounded-xl shadow-md bg-cover bg-center"
                                            style={{ backgroundImage: `url('${image}')` }}
                                        ></div>
                                    </div>

                                    {/* Book Details */}
                                    <div className="w-full md:w-2/3">
                                        <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
                                        <p className="text-lg text-rose-500 mt-2">by {author}</p>
                                        <span className="text-2xl font-bold text-rose-500 block mt-4">{price}</span>

                                        <div className="mt-6">
                                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Description</h3>
                                            <p className="text-gray-600">{description}</p>
                                        </div>

                                        <div className="mt-8 flex flex-wrap gap-4">
                                            <motion.button
                                                className="px-8 py-3 rounded-full cursor-pointer bg-slate-700 text-white hover:bg-slate-800 transition-colors"
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Add to Cart
                                            </motion.button>
                                            <motion.button
                                                className="px-8 py-3 rounded-full border-2 cursor-pointer border-rose-700 text-slate-700 hover:bg-rose-500 hover:font-bold hover:text-white transition-colors"
                                                whileTap={{ scale: 0.95 }}
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
            </AnimatePresence>
        </>
    );
};