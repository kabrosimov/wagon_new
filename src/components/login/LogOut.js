import { useNavigate } from 'react-router-dom';
// import useLoginService from '../../services/LoginService';
// import { useAuth } from '../useAuth';
import AuthConsumer from '../useAuth';

const LogOut = () => {
    const navigate = useNavigate();
    const { logout } = AuthConsumer();
    // const { appLogout } = useLoginService();
    if (localStorage.accessToken || sessionStorage.accessToken) {
        // appLogout();
        localStorage.clear();
        sessionStorage.clear();
        logout().then(() => {
            navigate('/');
        });
        // console.log(authed);
    }
};
export default LogOut;
