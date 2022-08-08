import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from '../context/auth.context';


function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const { storeToken, authenticateUser } = useContext(AuthContext);


    const navigate = useNavigate();


    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const requestBody = { username, password };

        axios.post(`${process.env.REACT_APP_API_URL}/login`, requestBody)
            .then((response) => {
                // console.log('JWT token', response.data.authToken);
                storeToken(response.data.authToken);
                authenticateUser();
                navigate('/');
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="LoginPage">
            <h1>Login</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <Form onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="warning" type="submit">Login</Button>
            </Form>

            <p>Don't have an account yet?</p>
            <Link to={"/signup"}> Sign Up</Link>
        </div>
    )
}

export default LoginPage;
