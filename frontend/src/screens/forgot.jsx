import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ForgotForm from '../components/forgot-form';

const Forgot = () => {
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