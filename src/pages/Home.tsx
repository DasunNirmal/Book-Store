import {motion} from "framer-motion";
import {useSidebar} from "../components/SIdebarContext.tsx";

export const Home = () => {

    const { open } = useSidebar();
    const sidebarWidth = open ? 240 : 80;

    return (
        <>
            <motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='h-[900px] absolute top-0 right-0 p-8 border-2 border-amber-600'>
                <h1>Home</h1>
                <div className="bg-[url('assets/1.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px]"></div>
                <div className="bg-[url('assets/2.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px]"></div>
                <div className="bg-[url('assets/3.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px]"></div>
                <div className="bg-[url('assets/4.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px]"></div>
                <div className="bg-[url('assets/5.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px]"></div>
                <div className="bg-[url('assets/6.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px]"></div>
                <div className="bg-[url('assets/7.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px]"></div>
                <div className="bg-[url('assets/8.png')] bg-no-repeat bg-center bg-cover h-[275px] w-[278px]"></div>

            </motion.div>
            {/*<motion.div
                initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
                animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
                transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
                className='h-[900px] absolute top-[928px] right-0 p-8 border-2 border-amber-600'>
                <h1>Second Home</h1>
            </motion.div>*/}
        </>
    );
}
