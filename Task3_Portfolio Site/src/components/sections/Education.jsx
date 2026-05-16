import React from 'react';
import SectionWrapper from '../SectionWrapper';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import './Timeline.css';

const Education = () => {
  const educations = [
    {
      degree: 'Bachelor of Science in Computer Science (BSCS)',
      school: 'Gomal University Dera Ismail Khan, Pakistan',
      period: '2022 – 2026',
      description: [
        'Specializing in Web Development and Cybersecurity',
        'Gained hands-on experience through projects, assignments, and practical implementations',
        'Actively improving technical and problem-solving skills through continuous learning',
        'Studied core subjects: Programming (C/C++/JavaScript), OOP, Data Structures & Algorithms, MySQL, OS, Networks, Software Engineering, AI',
        'Professional Development & Certifications in Web Technologies and Ethical Hacking'
      ]
    }
  ];

  return (
    <SectionWrapper id="education" className="timeline-section">
      <h2 className="section-title">Education</h2>
      
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {educations.map((edu, index) => (
          <motion.div 
            key={index} 
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="timeline-dot">
              <GraduationCap size={16} />
            </div>
            <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable={true} glareMaxOpacity={0.1} scale={1.01} transitionSpeed={600} style={{ flex: 1 }}>
              <div className="timeline-content glass-panel" style={{ width: '100%', margin: 0 }}>
                <span className="timeline-period">{edu.period}</span>
                <h3 className="timeline-role">{edu.degree}</h3>
                <h4 className="timeline-company">{edu.school}</h4>
                <ul className="timeline-desc">
                  {edu.description.map((point, i) => (
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

export default Education;
