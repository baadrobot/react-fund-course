import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";

export const privateRoutes = [
    {path: '/about', element: About},
    {path: 'posts/:id', element: PostIdPage},
    {path: '/posts', element: Posts},
]

export const publicRoutes = [
    {path: '/login', element: Login}
]