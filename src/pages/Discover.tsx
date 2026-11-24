import {motion} from "framer-motion";
import {useSidebar} from "../components/SIdebarContext.tsx";
import {CheckIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {BookCard} from "../components/BookCard.tsx";
import {Footer} from "../components/Footer.tsx";
import {useAdmin} from "../context/AdminContext";

export const Discover = () => {

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchInput, setSearchInput] = useState("");
    const [query, setQuery] = useState("");
    const { open } = useSidebar();
    const sidebarWidth = open ? 240 : 80;
    const { books } = useAdmin();

    const bookCategories = [
        "Fiction",
        "Mystery",
        "Science Fiction",
        "Fantasy",
        "Romance",
        "Biography",
        "History",
        "Self-Help",
        "Business",
        "Technology"
    ];

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const normalizedQuery = query.trim().toLowerCase();

    const filteredBooks = books.filter(book => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(book.category);
        const matchesQuery = !normalizedQuery ||
            [book.title, book.author, book.category].some(field => field.toLowerCase().includes(normalizedQuery));
        return matchesCategory && matchesQuery;
    });

    const hasActiveFilters = selectedCategories.length > 0 || normalizedQuery !== "";

    const applySearch = () => setQuery(searchInput);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        // Clearing the box shows every book again
        if (e.target.value === "") setQuery("");
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSearchInput("");
        setQuery("");
    };

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='absolute top-0 right-0'>

                {/*Search Bar*/}
                <div className="relative top-0 z-50 w-full py-4 px-8">
                    <div className="relative w-full max-w-md mx-auto">
                        <motion.div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                            animate={{ scale: isInputFocused ? 1.2 : 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                            <MagnifyingGlassIcon className="h-6 w-6 text-slate-700" />
                        </motion.div>

                        <input
                            type="text"
                            className="block w-full pl-10 pr-24 py-3 border-2 border-slate-700 rounded-full bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="Search books, authors, genres..."
                            value={searchInput}
                            onChange={handleSearchChange}
                            onKeyDown={(e) => { if (e.key === 'Enter') applySearch(); }}
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                        />

                        <motion.button
                            onClick={applySearch}
                            transition={{ type: "spring", stiffness: 300 }}
                            whileTap={{ scale: 0.95, boxShadow: "0 0 8px rgba(0,0,0,0.2)" }}
                            className="absolute cursor-pointer inset-y-0 right-[-100px] flex items-center px-4 bg-rose-500 text-white rounded-full hover:bg-rose-700 transition-colors mr-1 active:bg-rose-800">
                            Search
                        </motion.button>

                    </div>
                </div>

                {/*categories*/}
                <div className="p-8">
                    <h2 className="text-2xl font-semibold text-slate-700 mb-6">Browse Categories</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {bookCategories.map((category) => (
                            <motion.div
                                key={category}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center space-x-3 cursor-pointer"
                                onClick={() => toggleCategory(category)}
                            >
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors 
                                    ${selectedCategories.includes(category)
                                    ? 'bg-rose-500 border-rose-500'
                                    : 'border-slate-700'}`}
                                >
                                    {selectedCategories.includes(category) && (
                                        <CheckIcon className="w-4 h-4 text-white" />
                                    )}
                                </div>
                                <span className="text-slate-700">{category}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Books Grid Section */}
                <div className="p-8 pt-0">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-slate-700">Featured Books</h2>
                        {hasActiveFilters && (
                            <div className="flex items-center gap-4">
                                <span className="text-stone-600">
                                    {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
                                </span>
                                <button
                                    onClick={clearFilters}
                                    className="text-rose-500 hover:text-rose-600 font-medium cursor-pointer"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                        {filteredBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                author={book.author}
                                price={book.price}
                                image={book.image}
                                description={book.description}
                            />
                        ))}
                    </div>
                    {filteredBooks.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl text-stone-600">
                                {hasActiveFilters ? 'No books match your search' : 'No books available yet'}
                            </p>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 px-6 py-3 bg-rose-500 text-white rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer section */}
                <Footer />
            </motion.div>
        </motion.div>
    );
}