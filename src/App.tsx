import {useState} from 'react'
import './App.css'
import {ArrowLeftStartOnRectangleIcon, BookmarkIcon, Cog6ToothIcon, HomeIcon
} from "@heroicons/react/24/outline";
import {Tab} from "./components/Tab.tsx";
import {Cursor} from "./components/Cursor.tsx";
import {CompassIcon} from "@sidekickicons/react/24/outline";

function App() {

    const [position, setPosition] = useState({
        top: 0,
        height: 0,
        opacity: 0,
    });

  return (
      <div>
          <div className='flex flex-col w-[130px] h-[928px] top-0 left-0 fixed after:absolute after:right-0 after:top-0 after:bottom-0 after:m-auto after:h-9/10 after:w-[2px] after:bg-sky-950 justify-center items-center gap-15'>
              <div className='flex flex-col w-[90px] h-[928px] top-0 left-0 relative justify-center items-center gap-15 bg-white'
                   onMouseLeave={() => {
                       setPosition((pv) => ({
                           ...pv,
                           opacity: 0,
                       }));
                   }}>
                  <Tab setPosition={setPosition}><HomeIcon className='h-8 w-8'/></Tab>
                  <Tab setPosition={setPosition}><CompassIcon className='h-8 w-8'/></Tab>
                  <Tab setPosition={setPosition}><BookmarkIcon className='h-8 w-8' color='white'/></Tab>
                  <Tab setPosition={setPosition}><Cog6ToothIcon className='h-8 w-8' color='white'/></Tab>
                  <Tab setPosition={setPosition}><ArrowLeftStartOnRectangleIcon className='h-8 w-8' color='white'/></Tab>
                  <Cursor position={position} />
              </div>
          </div>
      </div>
  )
}

export default App
