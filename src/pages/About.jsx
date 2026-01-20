import React from 'react';
import { Helmet } from 'react-helmet';
import { aboutData } from '../data/aboutData';
import { profile } from '../data/profile';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <Helmet>
                <title>{profile.name} | About</title>
                <meta name="description" content={`Biography and CV of ${profile.name}`} />
            </Helmet>

            <div className="container">
                <section className="section biography-section">
                    <h1>About Me</h1>
                    <div className="bio-full">
                        {aboutData.biography.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </section>

                <hr className="divider" />

                <div className="about-grid">
                    <div className="about-col">
                        <section className="section education-section">
                            <h2>Education</h2>
                            <div className="timeline">
                                {aboutData.education.map((edu, index) => (
                                    <div key={index} className="timeline-item">
                                        <div className="year">{edu.year}</div>
                                        <div className="content">
                                            <h4>{edu.degree}</h4>
                                            <p className="institution">{edu.institution}</p>
                                            {edu.details && <p className="details">{edu.details}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="section experience-section">
                            <h2>Experience</h2>
                            <div className="timeline">
                                {aboutData.experience.map((exp, index) => (
                                    <div key={index} className="timeline-item">
                                        <div className="year">{exp.period}</div>
                                        <div className="content">
                                            <h4>{exp.role}</h4>
                                            <p className="institution">{exp.institution}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="about-col">
                        <section className="section awards-section">
                            <h2>Awards & Honors</h2>
                            <ul className="awards-list">
                                {aboutData.awards.map((award, index) => (
                                    <li key={index}>{award}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="section philosophy-section">
                            <h2>Research Philosophy</h2>
                            <p>{aboutData.philosophies.research}</p>

                            <h2 className="mt-4">Teaching Philosophy</h2>
                            <p>{aboutData.philosophies.teaching}</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
