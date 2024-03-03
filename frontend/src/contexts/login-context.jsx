import { createContext, useState, useEffect } from 'react';

// Create the login context
export const LoginContext = createContext();

// Create the login provider component
export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Check if the user is logged in on component mount
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            // Fetch user data here and set it in state
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            // Make an API call to fetch user data using the token
            const response = await fetch('http://localhost:3001/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);
            } else {
                // Handle error response
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Failed to fetch user data', error);
        }
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, userData }}>
            {children}
        </LoginContext.Provider>
    );
};