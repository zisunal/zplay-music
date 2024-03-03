import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import RegisterForm from '../components/register-form';
import { useEffect, useContext } from 'react'
import { LoginContext } from '../contexts/login-context'

const Register = () => {
    const { isLoggedIn } = useContext(LoginContext)
    useEffect(() => {
        if (isLoggedIn) {
            window.location.href = '/';
        }
    }, [isLoggedIn])
    return (
        <div className="login">
            <h3>
                <FontAwesomeIcon icon={faUser} />
                <span>Create a new account</span>
            </h3>
            <RegisterForm />
        </div>
    );
}

export default Register;