import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./Login";
import BrowseMovies from "./BrowseMovies";




function Body() {
    const routerApp = createBrowserRouter([
        {
            path: '/',
            Component: Login
        },
        {
            path: '/login',
            Component: Login
        },
        {
            path: "/browse",
            Component: BrowseMovies
        }
    ])
    return <div>
        <RouterProvider router={routerApp} />
    </div>;
}

export default Body;
