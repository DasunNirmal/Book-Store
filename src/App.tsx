import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayout.tsx";
import {Home} from "./pages/Home.tsx";
import {Provider} from "react-redux";
import {store} from "./store/Store.ts";
import {Discover} from "./pages/Discover.tsx";
import {BookMark} from "./pages/BookMark.tsx";
import {Cart} from "./pages/Cart.tsx";
import {BookmarkProvider} from "./components/providers/BookMarkProvider.tsx";
import {CartProvider} from "./components/providers/CartProvider.tsx";
import {Checkout} from "./pages/Checkout.tsx";
import {User} from "./pages/User.tsx";

function App() {

    const routers = createBrowserRouter([
        {path: '',
            element: <RootLayout/>,
            children: [
                {path: '/home', element: <Home/>},
                {path: '/discover', element: <Discover/>},
                {path: '/bookmark', element: <BookMark/>},
                {path: '/cart', element: <Cart/>},
                {path: '/user', element: <User/>},
            ]}
    ])

    return (
        <>
            <Provider store={store}>
                <BookmarkProvider>
                    <CartProvider>
                        <RouterProvider router={routers}/>
                        <Checkout />
                    </CartProvider>
                </BookmarkProvider>
            </Provider>
        </>
    )
}

export default App
