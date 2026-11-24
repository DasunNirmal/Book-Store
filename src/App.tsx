import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayout.tsx";
import {Home} from "./pages/Home.tsx";
import {Discover} from "./pages/Discover.tsx";
import {BookMark} from "./pages/BookMark.tsx";
import {Cart} from "./pages/Cart.tsx";
import {BookmarkProvider} from "./components/providers/BookMarkProvider.tsx";
import {CartProvider} from "./components/providers/CartProvider.tsx";
import {User} from "./pages/User.tsx";
import { AdminProvider } from "./context/AdminContext";
import {AdminDashboard} from "./pages/AdminDashboard.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import {ToastProvider} from "./context/ToastContext.tsx";

const routers = createBrowserRouter([
    {path: '',
        element: <RootLayout/>,
        children: [
            {path: '', element: <Home/>},
            {path: '/home', element: <Home/>},
            {path: '/discover', element: <Discover/>},
            {path: '/bookmark', element: <BookMark/>},
            {path: '/cart', element: <Cart/>},
            {path: '/user', element: <User/>},
            {path: '/admin', element: <AdminDashboard/>},
        ]}
])

function App() {
    return (
        <ToastProvider>
            <AdminProvider>
                <AuthProvider>
                    <BookmarkProvider>
                        <CartProvider>
                            <RouterProvider router={routers}/>
                        </CartProvider>
                    </BookmarkProvider>
                </AuthProvider>
            </AdminProvider>
        </ToastProvider>
    )
}

export default App
