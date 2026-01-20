import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { publicationsData } from '../data/publicationsData';
import { profile } from '../data/profile';
import './Publications.css';

const Publications = () => {
    const [filterYear, setFilterYear] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Extract unique years and types for filter options
    const years = ['All', ...new Set(publicationsData.map(p => p.year))].sort((a, b) => b - a);
    const types = ['All', ...new Set(publicationsData.map(p => p.type))];

    const filteredPublications = useMemo(() => {
        return publicationsData.filter(pub => {
            const matchesYear = filterYear === 'All' || pub.year === parseInt(filterYear);
            const matchesType = filterType === 'All' || pub.type === filterType;
            const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesYear && matchesType && matchesSearch;
        }).sort((a, b) => b.year - a.year);
    }, [filterYear, filterType, searchQuery]);

    return (
        <div className="publications-page">
            <Helmet>
                <title>{profile.name} | Publications</title>
                <meta name="description" content="List of academic publications" />
            </Helmet>

            <div className="container">
                <section className="section">
                    <h1>Publications</h1>

                    <div className="filters-bar">
                        <div className="filter-group">
                            <label htmlFor="year-filter">Year:</label>
                            <select id="year-filter" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                                {years.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="type-filter">Type:</label>
                            <select id="type-filter" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                {types.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>

                        <div className="search-group">
                            <input
                                type="text"
                                placeholder="Search title, author..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="publications-list">
                        {filteredPublications.length > 0 ? (
                            filteredPublications.map(pub => (
                                <div key={pub.id} className="publication-item">
                                    <h3 className="pub-title">{pub.title}</h3>
                                    <p className="pub-authors">
                                        {pub.authors.map((author, i) => (
                                            <span key={i}>
                                                {author.includes("Wrigby") ? <strong>{author}</strong> : author}
                                                {i < pub.authors.length - 1 ? ", " : ""}
                                            </span>
                                        ))}
                                    </p>
                                    <p className="pub-meta">
                                        <span className="pub-venue">{pub.venue}</span>
                                        <span className="pub-year">{pub.year}</span>
                                        <span className={`pub-type type-${pub.type.toLowerCase().replace(/\s+/g, '-')}`}>{pub.type}</span>
                                    </p>
                                    <div className="pub-links">
                                        {pub.pdf && <a href={pub.pdf} className="pub-link">[PDF]</a>}
                                        {pub.link && <a href={pub.link} className="pub-link">[DOI]</a>}
                                    </div>
                                </div> /** Use dangerouslySetInnerHTML for authors if you want bold. But React escapes string. I will fix authors render below properly. */
                            ))
                        ) : (
                            <p>No publications found.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Publications;
