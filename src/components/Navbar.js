import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function NavBar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <Navbar bg="light" expand="lg">
            <Button variant="success">Success</Button>{' '}
            <Container>
                <Navbar.Brand href="/">{"DishMe(et)"}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/recipes">Recipes</NavLink>

                        {!isLoggedIn && (
                            <>
                                <NavDropdown title="Login/Signup" id="basic-nav-dropdown">
                                    <NavDropdown.Item >
                                        <NavLink to="/login">login to Account</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item >
                                        <NavLink to="/signup">create new Account</NavLink>
                                    </NavDropdown.Item>
                                </NavDropdown>

                            </>
                        )}

                        {isLoggedIn && (
                            <>
                                <NavDropdown title={user && (`👤 ${user.username}`)} id="basic-nav-dropdown">
                                    <NavDropdown.Item >
                                        <NavLink to="/profile">my Profile</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item >
                                        <NavLink to="/" onClick={logOutUser}>Logout</NavLink>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
