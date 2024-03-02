import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const ForgotForm = () => {
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
            <button type="submit">
                Send OTP
                <FontAwesomeIcon icon={faRightToBracket} />
            </button>
            <Link to="/login">Remembered Password? Login</Link>
        </form>
    );
}

export default ForgotForm;