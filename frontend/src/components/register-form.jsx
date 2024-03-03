import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faVenusMars, faEnvelope, faKey, faRightToBracket, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

const RegisterForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const handleForm = async (e) => {
        e.preventDefault();
        if (password !== conPassword || password.length < 8) {
            Swal.fire({
                title: 'Sorry!',
                icon: 'info',
                text: 'Password and Confirm Password do not match or password length is less than 8 characters. Please try again.'
            });
            return;
        }
        const user = {
            fullName,
            email,
            dob,
            gender,
            password,
            verifyUrl: window.location.href.replace('register', 'verify') + '/:id',
        };
        const response = await fetch('http://localhost:3001/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.status === 200) {
            Swal.fire({
                title: 'Success',
                icon: 'success',
                text: 'User registered successfully. Please verify your email'
            });
        } else {
            Swal.fire({
                title: 'Sorry!',
                icon: 'error',
                text: response.message
            });
        }
    }

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 16);

    return (
        <form method='POST' onSubmit={handleForm}>
            <div className="input-group">
                <input
                    id='fullName'
                    name='fullName'
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <label htmlFor="name">
                    <FontAwesomeIcon icon={faAddressBook} />
                </label>
            </div>
            <div className="input-group">
                <input
                    id='email'
                    name='email'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} />
                </label>
            </div>
            <div className="input-group">
                <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <label htmlFor="gender">
                    <FontAwesomeIcon icon={faVenusMars} />
                </label>
            </div>
            <div className="input-group">
                <input
                    id='dob'
                    name='dob'
                    type="date"
                    placeholder="Date of Birth"
                    value={dob}
                    max={maxDate.toISOString().split('T')[0]}
                    onChange={(e) => setDob(e.target.value)}
                    required
                />
                <label htmlFor="dob">
                    <FontAwesomeIcon icon={faCakeCandles} />
                </label>
            </div>
            <div className="input-group">
                <input
                    id='password'
                    name='password'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="password">
                    <FontAwesomeIcon icon={faKey} />
                </label>
            </div>
            <div className="input-group">
                <input
                    id='conPassword'
                    name='conPassword'
                    type="password"
                    placeholder="Confirm Password"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    required
                />
                <label htmlFor="conPassword">
                    <FontAwesomeIcon icon={faKey} />
                </label>
            </div>
            <button type="submit">
                Register
                <FontAwesomeIcon icon={faRightToBracket} />
            </button>
            <Link to="/login">Already have an account? Login</Link>
        </form>
    );
}

export default RegisterForm;