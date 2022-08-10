import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import { NavLink } from "react-router-dom";
import LoginModal from './LoginModal';
import { Button, ButtonGroup } from 'react-bootstrap';
import SignUpModal from './SignUpModal';

function NavBar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <Navbar className='navbar' bg="warning" expand="lg">
            <Container>
                <Navbar.Brand href="/">{"DishMe(et)"}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/recipes">Recipes</NavLink>
                    {!isLoggedIn && (
                        <>
                            <LoginModal />
                            <SignUpModal />
                        </>
                    )}


                    {isLoggedIn && (
                        <>
                            <NavDropdown title={user && (`👤 ${user.username}`)} id="basic-nav-dropdown">
                                <NavDropdown.Item >
                                    <NavLink to="/profile"><strong>my Profile</strong></NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >
                                    <NavLink to="/" onClick={logOutUser}><strong>Logout</strong></NavLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
