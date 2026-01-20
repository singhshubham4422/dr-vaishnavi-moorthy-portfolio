import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Research from './pages/Research';
import Publications from './pages/Publications';
import Teaching from './pages/Teaching';
import Students from './pages/Students';
import Projects from './pages/Projects';
import Talks from './pages/Talks';
import News from './pages/News';
import Contact from './pages/Contact';
import CV from './pages/CV';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/students" element={<Students />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/talks" element={<Talks />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cv" element={<CV />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
