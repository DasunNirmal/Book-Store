import {motion} from "framer-motion";
import {Link} from "react-router";
import {
    ArrowPathRoundedSquareIcon,
    CheckBadgeIcon,
    ShieldCheckIcon,
    TruckIcon
} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/24/solid";
import {useAdmin} from "../context/AdminContext";
import {Footer} from "../components/Footer.tsx";
import {NewArrivalCard} from "../components/NewArrivalCard.tsx";

// Mobile version of the home page: one column, swipeable strips, no absolute positioning
const covers = [
    "bg-[url('assets/2.png')]",
    "bg-[url('assets/1.png')]",
    "bg-[url('assets/3.png')]",
    "bg-[url('assets/4.png')]",
    "bg-[url('assets/6.png')]",
    "bg-[url('assets/7.png')]",
    "bg-[url('assets/8.png')]",
];

const features = [
    {icon: TruckIcon, title: "Fast Delivery"},
    {icon: ShieldCheckIcon, title: "Secure Payment"},
    {icon: CheckBadgeIcon, title: "Best Quality"},
    {icon: ArrowPathRoundedSquareIcon, title: "Return Guaranty"},
];

export const HomeMobile = () => {
    const {books} = useAdmin();
    // The four most recently added books
    const newArrivals = [...books].slice(-4).reverse();

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="pt-16">

            {/* Hero */}
            <section className="relative overflow-hidden px-6 pt-16 pb-14 text-center">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-[#a5b4fc] opacity-60 blur-2xl animate-blob1 pointer-events-none"></div>
                <div className="absolute bottom-0 left-1/4 w-40 h-40 rounded-full bg-[#fbc2eb] opacity-60 blur-2xl animate-blob2 pointer-events-none"></div>
                <div className="absolute top-1/2 right-0 w-36 h-36 rounded-full bg-[#fcb69f] opacity-50 blur-2xl animate-blob3 pointer-events-none"></div>
                <div className="absolute top-1/3 left-0 w-36 h-36 rounded-full bg-[#fdffb6] opacity-40 blur-2xl animate-blob5 pointer-events-none"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[240px] rounded-full bg-[#fbc2eb] opacity-60 blur-3xl pointer-events-none animate-behindBlob1"></div>

                <h1 className="relative z-10 text-4xl font-bold text-[#3a3a3a] drop-shadow-lg leading-tight">
                    Unleash Your Imagination
                    <span className="block mt-2">With Our Books</span>
                </h1>

                <Link to="/discover" className="relative z-20 inline-block mt-10 rounded-full">
                    <button className="w-[200px] rounded-3xl border-2 border-dashed border-black bg-rose-500 px-6 py-3
                        font-semibold text-[#F4F5F6] cursor-pointer transition-all duration-300
                        active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none shadow-[4px_4px_0px_black]">
                        Shop Now <ArrowRightIcon className="w-6 h-6 inline ml-4"/>
                    </button>
                </Link>
            </section>

            {/* Swipeable cover strip */}
            <section className="pb-6">
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-2 [scrollbar-width:none]">
                    {covers.map((cover) => (
                        <div
                            key={cover}
                            className={`${cover} shrink-0 snap-center bg-no-repeat bg-center bg-cover w-44 h-44 rounded-2xl shadow-md`}
                        ></div>
                    ))}
                </div>
            </section>

            {/* Why shop with us */}
            <section className="bg-white px-4 py-8">
                <div className="grid grid-cols-2 gap-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="flex flex-col items-center text-center p-4 rounded-[18px] border-[3px] border-dotted border-[#eab308] bg-[#F4F5F6] shadow-sm"
                        >
                            <feature.icon className="size-14 text-rose-500"/>
                            <div className="mt-3 font-semibold text-[#3a3a3a]">{feature.title}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About */}
            <section className="px-6 py-10 text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#3a3a3a]">About Us</h2>
                <p className="text-lg text-[#555]">
                    Welcome to our Online Book Store! We are passionate about connecting readers with their next great
                    adventure. Our curated selection offers something for everyone, from timeless classics to the latest
                    bestsellers. Enjoy fast delivery, secure payment, and a seamless shopping experience. Thank you for
                    choosing us as your trusted book destination!
                </p>
                <div className="bg-[url('assets/Bookshop-bro.png')] bg-no-repeat bg-center bg-contain h-64 w-full mt-6"></div>
            </section>

            {/* New arrivals: swipe sideways */}
            <section className="px-4 pb-10">
                <div className="rounded-[18px] border-[3px] border-dotted border-[#eab308] bg-[#efeff3] shadow-sm py-6">
                    <h2 className="text-3xl font-bold text-center text-[#3a3a3a] mb-6">New Arrivals</h2>
                    {newArrivals.length === 0 ? (
                        <p className="text-center text-stone-600 px-4">New books will show up here.</p>
                    ) : (
                        <div className="flex overflow-x-auto snap-x snap-mandatory px-2 pb-4 [scrollbar-width:none]">
                            {newArrivals.map((book) => (
                                <div key={book.id} className="snap-center shrink-0">
                                    <NewArrivalCard book={book}/>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer/>
        </motion.div>
    );
};
