import React from 'react';
import { Helmet } from 'react-helmet';
import { teachingData } from '../data/teachingData';
import { profile } from '../data/profile';
import { aboutData } from '../data/aboutData';

const Teaching = () => {
    return (
        <div className="teaching-page">
            <Helmet>
                <title>{profile.name} | Teaching</title>
            </Helmet>

            <div className="container">
                <section className="section">
                    <h1>Teaching</h1>
                    <p>{aboutData.philosophies.teaching}</p> {/* Reuse philosophy */}

                    <h2 className="mt-4">Current Courses</h2>
                    <div className="courses-list">
                        {teachingData.current.map((course, index) => (
                            <div key={index} className="course-item" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3>{course.code}: {course.title}</h3>
                                    <span style={{ color: '#666' }}>{course.term}</span>
                                </div>
                                <p>{course.description}</p>
                                {course.syllabus && <a href={course.syllabus} style={{ fontWeight: 'bold' }}>Syllabus</a>}
                            </div>
                        ))}
                    </div>

                    <h2 className="mt-4">Past Courses</h2>
                    <ul>
                        {teachingData.past.map((course, index) => (
                            <li key={index}>
                                {course.code ? <strong>{course.code}: </strong> : ''}
                                <strong>{course.title}</strong>
                                {course.term ? ` (${course.term})` : ''}
                            </li>
                        ))}
                    </ul>

                    {teachingData.responsibilities && (
                        <>
                            <h2 className="mt-4">Academic Responsibilities</h2>
                            <ul>
                                {teachingData.responsibilities.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Teaching;
