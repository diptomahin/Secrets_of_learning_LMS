import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from './../../Providers/AuthProvider';

const Navbar = () => {

  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then()
      .catch()
  }

  const navLinks =
    <>
      <ul className="menu menu-vertical  lg:menu-horizontal px-1  ">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink className=" font-semibold text-sm lg:text-lg" style={({ isActive }) => {
            return {
              color: isActive ? "white" : "white",
              backgroundColor: isActive ? "inherit" : "inherit",
              textDecoration: isActive ? 'underline' : "none",
              textUnderlineOffset: isActive ? '10px' : 'none',
              textDecorationColor: isActive ? '#f02d00' : 'none',
              textDecorationThickness: isActive ? '2px' : 'none',
            };
          }} to="/"
          ><span className="hover:text-prime">Home</span></NavLink></li>
          <li><NavLink className=" font-semibold text-sm lg:text-lg" style={({ isActive }) => {
            return {
              color: isActive ? "white" : "white",
              backgroundColor: isActive ? "inherit" : "inherit",
              textDecoration: isActive ? 'underline' : "none",
              textUnderlineOffset: isActive ? '10px' : 'none',
              textDecorationColor: isActive ? '#f02d00' : 'none',
              textDecorationThickness: isActive ? '2px' : 'none',
            };
          }} to="/courses"
          ><span className="hover:text-prime">Courses</span></NavLink></li>
          <li><NavLink className=" font-semibold text-sm lg:text-lg" style={({ isActive }) => {
            return {
              color: isActive ? "white" : "white",
              backgroundColor: isActive ? "inherit" : "inherit",
              textDecoration: isActive ? 'underline' : "none",
              textUnderlineOffset: isActive ? '10px' : 'none',
              textDecorationColor: isActive ? '#f02d00' : 'none',
              textDecorationThickness: isActive ? '2px' : 'none',
            };
          }} to="/about"
          ><span className="hover:text-prime">About</span></NavLink></li>
          <li><NavLink className=" font-semibold text-sm lg:text-lg" style={({ isActive }) => {
            return {
              color: isActive ? "white" : "white",
              backgroundColor: isActive ? "inherit" : "inherit",
              textDecoration: isActive ? 'underline' : "none",
              textUnderlineOffset: isActive ? '10px' : 'none',
              textDecorationColor: isActive ? '#f02d00' : 'none',
              textDecorationThickness: isActive ? '2px' : 'none',
            };
          }} to="/contact"
          ><span className="hover:text-prime">Contact</span></NavLink></li>
        </ul>
      </ul>
    </>
  return (
    <div className="navbar px-5 shadow-lg bg-main h-[60px] fixed z-10">
      <div className="navbar-start">
        <Link to={'/'}><img className="w-[60px]" src={'/logo.png'} /></Link>
      </div>
      <div className="navbar-center flex ">
        <ul className="menu menu-horizontal ">
          {
            navLinks
          }
        </ul>
      </div>
      <div className="navbar-end flex  gap-2">

        {
          user ?
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Image"
                    src={user?.photoURL}/>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-prime text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a>My Courses</a></li>
                <li><a>Profile</a></li>
                <li onClick={handleSignOut}><a>Logout</a></li>
              </ul>
            </div>
            :
            <Link to={'/login'}> <button className=" text-sm lg:text-lg  font-semibold bg-prime text-white border-prime hover:bg-prime p-2 rounded-lg">Login </button> </Link>

        }
      </div>
    </div>
  );
};

export default Navbar;