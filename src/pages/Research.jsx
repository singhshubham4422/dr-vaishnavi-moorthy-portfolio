import React from 'react';
import { Helmet } from 'react-helmet';
import { researchData } from '../data/researchData';
import { profile } from '../data/profile';
import './Research.css';

const Research = () => {
    return (
        <div className="research-page">
            <Helmet>
                <title>{profile.name} | Research</title>
                <meta name="description" content="Research interests and labs" />
            </Helmet>

            <div className="container">
                <section className="section intro-section">
                    <h1>Research</h1>
                    <p className="research-intro">{researchData.intro}</p>
                </section>

                <section className="section domains-section">
                    <h2>Research Domains</h2>
                    <div className="domains-grid">
                        {researchData.domains.map((domain) => (
                            <div key={domain.id} className="domain-card">
                                <h3>{domain.title}</h3>
                                <p>{domain.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="section lab-section">
                    <h2>{researchData.lab.name}</h2>
                    <p>{researchData.lab.description}</p>

                    <h3 className="mt-4">Collaborators</h3>
                    <ul className="collaborators-list">
                        {researchData.lab.collaborators.map((collab, index) => (
                            <li key={index}>{collab}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Research;
