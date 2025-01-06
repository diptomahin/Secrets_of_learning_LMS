import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext, useState } from "react";
import { TiThMenu } from "react-icons/ti";

const Admin = () => {
  const { user, logOut } = useContext(AuthContext);
  const [nav, setNav] = useState(false);

  const handleSignOut = () => {
    logOut().then().catch();
  };

  const handleNav = () => {
    setNav(!nav);
    console.log(nav);
  };

  return (
    <div>
      <div className="navbar px-5 shadow-lg bg-main h-[60px] fixed z-10">
        <div>
          <TiThMenu className="text-white text-2xl ml-10" onClick={handleNav} />
        </div>
        <div className="mx-auto">
          <Link to={"/"}>
            <img
              className="w-[150px]"
              src={"https://i.ibb.co/FKZd3SG/Learn-Fuji-Yama-Logo-1.png"}
            />
          </Link>
        </div>
      </div>
      <div className="flex">
        {nav ? (
          <div className="w-40 min-h-screen bg-main pt-10">
            <ul className="menu p-4 mt-10">
              <>
                <li className="my-3">
                  <NavLink
                    to="/admin-dashboard/ad-dashboard"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "white" : "white",
                        backgroundColor: isActive ? "inherit" : "inherit",
                        textDecoration: isActive ? "underline" : "none",
                        textUnderlineOffset: isActive ? "10px" : "none",
                        textDecorationColor: isActive ? "#f02d00" : "none",
                        textDecorationThickness: isActive ? "2px" : "none",
                      };
                    }}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="my-3">
                  <NavLink
                    to="/admin-dashboard/home-banner"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "white" : "white",
                        backgroundColor: isActive ? "inherit" : "inherit",
                        textDecoration: isActive ? "underline" : "none",
                        textUnderlineOffset: isActive ? "10px" : "none",
                        textDecorationColor: isActive ? "#f02d00" : "none",
                        textDecorationThickness: isActive ? "2px" : "none",
                      };
                    }}
                  >
                    Banner
                  </NavLink>
                </li>
                <li className="my-3">
                  <NavLink
                    to="/admin-dashboard/manage-courses"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "white" : "white",
                        backgroundColor: isActive ? "inherit" : "inherit",
                        textDecoration: isActive ? "underline" : "none",
                        textUnderlineOffset: isActive ? "10px" : "none",
                        textDecorationColor: isActive ? "#f02d00" : "none",
                        textDecorationThickness: isActive ? "2px" : "none",
                      };
                    }}
                  >
                    Courses
                  </NavLink>
                </li>
                <li className="my-3">
                  <NavLink
                    to="/admin-dashboard/manage-live-courses"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "white" : "white",
                        backgroundColor: isActive ? "inherit" : "inherit",
                        textDecoration: isActive ? "underline" : "none",
                        textUnderlineOffset: isActive ? "10px" : "none",
                        textDecorationColor: isActive ? "#f02d00" : "none",
                        textDecorationThickness: isActive ? "2px" : "none",
                      };
                    }}
                  >
                    Live Courses
                  </NavLink>
                </li>
                <li className="my-3">
                  <NavLink
                    to="/admin-dashboard/add-courses"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "white" : "white",
                        backgroundColor: isActive ? "inherit" : "inherit",
                        textDecoration: isActive ? "underline" : "none",
                        textUnderlineOffset: isActive ? "10px" : "none",
                        textDecorationColor: isActive ? "#f02d00" : "none",
                        textDecorationThickness: isActive ? "2px" : "none",
                      };
                    }}
                  >
                    Add Courses
                  </NavLink>
                </li>
                <li className="my-3">
                  <NavLink
                    to="/admin-dashboard/add-live-courses"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "white" : "white",
                        backgroundColor: isActive ? "inherit" : "inherit",
                        textDecoration: isActive ? "underline" : "none",
                        textUnderlineOffset: isActive ? "10px" : "none",
                        textDecorationColor: isActive ? "#f02d00" : "none",
                        textDecorationThickness: isActive ? "2px" : "none",
                      };
                    }}
                  >
                    Add Live
                  </NavLink>
                </li>
                <li className="my-3">
                  <NavLink
                    to="/admin-dashboard/add-ebook"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "white" : "white",
                        backgroundColor: isActive ? "inherit" : "inherit",
                        textDecoration: isActive ? "underline" : "none",
                        textUnderlineOffset: isActive ? "10px" : "none",
                        textDecorationColor: isActive ? "#f02d00" : "none",
                        textDecorationThickness: isActive ? "2px" : "none",
                      };
                    }}
                  >
                    Add Ebook
                  </NavLink>
                </li>
                <li className="my-3">
                  <NavLink
                    to="/admin-dashboard/manage-users"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "white" : "white",
                        backgroundColor: isActive ? "inherit" : "inherit",
                        textDecoration: isActive ? "underline" : "none",
                        textUnderlineOffset: isActive ? "10px" : "none",
                        textDecorationColor: isActive ? "#f02d00" : "none",
                        textDecorationThickness: isActive ? "2px" : "none",
                      };
                    }}
                  >
                    Users
                  </NavLink>
                </li>
                <li className="my-3">
                  <NavLink
                    to="/admin-dashboard/admin-profile"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "white" : "white",
                        backgroundColor: isActive ? "inherit" : "inherit",
                        textDecoration: isActive ? "underline" : "none",
                        textUnderlineOffset: isActive ? "10px" : "none",
                        textDecorationColor: isActive ? "#f02d00" : "none",
                        textDecorationThickness: isActive ? "2px" : "none",
                      };
                    }}
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            </ul>
            <hr
              style={{
                border: "none",
                height: "3px",
                backgroundColor: "white",
              }}
            />
            <ul className="menu p-4">
              <>
                <li className="my-3">
                  <NavLink
                    to="/"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "white" : "white",
                        backgroundColor: isActive ? "inherit" : "inherit",
                        textDecoration: isActive ? "underline" : "none",
                        textUnderlineOffset: isActive ? "10px" : "none",
                        textDecorationColor: isActive ? "#f02d00" : "none",
                        textDecorationThickness: isActive ? "2px" : "none",
                      };
                    }}
                  >
                    Home
                  </NavLink>
                </li>
                <li onClick={handleSignOut} className="my-3">
                  <NavLink
                    to="/"
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "white" : "white",
                        backgroundColor: isActive ? "inherit" : "inherit",
                        textDecoration: isActive ? "underline" : "none",
                        textUnderlineOffset: isActive ? "10px" : "none",
                        textDecorationColor: isActive ? "#f02d00" : "none",
                        textDecorationThickness: isActive ? "2px" : "none",
                      };
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            </ul>
          </div>
        ) : (
          <div className="hidden"></div>
        )}
        <div></div>
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Admin;
