import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { profile } from '../data/profile';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            // Simulate submission
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000); // Reset after 3s
            setFormData({ name: '', email: '', message: '' });
        }
    };

    return (
        <div className="contact-page">
            <Helmet>
                <title>{profile.name} | Contact</title>
            </Helmet>

            <div className="container">
                <section className="section contact-section">
                    <h1>Contact</h1>

                    <div className="contact-grid">
                        <div className="contact-info">
                            <h3>Get in Touch</h3>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Office:</strong> {profile.office}</p>
                            <p><strong>Address:</strong> {profile.address}</p>
                            <p><strong>Office Hours:</strong> Mondays 2:00 - 4:00 PM</p>

                            <div className="map-container">
                                {/* Google Maps Embed Placeholder - using iframe */}
                                <iframe
                                    title="Office Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9!2d-71.09!3d42.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDIxJzM2LjAiTiA3McKwMDUnMjQuMCJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy">
                                </iframe>
                            </div>
                        </div>

                        <div className="contact-form-wrapper">
                            <h3>Send a Message</h3>
                            {submitted ? (
                                <div className="success-message">Message sent successfully!</div>
                            ) : (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" required></textarea>
                                    </div>
                                    <button type="submit" className="btn">Send Message</button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
