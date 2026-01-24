import React from 'react';
import { Routes, Route } from 'react-router-dom';


// Layout
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';

// Faculty Platform Pages
import FacultyPage from './pages/FacultyPage';
import ResearchOpportunities from './pages/ResearchOpportunities';
import ACMActivities from './pages/ACMActivities';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        {/* Faculty Platform Routes */}
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/faculty/research" element={<ResearchOpportunities />} />
        <Route path="/faculty/acm" element={<ACMActivities />} />
      </Routes>
    </Layout>
  );
}


export default App;
