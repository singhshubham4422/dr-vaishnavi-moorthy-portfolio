import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { homeData } from '../data/homeData';
import { profile } from '../data/profile';
import { ArrowRight } from 'lucide-react';
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
                            <Link to="/faculty" className="btn hero-btn btn-primary">
                                Visit Faculty Platform
                            </Link>
                            <Link to="/contact" className="btn hero-btn btn-secondary">
                                Contact Me
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image-wrapper">
                        <img src={homeData.hero.image} alt={profile.name} className="hero-image" />
                    </div>
                </div>
            </section>

            <section className="section Bio-snippet-section">
                <div className="container text-center">
                    <h3>Welcome to the Faculty Portal</h3>
                    <p className="bio-text" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
                        This platform serves as a hub for students and researchers to connect with {profile.name}.
                        Explore active research opportunities, apply for projects, or join the ACM Student Chapter leadership team.
                    </p>
                    <Link to="/faculty" className="btn">
                        Explore Opportunities <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
