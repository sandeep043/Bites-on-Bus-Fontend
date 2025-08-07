import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../../assessts/sandy.png'
import { FaPlane } from "react-icons/fa6";
import './Header.css'

function BasicExample() {
    const location = useLocation();
    const [navbarBg, setNavbarBg] = useState(false);
    const handleScroll = () => {
        setNavbarBg(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            className={`fixed-top ${navbarBg ? 'bg-white shadow-sm' : 'bg-transparent'}`}
        >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={navbarBg ? Logo : Logo}
                        alt="Logo"
                        className="logoStyle"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link
                            as={Link}
                            to="/about"
                            className={`nav-link-custom ${navbarBg ? 'text-dark' : 'text-white'} ${location.pathname === '/about' ? 'active-link' : ''}`}
                        >
                            About
                            {location.pathname === '/about' && (
                                <span className="active-indicator">
                                    <span className="indicator-line"></span>
                                    <FaPlane className="plane-icon" />
                                </span>
                            )}
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`nav-link-custom ${navbarBg ? 'text-dark' : 'text-white'} ${location.pathname === '/' ? 'active-link' : ''}`}
                        >
                            Cargo
                            {location.pathname === '/' && (
                                <span className="active-indicator">
                                    <span className="indicator-line"></span>
                                    <FaPlane className="plane-icon" />
                                </span>
                            )}
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`nav-link-custom ${navbarBg ? 'text-dark' : 'text-white'} ${location.pathname === '/' ? 'active-link' : ''}`}
                        >
                            Flights
                            {location.pathname === '/' && (
                                <span className="active-indicator">
                                    <span className="indicator-line"></span>
                                    <FaPlane className="plane-icon" />
                                </span>
                            )}
                        </Nav.Link>






                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;