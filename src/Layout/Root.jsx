import { matchPath, Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

const Root = () => {
  const location = useLocation();

  // Specify the paths where you want to exclude Navbar and Footer
  const excludedPaths = ["/course/:id", "/ebook/:id"]; // Add more paths as needed

  const shouldShowNavAndFooter = !excludedPaths.some((path) =>
    matchPath(path, location.pathname)
  );

  return (
    <div>
      {/* Conditionally render Navbar and Footer */}
      {shouldShowNavAndFooter && <Navbar />}
      <Outlet></Outlet>
      {shouldShowNavAndFooter && <Footer />}
    </div>
  );
};

export default Root;
