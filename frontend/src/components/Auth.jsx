import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {

    const isLoggedIn = useSelector(state => state.auth.IS_LOGGED_IN);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default Auth