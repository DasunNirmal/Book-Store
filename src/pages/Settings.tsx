import {motion} from "framer-motion";
import {useSidebar} from "../components/SIdebarContext.tsx";

export const Settings = () => {

    const { open } = useSidebar();
    const sidebarWidth = open ? 240 : 80;

    return (
        <motion.div
            initial={{ width: `calc(100% - ${sidebarWidth}px)` }}
            animate={{ width: `calc(100% - ${sidebarWidth}px)` }}
            transition={{ type: "spring", stiffness: 100, delay: open ? 0 : 0.5 }}
            className='h-[900px] absolute top-0 right-0 p-8 border-2 border-amber-600'>
            <h1>Settings</h1>
        </motion.div>
    );
}