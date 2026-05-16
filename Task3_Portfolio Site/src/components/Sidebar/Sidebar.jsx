import React, { useState, useEffect } from 'react';
import { User, Home, Book, Briefcase, Award, Code, MapPin, Mail, ChevronRight, Activity, Sun, Moon, Terminal } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check local storage setting on mount
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);
    applyThemeClass(savedTheme);
  }, []);

  const applyThemeClass = (themeName) => {
    document.body.classList.remove('light-mode', 'hacker-mode');
    if (themeName !== 'dark') {
      document.body.classList.add(`${themeName}-mode`);
    }
  };

  const toggleTheme = () => {
    let newTheme = 'dark';
    if (theme === 'dark') newTheme = 'light';
    else if (theme === 'light') newTheme = 'hacker';
    
    applyThemeClass(newTheme);
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  const navItems = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'About', id: 'about', icon: User },
    { name: 'Skills', id: 'skills', icon: Code },
    { name: 'Experience', id: 'experience', icon: Briefcase },
    { name: 'Education', id: 'education', icon: Book },
    { name: 'Honors & Awards', id: 'honors', icon: Award },
    { name: 'Volunteer', id: 'volunteer', icon: Activity },
    { name: 'Contact', id: 'contact', icon: Mail }
  ];

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if(element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.innerWidth < 968) {
      toggleSidebar();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="profile-section">
        <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} glareEnable={true} glareMaxOpacity={0.6} scale={1.1} transitionSpeed={400}>
          <motion.div 
            className="profile-image kali-bg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
           H
          </motion.div>
        </Tilt>
        <h2 className="profile-name text-3d-sidebar" style={{ display: 'inline-block' }}>Hazrat Ullah</h2>
        <p className="profile-title text-3d-sidebar-slow" style={{ display: 'inline-block', marginTop: '0.4rem' }}>Full-Stack Web Developer & Ethical Hacker</p>
      </div>
      
      <nav className="nav-links">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Tilt key={item.id} tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.08} transitionSpeed={200} tiltReverse={true}>
              <motion.a 
                href={`#${item.id}`} 
                onClick={(e) => handleClick(e, item.id)}
                className="nav-link text-3d-hover"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Icon />
                <span>{item.name}</span>
              </motion.a>
            </Tilt>
          );
        })}
      </nav>

      {/* Theme Toggle Button */}
      <div style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.1} transitionSpeed={300}>
          <button className="theme-toggle-btn text-3d-hover" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : theme === 'light' ? <Terminal size={20} /> : <Moon size={20} />}
            <span>{theme === 'dark' ? 'Light Mode' : theme === 'light' ? 'Hacker Mode' : 'Dark Mode'}</span>
          </button>
        </Tilt>
      </div>
    </aside>
  );
};

export default Sidebar;
