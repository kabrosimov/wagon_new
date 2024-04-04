import { Link, NavLink } from 'react-router-dom';
// import authContext from '../app/context';
// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import AuthConsumer from '../useAuth';
// import { useAuth } from '../useAuth';

import './appHeader.css';

const AppHeader = () => {
    const { authed } = AuthConsumer();
    // console.log(authed);
    // const navigate = useNavigate();
    // const handleLogout = () => {
    //     logout();
    //     navigate('/');
    // };
    // console.log(navigate);
    // const context = useContext(authContext);
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>НИИЭВМ</span>
                    Сервис
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    {/* <li>
                        <NavLink
                            style={({ isActive }) => ({
                                color: isActive ? '#9f0013' : 'inherit',
                            })}
                            to="/"
                        >
                            Individuals
                        </NavLink>
                    </li>
                    / */}
                    <li>
                        <NavLink
                            style={({ isActive }) => ({
                                color: isActive ? '#9f0013' : 'inherit',
                            })}
                            to="/"
                        >
                            IndividualsCRUD
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            style={({ isActive }) => ({
                                color: isActive ? '#9f0013' : 'inherit',
                            })}
                            to="/wagon"
                        >
                            Wagon
                        </NavLink>
                    </li>
                    /{/* {!localStorage.accessToken ? ( */}
                    {!authed && !sessionStorage.accessToken ? (
                        <li>
                            <NavLink
                                style={({ isActive }) => ({
                                    color: isActive ? '#9f0013' : 'inherit',
                                })}
                                to="/login"
                            >
                                Login
                            </NavLink>
                        </li>
                    ) : (
                        <li>
                            <NavLink
                                style={({ isActive }) => ({
                                    color: isActive ? '#9f0013' : 'inherit',
                                })}
                                to="/logout"
                            >
                                Logout (
                                {sessionStorage.userName ??
                                    localStorage.userName}
                                )
                            </NavLink>
                        </li>
                    )}
                    {/* {<button onClick={handleLogout}>Logout</button>} */}
                    {/* {authed && <button onClick={handleLogout}>Logout</button>} */}
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
