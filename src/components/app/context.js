import { createContext } from 'react';
const authContext = createContext({
    user: '',
    accessToken: '',
});

export default authContext;
