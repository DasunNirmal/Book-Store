import {useRef, useState} from 'react'
import { motion } from "framer-motion";
import './App.css'
import {HomeIcon} from "@heroicons/react/24/outline";

function App() {

  return (
      <div>
          <div className='w-[130px] h-[928px] top-0 left-0 fixed after:absolute after:right-0 after:top-0 after:bottom-0 after:m-auto after:h-9/10 after:w-[2px] after:bg-sky-950'>
              <HomeIcon className='h-8 w-8 m-auto mt-4'/>
          </div>
      </div>
  )
}

/*horizontal*/
/*const SlideTabs = () => {
    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    return (
        <ul
            onMouseLeave={() => {
                setPosition((pv) => ({
                    ...pv,
                    opacity: 0,
                }));
            }}
            className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
        >
            <Tab setPosition={setPosition}>Home</Tab>
            <Tab setPosition={setPosition}>Pricing</Tab>
            <Tab setPosition={setPosition}>Features</Tab>
            <Tab setPosition={setPosition}>Docs</Tab>
            <Tab setPosition={setPosition}>Blog</Tab>

            <Cursor position={position} />
        </ul>
    );
};

const Tab = ({ children, setPosition }) => {
    const ref = useRef<HTMLLIElement>(null);

    return (
        <li
            ref={ref}
            onMouseEnter={() => {
                if (!ref?.current) return;

                const { width } = ref.current.getBoundingClientRect();

                setPosition({
                    left: ref.current.offsetLeft,
                    width,
                    opacity: 1,
                });
            }}
            className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
        >
            {children}
        </li>
    );
};

const Cursor = ({ position }) => {
    return (
        <motion.li
            animate={{
                ...position,
            }}
            className="absolute z-0 h-7 rounded-full bg-black md:h-12"
        />
    );
};*/

/*vertical*/
/*const SlideTabs = () => {
    const [position, setPosition] = useState({
        top: 0,
        height: 0,
        opacity: 0,
    });

    return (
        <ul
            onMouseLeave={() => {
                setPosition((pv) => ({
                    ...pv,
                    opacity: 0,
                }));
            }}
            className="relative mx-auto flex w-fit flex-col rounded-lg border-2 border-black bg-white p-1"
        >
            <Tab setPosition={setPosition}>Home <HomeIcon className='h-8 w-8 m-auto mt-4' color='white'/></Tab>
            <Tab setPosition={setPosition}>Pricing</Tab>
            <Tab setPosition={setPosition}>Features</Tab>
            <Tab setPosition={setPosition}>Docs</Tab>
            <Tab setPosition={setPosition}>Blog</Tab>

            <Cursor position={position} />
        </ul>
    );
};

const Tab = ({ children, setPosition }) => {
    const ref = useRef<HTMLLIElement>(null);

    return (
        <li
            ref={ref}
            onMouseEnter={() => {
                if (!ref?.current) return;

                const { height } = ref.current.getBoundingClientRect();

                setPosition({
                    top: ref.current.offsetTop,
                    height,
                    opacity: 1,
                });
            }}
            className="relative z-10 block cursor-pointer px-5 py-3 text-xs uppercase text-white mix-blend-difference md:text-base"
        >
            {children}
        </li>
    );
};

const Cursor = ({ position }) => {
    return (
        <motion.li
            animate={{
                ...position,
            }}
            className="absolute left-0 w-full rounded-lg bg-black"
        />
    );
};*/

export default App
