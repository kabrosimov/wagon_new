// import { useAuth } from '../useAuth';
import { useLocation } from 'react-router-dom';
import AuthConsumer from '../useAuth';
import { Navigate } from 'react-router-dom';
function RequireAuth({ children }) {
    const { authed } = AuthConsumer();
    const location = useLocation();
    // console.log(location.pathname, location.path);

    return authed === true ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}
export default RequireAuth;
