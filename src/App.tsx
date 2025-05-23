import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayout.tsx";
import {Home} from "./pages/Home.tsx";
import {Provider} from "react-redux";
import {store} from "./store/Store.ts";
import {Discover} from "./pages/Discover.tsx";
import {BookMark} from "./pages/BookMark.tsx";
import {Cart} from "./pages/Cart.tsx";
import {BookmarkProvider} from "./components/BookMarkProvider.tsx";

function App() {

    const routers = createBrowserRouter([
        {path: '',
            element: <RootLayout/>,
            children: [
                {path: '/home', element: <Home/>},
                {path: '/discover', element: <Discover/>},
                {path: '/bookmark', element: <BookMark/>},
                {path: '/settings', element: <Cart/>},
            ]}
    ])

    return (
        <>
            <Provider store={store}>
                <BookmarkProvider>
                    <RouterProvider router={routers}/>
                </BookmarkProvider>
            </Provider>
        </>
    )
}

export default App
