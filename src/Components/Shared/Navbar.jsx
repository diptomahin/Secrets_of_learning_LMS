import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

  const navLinks =
    <>
      <ul className="menu menu-vertical  lg:menu-horizontal px-1 ">
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
    <div className="navbar px-5 shadow-lg bg-main h-[60px] fixed">
      <div className="navbar-start">
        <Link to={'/'}><img className="w-[60px]" src={'/logo.png'} /></Link>
      </div>
      <div className="navbar-center sm:hidden md:hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            navLinks
          }
        </ul>
      </div>
      <div className="navbar-end flex  gap-2">
        <Link to={'/login'}> <button className=" text-sm lg:text-lg  font-semibold bg-prime text-white border-prime hover:bg-prime p-2 rounded-lg">Login </button> </Link>
      </div>
    </div>
  );
};

export default Navbar;