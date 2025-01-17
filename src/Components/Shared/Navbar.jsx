import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from './../../Providers/AuthProvider';
import UseLoggedUser from "../../Hooks/UseLoggedUser";
import { TiThMenu } from "react-icons/ti";
import './styles.css';

const Navbar = () => {
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle the dropdown state
  };

  const { user, logOut } = useContext(AuthContext);
  const { userData, userDataLoading, refetchUserData } = UseLoggedUser();
  // console.log(userData)
  const handleSignOut = () => {
    logOut()
      .then()
      .catch()
  }

//  console.log(userData)
  const navLinks =
    <>
      <ul className=" flex flex-row px-1">
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
          <li><NavLink className=" font-semibold text-xs lg:text-lg" style={({ isActive }) => {
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
          <li><NavLink className=" font-semibold text-xs lg:text-lg" style={({ isActive }) => {
            return {
              color: isActive ? "white" : "white",
              backgroundColor: isActive ? "inherit" : "inherit",
              textDecoration: isActive ? 'underline' : "none",
              textUnderlineOffset: isActive ? '10px' : 'none',
              textDecorationColor: isActive ? '#f02d00' : 'none',
              textDecorationThickness: isActive ? '2px' : 'none',
            };
          }} to="/live-courses"
          ><span className="hover:text-prime">Live Courses</span></NavLink></li>
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
    </>
  return (
    <div className="navbar lg:px-5 shadow-lg bg-main h-[60px] fixed z-10">
      <div className="dropdown">
          {/* Button to toggle dropdown menu */}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={toggleDropdown}>
        <TiThMenu className="text-white text-2xl" />
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && ( // Only show the dropdown if isDropdownOpen is true
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          onClick={() => setIsDropdownOpen(false)} // Close dropdown when clicking a link
        >
          <li className="hover:bg-prime hover:text-white hover:rounded-lg"><Link to='/'>Home</Link></li>
          <li className="hover:bg-prime hover:text-white hover:rounded-lg"><Link to='/courses'>Courses</Link></li>
          <li className="hover:bg-prime hover:text-white hover:rounded-lg"><Link to='/live-courses'>Live courses</Link></li>
          <li className="hover:bg-prime hover:text-white hover:rounded-lg"><Link to='/about'>About</Link></li>
          <li className="hover:bg-prime hover:text-white hover:rounded-lg"><Link to='/contact'>Contact</Link></li>
        </ul>
      )}
    </div>
      <div className="navbar-start">
        <Link to={'/'}><img className="w-[150px]" src={'https://i.ibb.co/FKZd3SG/Learn-Fuji-Yama-Logo-1.png'} /></Link>
      </div>
      <div className=" center-nav ">
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
                    src={userData?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-prime text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {userData ? (
                  userData.role === "admin" ? (
                    <div>
                      <li><Link to={`/admin-dashboard/ad-dashboard`}>Dashboard</Link></li>
                      <li><Link to={`/admin-dashboard/manage-courses`}>Manage Courses</Link></li>
                      <li><Link to={`/admin-dashboard/add-courses`}>Add Courses</Link></li>
                    </div>
                  ) : (
                    <div>
                      <li><Link to={`/student-dashboard/st-dashboard`}>Dashboard</Link></li>
                      <li><Link to={`/student-dashboard/profile`}>Profile</Link></li>
                      <li><Link to={`/student-dashboard/my-courses`}>My Courses</Link></li>
                    </div>
                  )
                ) : (
                  <div>
                    <li>Uer Data Loading</li>
                  </div> // This can also be removed if you don't need to render anything when userData is null or undefined
                )}
                <hr />
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