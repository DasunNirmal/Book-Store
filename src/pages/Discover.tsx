import {motion} from "framer-motion";
import {useSidebar} from "../components/SIdebarContext.tsx";
import {CheckIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {BookCard} from "../components/BookCard.tsx";
import {Footer} from "../components/Footer.tsx";

export const Discover = () => {

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const { open } = useSidebar();
    const sidebarWidth = open ? 240 : 80;

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
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                        />

                        <motion.button
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
                    <h2 className="text-2xl font-semibold text-slate-700 mb-6">Featured Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                        {/* Row 1 */}
                        <BookCard
                            title="Atomic Habits"
                            author="James Clear"
                            price="$11.49"
                            image="https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="The Silent Patient"
                            author="Alex Michaelides"
                            price="$12.99"
                            image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="Educated"
                            author="Tara Westover"
                            price="$14.99"
                            image="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="The Midnight Library"
                            author="Matt Haig"
                            price="$10.99"
                            image="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="Dune"
                            author="Frank Herbert"
                            price="$13.99"
                            image="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />

                        {/* Row 2 */}
                        <BookCard
                            title="Project Hail Mary"
                            author="Andy Weir"
                            price="$15.49"
                            image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="Where the Crawdads Sing"
                            author="Delia Owens"
                            price="$12.29"
                            image="https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="The Alchemist"
                            author="Paulo Coelho"
                            price="$9.99"
                            image="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="Sapiens"
                            author="Yuval Noah Harari"
                            price="$16.99"
                            image="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="The Psychology of Money"
                            author="Morgan Housel"
                            price="$14.49"
                            image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />

                        {/* Row 3 */}
                        <BookCard
                            title="1984"
                            author="George Orwell"
                            price="$8.99"
                            image="https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="The Great Gatsby"
                            author="F. Scott Fitzgerald"
                            price="$7.99"
                            image="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="To Kill a Mockingbird"
                            author="Harper Lee"
                            price="$10.49"
                            image="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="The Hobbit"
                            author="J.R.R. Tolkien"
                            price="$11.99"
                            image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                        <BookCard
                            title="Pride and Prejudice"
                            author="Jane Austen"
                            price="$6.99"
                            image="https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        />
                    </div>
                </div>

                {/* Footer section */}
                <Footer />
            </motion.div>
        </motion.div>
    );
}