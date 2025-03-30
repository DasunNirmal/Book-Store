import {Navigation} from "./Navigation.tsx";
import {Outlet, useLocation} from "react-router";

export const RootLayout = () => {

    const {pathname} = useLocation();
    const showNavigation = pathname !== '';

    return (
        <div>
            {showNavigation && <Navigation/>}
            <Outlet/>
        </div>
    );
}