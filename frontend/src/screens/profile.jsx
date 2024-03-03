import { useState, useEffect, useContext } from 'react'
import { LoginContext } from '../contexts/login-context'
import ProfileForm from '../components/profile-form'

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
            <h3>Edit Your Profile</h3>
            <ProfileForm user={user} />
        </div>
    )
}

export default Profile