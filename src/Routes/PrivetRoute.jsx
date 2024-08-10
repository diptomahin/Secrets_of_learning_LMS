import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { AuthContext } from "../Providers/AuthProvider";

const PrivetRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-infinity loading-lg"></span>
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>;
};
PrivetRoute.propTypes ={
    children : PropTypes.object,
}

export default PrivetRoute;