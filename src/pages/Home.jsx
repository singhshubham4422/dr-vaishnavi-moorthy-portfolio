import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { homeData } from '../data/homeData';
import { profile } from '../data/profile';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <Helmet>
                <title>{profile.name} | Home</title>
                <meta name="description" content={homeData.bioSnippet} />
            </Helmet>

            <section className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1 className="hero-name">{profile.name}</h1>
                        <h2 className="hero-title">{profile.title}</h2>
                        <p className="hero-headline">{homeData.hero.headline}</p>
                        <p className="hero-subheadline">{homeData.hero.subheadline}</p>
                        <div className="hero-buttons">
                            {homeData.quickLinks.map((link, index) => (
                                <Link key={index} to={link.url} className="btn hero-btn">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="hero-image-wrapper">
                        <img src={homeData.hero.image} alt={profile.name} className="hero-image" />
                    </div>
                </div>
            </section>

            <section className="section Bio-snippet-section">
                <div className="container">
                    <h3>About Me</h3>
                    <p className="bio-text">{homeData.bioSnippet}</p>
                    <Link to="/about" className="read-more-link">Read full biography &rarr;</Link>
                </div>
            </section>

            <section className="section interests-section">
                <div className="container">
                    <h3>Research Interests</h3>
                    <div className="interests-grid">
                        {homeData.interests.map((interest, index) => (
                            <div key={index} className="interest-card">
                                {interest}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
