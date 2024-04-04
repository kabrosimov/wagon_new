import { createContext, useState, useContext } from 'react';

const authContext = createContext();

export function useAuth() {
    const [authed, setAuthed] = useState(
        !!sessionStorage.accessToken || !!localStorage.accessToken,
    );
    console.log(authed);
    return {
        authed,
        login() {
            return new Promise(res => {
                setAuthed(true);
                res();
                console.log(authed);
            });
        },
        logout() {
            return new Promise(res => {
                setAuthed(false);
                res();
            });
        },
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return useContext(authContext);
}
