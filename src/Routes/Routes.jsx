import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import About from "./../Pages/Home/About";
import Contact from "./../Pages/Home/Contact";
import Login from "./../Pages/Login-Reg/Login";
import Registration from "./../Pages/Login-Reg/Registration";
import AllCourses from "./../Pages/Courses/AllCourses";
import CourseDetails from "../Pages/Courses/CourseDetails";

import Student from "../Layout/Student";
import StudentDashboard from "../Pages/Student-Dashboard/StudentDashboard";
import MyCourses from "../Pages/Student-Dashboard/MyCourses";
import Profile from "./../Pages/Student-Dashboard/Profile";
import UpdateProfile from "../Pages/Student-Dashboard/UpdateProfile";
import AdminDashboard from "../Pages/Admin-Dashboard/AdminDashboard";
import Admin from "./../Layout/Admin";
import StudentRoute from "./StudentRoute";
import AdminRoute from "./AdminRoute";
import ManageCourses from "../Pages/Admin-Dashboard/ManageCourses";
import AddCourses from "../Pages/Admin-Dashboard/AddCourses";
import ManageUsers from "../Pages/Admin-Dashboard/ManageUsers";
import AdminProfile from "../Pages/Admin-Dashboard/AdminProfile";
import UpdateCourses from "./../Pages/Admin-Dashboard/UpdateCourses";
import ManageStudents from "../Pages/Admin-Dashboard/ManageStudents";
import AddLiveCourse from "../Pages/Admin-Dashboard/AddLiveCourse";
import LiveCourseDetails from "./../Pages/Courses/LiveCourseDetails";
import LiveEnrollment from "../Pages/Admin-Dashboard/LiveEnrollment";
import UpdateLiveCourse from "../Pages/Admin-Dashboard/UpdateLiveCourse";
import ManageLiveCourses from "../Pages/Admin-Dashboard/ManageLiveCourses";
import AddLiveRecord from "../Pages/Admin-Dashboard/AddLiveRecord";
import Watch_live from "./../Pages/Courses/Watch_live";
import ManageBanner from "../Pages/Admin-Dashboard/ManageBanner";
import LiveCourses from "../Pages/Student-Dashboard/LiveCourses";
import PrivetRoute from "./PrivetRoute";
import AllLiveCourses from "./../Pages/Courses/AllLiveCourses";
import AddCourseRecords from "../Pages/Admin-Dashboard/AddCourseRecords";
import Watch_course from "../Pages/Courses/Watch_course";
import EbookLanding from "../Pages/Ebook/EbookLanding";
import UploadEbook from "../Pages/Admin-Dashboard/UploadEbook";
import UpdateEbook from "../Pages/Admin-Dashboard/UpdateEbook";

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
        path: "/live-courses",
        element: <AllLiveCourses></AllLiveCourses>,
      },
      {
        path: "/courses/:id",
        element: <CourseDetails></CourseDetails>,
      },
      {
        path: "/course/:id",
        element: <LiveCourseDetails></LiveCourseDetails>,
      },
      {
        path: "/ebook/:id",
        element: <EbookLanding></EbookLanding>,
      },
      {
        path: "/watch-live/:id/:title",
        element: (
          <PrivetRoute>
            <Watch_live></Watch_live>
          </PrivetRoute>
        ),
      },
      {
        path: "/watch-course/:id/:title",
        element: (
          <PrivetRoute>
            <Watch_course></Watch_course>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/student-dashboard",
    element: <Student></Student>,
    children: [
      {
        path: "/student-dashboard/st-dashboard",
        element: (
          <StudentRoute>
            <StudentDashboard />
          </StudentRoute>
        ),
      },
      {
        path: "/student-dashboard/my-courses",
        element: (
          <StudentRoute>
            <MyCourses />
          </StudentRoute>
        ),
      },
      {
        path: "/student-dashboard/live-courses",
        element: (
          <StudentRoute>
            <LiveCourses />
          </StudentRoute>
        ),
      },
      {
        path: "/student-dashboard/profile",
        element: (
          <StudentRoute>
            <Profile />
          </StudentRoute>
        ),
      },
      {
        path: "/student-dashboard/update-profile/:id",
        element: (
          <StudentRoute>
            <UpdateProfile />
          </StudentRoute>
        ),
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: <Admin></Admin>,
    children: [
      {
        path: "/admin-dashboard/ad-dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/home-banner",
        element: (
          <AdminRoute>
            <ManageBanner />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/manage-courses",
        element: (
          <AdminRoute>
            <ManageCourses />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/manage-live-courses",
        element: (
          <AdminRoute>
            <ManageLiveCourses />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/manage-live-courses/:id",
        element: (
          <AdminRoute>
            <AddLiveRecord />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/manage-courses/:id",
        element: (
          <AdminRoute>
            <AddCourseRecords />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/add-courses",
        element: (
          <AdminRoute>
            <AddCourses />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/add-live-courses",
        element: (
          <AdminRoute>
            <AddLiveCourse />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/add-ebook",
        element: (
          <AdminRoute>
            <UploadEbook></UploadEbook>
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/update-ebook/:id",
        element: (
          <AdminRoute>
            <UpdateEbook></UpdateEbook>
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/update-live-courses/:id",
        element: (
          <AdminRoute>
            <UpdateLiveCourse />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/live-courses/:id/:url_id",
        element: (
          <AdminRoute>
            <LiveEnrollment />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/update-courses/:id",
        element: (
          <AdminRoute>
            <UpdateCourses />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/manage-users/manage-students",
        element: (
          <AdminRoute>
            <ManageStudents />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard/admin-profile/:id",
        element: (
          <AdminRoute>
            <UpdateProfile />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
