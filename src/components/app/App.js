// import logo from './logo.svg';
import './App.css';
import AppHeader from '../appHeader/AppHeader';
import RequireAuth from './RequireAuth';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import {
    // IndividualsPage,
    // ExampleWithProviders,
    WagonPage,
    // ExampleWithReactQueryProvider,
    ExampleWithLocalizationProvider,
    LoginPage,
    LogOut,
} from '../pages';
import { AuthProvider } from '../useAuth';
// import AuthConsumer from '../useAuth';

// import { IndividualsPage, ExampleWithProviders } from '../pages';
// import authContext from './context';
// import { useEffect, useState, useContext } from 'react';

function App() {
    // const context = useContext(authContext);
    // const [auth, setAuth] = useState({
    //     user: '',
    //     accessToken: '',
    // });
    // useEffect(() => {
    //     setAuth({
    //         user: context.user,
    //         accessToken: context.accessToken,
    //     });
    // }, [context]);

    // const context = useContext(authContext);
    // console.log(context);
    return (
        <Router>
            <AuthProvider>
                <div className="app">
                    <AppHeader />

                    <main>
                        <Routes>
                            {/* <Route path="/" element={<IndividualsPage />} /> */}
                            <Route
                                // path="/individualsCRUD"
                                path="/"
                                element={<ExampleWithLocalizationProvider />}
                            />
                            <Route
                                path="/wagon"
                                element={
                                    <RequireAuth>
                                        <WagonPage />
                                    </RequireAuth>
                                }
                            />

                            <Route
                                path="/login"
                                element={
                                    <LoginPage
                                        title={'Вход:'}
                                        isRegister={false}
                                    />
                                }
                            />
                            <Route
                                path="/registration"
                                element={
                                    <LoginPage
                                        title={'Регистрация:'}
                                        isRegister={true}
                                    />
                                }
                            />

                            <Route path="/logout" element={<LogOut />} />
                        </Routes>
                    </main>
                </div>
            </AuthProvider>
        </Router>
    );
}
// function RequireAuth({ children }) {
//     const { authed } = useAuth();

//     return authed === true ? children : <Navigate to="/login" replace />;
// }
export default App;

