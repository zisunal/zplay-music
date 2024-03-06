import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'

// Create the login context
export const LoginContext = createContext();

// Create the login provider component
export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)

    const fetchUserData = async (token) => {
        try {
            // Make an API call to fetch user data using the token
            const response = await fetch('http://localhost:3001/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userDataVal = await response.json()
                return userDataVal
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Failed to fetch user data', error);
        }
    }

    const checkExpiryofToken = async (token) => {
        try {
            const decodedToken = jwtDecode(token)
            return decodedToken.exp * 1000
        } catch (error) {
            console.error('Failed to check token expiry', error);
        }
    }
    
    useEffect(() => {
        // Check if the user is logged in on component mount
        const token = localStorage.getItem('token')
        if (token) {
            const expiry = checkExpiryofToken(token)
            if (expiry < new Date().getTime()) {
                localStorage.removeItem('token')
            } else {
                setIsLoggedIn(true)
                fetchUserData(token).then((userDataVal) => {
                    setUserData(userDataVal)
                })
            }
        }
    }, [userData]);

    return (
        <LoginContext.Provider value={{ isLoggedIn, userData }}>
            {children}
        </LoginContext.Provider>
    )
};