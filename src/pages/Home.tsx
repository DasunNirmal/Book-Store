import {motion} from "framer-motion";
import {useSidebar} from "../components/SIdebarContext.tsx";
import {
    ArrowPathRoundedSquareIcon,
    BookmarkIcon,
    CheckBadgeIcon,
    ShieldCheckIcon,
    TruckIcon
} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/24/solid";
import {Link} from "react-router";

export const Home = () => {

    const {open} = useSidebar();
    const sidebarWidth = open ? 240 : 80;

    return (
        <>
            <motion.div
                initial={{width: `calc(100% - ${sidebarWidth}px)`}}
                animate={{width: `calc(100% - ${sidebarWidth}px)`}}
                transition={{type: "spring", stiffness: 100, delay: open ? 0 : 0.5}}
                className='h-[900px] absolute top-0 right-0 p-8'>

                <div className="relative flex items-center justify-center h-full w-full">
                    {/* 4 blobs around the h1 tag */}
                    <div
                        className="absolute -top-16 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-[#a5b4fc] opacity-60 blur-2xl animate-blob1 z-0 pointer-events-none"></div>
                    <div
                        className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-[#fbc2eb] opacity-60 blur-2xl animate-blob2 z-0 pointer-events-none"></div>
                    <div
                        className="absolute top-1/2 right-1/4 -translate-y-1/2 wS-36 h-36 rounded-full bg-[#fcb69f] opacity-50 blur-2xl animate-blob3 z-0 pointer-events-none"></div>
                    <div
                        className="absolute top-1/3 left-0 w-36 h-36 rounded-full bg-[#fdffb6] opacity-40 blur-2xl animate-blob5 z-0 pointer-events-none"></div>
                    <div className="relative flex flex-col items-center w-full mt-[-150px]">
                        {/* Two blobs directly behind h1 */}
                        <div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[320px] rounded-full bg-[#fbc2eb] opacity-60 blur-3xl z-0 pointer-events-none animate-behindBlob1"></div>
                        <div
                            className="absolute left-1/3 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#a5b4fc] opacity-40 blur-2xl z-0 pointer-events-none animate-behindBlob2"></div>
                        <h1 className="relative z-10 text-5xl font-bold text-[#3a3a3a] text-center drop-shadow-lg px-8 py-4">
                            Unleash Your Imagination<br/>
                            <span className="block mt-2">With Our Books</span>
                        </h1>
                    </div>
                    {/* Absolutely centered button at the bottom of the container */}
                    <div
                        className="absolute left-1/2 bottom-90 transform -translate-x-1/2 z-20 transition-all duration-300 rounded-full hover:rounded-xl active:rounded-2xl">
                        <Link to="/discover">
                            <button className="w-[200px] rounded-3xl border-2 border-dashed border-black bg-rose-500 px-6 py-3
                    font-semibold text-[#F4F5F6] cursor-pointer transition-all duration-300 hover:translate-x-[-4px]
                    hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px]
                    active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                                Shop Now <ArrowRightIcon className="w-6 h-6 inline ml-4"/>
                            </button>
                        </Link>
                    </div>
                </div>

                <div
                    className="bg-[url('assets/2.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute top-0"></div>
                <div
                    className="bg-[url('assets/1.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute bottom-0"></div>
                <div
                    className="bg-[url('assets/3.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute top-0 right-0"></div>
                <div
                    className="bg-[url('assets/4.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute bottom-0 right-0"></div>
                <div
                    className="bg-[url('assets/6.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute bottom-0 left-[370px]"></div>
                <div
                    className="bg-[url('assets/7.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute bottom-0 right-[750px]"></div>
                <div
                    className="bg-[url('assets/8.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute bottom-0 right-[285px]"></div>

            </motion.div>

            {/*second section*/}
            <motion.div
                initial={{width: `calc(100% - ${sidebarWidth}px)`}}
                animate={{width: `calc(100% - ${sidebarWidth}px)`}}
                transition={{type: "spring", stiffness: 100, delay: open ? 0 : 0.5}}
                className='h-[200px] absolute top-[928px] right-0 p-8 flex gap-16 justify-center items-center bg-[#fff]'>
                <div className="feature-card">
                    <TruckIcon className="size-[80px] text-rose-500 mx-auto"/>
                    <div className="feature-title">Fast Delivery</div>
                </div>
                <div className="feature-card">
                    <ShieldCheckIcon className="size-[80px] text-rose-500 mx-auto"/>
                    <div className="feature-title">Secure Payment</div>
                </div>
                <div className="feature-card">
                    <CheckBadgeIcon className="size-[80px] text-rose-500 mx-auto"/>
                    <div className="feature-title">Best Quality</div>
                </div>
                <div className="feature-card">
                    <ArrowPathRoundedSquareIcon className="size-[80px] text-rose-500 mx-auto"/>
                    <div className="feature-title">Return Guaranty</div>
                </div>
            </motion.div>

            {/* About Us section */}
            <motion.div
                initial={{width: `calc(100% - ${sidebarWidth}px)`}}
                animate={{width: `calc(100% - ${sidebarWidth}px)`}}
                transition={{type: "spring", stiffness: 100, delay: open ? 0 : 0.5}}
                className='h-[500px] absolute top-[1128px] right-0 p-8 flex flex-col gap-10 justify-start items-start'>
                <h2 className="text-3xl font-bold mb-4 text-[#3a3a3a] self-center">About Us</h2>
                <p className="max-w-2xl text-lg text-[#555] text-center mt-12 text-[24px]">
                    Welcome to our Online Book Store! We are passionate about connecting readers with their next great
                    adventure. Our curated selection offers something for everyone, from timeless classics to the latest
                    bestsellers. Enjoy fast delivery, secure payment, and a seamless shopping experience. Thank you for
                    choosing us as your trusted book destination!
                </p>
                <div
                    className="bg-[url('assets/Bookshop-bro.png')] bg-no-repeat bg-center bg-cover h-[475px] w-[478px] absolute bottom-0 right-[100px]"></div>
            </motion.div>

            {/*New Arrivals section*/}
            <motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='h-[550px] absolute top-[1628px] right-0 p-8 flex justify-center items-center'>

                <motion.div className='newArrival self-baseline grid grid-cols-4 justify-items-center content-center justify-center'>
                <h2 className="text-3xl absolute top-[15px] font-bold mt-9 text-[#3a3a3a]">New Arrivals</h2>

                    {/* Book 1 */}
                    <div className="relative w-[230px] h-[350px] mx-4 bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="h-[220px] bg-[url('https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"></div>
                        <div className="p-3">
                            <h3 className="font-semibold text-[#3a3a3a] truncate">The Silent Patient</h3>
                            <p className="text-sm text-stone-600">Alex Michaelides</p>
                            <span className="font-bold text-rose-500">$12.99</span>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex space-x-2">
                                    <button className="px-10 py-2 cursor-pointer rounded-full bg-slate-700 text-white text-sm hover:bg-slate-800 transition-all duration-300 hover:font-medium transform hover:scale-[1.02]">
                                        Add to Cart
                                    </button>
                                    <button className="p-2 cursor-pointer rounded-full bg-rose-500 text-white hover:bg-rose-700 transition-all duration-300 transform hover:scale-110">
                                        <BookmarkIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Book 2 */}
                    <div className="relative w-[230px] h-[350px] mx-4 bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="h-[220px] bg-[url('https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"></div>
                        <div className="p-3">
                            <h3 className="font-semibold text-[#3a3a3a] truncate">Educated</h3>
                            <p className="text-sm text-stone-600">Tara Westover</p>
                            <span className="font-bold text-rose-500">$14.99</span>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex space-x-2">
                                    <button className="px-10 py-2 cursor-pointer rounded-full bg-slate-700 hover:bg-slate-800 text-white text-sm transition-all duration-300 hover:font-medium transform hover:scale-[1.02]">
                                        Add to Cart
                                    </button>
                                    <button className="p-2 rounded-full cursor-pointer bg-rose-500 text-white hover:bg-rose-700 transition-all duration-300 transform hover:scale-110">
                                        <BookmarkIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Book 3 */}
                    <div className="relative w-[230px] h-[350px] mx-4 bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="h-[220px] bg-[url('https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"></div>
                        <div className="p-3">
                            <h3 className="font-semibold text-[#3a3a3a] truncate">The Midnight Library</h3>
                            <p className="text-sm text-stone-600">Matt Haig</p>
                            <span className="font-bold text-rose-500">$10.99</span>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex space-x-2">
                                    <button className="px-10 py-2 cursor-pointer rounded-full bg-slate-700 hover:bg-slate-800 text-white text-sm transition-all duration-300 hover:font-medium transform hover:scale-[1.02]">
                                        Add to Cart
                                    </button>
                                    <button className="p-2 cursor-pointer rounded-full bg-rose-500 text-white hover:bg-rose-700 transition-all duration-300 transform hover:scale-110">
                                        <BookmarkIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Book 4 */}
                    <div className="relative w-[230px] h-[350px] mx-4 bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="h-[220px] bg-[url('https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"></div>
                        <div className="p-3">
                            <h3 className="font-semibold text-[#3a3a3a] truncate">Atomic Habits</h3>
                            <p className="text-sm text-stone-600">James Clear</p>
                            <span className="font-bold text-rose-500">$11.49</span>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex space-x-2">
                                    <button className="px-10 py-2 cursor-pointer rounded-full bg-slate-700 hover:bg-slate-800 text-white text-sm transition-all duration-300 hover:font-medium transform hover:scale-[1.02]">
                                        Add to Cart
                                    </button>
                                    <button className="p-2 cursor-pointer rounded-full bg-rose-500 text-white hover:bg-rose-700 transition-all duration-300 transform hover:scale-110">
                                        <BookmarkIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Footer section */}
            <motion.div
                initial={{width: `calc(100% - ${sidebarWidth}px)`}}
                animate={{width: `calc(100% - ${sidebarWidth}px)`}}
                transition={{type: "spring", stiffness: 100, delay: open ? 0 : 0.5}}
                className='h-[400px] absolute top-[2178px] right-0 p-8 bg-gradient-to-r from-stone-50 to-stone-300 text-[#3a3a3a] flex flex-col'>

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
        </>
    );
}
