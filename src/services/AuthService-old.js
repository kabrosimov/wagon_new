import { UserManager } from 'oidc-client';
// import { useCallback } from 'react';
// import { UserManager } from 'oidc-react';
const config = {
    // the URL of our identity server
    // authority: 'https://172.17.34.40:3000/signin-oidc',
    authority: 'https://172.17.34.40:44350',
    // this ID maps to the client ID in the identity client configuration
    client_id: '80789249-76d2-45f0-9006-c49e4398fc4e',
    client_secret: 'js',
    redirect_uri: 'http://localhost:3000/signin-oidc',
    response_type: 'code',
    // the scopes or resources we would like access to
    scope: 'openid profile 21d72977-8358-4bd8-b195-9a37dcf59160 244026ee-ce70-4012-8e01-6f5de0656b41',
    // URL to redirect to after logout
    // post_logout_redirect_uri: 'http://localhost:3000/signout-oidc',
};
const userManager = new UserManager(config);

// const login_openid = async () => {
//     try {
//         await userManager.signinRedirect();
//         userManager.getUser().then(user => {
//             if (user) {
//                 console.log(user, 'is logging');
//                 console.log(user.access_token);
//             } else {
//                 console.log('user is not logging');
//             }
//         });
//     } catch (error) {
//         console.error('Login error', error);
//     }
// };

// const logout_openid = async () => {
//     try {
//         userManager.signoutRedirect();
//     } catch (error) {
//         console.error('Logout error', error);
//     }
// };
// userManager.events.addUserLoaded(user => {
//     console.log('success', user);
// });

// userManager.getUser().then(user => {
//     if (user) {
//         console.log(user, 'is logging');
//         console.log(user.access_token);
//     } else {
//         console.log('user is not logging');
//     }
// });
// userManager.events.addAccessTokenExpired(() => {
//     console.log('tokken');
// });

// userManager
//     .signinRedirectCallback()
//     .then(user => {
//         // console.log('LOgggggin', user);
//         console.log('loggging', user.access_token);
//         // const accessToken = user.access_token;
//         // console.log('accessToken:', accessToken);
//     })
//     .catch(error => {
//         console.error('Logout error', error);
//         // ff;
//     });

// const AuthService = () => {
//     return (
//         <>
//             <h1>Login</h1>
//             <button onClick={login}>Login</button>;
//             <button onClick={logout}>Logout</button>;
//         </>
//     );
// };

export default userManager;
// export { login_openid, logout_openid };
