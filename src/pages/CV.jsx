import React from 'react';
import { Helmet } from 'react-helmet';
import { profile } from '../data/profile';
import { aboutData } from '../data/aboutData';
import { publicationsData } from '../data/publicationsData';

const CV = () => {
    return (
        <div className="cv-page">
            <Helmet>
                <title>{profile.name} | CV</title>
            </Helmet>

            <div className="container">
                <section className="section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h1>Curriculum Vitae</h1>
                        <a href="#" className="btn">Download PDF</a>
                    </div>

                    <div className="cv-content" style={{ backgroundColor: 'white', padding: '40px', border: '1px solid #ddd' }}>
                        <h2 style={{ textAlign: 'center' }}>{profile.name}</h2>
                        <p style={{ textAlign: 'center' }}>{profile.title}, {profile.department}</p>
                        <p style={{ textAlign: 'center', marginBottom: '20px' }}>{profile.email} | {profile.address}</p>

                        <hr />
                        <h3>Education</h3>
                        {aboutData.education.map((e, i) => (
                            <div key={i}><p><strong>{e.degree}</strong>, {e.institution} ({e.year})</p></div>
                        ))}

                        <hr style={{ margin: '20px 0' }} />
                        <h3>Selected Publications</h3>
                        {publicationsData.slice(0, 5).map((p, i) => (
                            <p key={i}>{p.authors.join(', ')}. "{p.title}". <em>{p.venue}</em>, {p.year}.</p>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CV;
