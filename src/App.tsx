import {useState} from 'react'
import './App.css'
import {
    ArrowLeftStartOnRectangleIcon, BookmarkIcon, Cog6ToothIcon, HomeIcon
} from "@heroicons/react/24/outline";
import {Tab} from "./components/Tab.tsx";
import {Cursor} from "./components/Cursor.tsx";
import {CompassIcon} from "@sidekickicons/react/24/outline";
import { motion } from "framer-motion";

function App() {

    const [position, setPosition] = useState({
        top: 0,
        height: 0,
        opacity: 0,
    });

    const [open, setOpen] = useState(false);

    return (
        <div>
            <motion.div animate={{width: open ? "200px" : "80px"}} transition={{type: "spring"}}
                        className='flex flex-col w-[80px] h-[928px] top-0 left-0 fixed after:absolute after:right-0 after:top-0 after:bottom-0 after:m-auto after:h-9/10 after:w-[1px] after:bg-slate-700/50 justify-center items-center gap-15'>
                <div className='absolute left-0 w-[80px] h-fit'>
                    <div className='flex flex-col w-[80px] h-fit top-0 left-0 relative justify-center items-center gap-15 bg-stone-50'
                         onMouseLeave={() => {
                             setPosition((pv) => ({
                                 ...pv,
                                 opacity: 0,
                             }));
                         }}>
                        <Tab setPosition={setPosition}><HomeIcon className='h-8 w-8'/></Tab>
                        <Tab setPosition={setPosition}><CompassIcon className='h-8 w-8'/></Tab>
                        <Tab setPosition={setPosition}><BookmarkIcon className='h-8 w-8'/></Tab>
                        <Tab setPosition={setPosition}><Cog6ToothIcon className='h-8 w-8'/></Tab>
                        <Tab setPosition={setPosition}><ArrowLeftStartOnRectangleIcon className='h-8 w-8'/></Tab>
                        <Cursor position={position}/>
                    </div>
                </div>
                <motion.div  onClick={() => setOpen(!open)} animate={{right: open ? "0px" : "18px"}} className='z-10 rounded-full border-2 border-slate-700 w-[48px] h-[48px] absolute bottom-0 mb-6'>
                    <div className='absolute w-fit h-fit m-auto top-1 left-0 bottom-0 right-0'>
                        <input type='checkbox' className='appearance-none hidden invisible'/>
                        <div className='relative cursor-pointer w-[18px] h-[18px]'>
                            <motion.span animate={{rotate: open ? -45 : 0, y: open ? 1.5 : 0, width: open ? "58%" : "18px"}}
                                         className='block relative w-[18px] h-[2px] bg-slate-700 mb-1 rounded-lg transition duration-[2ms]'/>
                            <motion.span animate={{width: open ? "140%" : "18px"}}
                                         className='block relative w-[18px] h-[2px] bg-slate-700 mb-1 rounded-lg transition duration-[5s]'/>
                            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? -1.5 : 0, width: open ? "58%" : "18px"}}
                                         className='block relative w-[18px] h-[2px] bg-slate-700 mb-1 rounded-lg transition duration-[2ms]'/>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default App
