import LoginForm from '../components/login-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useContext } from 'react'
import { LoginContext } from '../contexts/login-context'

const Login = () => {
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
                <span>Login to your account</span>
            </h3>
            <LoginForm />
        </div>
    );
}

export default Login;