import React from 'react';
import SectionWrapper from '../SectionWrapper';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import './Timeline.css';

const Experience = () => {
  const experiences = [
    {
      role: 'Web Development Trainer',
      company: 'NAC Computer Academy, Tank',
      period: 'Recent',
      description: [
        'Delivered structured training in frontend and backend development, covering modern technologies such as React.js and JavaScript',
        'Mentored students in building real-world projects, portfolios, and problem-solving skills',
        'Introduced best practices in clean coding, debugging, and responsive design',
        'Improved student outcomes through hands-on learning and practical assignments'
      ]
    },
    {
      role: 'Freelance Web Developer',
      company: 'Self-Employed',
      period: 'Ongoing',
      description: [
        'Designed and developed modern, responsive, and user-focused web applications',
        'Utilized technologies such as React.js, Tailwind CSS, and Node.js',
        'Focused on performance optimization, security practices, and scalable solutions',
        'Collaborated with clients to deliver customized and high-quality digital products'
      ]
    },
    {
      role: 'Teacher',
      company: 'Sunshine Model High School, Tank',
      period: '2022 – 2025',
      description: [
        'Designed and delivered engaging lessons to enhance student understanding and academic performance',
        'Developed strong communication, leadership, and classroom management skills',
        'Fostered a positive learning environment focused on critical thinking and discipline'
      ]
    }
  ];

  return (
    <SectionWrapper id="experience" className="timeline-section">
      <h2 className="section-title">Experience</h2>
      
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="timeline-dot">
              <Briefcase size={16} />
            </div>
            <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable={true} glareMaxOpacity={0.1} scale={1.01} transitionSpeed={600} style={{ flex: 1 }}>
              <div className="timeline-content glass-panel" style={{ width: '100%', margin: 0 }}>
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-role">{exp.role}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <ul className="timeline-desc">
                  {exp.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
