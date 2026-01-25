import React, { useState } from 'react';
// import { acmPositions } from '../data/acmPositions'; // Removed static import
import ApplyModal from '../components/ApplyModal';
import { UserCheck, Shield, ArrowUpRight } from 'lucide-react';
import '../styles/Opportunities.css';

const ACMActivities = () => {
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [acmPositions, setAcmPositions] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/acm');
                const data = await response.json();
                setAcmPositions(data);
            } catch (error) {
                console.error("Failed to fetch ACM positions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleApply = (position) => {
        setSelectedPosition(position);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPosition(null);
    };

    return (
        <div className="container section">
            <div className="page-header text-center">
                <h1>ACM Professional Activities</h1>
                <p className="subtitle">Join the ACM Student Chapter leadership team.</p>
            </div>

            <div className="opportunities-grid">
                {loading ? <p>Loading positions...</p> : acmPositions.map((position) => (
                    <div key={position.id} className={`opportunity-card glass ${position.status === 'Filled' ? 'closed' : ''}`}>
                        <div className="card-header">
                            <h3>{position.title}</h3>
                            <span className={`status-badge ${position.status.toLowerCase()}`}>
                                {position.status}
                            </span>
                        </div>

                        <div className="holder-section" style={{ flexGrow: 1, marginBottom: '1.5rem' }}>
                            {position.status === 'Filled' ? (
                                <>
                                    <h4><UserCheck size={16} /> Current Holder:</h4>
                                    <p className="skill-tag" style={{ display: 'inline-block' }}>{position.currentHolder}</p>
                                </>
                            ) : (
                                <>
                                    <h4><Shield size={16} /> Status:</h4>
                                    <p>This position is currently open for applications.</p>
                                </>
                            )}
                        </div>

                        <div className="card-footer">
                            {position.status === 'Vacant' ? (
                                <button className="btn apply-btn" onClick={() => handleApply(position)}>
                                    Apply for Role <ArrowUpRight size={18} />
                                </button>
                            ) : (
                                <button className="btn disabled-btn" disabled>Position Filled</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <ApplyModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={selectedPosition?.title}
                type="acm"
            />
        </div>
    );
};

export default ACMActivities;
