import React, { useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { 
  FaReact, FaHtml5, FaBootstrap, FaNodeJs, FaServer, 
  FaUserSecret, FaLock, FaShieldAlt, FaNetworkWired, 
  FaGithub, FaDocker, FaLinux, FaPuzzlePiece, FaUsers, 
  FaChartLine, FaBrain, FaComments, FaClock, FaRocket, 
  FaLaptopCode, FaCogs, FaTools, FaHandshake, FaCode,
  FaPython
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiJavascript, SiExpress, SiMongodb, 
  SiMysql, SiPostman, SiFlutter, SiDart, SiCplusplus
} from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      shortTitle: 'Frontend',
      icon: <FaLaptopCode />,
      skills: [
        { name: 'React.js', level: 90, icon: <FaReact color="#61dafb" />, exp: '3 Years', tools: 'Redux, Hooks, Next.js' },
        { name: 'Flutter', level: 85, icon: <SiFlutter color="#02569b" />, exp: '2.5 Years', tools: 'Dart, Widgets, Provider' },
        { name: 'Dart', level: 80, icon: <SiDart color="#0175C2" />, exp: '2.5 Years', tools: 'OOP, Async, SDK' },
        { name: 'Tailwind CSS', level: 85, icon: <SiTailwindcss color="#38bdf8" />, exp: '2.5 Years', tools: 'Utility-first, Animations' },
        { name: 'JavaScript', level: 90, icon: <SiJavascript color="#f7df1e" />, exp: '4 Years', tools: 'ES6+, Async, DOM' },
        { name: 'HTML5 & CSS3', level: 95, icon: <FaHtml5 color="#e34f26" />, exp: '4+ Years', tools: 'Semantic UI, Grid, Flex' },
        { name: 'Bootstrap / MUI', level: 80, icon: <FaBootstrap color="#7952b3" />, exp: '3 Years', tools: 'Component Libraries' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      shortTitle: 'Backend',
      icon: <FaCogs />,
      skills: [
        { name: 'Node.js', level: 85, icon: <FaNodeJs color="#339933" />, exp: '3 Years', tools: 'V8, Events, Streams' },
        { name: 'Python', level: 85, icon: <FaPython color="#3776AB" />, exp: '3 Years', tools: 'Django, Flask, Scripting' },
        { name: 'C++', level: 75, icon: <SiCplusplus color="#00599C" />, exp: '2 Years', tools: 'OOP, Memory Management' },
        { name: 'Express.js', level: 80, icon: <SiExpress color="#fff" />, exp: '3 Years', tools: 'Routing, Middleware' },
        { name: 'MongoDB', level: 80, icon: <SiMongodb color="#47A248" />, exp: '2 Years', tools: 'Mongoose, NoSQL, Aggregation' },
        { name: 'MySQL', level: 75, icon: <SiMysql color="#4479A1" />, exp: '3 Years', tools: 'Relational DB, Joins, Triggers' },
        { name: 'REST APIs', level: 85, icon: <FaServer color="#fff" />, exp: '3.5 Years', tools: 'JSON, JWT Auth, Postman' }
      ]
    },
    {
      id: 'cyber',
      title: 'Cybersecurity / Ethical Hacking',
      shortTitle: 'Security',
      icon: <FaShieldAlt />,
      skills: [
        { name: 'Ethical Hacking', level: 80, icon: <FaUserSecret color="#fff" />, exp: '2.5 Years', tools: 'Kali Linux, Reconnaissance' },
        { name: 'Penetration Testing', level: 75, icon: <FaLock color="#fff" />, exp: '2 Years', tools: 'Metasploit, Burp Suite' },
        { name: 'Vulnerability Assess.', level: 70, icon: <FaShieldAlt color="#fff" />, exp: '2 Years', tools: 'Nmap, Nessus, Acunetix' },
        { name: 'Networking', level: 80, icon: <FaNetworkWired color="#fff" />, exp: '3 Years', tools: 'TCP/IP, Routing, Subnetting' },
        { name: 'Network Security', level: 75, icon: <FaNetworkWired color="#fff" />, exp: '3 Years', tools: 'Wireshark, Firewalls' }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      shortTitle: 'Tools',
      icon: <FaTools />,
      skills: [
        { name: 'Git & GitHub', level: 90, icon: <FaGithub color="#fff" />, exp: '4 Years', tools: 'Version Control, CI/CD' },
        { name: 'Docker', level: 70, icon: <FaDocker color="#2496ed" />, exp: '1.5 Years', tools: 'Containerization, Images' },
        { name: 'VS Code', level: 95, icon: <FaCode color="#007acc" />, exp: '4+ Years', tools: 'Extensions, Workspaces' },
        { name: 'Kali Linux / Terminal', level: 80, icon: <FaLinux color="#fff" />, exp: '4+ Years', tools: 'Bash scripting, Permissions' },
        { name: 'Postman', level: 80, icon: <SiPostman color="#FF6C37" />, exp: '3 Years', tools: 'API Testing, Automation' }
      ]
    },
    {
      id: 'softskills',
      title: 'Professional Skills',
      shortTitle: 'Soft Skills',
      icon: <FaHandshake />,
      skills: [
        { name: 'Problem Solving', level: 95, icon: <FaPuzzlePiece color="#ffb347" />, exp: 'Ongoing', tools: 'Critical Analysis, Debugging' },
        { name: 'Team Collaboration', level: 90, icon: <FaUsers color="#add8e6" />, exp: 'Ongoing', tools: 'Agile, Pair Programming' },
        { name: 'Project Management', level: 85, icon: <FaChartLine color="#77dd77" />, exp: 'Ongoing', tools: 'Organization, Planning' },
        { name: 'Analytical Thinking', level: 90, icon: <FaBrain color="#ff6961" />, exp: 'Ongoing', tools: 'Data synthesis, Strategy' },
        { name: 'Communication', level: 95, icon: <FaComments color="#fdfd96" />, exp: 'Ongoing', tools: 'Active Listening, Clarity' },
        { name: 'Time Management', level: 90, icon: <FaClock color="#cfcfc4" />, exp: 'Ongoing', tools: 'Prioritization, Deadlines' },
        { name: 'Learning Agility', level: 95, icon: <FaRocket color="#b19cd9" />, exp: 'Ongoing', tools: 'Adaptability, Rapid Learning' }
      ]
    }
  ];

  const activeCategory = skillCategories.find(cat => cat.id === activeTab);

  // SVG Circular progress properties for radius 40
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <SectionWrapper id="skills" className="skills-section">
      <div className="skills-header">
        <h2 className="section-title">My Skills & Expertise</h2>
        <p className="skills-subtitle">
          Technologies, tools, and expertise I use to build secure, scalable, and modern applications.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="skills-tabs">
        {skillCategories.map((category) => (
          <button
            key={category.id}
            className={`skill-tab-btn ${activeTab === category.id ? 'active' : ''}`}
            onClick={() => setActiveTab(category.id)}
          >
            <span className="tab-icon">{category.icon}</span>
            <span className="tab-title">{category.shortTitle}</span>
          </button>
        ))}
      </div>

      {/* Active Category Content */}
      <div className="skills-content-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable={true} glareMaxOpacity={0.1} scale={1.01} transitionSpeed={600} className="w-100" style={{ width: '100%', maxWidth: '900px' }}>
              <div className="skills-glass-container glass-panel" style={{ maxWidth: '100%' }}>
                <div className="active-category-header">
                  <h3>{activeCategory.icon} {activeCategory.title}</h3>
                </div>

                <div className="animated-skills-grid">
                  {activeCategory.skills.map((skill, index) => {
                    const strokeDashoffset = circumference - (skill.level / 100) * circumference;

                    return (
                      <div
                        key={index}
                        className="radial-skill-card"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="radial-chart-wrapper">
                          <svg className="radial-chart" width="100" height="100">
                            <circle
                              className="radial-chart-bg"
                              cx="50" cy="50" r={radius}
                            />
                            <motion.circle
                              className="radial-chart-progress"
                              cx="50" cy="50" r={radius}
                              strokeDasharray={circumference}
                              initial={{ strokeDashoffset: circumference }}
                              animate={{ strokeDashoffset }}
                              transition={{ duration: 1.5, delay: index * 0.15, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="radial-chart-inner">
                            <span className="radial-icon">{skill.icon}</span>
                            <span className="radial-percent">{skill.level}%</span>
                          </div>
                        </div>
                        <h4 className="radial-skill-name">{skill.name}</h4>

                        {/* Hover Tooltip */}
                        <AnimatePresence>
                          {hoveredSkill === skill.name && (
                            <motion.div
                              className="skill-tooltip"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              style={{ position: 'absolute', bottom: '130px', left: '50%', transform: 'translateX(-50%)', width: 'max-content', maxWidth: '200px' }}
                            >
                              <div className="tooltip-content glass-panel" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--accent-primary)', background: 'var(--bg-main)' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'center' }}>
                                  <strong style={{ color: 'var(--accent-primary)' }}>Experience:</strong> {skill.exp}<br />
                                  <strong style={{ color: 'var(--accent-primary)' }}>Tools:</strong> {skill.tools}
                                </div>
                                <div className="tooltip-arrow" style={{ position: 'absolute', bottom: '-6px', left: 'calc(50% - 6px)', transform: 'rotate(45deg)', width: '12px', height: '12px', background: 'var(--bg-main)', borderRight: '1px solid var(--accent-primary)', borderBottom: '1px solid var(--accent-primary)' }}></div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

              </div>
            </Tilt>
          </motion.div>
        </AnimatePresence>
      </div>

    </SectionWrapper>
  );
};

export default Skills;
