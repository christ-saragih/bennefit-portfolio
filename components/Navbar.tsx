import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  // Close the mobile menu once we cross into the desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent, targetId: string | null, href: string) => {
    e.preventDefault();
    setIsOpen(false);

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper dark:bg-night border-b-2 border-ink dark:border-chalk">
      <div
        className={`max-w-6xl mx-auto px-4 flex justify-between items-center transition-all duration-200 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          onClick={() => {
            setIsOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="neo bg-accent text-ink w-9 h-9 flex items-center justify-center font-mono font-bold text-lg transition-transform group-hover:rotate-[-6deg]">
            B
          </span>
          <span className="hidden sm:block font-bold text-xl tracking-tight">BENNEFIT</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-7">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href && !item.id;
              return (
                <li key={item.name}>
                  <button
                    onClick={(e) => handleNavClick(e, item.id, item.href)}
                    className="relative group bg-transparent border-none cursor-pointer font-mono text-sm font-bold uppercase tracking-wide"
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-1 bg-accent transition-all ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    ></span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3 border-l-2 border-ink dark:border-chalk pl-5">
            <button
              onClick={toggleTheme}
              className="neo bg-paper dark:bg-night p-2 transition-transform hover:rotate-12"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={(e) => handleNavClick(e, 'contact', '/')}
              className="neo-btn bg-ink dark:bg-chalk text-paper dark:text-ink px-4 py-2 text-sm uppercase font-mono"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Mobile controls: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="neo bg-paper dark:bg-night p-2"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="neo bg-accent text-ink p-2"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-ink dark:border-chalk bg-paper dark:bg-night animate-fade-in">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="border-b-2 border-ink dark:border-chalk"
              >
                <button
                  onClick={(e) => handleNavClick(e, item.id, item.href)}
                  className="w-full text-left px-5 py-4 bg-transparent border-none cursor-pointer font-mono text-base font-bold uppercase tracking-wide hover:bg-accent hover:text-ink transition-colors"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="p-4">
            <button
              onClick={(e) => handleNavClick(e, 'contact', '/')}
              className="neo-btn bg-accent text-ink w-full py-3 text-sm uppercase font-mono"
            >
              Contact Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
