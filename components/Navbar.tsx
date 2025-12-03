import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, targetId: string | null, href: string) => {
    e.preventDefault();

    if (targetId) {
      if (location.pathname === '/') {
        // Already on home, just scroll
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home and pass the targetId to scroll after load
        navigate('/', { state: { scrollTo: targetId } });
      }
    } else {
      // Regular page navigation
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Experience', href: '/', id: 'experience' },
    { name: 'Projects', href: '/projects', id: null },
    { name: 'Skills', href: '/', id: 'skills' },
    { name: 'Contact', href: '/', id: 'contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-gray-200 dark:border-white/10 py-4 shadow-sm dark:shadow-none' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          BENNEFIT<span className="text-blue-600 dark:text-blue-500">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <button 
                  onClick={(e) => handleNavClick(e, item.id, item.href)}
                  className={`text-sm font-medium transition-colors relative group bg-transparent border-none cursor-pointer ${
                    (location.pathname === item.href && !item.id) 
                      ? 'text-blue-600 dark:text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-blue-500 transition-all ${
                    (location.pathname === item.href && !item.id) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-l border-gray-300 dark:border-gray-700 pl-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={(e) => handleNavClick(e, 'contact', '/')}
              className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-white/10 hover:bg-gray-800 dark:hover:bg-white/20 text-white text-sm font-medium transition-colors"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Mobile menu button could go here */}
        <button
          onClick={toggleTheme}
          className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;