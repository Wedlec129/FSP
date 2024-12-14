import { Navigate } from "react-router-dom"
import About from "../pages/About"
import Posts from "../pages/Posts/Posts"

export const publicRoutes = [
    {path:'/about' , element: <About/> },
    {path:'/posts' , element:<Posts/>},
    { path: '/', element: <Navigate to="/posts" replace /> }, // Редирект с / на /posts
    { path: '*', element: <Navigate to="/posts" replace /> }, // Редирект с / на /posts
]
