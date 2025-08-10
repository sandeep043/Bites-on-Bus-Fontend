import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Menu } from "lucide-react";
import { Button } from "react-bootstrap";
import Logo from '../../../assessts/sandy.png'

import "./Header.css";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-content">
                    {/* Logo */}
                    <div className="logo-container" onClick={() => navigate('/')}>
                        <img
                            src={Logo}
                            alt="Logo"
                            className="logo"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="desktop-nav">
                        <button
                            onClick={() => navigate('/')}
                            className="nav-button"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate('/about')}
                            className="nav-button"
                        >
                            About
                        </button>
                        <button
                            onClick={() => navigate('/order')}
                            className="nav-button"
                        >
                            Food Order
                        </button>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="auth-buttons">
                        <Button
                            onClick={() => navigate('/login')}
                            className="signup-button"

                        >
                            <User className="button-icon" />
                            Login
                        </Button>
                        <Button
                            onClick={() => navigate('/signup')}
                            className="signup-button"
                        >
                            Sign Up
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="mobile-menu-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="icon" />
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="mobile-nav">
                        <div className="mobile-nav-content">
                            <button
                                onClick={() => { navigate('/'); setIsMenuOpen(false); }}
                                className="mobile-nav-button"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => { navigate('/about'); setIsMenuOpen(false); }}
                                className="mobile-nav-button"
                            >
                                About
                            </button>
                            <button
                                onClick={() => { navigate('/track-order'); setIsMenuOpen(false); }}
                                className="mobile-nav-button"
                            >
                                Track Order
                            </button>
                            <div className="mobile-auth-buttons">
                                <Button

                                    onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                                    className="btn mobile-login-button"
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}
                                    className="btn mobile-signup-button"
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;