import {AnimatePresence, motion} from "framer-motion";
import {useSidebar} from "../components/SIdebarContext.tsx";
import {useBookmark} from "../components/providers/BookMarkProvider.tsx";
import {BookmarkCard} from "../components/BookMarkCard.tsx";
import {Footer} from "../components/Footer.tsx";

export const BookMark = () => {

    const { bookmarks } = useBookmark();
    const { open, sidebarWidth } = useSidebar();

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='absolute top-16 lg:top-0 right-0 p-4 sm:p-6 lg:p-8'
            >
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Your Bookmarked Books</h1>
                    <p className="text-stone-600 mb-8">{bookmarks.length} saved {bookmarks.length === 1 ? 'book' : 'books'}</p>

                    {bookmarks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm text-center px-4">
                            <p className="text-xl text-gray-500 mb-2">Your bookmark list is empty</p>
                            <p className="text-gray-400">Save books by clicking the bookmark icon</p>
                        </motion.div>
                    ) : (
                        <div>
                            <AnimatePresence initial={false}>
                            {bookmarks.map((book) => (
                                <BookmarkCard
                                    key={book.title}
                                    id={book.id}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    image={book.image}
                                    description={book.description}
                                />
                            ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                <div className="mt-16">
                    <Footer />
                </div>
            </motion.div>
        </motion.div>
    );
}