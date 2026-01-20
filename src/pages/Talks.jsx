import React from 'react';
import { Helmet } from 'react-helmet';
import { talksData, serviceData } from '../data/talksData';
import { profile } from '../data/profile';

const Talks = () => {
    return (
        <div className="talks-page">
            <Helmet>
                <title>{profile.name} | Talks & Service</title>
            </Helmet>

            <div className="container">
                <section className="section">
                    <h1>Talks & Service</h1>

                    <h2>Invited Talks & Keynotes</h2>
                    <ul>
                        {talksData.map((talk, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <strong>{talk.title}</strong>
                                <br />
                                {talk.type} at <em>{talk.event}</em>, {talk.location} ({talk.date})
                            </li>
                        ))}
                    </ul>

                    <h2 className="mt-4">Professional Service</h2>
                    <h3>Editorial Boards</h3>
                    <ul>
                        {serviceData.editorial.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>

                    <h3>Conference Organizing</h3>
                    <ul>
                        {serviceData.chairs.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>

                    {serviceData.administrative && (
                        <>
                            <h3>Administrative Responsibilities</h3>
                            <ul>
                                {serviceData.administrative.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Talks;
