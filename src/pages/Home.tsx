import {motion} from "framer-motion";
import {useSidebar} from "../components/SIdebarContext.tsx";
import {ArrowPathRoundedSquareIcon, CheckBadgeIcon, ShieldCheckIcon, TruckIcon} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/24/solid";

export const Home = () => {

    const { open } = useSidebar();
    const sidebarWidth = open ? 240 : 80;

    return (
        <>
            <motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='h-[900px] absolute top-0 right-0 p-8'>

                <div className="relative flex items-center justify-center h-full w-full">
                  {/* 4 blobs around the h1 tag */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-[#a5b4fc] opacity-60 blur-2xl animate-blob1 z-0 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-[#fbc2eb] opacity-60 blur-2xl animate-blob2 z-0 pointer-events-none"></div>
                  <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-36 h-36 rounded-full bg-[#fcb69f] opacity-50 blur-2xl animate-blob3 z-0 pointer-events-none"></div>
                  <div className="absolute top-1/3 left-0 w-36 h-36 rounded-full bg-[#fdffb6] opacity-40 blur-2xl animate-blob5 z-0 pointer-events-none"></div>
                  <div className="relative flex flex-col items-center w-full mt-[-150px]">
                      {/* Two blobs directly behind h1 */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[320px] rounded-full bg-[#fbc2eb] opacity-60 blur-3xl z-0 pointer-events-none animate-behindBlob1"></div>
                    <div className="absolute left-1/3 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#a5b4fc] opacity-40 blur-2xl z-0 pointer-events-none animate-behindBlob2"></div>
                    <h1 className="relative z-10 text-5xl font-bold text-[#3a3a3a] text-center drop-shadow-lg px-8 py-4">
                      Unleash Your Imagination<br/>
                      <span className="block mt-2">With Our Books</span>
                    </h1>
                  </div>
                  {/* Absolutely centered button at the bottom of the container */}
                  <div className="absolute left-1/2 bottom-90 transform -translate-x-1/2 z-20 transition-all duration-300 rounded-full hover:rounded-xl active:rounded-2xl">
                    <button className="w-[200px] rounded-3xl border-2 border-dashed border-black bg-rose-500 px-6 py-3
                    font-semibold text-[#F4F5F6] cursor-pointer transition-all duration-300 hover:translate-x-[-4px]
                    hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px]
                    active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                      Shop Now <ArrowRightIcon className="w-6 h-6 inline ml-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-[url('assets/2.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute top-0"></div>
                <div className="bg-[url('assets/1.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute bottom-0"></div>
                <div className="bg-[url('assets/3.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute top-0 right-0"></div>
                <div className="bg-[url('assets/4.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute bottom-0 right-0"></div>
                <div className="bg-[url('assets/6.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute bottom-0 left-[370px]"></div>
                <div className="bg-[url('assets/7.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute bottom-0 right-[750px]"></div>
                <div className="bg-[url('assets/8.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px] absolute bottom-0 right-[285px]"></div>

            </motion.div>

            {/*second section*/}
            <motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='h-[200px] absolute top-[928px] right-0 p-8 flex gap-16 justify-center items-center bg-[#fff]'>
                <div className="feature-card">
                    <TruckIcon className="size-[80px] text-rose-500 mx-auto" />
                    <div className="feature-title">Fast Delivery</div>
                </div>
                <div className="feature-card">
                    <ShieldCheckIcon className="size-[80px] text-rose-500 mx-auto" />
                    <div className="feature-title">Secure Payment</div>
                </div>
                <div className="feature-card">
                    <CheckBadgeIcon className="size-[80px] text-rose-500 mx-auto" />
                    <div className="feature-title">Best Quality</div>
                </div>
                <div className="feature-card">
                    <ArrowPathRoundedSquareIcon className="size-[80px] text-rose-500 mx-auto" />
                    <div className="feature-title">Return Guaranty</div>
                </div>
            </motion.div>

            {/* About Us section */}
            <motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='h-[200px] absolute top-[1128px] right-0 p-8 flex gap-16 justify-center items-center border-2 border-amber-600'>
                <h2 className="text-3xl font-bold mb-4 text-[#3a3a3a]">About Us</h2>
                <p className="max-w-2xl text-lg text-[#555] text-center">
                    Welcome to our Online Book Store! We are passionate about connecting readers with their next great adventure. Our curated selection offers something for everyone, from timeless classics to the latest bestsellers. Enjoy fast delivery, secure payment, and a seamless shopping experience. Thank you for choosing us as your trusted book destination!
                </p>
            </motion.div>
        </>
    );
}
