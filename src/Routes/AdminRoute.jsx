import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PropTypes } from 'prop-types';
import UseLoggedUser from "../Hooks/UseLoggedUser";
import { AuthContext } from "../Providers/AuthProvider";

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const { userData, userDataLoading, refetchUserData } = UseLoggedUser();
    const location = useLocation();

    if (loading || userDataLoading) {
        return <span className="loading loading-infinity loading-lg"></span>
    }

    if (user && userData.role == 'admin') {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>;
};
AdminRoute.propTypes ={
    children : PropTypes.object,
}

export default AdminRoute;