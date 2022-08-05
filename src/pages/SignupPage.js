import Button from 'react-bootstrap/Button';

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function SignupPage(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();


    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, password, username }; // Create an object representing the request body

        // If the request resolves with an error, set the error message in the state
        axios.post(`${process.env.REACT_APP_API_URL}/signup`, requestBody)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="SignupPage">
            <h1>Sign Up</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSignupSubmit}>
                <label>Email:
                    <input
                        type="email"
                        value={email}
                        required
                        placeholder="you@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>Password:
                    <input
                        type="password"
                        value={password}
                        required
                        placeholder="at least 8 Chars"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <label>Username:
                    <input
                        type="text"
                        value={username}
                        required
                        placeholder="free to try"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <br/><br/>
                
                <Button variant="warning" type="submit">SignUp</Button>
                <hr/>
            </form>

            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
        </div>
    )
}

export default SignupPage;
