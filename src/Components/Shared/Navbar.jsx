import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

  const navLinks =
    <>
      <ul className="menu menu-vertical lg:menu-horizontal px-1 ">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink className="py-2 font-semibold text-lg" style={({ isActive }) => {
            return {
              color: isActive ? "white" : "white",
              backgroundColor: isActive ? "inherit" : "inherit",
              textDecoration: isActive ? 'underline' : "none"
            };
          }} to="/"
          >Home</NavLink></li>
          <li><NavLink className="py-2 font-semibold text-lg" style={({ isActive }) => {
            return {
              color: isActive ? "white" : "white",
              backgroundColor: isActive ? "inherit" : "inherit",
              textDecoration: isActive ? 'underline' : "none"
            };
          }} to="/about"
          >About</NavLink></li>
          <li><NavLink className="py-2 font-semibold text-lg" style={({ isActive }) => {
            return {
              color: isActive ? "white" : "white",
              backgroundColor: isActive ? "inherit" : "inherit",
              textDecoration: isActive ? 'underline' : "none"
            };
          }} to="/contact"
          >Contact</NavLink></li>
        </ul>
      </ul>
    </>
  return (
    <div className="navbar px-5 shadow-lg bg-prime  ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-prime rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {
              navLinks
            }
          </ul>
        </div>
        <Link to={'/'}><img className="w-[80px]" src={'/logo.png'} /></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            navLinks
          }

        </ul>
      </div>
      <div className="navbar-end flex  gap-2">
        <Link> <button className="btn text-lg  font-semibold">Courses</button> </Link>
        <Link> <button className="btn text-lg  font-semibold">Login </button> </Link>
      </div>
    </div>
  );
};

export default Navbar;