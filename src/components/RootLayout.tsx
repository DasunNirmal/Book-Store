import {Navigation} from "./Navigation.tsx";
import {Outlet, useLocation} from "react-router";
import {useState} from "react";
import {SidebarContext} from "./SIdebarContext.tsx";
import {Checkout} from "../pages/Checkout.tsx";
import {AuthModal} from "./AuthModel.tsx";

export const RootLayout = () => {

    const {pathname} = useLocation();
    const showNavigation = pathname !== '' && pathname !== '/admin';
    const [open, setOpen] = useState(false)

    return (
        <SidebarContext.Provider value={{open: open}}>
            {showNavigation && <Navigation open={open} setOpen={setOpen} />}
            <Outlet />
            {/* Rendered inside the router so they can navigate */}
            <Checkout />
            <AuthModal />
        </SidebarContext.Provider>
    );
}
