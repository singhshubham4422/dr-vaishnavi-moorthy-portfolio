import React from 'react';
import { Helmet } from 'react-helmet';
import { studentsData } from '../data/studentsData';
import { profile } from '../data/profile';

const Students = () => {
    return (
        <div className="students-page">
            <Helmet>
                <title>{profile.name} | Staff & Students</title>
            </Helmet>

            <div className="container">
                <section className="section">
                    <h1>Students & Team</h1>

                    <h2>PhD Students</h2>
                    <div className="student-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        {studentsData.phd.map((student, index) => (
                            <div key={index} className="student-card" style={{ border: '1px solid #ddd', padding: '15px' }}>
                                <h3>{student.name}</h3>
                                <p>{student.topic}</p>
                                <p style={{ color: '#666' }}>{student.year}</p>
                            </div>
                        ))}
                    </div>

                    <h2>Master's Students</h2>
                    <ul>
                        {studentsData.masters.map((s, i) => <li key={i}>{s.name} - {s.topic} ({s.year})</li>)}
                    </ul>

                    <h2 className="mt-4">Alumni</h2>
                    <ul>
                        {studentsData.alumni.map((s, i) => <li key={i}>{s.name} - {s.role} ({s.year})</li>)}
                    </ul>

                    {studentsData.outcomes && (
                        <>
                            <h2 className="mt-4">Placement & Graduation Outcomes</h2>
                            <ul>
                                {studentsData.outcomes.map((outcome, i) => <li key={i}>{outcome}</li>)}
                            </ul>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Students;
