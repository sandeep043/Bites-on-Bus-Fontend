import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Menu } from "lucide-react";
import { Button } from "react-bootstrap";
import Logo from '../../../assessts/sandy.png'

import "./Header.css";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isTravelerAuthenticated');
        localStorage.removeItem('isAdminAuthenticated');
        localStorage.removeItem('isDeliveryAuthenticated');
        localStorage.removeItem('isRestaurantAuthenticated');
        localStorage.removeItem('token');
        navigate('/login');
    };

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
                        <button
                            onClick={() => navigate('/myorders')}
                            className="nav-button"
                        >
                            my orders
                        </button>
                    </nav>

                    {isAuthenticated ? (
                        <div className="user-menu">

                            <Button
                                variant="danger"

                                className="user-logout-button"
                                onClick={handleLogout}
                            >
                                <User className="button-icon" />
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Button
                                variant="secondary"
                                className="header-signup-button"
                                onClick={() => navigate('/login')}
                            >
                                <User className="button-icon" />
                                Login
                            </Button>
                            <Button

                                variant="secondary"
                                className="header-signup-button"
                                onClick={() => navigate('/signup')}
                            >
                                Register
                            </Button>
                        </div>
                    )}




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
                                onClick={() => { navigate('/order'); setIsMenuOpen(false); }}
                                className="mobile-nav-button"
                            >
                                Track Order
                            </button>
                            <button
                                onClick={() => { navigate('/myorders'); setIsMenuOpen(false); }}
                                className="mobile-nav-button"
                            >
                                my orders
                            </button>
                            {isAuthenticated ? (
                                <div className="mobile-auth-buttons">
                                    <Button
                                        variant="danger"
                                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                        className="btn header-mobile-logout-button"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className="mobile-auth-buttons">
                                    <Button
                                        variant="secondary"
                                        onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                                        className="btn header-mobile-login-button"
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}
                                        className="btn header-mobile-signup-button"
                                    >
                                        Register
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;