import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { Book } from "../services/DataServices.ts";
import { useCart } from "./providers/CartProvider.tsx";
import { useBookmark } from "./providers/BookMarkProvider.tsx";
import { formatPrice } from "../utils/format.ts";

export const NewArrivalCard = ({ book }: { book: Book }) => {
    const { addToCart } = useCart();
    const { toggleBookmark, isBookmarked } = useBookmark();

    const payload = {
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image,
        description: book.description
    };

    return (
        <div className="relative w-[230px] h-[350px] mx-4 bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div
                className="h-[220px] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${book.image}')` }}
            ></div>
            <div className="p-3">
                <h3 className="font-semibold text-[#3a3a3a] truncate">{book.title}</h3>
                <p className="text-sm text-stone-600">{book.author}</p>
                <span className="font-bold text-rose-500">{formatPrice(book.price)}</span>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => addToCart(payload)}
                            className="px-10 py-2 cursor-pointer rounded-full bg-slate-700 text-white text-sm hover:bg-slate-800 transition-all duration-300 hover:font-medium transform hover:scale-[1.02]">
                            Add to Cart
                        </button>
                        <button
                            onClick={() => toggleBookmark(payload)}
                            aria-label={isBookmarked(book.title) ? 'Remove bookmark' : 'Bookmark'}
                            className="p-2 cursor-pointer rounded-full bg-rose-500 text-white hover:bg-rose-700 transition-all duration-300 transform hover:scale-110">
                            {isBookmarked(book.title) ? <BookmarkSolidIcon className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
