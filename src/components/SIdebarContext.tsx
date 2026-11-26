import {createContext, useContext} from "react";

interface SidebarContextType {
    open: boolean;
    isMobile: boolean;
    // Width taken by the desktop sidebar (0 on mobile, where the menu is a top bar)
    sidebarWidth: number;
}

export const SidebarContext = createContext<SidebarContextType>({
    open: true,
    isMobile: false,
    sidebarWidth: 80
});

export const useSidebar = () => useContext(SidebarContext);
