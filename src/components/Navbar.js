//import Nav from 'react-bootstrap/Nav';
// import { Button, ButtonGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"

import LoginModal from './LoginModal';

import SignUpModal from './SignUpModal';
import ProfilePageModal from './ProfilePageModal';

function NavBar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (

        <Navbar className='navbar' bg="warning" expand="lg">


            <Container>
                <Navbar.Brand href="/">{"DishMe(et)"}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {/* <NavLink to="/">Home</NavLink>
                    <NavLink to="/recipes">Recipes</NavLink> */}
                    {!isLoggedIn && (
                        <>
                            <LoginModal />
                            <SignUpModal />
                        </>
                    )}


                    {isLoggedIn && (
                        <>
                            <ProfilePageModal />
                            <NavLink to="/" onClick={logOutUser}><strong>Logout</strong></NavLink>
                        </>
                    )}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
