import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }


    const authenticateUser = () => {

        const storedToken = localStorage.getItem('authToken'); // Get the stored token from the localStorage

        // If the token exists in the localStorage
        if (storedToken) {
            axios.get(
                `${process.env.REACT_APP_API_URL}/verify`,
                { headers: { Authorization: `Bearer ${storedToken}` } } // must send JWT token in request's "Authorization" Headers
            )
                .then((response) => {
                    const payload = response.data; // If the server verifies that JWT token is valid          
                    setIsLoggedIn(true);           // Update state variables
                    setIsLoading(false);
                    setUser(payload);
                })
                .catch((error) => {                         
                    setIsLoggedIn(false);          // If the server sends an error response (invalid token) 
                    setIsLoading(false);           // Update state variables   
                    setUser(null);
                });
        } else {
            setIsLoggedIn(false);                  // If the token is not available (or is removed)
            setIsLoading(false);
            setUser(null);
        }
    }


    const logOutUser = () => {
        localStorage.removeItem("authToken"); // To log out the user, remove the token
        authenticateUser();                   // and update the state variables
    }


    useEffect(() => {
        authenticateUser();
    }, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };