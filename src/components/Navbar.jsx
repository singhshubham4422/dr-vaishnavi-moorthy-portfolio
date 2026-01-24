import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { profile } from '../data/profile';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    {profile.name}
                </Link>
                <div className="navbar-toggle" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    <li className="navbar-item"><NavLink to="/" className="navbar-link" onClick={toggleMenu}>Home</NavLink></li>
                    <li className="navbar-item"><NavLink to="/faculty" className="navbar-link" onClick={toggleMenu}>Faculty Platform</NavLink></li>
                    <li className="navbar-item"><NavLink to="/contact" className="navbar-link" onClick={toggleMenu}>Contact</NavLink></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
