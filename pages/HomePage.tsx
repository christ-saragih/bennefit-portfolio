import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import { useLocation } from 'react-router-dom';

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there is a state request to scroll to a specific section
    if (location.state && location.state.scrollTo) {
      const targetId = location.state.scrollTo;
      const element = document.getElementById(targetId);
      
      if (element) {
        // Add a small delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        
        // Optional: clear state to prevent scrolling on refresh? 
        // In simple apps, leaving it is fine or use history.replaceState to clean it.
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  return (
    <>
      <div id="home">
        <Hero />
      </div>
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
};

export default HomePage;