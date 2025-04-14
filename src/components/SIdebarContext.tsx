import {createContext, useContext} from "react";

export const SidebarContext = createContext({ open: true });

export const useSidebar = () => useContext(SidebarContext);