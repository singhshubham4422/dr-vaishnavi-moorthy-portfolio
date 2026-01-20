import React from 'react';
import { Helmet } from 'react-helmet';
import { projectsData } from '../data/projectsData';
import { profile } from '../data/profile';

const Projects = () => {
    return (
        <div className="projects-page">
            <Helmet>
                <title>{profile.name} | Projects & Grants</title>
            </Helmet>

            <div className="container">
                <section className="section">
                    <h1>Projects & Grants</h1>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
                                <th style={{ padding: '10px' }}>Project</th>
                                <th style={{ padding: '10px' }}>Agency</th>
                                <th style={{ padding: '10px' }}>Duration</th>
                                <th style={{ padding: '10px' }}>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectsData.map((project, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '10px' }}>
                                        <strong>{project.title}</strong>
                                        <p style={{ fontSize: '0.9rem', color: '#666' }}>{project.description}</p>
                                    </td>
                                    <td style={{ padding: '10px' }}>{project.agency}</td>
                                    <td style={{ padding: '10px' }}>{project.duration}</td>
                                    <td style={{ padding: '10px' }}>{project.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default Projects;
