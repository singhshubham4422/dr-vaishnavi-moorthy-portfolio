import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');
    const [activeTab, setActiveTab] = useState('research');
    const [researchData, setResearchData] = useState([]);
    const [acmData, setAcmData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchData();
        }
    }, [token, navigate]);

    const fetchData = async () => {
        try {
            const [resRes, acmRes] = await Promise.all([
                fetch('http://localhost:5000/api/research'),
                fetch('http://localhost:5000/api/acm')
            ]);
            setResearchData(await resRes.json());
            setAcmData(await acmRes.json());
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            const endpoint = type === 'research' ? `/api/admin/research/${id}` : `/api/admin/acm/${id}`;
            await fetch(`http://localhost:5000${endpoint}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchData();
        } catch (error) {
            alert('Failed to delete item');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = activeTab;
        const endpoint = type === 'research'
            ? (editingItem ? `/api/admin/research/${editingItem.id}` : '/api/admin/research')
            : (editingItem ? `/api/admin/acm/${editingItem.id}` : '/api/admin/acm');

        const method = editingItem ? 'PUT' : 'POST';

        // Prepare data based on type, handling arrays like skills for research
        let payload = { ...formData };
        if (type === 'research' && typeof payload.skills === 'string') {
            payload.skills = payload.skills.split(',').map(s => s.trim());
        }

        try {
            await fetch(`http://localhost:5000${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            setShowModal(false);
            setEditingItem(null);
            setFormData({});
            fetchData();
        } catch (error) {
            alert('Failed to save item');
        }
    };

    const openModal = (item = null) => {
        setEditingItem(item);
        if (item) {
            // Flatten array for input field
            const data = { ...item };
            if (activeTab === 'research' && Array.isArray(data.skills)) {
                data.skills = data.skills.join(', ');
            }
            setFormData(data);
        } else {
            setFormData({});
        }
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('research')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: activeTab === 'research' ? '#1a365d' : '#e2e8f0',
                        color: activeTab === 'research' ? 'white' : 'black',
                        border: 'none', borderRadius: '4px', cursor: 'pointer'
                    }}
                >
                    Research Projects
                </button>
                <button
                    onClick={() => setActiveTab('acm')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: activeTab === 'acm' ? '#1a365d' : '#e2e8f0',
                        color: activeTab === 'acm' ? 'white' : 'black',
                        border: 'none', borderRadius: '4px', cursor: 'pointer'
                    }}
                >
                    ACM Positions
                </button>
            </div>

            <button onClick={() => openModal()} style={{ padding: '0.5rem 1rem', background: '#059669', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '1rem' }}>
                + Add New {activeTab === 'research' ? 'Project' : 'Position'}
            </button>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Title</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                            {activeTab === 'research' ? <th style={{ padding: '1rem', textAlign: 'left' }}>Abstract</th> : <th style={{ padding: '1rem', textAlign: 'left' }}>Holder</th>}
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(activeTab === 'research' ? researchData : acmData).map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '1rem' }}>{item.title}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '999px',
                                        fontSize: '0.875rem',
                                        background: item.status === 'Open' || item.status === 'Vacant' ? '#dcfce7' : '#fce7f3',
                                        color: item.status === 'Open' || item.status === 'Vacant' ? '#166534' : '#9d174d'
                                    }}>
                                        {item.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>{activeTab === 'research' ? (item.abstract?.substring(0, 50) + '...') : (item.currentHolder || '-')}</td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button onClick={() => openModal(item)} style={{ marginRight: '0.5rem', padding: '0.25rem 0.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                    <button onClick={() => handleDelete(item.id, activeTab)} style={{ padding: '0.25rem 0.5rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '500px', maxWidth: '90%' }}>
                        <h2>{editingItem ? 'Edit' : 'Add New'} {activeTab === 'research' ? 'Project' : 'Position'}</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <label>
                                Title
                                <input name="title" value={formData.title || ''} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} required />
                            </label>

                            <label>
                                Status
                                <select name="status" value={formData.status || ''} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}>
                                    <option value="">Select Status</option>
                                    {activeTab === 'research'
                                        ? <><option value="Open">Open</option><option value="Closed">Closed</option></>
                                        : <><option value="Vacant">Vacant</option><option value="Filled">Filled</option></>
                                    }
                                </select>
                            </label>

                            {activeTab === 'research' ? (
                                <>
                                    <label>
                                        Abstract
                                        <textarea name="abstract" value={formData.abstract || ''} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', height: '100px' }} required />
                                    </label>
                                    <label>
                                        Skills (comma separated)
                                        <input name="skills" value={formData.skills || ''} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
                                    </label>
                                </>
                            ) : (
                                <label>
                                    Current Holder
                                    <input name="currentHolder" value={formData.currentHolder || ''} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
                                </label>
                            )}

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" style={{ flex: 1, padding: '0.75rem', background: '#1a365d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.75rem', background: '#94a3b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
