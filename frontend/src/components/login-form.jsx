import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form>
            <div className="input-group">
                <input
                    id='email'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} />
                </label>
            </div>
            <div className="input-group">
                <input
                    id='password'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">
                    <FontAwesomeIcon icon={faKey} />
                </label>
            </div>
            
            <Link className='forgot' to="/forgot">Forgot Password?</Link>
            <button type="submit">
                Login
                <FontAwesomeIcon icon={faRightToBracket} />
            </button>
            <Link to="/register">Don't have an account? Register</Link>
        </form>
    );
}

export default LoginForm;