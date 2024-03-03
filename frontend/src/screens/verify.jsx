import { useEffect } from 'react'

const Verify = () => {

    const verify = async () => {
        const url = window.location.href
        const id = url.split('/verify/')[1]
        const response = await fetch('http://localhost:3001/api/users/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        window.location.href = '/login'
    }

    useEffect(() => {
        verify()
    }, [])

    return (
        <div className="login">
            <h3>
                Verifying Your Email...
                <span className="spinner"></span>
            </h3>
        </div>
    )
}

export default Verify