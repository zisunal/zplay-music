import { useState, useEffect, useContext } from 'react'
import { LoginContext } from '../contexts/login-context'
import ProfileForm from '../components/profile-form'
import UpdateEmailForm from '../components/update-email-form'
import UpdateUsernameForm from '../components/update-username-form'
import UpdatePasswordForm from '../components/update-password-form'

const Profile = () => {
    const { isLoggedIn, userData } = useContext(LoginContext)
    const [user, setUser] = useState({})
    useEffect(() => {
        if (isLoggedIn) {
            setUser(userData)
        } else {
            window.location.href = '/login'
        }
    }, [isLoggedIn])
    return (
        <div className="login">
            <div className="hor">
                <ProfileForm user={user} />
                <div className="ver">
                    <UpdateEmailForm user={user} />
                    <UpdateUsernameForm user={user} />
                </div>
                <UpdatePasswordForm />
            </div>
        </div>
    )
}

export default Profile