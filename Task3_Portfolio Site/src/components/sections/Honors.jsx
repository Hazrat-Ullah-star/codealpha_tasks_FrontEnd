import React from 'react';
import SectionWrapper from '../SectionWrapper';
import { Award, Shield, Users, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import './Honors.css';

const Honors = () => {
  const achievements = [
    {
      title: 'Prime Minister Laptop Scheme Recipient',
      date: 'March 2026',
      icon: Award,
      desc: 'Awarded based on academic performance and merit, recognizing dedication to studies and commitment to technological growth.'
    },
    {
      title: 'Academic Excellence & Project Achievement',
      date: 'Continuous',
      icon: Shield,
      desc: 'Acknowledged for consistent performance, successful completion of multiple web development and cybersecurity projects, demonstrating practical skills and innovation.'
    },
    {
      title: 'CTF & Cybersecurity Participation',
      date: 'Ongoing',
      icon: Terminal,
      desc: 'Participated in Capture the Flag (CTF) competitions, enhancing problem-solving and security analysis skills.'
    },
    {
      title: 'Organizations & Affiliations',
      date: 'Active',
      icon: Users,
      desc: 'Active member of Computer Science Student Community at Gomal University, contributing to technical discussions, mentoring, and GitHub open-source development.'
    }
  ];

  return (
    <SectionWrapper id="honors" className="honors-section">
      <h2 className="section-title">Honors, Awards & Organizations</h2>
      
      <div className="honors-grid">
        {achievements.map((item, index) => {
          const Icon = item.icon || Award;
          return (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              style={{ display: 'flex' }}
            >
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} scale={1.02} transitionSpeed={500} style={{ flex: 1 }}>
                <div className="honor-card glass-panel" style={{ height: '100%', margin: 0 }}>
                  <div className="honor-icon-wrapper">
                    <Icon className="honor-icon" />
                  </div>
                  <div className="honor-content">
                    <span className="honor-date">{item.date}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default Honors;
