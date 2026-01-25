import React from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section">
                    <h3>{profile.name}</h3>
                    <p>{profile.title}</p>
                    <p>{profile.department}</p>
                    <p>{profile.university}</p>
                </div>
                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>{profile.email}</p>
                    <p>{profile.address}</p>
                </div>
                <div className="footer-section">
                    <h3>Connect</h3>
                    <div className="social-links">
                        {Object.entries(profile.social).map(([key, url]) => (
                            <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="social-link">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {currentYear} {profile.name}. All rights reserved. | <Link to="/admin/login" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.5 }}>Admin</Link></p>
            </div>
        </footer>
    );
};

export default Footer;
