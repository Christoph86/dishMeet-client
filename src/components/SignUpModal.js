import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../context/auth.context';


function SignUpModal(props) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const navigate = useNavigate();


    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, password, username };

        // If the request resolves with an error, set the error message in the state
        axios.post(`${process.env.REACT_APP_API_URL}/signup`, requestBody)
            .then((response) => {
                axios.post(`${process.env.REACT_APP_API_URL}/login`, requestBody)
                .then((response) => {
                    console.log('JWT token from Modal login: ', response.data.authToken);
                    storeToken(response.data.authToken);
                    authenticateUser();
                    navigate('/');
                })
            })
            .catch((error) => {
                const errorDescription = error.response.data.errorMessage;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <br />

            <Button variant="primary" onClick={handleShow}>
                SignUp!
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>signUp to our Community</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="AddRecipePage">

                        <Form onSubmit={handleSignupSubmit}>

                        <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="warning" type="submit" onClick={handleClose}>create Account</Button>
                        </Form>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SignUpModal;
