import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

const UpdateUsernameForm = ({ user }) => {
    const [username, setUsername] = useState('')
    const [formbtn, setFormbtn] = useState('Check Availability')
    const [form, setForm] = useState('fst')
    const [updatedUsername, setUpdatedUsername] = useState('')
    const [inputStyle, setInputStyle] = useState('')

    useEffect(() => {
        if (user) {
            setUsername(user.username);
        }
    }, [user])

    const checkAvailability = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/api/users/check-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({ username })
        });
        const data = await res.json()
        if (res.status === 200) {
            if (data.available) {
                setUpdatedUsername(data.username)
                setForm('scnd')
                setInputStyle('none')
                setFormbtn('Confirm Username as ' + data.username)
            } else {
                Swal.fire({
                    title: 'Sorry',
                    text: 'Username already taken',
                    icon: 'info',
                })
                setFormbtn('Try Again')
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'error',
            })
        }
    }

    const updateUsername = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3001/api/users/update-username', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({ username: updatedUsername })
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
                text : 'Username Updated Successfully' 
            }).then(() => {
                window.location.reload()
            })
        }
    }

    return (
        <form style={{marginTop: '15px'}} onSubmit={form == 'fst' ? checkAvailability : updateUsername}>
            <h3>Update Username</h3>
            <div style={{ display:inputStyle }} className="input-group">
                <input
                    id='username'
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">
                    @
                </label>
            </div>
            <button type="submit">
                { formbtn }
                <FontAwesomeIcon icon={faRightToBracket} />
            </button>
        </form>
    );
}

export default UpdateUsernameForm;