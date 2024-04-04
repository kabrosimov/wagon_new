// import { useEffect, useState } from 'react';
// // // import { useHistory } from 'react-roter-dom';
// // import { useHistory } from 'react-router-dom';
// // import { useNavigate } from 'react-router-dom';

// import userManager from '../../services/AuthService';
// import { useAccessToken } from '../useAuth';

const SigninOidc = () => {
    // const { setAccessToken } = useAccessToken();
    // const navigate = useNavigate();
    // const [authComplete, setAuthComplete] = useState(false);

    // useEffect(() => {
    //     const processCallback = async () => {
    //         try {
    //             console.log('before');
    //             const user = await userManager.signinRedirectCallback();
    //             console.log('after');
    //             const accessToken = user.access_token;
    //             //setAccessToken(accessToken);
    //             console.log('AcessToken: ', accessToken);
    //             sessionStorage.setItem('accessToken', accessToken);
    //             sessionStorage.setItem('userName', 'Константин');
    //             // localStorage.setItem('accessToken', accessToken);
    //         } catch (error) {
    //             console.error('Callback error', error, '123456');
    //         } finally {
    //             setAuthComplete(true);
    //             // navigate('/');
    //         }
    //     };
    //     if (!authComplete) {
    //         processCallback();
    //     }
    // }, []);

    return <div>Processing callback ...</div>;
};
export default SigninOidc;
