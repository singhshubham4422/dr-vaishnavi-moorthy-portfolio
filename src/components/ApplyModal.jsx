import React, { useState } from 'react';
import { X, Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import './ApplyModal.css';

const ApplyModal = ({ isOpen, onClose, title, type }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        skills: '',
        resume: null
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFormData(prev => ({ ...prev, resume: file }));
            setErrorMessage('');
        } else {
            setErrorMessage('Please upload a PDF file.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.resume) {
            setErrorMessage('Resume is required (PDF only).');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('skills', formData.skills);
        data.append('appliedFor', title);
        data.append('type', type);
        data.append('resume', formData.resume);

        try {
            // STEP 1: Targeting local backend explicitly for debugging
            const apiUrl = 'http://localhost:5000/api/apply';
            console.log("🚀 Submitting to:", apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {  // Accepted 2xx status from Formspree or Backend
                setStatus('success');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setFormData({ name: '', email: '', skills: '', resume: null });
                }, 3000);
            } else {
                // Formspree returns 'errors' array, custom backend returns 'message'
                const msg = result.error || (result.errors ? result.errors.map(e => e.message).join(', ') : result.message) || 'Submission failed';
                throw new Error(msg);
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass">
                <button className="close-btn" onClick={onClose}><X size={24} /></button>

                {status === 'success' ? (
                    <div className="success-message">
                        <CheckCircle size={48} color="#4bb543" />
                        <h3>Application Submitted!</h3>
                        <p>Dr. Moorthy has received your application for <strong>{title}</strong>.</p>
                    </div>
                ) : (
                    <>
                        <h2>Apply for <span className="highlight">{title}</span></h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john.doe@university.edu"
                                />
                            </div>

                            <div className="form-group">
                                <label>Skills & Motivation</label>
                                <textarea
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    required
                                    placeholder="List your relevant skills and why you are interested..."
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Resume (PDF)</label>
                                <div className="file-upload-wrapper">
                                    <input
                                        type="file"
                                        id="resume"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        hidden
                                    />
                                    <label htmlFor="resume" className="file-upload-label">
                                        <Upload size={18} />
                                        {formData.resume ? formData.resume.name : "Upload Resume (PDF)"}
                                    </label>
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="error-message">
                                    <AlertCircle size={16} />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <button type="submit" className="btn submit-btn" disabled={status === 'loading'}>
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="spinner" size={18} /> Sending...
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ApplyModal;
