import React, { useState } from 'react';
import { researchOpportunities } from '../data/researchOpportunities';
import ApplyModal from '../components/ApplyModal';
import { Beaker, Clock, Code, ArrowUpRight } from 'lucide-react';
import '../styles/Opportunities.css';

const ResearchOpportunities = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleApply = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="container section">
            <div className="page-header text-center">
                <h1>Research Opportunities</h1>
                <p className="subtitle">Apply for open research positions in our lab.</p>
            </div>

            <div className="opportunities-grid">
                {researchOpportunities.map((project) => (
                    <div key={project.id} className={`opportunity-card glass ${project.status === 'Closed' ? 'closed' : ''}`}>
                        <div className="card-header">
                            <h3>{project.title}</h3>
                            <span className={`status-badge ${project.status.toLowerCase()}`}>
                                {project.status === 'Open' ? <Clock size={14} /> : null}
                                {project.status}
                            </span>
                        </div>

                        <p className="abstract">{project.abstract}</p>

                        <div className="skills-section">
                            <h4><Code size={16} /> Required Skills:</h4>
                            <div className="skills-tags">
                                {project.skills.map(skill => (
                                    <span key={skill} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div className="card-footer">
                            {project.status === 'Open' ? (
                                <button className="btn apply-btn" onClick={() => handleApply(project)}>
                                    Apply Now <ArrowUpRight size={18} />
                                </button>
                            ) : (
                                <button className="btn disabled-btn" disabled>Currently Closed</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <ApplyModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={selectedProject?.title}
                type="research"
            />
        </div>
    );
};

export default ResearchOpportunities;
