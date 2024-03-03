import { useEffect } from 'react';

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('token')
        window.location.href = '/login';
    }, []);

    return (
        <div className='login'>
            <h3>
                Logging Out...
                <span className="spinner"></span>
            </h3>
        </div>
    );
};

export default Logout;