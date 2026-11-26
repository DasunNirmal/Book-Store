import {Navigation} from "./Navigation.tsx";
import {MobileNav} from "./MobileNav.tsx";
import {Outlet, useLocation, useOutlet} from "react-router";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {SidebarContext} from "./SIdebarContext.tsx";
import {Checkout} from "../pages/Checkout.tsx";
import {AuthModal} from "./AuthModel.tsx";
import {MOBILE_QUERY, useMediaQuery} from "../utils/useMediaQuery.ts";

// Keeps the old page on screen while it fades out, then fades the new page in
const FadingPage = ({children}: {children: React.ReactNode}) => {
    const [frozen] = useState(children);
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
        >
            {frozen}
        </motion.div>
    );
};

const AnimatedOutlet = () => {
    const {pathname} = useLocation();
    const outlet = useOutlet();
    return (
        <AnimatePresence mode="wait" initial={false}>
            <FadingPage key={pathname}>{outlet}</FadingPage>
        </AnimatePresence>
    );
};

export const RootLayout = () => {

    const {pathname} = useLocation();
    const showNavigation = pathname !== '' && pathname !== '/admin';
    const [open, setOpen] = useState(false)
    const isMobile = useMediaQuery(MOBILE_QUERY);
    const sidebarWidth = isMobile ? 0 : open ? 240 : 80;

    // Every page starts at the top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <SidebarContext.Provider value={{open, isMobile, sidebarWidth}}>
            {showNavigation && (isMobile
                ? <MobileNav open={open} setOpen={setOpen} />
                : <Navigation open={open} setOpen={setOpen} />)}

            {/* The admin page manages its own layout, so it skips the page transition */}
            {pathname === '/admin' ? <Outlet /> : <AnimatedOutlet />}

            {/* Rendered inside the router so they can navigate */}
            <Checkout />
            <AuthModal />
        </SidebarContext.Provider>
    );
}
