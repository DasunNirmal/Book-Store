import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayout.tsx";
import {Home} from "./pages/Home.tsx";
import {Provider} from "react-redux";
import {store} from "./store/Store.ts";
import {Discover} from "./pages/Discover.tsx";
import {BookMark} from "./pages/BookMark.tsx";
import {Settings} from "./pages/Settings.tsx";

function App() {

    const routers = createBrowserRouter([
        {path: '',
            element: <RootLayout/>,
            children: [
                {path: '/home', element: <Home/>},
                {path: '/discover', element: <Discover/>},
                {path: '/bookmark', element: <BookMark/>},
                {path: '/settings', element: <Settings/>},
            ]}
    ])

    return (
        <>
            <Provider store={store}>
                <RouterProvider router={routers}/>
            </Provider>
        </>
    )
}

export default App
