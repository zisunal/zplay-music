import LoginForm from '../components/login-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
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