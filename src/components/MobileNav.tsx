import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import {
    ArrowLeftStartOnRectangleIcon,
    BookmarkIcon,
    HomeIcon,
    ShoppingCartIcon,
    UserIcon
} from "@heroicons/react/24/outline";
import { CompassIcon } from "@sidekickicons/react/24/outline";
import { useAuth } from "../context/AuthContext.tsx";
import { useCart } from "./providers/CartProvider.tsx";

// The circle opens from the centre of the menu button (16px padding + 24px radius from the right edge)
const CIRCLE_ORIGIN = "calc(100% - 40px) -32px";
const circleEase = cubicBezier(0.4, 0, 0.2, 1);
const circleClosed = `circle(0px at ${CIRCLE_ORIGIN})`;
const circleOpen = `circle(1200px at ${CIRCLE_ORIGIN})`;

const links = [
    { to: '/home', label: 'Home', icon: HomeIcon, page: ['', 'home'] },
    { to: '/discover', label: 'Discover', icon: CompassIcon, page: ['discover'] },
    { to: '/bookmark', label: 'Bookmark', icon: BookmarkIcon, page: ['bookmark'] },
    { to: '/cart', label: 'Cart', icon: ShoppingCartIcon, page: ['cart'] },
    { to: '/user', label: 'User', icon: UserIcon, page: ['user'] },
];

interface MobileNavProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const MobileNav = ({ open, setOpen }: MobileNavProps) => {
    const { pathname } = useLocation();
    const subpage = pathname.split("/")?.[1] ?? '';
    const { currentUser, logout, openAuthModal } = useAuth();
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Circle button shared by every item: dark when active, dips and darkens a little when pressed
    const circleClass = (active: boolean) =>
        `relative w-[58px] h-[58px] rounded-full flex justify-center items-center ${
            active ? 'bg-slate-700 text-white' : 'bg-white text-slate-700 border border-slate-300'
        }`;
    const tapAnimation = (active: boolean) => ({
        scale: 0.88,
        backgroundColor: active ? '#0f172a' : '#cbd5e1'
    });

    return (
        <>
            {/* Top bar */}
            <header className="fixed top-0 inset-x-0 h-16 z-40 flex items-center justify-between px-4 bg-stone-50 border-b border-slate-700/20">
                <Link to="/home" className="text-xl font-bold text-rose-500">Book Haven</Link>

                {/* Menu button (same three-line icon as the desktop menu) */}
                <motion.button
                    onClick={() => setOpen(!open)}
                    whileTap={{ scale: 0.9, backgroundColor: '#e2e8f0' }}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    className='relative rounded-full border-2 border-slate-700 w-[48px] h-[48px] cursor-pointer'>
                    <div className='absolute w-fit h-fit m-auto top-1 left-0 bottom-0 right-0'>
                        <div className='relative w-[18px] h-[18px]'>
                            <motion.span
                                animate={{rotate: open ? -45 : 0, y: open ? 1.5 : 0, width: open ? "58%" : "13px"}}
                                transition={{type: "spring", stiffness: 100}}
                                className='block relative w-[13px] h-[2px] bg-slate-700 mb-1 rounded-lg'/>
                            <motion.span
                                animate={{width: open ? "140%" : "18px"}}
                                transition={{type: "spring", stiffness: 100}}
                                className='block relative w-[18px] h-[2px] bg-slate-700 mb-1 rounded-lg'/>
                            <motion.span
                                animate={{ rotate: open ? 45 : 0, y: open ? -1.5 : 0, width: open ? "58%" : "13px"}}
                                transition={{type: "spring", stiffness: 100}}
                                className='block relative w-[13px] h-[2px] bg-slate-700 mb-1 rounded-lg'/>
                        </div>
                    </div>
                </motion.button>
            </header>

            {/* Circular menu. It stays open while pages change underneath it. */}
            <AnimatePresence>
                {open && (
                    <motion.nav
                        key="mobile-menu"
                        initial={{ clipPath: circleClosed }}
                        animate={{ clipPath: circleOpen }}
                        exit={{ clipPath: circleClosed }}
                        transition={{ duration: 0.45, ease: circleEase }}
                        // Listening to updates makes Framer run this on the main thread. The browser-driven
                        // version flashed back to the closed circle for one frame when it finished.
                        onUpdate={() => {}}
                        className="fixed top-16 inset-x-0 z-40 bg-stone-50 rounded-b-3xl shadow-xl border-b border-slate-700/20 px-6 pt-6 pb-8"
                    >
                        <ul className="grid grid-cols-3 gap-y-6 justify-items-center">
                            {links.map((link, index) => {
                                const active = link.page.includes(subpage);
                                return (
                                    <motion.li
                                        key={link.to}
                                        initial={{ opacity: 0, y: -12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.12 + index * 0.05 }}
                                    >
                                        <Link to={link.to} className="flex flex-col items-center gap-2">
                                            <motion.div
                                                whileTap={tapAnimation(active)}
                                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                                className={circleClass(active)}
                                            >
                                                <link.icon className="h-8 w-8" />
                                                {link.to === '/cart' && cartCount > 0 && (
                                                    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center">
                                                        {cartCount}
                                                    </span>
                                                )}
                                            </motion.div>
                                            <span className={`text-sm ${active ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                                                {link.label}
                                            </span>
                                        </Link>
                                    </motion.li>
                                );
                            })}

                            {/* Login / Logout */}
                            <motion.li
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12 + links.length * 0.05 }}
                            >
                                <button
                                    onClick={() => (currentUser ? logout() : openAuthModal())}
                                    className="flex flex-col items-center gap-2 cursor-pointer"
                                >
                                    <motion.div
                                        whileTap={tapAnimation(false)}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        className={circleClass(false)}
                                    >
                                        <ArrowLeftStartOnRectangleIcon className="h-8 w-8" />
                                    </motion.div>
                                    <span className="text-sm text-slate-700">{currentUser ? 'Logout' : 'Login'}</span>
                                </button>
                            </motion.li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};
