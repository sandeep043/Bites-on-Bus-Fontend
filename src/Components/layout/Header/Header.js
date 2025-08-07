import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bus, User, Menu } from "lucide-react";

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
                        <div className="logo-icon">
                            <Bus className="icon" />
                        </div>
                        <div>
                            <h1 className="logo-title">BusEats</h1>
                            <p className="logo-subtitle">Fresh food on the go</p>
                        </div>
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
                            onClick={() => navigate('/track-order')}
                            className="nav-button"
                        >
                            Track Order
                        </button>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="auth-buttons">
                        <button
                            onClick={() => navigate('/login')}
                            className="signup-button"

                        >
                            <User className="button-icon" />
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="signup-button"
                        >
                            Sign Up
                        </button>
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
                                <button
                                    variant="outline"
                                    onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                                    className="mobile-login-button"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}
                                    className="mobile-signup-button"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;