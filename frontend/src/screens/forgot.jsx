import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ForgotForm from '../components/forgot-form';
import { useEffect, useContext } from 'react'
import { LoginContext } from '../contexts/login-context'

const Forgot = () => {
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
                <span>Reset Your Password</span>
            </h3>
            <ForgotForm />
        </div>
    );
}

export default Forgot;