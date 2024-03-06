import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

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

    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [user])

    const handleForm = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/api/users/update-email-otp', {
            method: 'POST',
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
        const res = await fetch('http://localhost:3001/api/users/update-email', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
                text : 'Email Updated Successfully' 
            }).then(() => {
                window.location.reload()
            })
        }
    }

    return (
        <form onSubmit={form == 'fst' ? handleForm : handleOTP}>
            <h3>Update Email</h3>
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
            <button type="submit">
                { formbtn }
                <FontAwesomeIcon icon={faRightToBracket} />
            </button>
        </form>
    );
}

export default UpdateEmailForm;