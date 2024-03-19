import { Link, NavLink } from 'react-router-dom';

import './appHeader.css';

const AppHeader = () => {
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
                    <li>
                        <NavLink
                            style={({ isActive }) => ({
                                color: isActive ? '#9f0013' : 'inherit',
                            })}
                            to="/"
                        >
                            Individuals
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            style={({ isActive }) => ({
                                color: isActive ? '#9f0013' : 'inherit',
                            })}
                            to="/individualsCRUD"
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
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
