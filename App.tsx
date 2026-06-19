import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen font-sans selection:bg-accent selection:text-ink transition-colors duration-300">

          {/* Subtle graph-paper dot grid — flat, intentional, no gradient blobs */}
          <div
            className="fixed inset-0 z-0 pointer-events-none text-ink dark:text-chalk opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(currentColor 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px',
            }}
          ></div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<AllProjects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
