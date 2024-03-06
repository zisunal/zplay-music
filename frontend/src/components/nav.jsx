import {Link} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../contexts/login-context';

const Nav = () => {
    const { isLoggedIn, userData } = useContext(LoginContext);
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(userData);
    }, [userData]);
    
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h2>Home</h2>
                </Link>
                <nav>
                    <ul>
                    {
                        (isLoggedIn) ? (
                            <li>
                                <Link to="/profile" data-text={user && user.username}>{user && user.username}</Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/register" data-text="Register">Register</Link>
                            </li>
                        )
                    }
                    {
                        (isLoggedIn) ? (
                            <li>
                                <Link to="/logout" data-text="Logout">Logout</Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login" data-text="Login">Login</Link>
                            </li>
                        )
                    }
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Nav