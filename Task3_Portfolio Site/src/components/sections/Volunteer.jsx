import React from 'react';
import SectionWrapper from '../SectionWrapper';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import './Timeline.css';

const Volunteer = () => {
  const experiences = [
    {
      role: 'Flood Relief Volunteer (Rescuer)',
      company: 'Tank, Pakistan',
      period: 'March 2023',
      description: [
        'Actively participated in rescue and relief operations to support people affected by floods',
        'Assisted in evacuation, emergency response, and distribution of essential supplies',
        'Demonstrated strong teamwork, leadership, and crisis management skills under challenging conditions'
      ]
    },
    {
      role: 'Social Work Volunteer',
      company: 'Takia Camp, Abbottabad',
      period: '2018',
      description: [
        'Contributed to community support activities, focusing on helping underprivileged individuals and families',
        'Participated in organizing and delivering basic needs and welfare services',
        'Promoted values of empathy, responsibility, and community service'
      ]
    },
    {
      role: 'Scout Member',
      company: 'Community Service',
      period: 'Various',
      description: [
        'Active member of scouting activities, developing discipline, leadership, and teamwork skills',
        'Participated in community service, training camps, and outdoor activities',
        'Strengthened abilities in problem-solving, responsibility, and collaboration'
      ]
    }
  ];

  return (
    <SectionWrapper id="volunteer" className="timeline-section">
      <h2 className="section-title">Volunteer Experience</h2>
      
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
              <HeartHandshake size={16} />
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

export default Volunteer;
