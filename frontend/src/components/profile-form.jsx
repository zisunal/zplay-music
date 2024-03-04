import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

const ProfileForm = ({ user }) => {
    const [fullName, setFullName] = useState('')
    const [monthb, setMonthb] = useState('')
    const [yearb, setYearb] = useState('')
    const [dateb, setDateb] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')

    const calculateAge = () => {
        if (user.dob) {
            const today = new Date();
            const dob = new Date(user.dob);
            const ageInMilliseconds = today - dob;
            const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24))
            const years = Math.floor(ageInDays / 365)
            const months = Math.floor((ageInDays % 365) / 30)
            const days = (ageInDays % 365) % 30
            setAge(`${years} year${years > 1 ? 's': ''}, ${months} month${months > 1 ? 's': ''}, ${days} day${days > 1 ? 's': ''}`)
        }
    }

    useEffect(() => {
        if (user) {
            setFullName(user.fullName)
            setMonthb(new Date(user.dob).getMonth() + 1)
            setYearb(new Date(user.dob).getFullYear())
            setDateb(new Date(user.dob).getDate())
            setGender(user.gender)
            calculateAge()
        }
    }, [user])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            if (!fullName || !monthb || !yearb || !dateb || !gender) {
                return Swal.fire('Error', 'All the fields are required', 'info')
            }
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3001/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    fullName,
                    dob: new Date(yearb, monthb - 1, dateb),
                    gender
                })
            })
            if (response.ok) {
                Swal.fire('Updated', 'Profile updated successfully', 'success').then(() => {
                    window.location.reload()
                })
            } else {
                Swal.fire('Sorry', 'Failed to update profile', 'error')
            }
        } catch (error) {
            console.error('Failed to update profile', error)
        }
    }

    return (
        <form onSubmit={handleUpdate}>
            <div className="input-group">
                <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)}
                    required 
                />
                <label htmlFor="fullName">Name</label>
            </div>
            <h3>Date of Birth</h3>
            <div className="form-group">
                <div className="input-group">
                    <input 
                        type="number"
                        id="monthb" 
                        name="monthb"
                        min="1"
                        max="12"
                        value={monthb} 
                        onChange={(e) => setMonthb(e.target.value)}
                        required 
                    />
                    <label htmlFor="monthb">MM</label>
                </div>
                <div className="input-group">
                    <input 
                        type="number"
                        id="dateb" 
                        name="dateb"
                        min="1"
                        max="31"
                        value={dateb} 
                        onChange={(e) => setDateb(e.target.value)}
                        required 
                    />
                    <label htmlFor="dateb">DD</label>
                </div>
                <div className="input-group">
                    <input 
                        type="number"
                        id="yearb" 
                        name="yearb"
                        max={new Date().getFullYear() - 16}
                        value={yearb} 
                        onChange={(e) => setYearb(e.target.value)}
                        required 
                    />
                    <label htmlFor="yearb">Y</label>
                </div>
            </div>
            <h4 style={{ color: 'var(--primary-color)' }} >Age: {age}</h4>
            <div className="input-group">
                <select 
                    id="gender" 
                    name="gender" 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)}
                    required 
                >
                    <option value="male" { ... (gender == 'male') ? ('selected') : '' } >Male</option> 
                    <option value="female" { ... (gender == 'female') ? ('selected') : '' }>Female</option> 
                    <option value="other" { ... (gender == 'other') ? ('selected') : '' }>Other</option> 
                </select>
                <label htmlFor="gender">Gender</label>
            </div>
            <div>
                <button type="submit">Update Profile</button>
            </div>
        </form>
    );
}

export default ProfileForm