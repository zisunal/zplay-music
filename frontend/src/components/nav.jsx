import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h2>Home</h2>
                </Link>
                <nav>
                    <ul>
                        <li>
                            <Link to="/login" data-text="Login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" data-text="Register">Register</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Nav