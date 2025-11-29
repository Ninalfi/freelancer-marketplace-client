import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from '../Components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
 if (user) {
        return children;
    }
     return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;