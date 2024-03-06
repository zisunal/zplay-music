import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUserLock, faLockOpen, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

const UpdatePasswordForm = () => {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [conPassword, setConPassword] = useState('')

    const handleForm = async (e) => {
        e.preventDefault()
        if (newPassword !== conPassword) {
            Swal.fire({
                title : 'Sorry!',
                icon: 'info',
                text : 'New Password and Retype New Password do not match'
            })
            return
        }
        if (newPassword.length < 7) {
            Swal.fire({
                title : 'Sorry!',
                icon: 'info',
                text : 'Password must be at least 7 characters long'
            })
            return
        }
        const res = await fetch('http://localhost:3001/api/users/update-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({ password, newPassword })
        })
        const data = await res.json()
        if (res.status != 200) {
            Swal.fire({
                title : 'Sorry!',
                icon: 'info',
                text : data.message 
            })
        } else {
            Swal.fire({
                title : 'Done',
                icon: 'success',
                text : 'Password Updated Successfully' 
            }).then(() => {
                window.location.reload()
            })
        }
    }

    return (
        <form onSubmit={ handleForm }>
            <h3>Change Password</h3>
            <div className="input-group">
                <input
                    id='currPassword'
                    type="password"
                    placeholder="Current Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="currPassword">
                    <FontAwesomeIcon icon={faLockOpen} />
                </label>
            </div>
            <div className="input-group">
                <input
                    id='password'
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="password">
                    <FontAwesomeIcon icon={faLock} />
                </label>
            </div>
            <div className="input-group">
                <input
                    id='conPassword'
                    type="password"
                    placeholder="Retype New Password"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                />
                <label htmlFor="conPassword">
                    <FontAwesomeIcon icon={faCheckDouble} />
                </label>
            </div>
            <button type="submit">
                Update Password
                <FontAwesomeIcon icon={faUserLock} />
            </button>
        </form>
    );
}

export default UpdatePasswordForm;