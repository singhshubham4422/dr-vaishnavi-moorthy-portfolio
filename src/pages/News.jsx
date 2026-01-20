import React from 'react';
import { Helmet } from 'react-helmet';
import { newsData } from '../data/newsData';
import { profile } from '../data/profile';

const News = () => {
    return (
        <div className="news-page">
            <Helmet>
                <title>{profile.name} | News</title>
            </Helmet>

            <div className="container">
                <section className="section">
                    <h1>News & Updates</h1>
                    <div className="news-list">
                        {newsData.map((item, index) => (
                            <div key={index} className="news-item" style={{ borderLeft: '3px solid var(--primary-color)', paddingLeft: '15px', marginBottom: '20px' }}>
                                <div style={{ fontWeight: 'bold', color: '#666' }}>{item.date}</div>
                                <h3 style={{ margin: '5px 0' }}>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default News;
