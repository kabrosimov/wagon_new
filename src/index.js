import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style/main.scss';
import App from './components/app/App';
import { AuthProvider } from 'react-oidc-context';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import { AuthProvider } from './components/useAuth';

const oidcConfig = {
    authority: 'https://172.17.34.40:44350',
    client_id: '80789249-76d2-45f0-9006-c49e4398fc4e',
    client_secret: 'js',
    redirect_uri: 'http://localhost:3000/signin-oidc',
    response_type: 'code',
    scope: 'openid profile 21d72977-8358-4bd8-b195-9a37dcf59160 244026ee-ce70-4012-8e01-6f5de0656b41',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <AuthProvider {...oidcConfig}>
        <App />
    </AuthProvider>,

    // </React.StrictMode>
);
// serviceWorkerRegistration.register();

