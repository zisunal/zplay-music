import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRightToBracket, faLock, faRedo } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const UpdateEmailForm = ({ user }) => {
    const [email, setEmail] = useState('')
    const [otp, setOTP] = useState('hidden')
    const [emailField, setEmailField] = useState('email')
    const [formbtn, setFormbtn] = useState('Send OTP')
    const [otpval, setOtpval] = useState('')
    const [form, setForm] = useState('fst')
    const [updateEmail, setUpdateEmail] = useState('')
    const [otpdisplay, setOtpdisplay] = useState('none')
    const [emaildisplay, setEmaildisplay] = useState('inline')
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const [passdisplay, setPassDisplay] = useState('none')

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [user])

    const handleForm = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/api/users/password-reset-otp', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({ email })
        });
        const data = await res.json()
        if (res.status === 200) {
            setUpdateEmail(data.email)
            setForm('scnd')
            setOTP('number')
            setFormbtn('Validate OTP')
            setOtpdisplay('inline')
            setEmailField('hidden')
            setEmaildisplay('none')
            Swal.fire({
                title: 'OTP Sent',
                text: 'OTP has been sent to your email',
                icon: 'success',
            })
        } else {
            Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'error',
            })
        }
    }

    const handleOTP = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3001/api/users/validate-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: updateEmail, otp: otpval })
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
                text : 'OTP Verified. You can set a new password now.' 
            })
            setForm('thrd')
            setOTP('hidden')
            setFormbtn('Set Password')
            setOtpdisplay('none')
            setPassDisplay('flex')
        }
    }

    const setNewPassword = async (e) => {
        e.preventDefault()
        if (password != conPassword) {
            Swal.fire({
                title : 'Sorry!',
                icon: 'info',
                text : 'Passwords do not match' 
            })
            return
        }
        if (password.length < 7) {
            Swal.fire({
                title : 'Sorry!',
                icon: 'info',
                text : 'Password must be at least 7 characters' 
            })
            return
        }

        const res = await fetch('http://localhost:3001/api/users/reset-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: updateEmail, password: password, otp: otpval })
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
                text : 'Password Reset Successfully' 
            }).then(() => {
                navigate('/login')
            })
        }
    }

    return (
        <form onSubmit={form == 'fst' ? handleForm : (form == 'scnd' ? handleOTP : setNewPassword)}>
            <div className="input-group">
                <input
                    id='email'
                    type={emailField}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email" style={{ display: emaildisplay }}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </label>
            </div>
            <div className="input-group">
                <input
                    id='otp'
                    type={otp}
                    placeholder="Enter OTP Here"
                    value={otpval}
                    onChange={e => {setOtpval(e.target.value)}}
                />
                <label htmlFor="otp" style={{ display: otpdisplay }}>
                    OTP
                </label>
            </div>
            <div style={{ display: passdisplay }} className="input-group">
                <input
                    id='password'
                    type='password'
                    placeholder="Enter New Password"
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                />
                <label htmlFor="password">
                    <FontAwesomeIcon icon={faLock} />
                </label>
            </div>
            <div style={{ display: passdisplay }} className="input-group">
                <input
                    id='conPassword'
                    type='password'
                    placeholder="Confirm New Password"
                    value={conPassword}
                    onChange={e => {setConPassword(e.target.value)}}
                />
                <label htmlFor="conPassword">
                    <FontAwesomeIcon icon={faRedo} />
                </label>
            </div>
            <button type="submit">
                { formbtn }
                <FontAwesomeIcon icon={faRightToBracket} />
            </button>
        </form>
    );
}

export default UpdateEmailForm;