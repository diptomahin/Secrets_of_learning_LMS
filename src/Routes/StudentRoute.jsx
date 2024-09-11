import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PropTypes } from 'prop-types';
import UseLoggedUser from "../Hooks/UseLoggedUser";
import { AuthContext } from "../Providers/AuthProvider";

const StudentRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const { userData, userDataLoading, refetchUserData } = UseLoggedUser();
    const location = useLocation();

    if (loading || userDataLoading) {
        return <span className="loading loading-infinity loading-lg"></span>
    }

    if (user && userData.role == 'student') {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>;
};
StudentRoute.propTypes ={
    children : PropTypes.object,
}

export default StudentRoute;