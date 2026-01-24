import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope, Users, ArrowRight } from 'lucide-react';
import { profile } from '../data/profile';
import '../styles/FacultyPage.css';

const FacultyPage = () => {
    return (
        <div className="faculty-page container section">
            <div className="text-center mb-4">
                <h1>Faculty & Student Interaction</h1>
                <p className="subtitle">Explore research opportunities and ACM professional activities under {profile.name}.</p>
            </div>

            <div className="faculty-cards">
                <div className="faculty-card glass">
                    <div className="icon-wrapper">
                        <Microscope size={48} color="#d4af37" />
                    </div>
                    <h2>Research Opportunities</h2>
                    <p>Join cutting-edge research projects in {profile.department}. Apply to work under {profile.name}'s mentorship.</p>
                    <Link to="/faculty/research" className="btn card-btn">
                        View Research <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="faculty-card glass">
                    <div className="icon-wrapper">
                        <Users size={48} color="#d4af37" />
                    </div>
                    <h2>ACM Professional Activities</h2>
                    <p>Take up leadership roles in the ACM Student Chapter. Develop professional skills and network with peers.</p>
                    <Link to="/faculty/acm" className="btn card-btn">
                        View ACM Roles <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FacultyPage;
