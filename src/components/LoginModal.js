import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../context/auth.context';


function LoginModal(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const navigate = useNavigate();


    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, password };

        axios.post(`${process.env.REACT_APP_API_URL}/login`, requestBody)
            .then((response) => {
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
        <>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <br />

            <Button variant="primary" onClick={handleShow}>
                login to Account
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>login to Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="AddRecipePage">

                        <Form onSubmit={handleLoginSubmit}>
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
                            <Button variant="warning" type="submit" onClick={handleClose}>Login</Button>
                        </Form>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginModal;
