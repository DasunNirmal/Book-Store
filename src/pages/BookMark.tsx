import {motion} from "framer-motion";
import {useSidebar} from "../components/SIdebarContext.tsx";
import {useBookmark} from "../components/providers/BookMarkProvider.tsx";
import {BookmarkCard} from "../components/BookMarkCard.tsx";

export const BookMark = () => {

    const { bookmarks } = useBookmark();
    const { open } = useSidebar();
    const sidebarWidth = open ? 240 : 80;

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='absolute top-0 right-0 p-8'
            >
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Your Bookmarked Books</h1>
                    <p className="text-stone-600 mb-8">{bookmarks.length} saved {bookmarks.length === 1 ? 'book' : 'books'}</p>

                    {bookmarks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm">
                            <p className="text-xl text-gray-500 mb-2">Your bookmark list is empty</p>
                            <p className="text-gray-400">Save books by clicking the bookmark icon</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookmarks.map((book) => (
                                <BookmarkCard
                                    key={book.title}
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    image={book.image}
                                    description={book.description}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <motion.div
                    className='h-[400px] relative p-8 top-[150px] bg-gradient-to-r from-stone-50 to-stone-300 text-[#3a3a3a] flex flex-col'>

                    <div className="flex flex-1 gap-16">
                        {/* Company Info */}
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-4 text-rose-500">Book Haven</h3>
                            <p className="mb-4">
                                Your one-stop destination for all your reading needs. We provide quality books with fast
                                delivery and excellent customer service.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-rose-500 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </a>
                                <a href="#" className="hover:text-rose-500 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                                    </svg>
                                </a>
                                <a href="#" className="hover:text-rose-500 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-rose-500 transition-colors">Home</a></li>
                                <li><a href="#" className="hover:text-rose-500 transition-colors">Shop</a></li>
                                <li><a href="#" className="hover:text-rose-500 transition-colors">New Arrivals</a></li>
                                <li><a href="#" className="hover:text-rose-500 transition-colors">Best Sellers</a></li>
                                <li><a href="#" className="hover:text-rose-500 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-rose-500 transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-rose-500 transition-colors">My Account</a></li>
                                <li><a href="#" className="hover:text-rose-500 transition-colors">Order Tracking</a></li>
                                <li><a href="#" className="hover:text-rose-500 transition-colors">Wishlist</a></li>
                                <li><a href="#" className="hover:text-rose-500 transition-colors">Shipping Policy</a></li>
                                <li><a href="#" className="hover:text-rose-500 transition-colors">Returns & Refunds</a></li>
                                <li><a href="#" className="hover:text-rose-500 transition-colors">FAQs</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    123 Book Street, Reading City
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                    </svg>
                                    +1 (555) 123-4567
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                    info@bookhaven.com
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-stone-400 pt-6 mt-6 text-center">
                        <p>&copy; {new Date().getFullYear()} Book Haven. All rights reserved.</p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}