import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import About from './../Pages/Home/About';
import Contact from './../Pages/Home/Contact';
import Login from './../Pages/Login-Reg/Login';
import Registration from './../Pages/Login-Reg/Registration';
import AllCourses from './../Pages/Courses/AllCourses';
import CourseDetails from "../Pages/Courses/CourseDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/about",
            element: <About></About>,
        },
        {
            path: "/contact",
            element: <Contact></Contact>,
        },
        {
            path: "/login",
            element: <Login></Login>,
        },
        {
            path: "/register",
            element: <Registration></Registration>,
        },
        {
            path: "/courses",
            element: <AllCourses></AllCourses>,
        },
        {
            path: "/courses/:id",
            element:<CourseDetails></CourseDetails>,
        },
        {
            path: "/dashboard",
            element: <Home></Home>,
        },
      ]
    },
  ]);


  export default router;