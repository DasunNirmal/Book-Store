import {motion} from "framer-motion";
import {BookmarkIcon} from "@heroicons/react/24/outline";
import {EyeIcon} from "@heroicons/react/16/solid";

interface BookCardProps {
    title: string;
    author: string;
    price: string | number;
    image: string;
}

export const BookCard = ({ title, author, price, image } : BookCardProps) => {
    return (
        <div className="relative w-full h-[430px] bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className={`h-[250px] bg-[url('${image}')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110`}></div>
            <div className="p-4">
                <h3 className="font-semibold text-lg text-slate-800 truncate">{title}</h3>
                <p className="text-sm text-stone-600 mt-1">{author}</p>
                <span className="font-bold text-rose-500 text-lg mt-2 block">{price}</span>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-3">
                        {/* Add to Cart Button */}
                        <motion.button className="px-6 py-2 cursor-pointer rounded-full bg-slate-700 hover:bg-slate-800 text-white text-sm transition-all duration-300 hover:font-medium transform hover:scale-[1.02]">
                            Add to Cart
                        </motion.button>

                        {/* View Icon Button */}
                        <motion.button
                            className="p-2.5 cursor-pointer rounded-full border-2 border-slate-700 text-slate-700 hover:bg-slate-100 transition-all duration-300 transform hover:scale-110"
                            whileHover={{ backgroundColor: "#f1f5f9" }}
                        >
                            <EyeIcon className="w-6 h-6" />
                        </motion.button>

                        {/* Bookmark Button */}
                        <motion.button className="p-2.5 cursor-pointer rounded-full bg-rose-500 text-white hover:bg-rose-700 transition-all duration-300 transform hover:scale-110">
                            <BookmarkIcon className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}