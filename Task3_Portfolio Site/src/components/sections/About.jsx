import React, { useEffect, useRef } from 'react';
import SectionWrapper from '../SectionWrapper';
import { Terminal, Shield, Code, Server, Award, Target, Cpu } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import './About.css';

const AnimatedCounter = ({ from, to }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration: 2.5, ease: "easeOut" });
    }
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const About = () => {
  const cards = [
    { title: 'Frontend Architecture', icon: Code, desc: 'React, JS (ES6+), Modern CSS' },
    { title: 'Backend & APIs', icon: Server, desc: 'Node.js, MySQL' },
    { title: 'Ethical Hacking', icon: Shield, desc: 'Metasploit, Burp Suite, Nmap' },
    { title: 'Security Analysis', icon: Terminal, desc: 'Vulnerability & Penetration Testing' }
  ];

  return (
    <SectionWrapper id="about" className="about-section">
      <h2 className="section-title">About Me</h2>
      
      <div className="about-content">
        <div className="about-left">
          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable={true} glareMaxOpacity={0.1} scale={1.01} transitionSpeed={600}>
            <motion.div 
              className="about-text glass-panel"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="sub-heading">
                <Terminal size={20} className="heading-icon" /> 
                Professional Summary
              </h3>
              <p>
                I am a dual-focused <strong>Web Developer and Ethical Hacker</strong>, uniquely positioned at the intersection of creation and security. Currently progressing through my BSCS at Gomal University, I dedicate my focus to building applications that are not only performant and scalable but heavily fortified against modern digital threats.
              </p>
              
              <h3 className="sub-heading mt-4">
                <Target size={20} className="heading-icon" />
                My Approach
              </h3>
              <p>
                By combining a creative engineering mindset with strict security testing methodologies, I solve real-world problems. Whether I'm architecting a new React frontend or running penetration diagnostics, continuous learning and robust API integration are at the core of my workflow.
              </p>
              
              <div className="highlight-box mt-4">
                <Award size={24} className="highlight-icon" />
                <div>
                  <h4>Prime Minister Laptop Scheme Merit (2026)</h4>
                  <p>Recognized for academic excellence and technical growth in Computer Science.</p>
                </div>
              </div>

              {/* NEW: Core Philosophies & Interests */}
              <div className="about-interests mt-4">
                <h4 className="interests-title mb-2" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.8rem' }}>Beyond Coding:</h4>
                <div className="interests-badges" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <motion.span className="interest-badge" whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 210, 255, 0.2)' }} style={{ padding: '0.4rem 1rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '20px', fontSize: '0.85rem', cursor: 'default' }}>🎮 CTF Challenges</motion.span>
                  <motion.span className="interest-badge" whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 210, 255, 0.2)' }} style={{ padding: '0.4rem 1rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '20px', fontSize: '0.85rem', cursor: 'default' }}>📚 Cyber Research</motion.span>
                  <motion.span className="interest-badge" whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 210, 255, 0.2)' }} style={{ padding: '0.4rem 1rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '20px', fontSize: '0.85rem', cursor: 'default' }}>🌐 Open Source Contrib</motion.span>
                  <motion.span className="interest-badge" whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 210, 255, 0.2)' }} style={{ padding: '0.4rem 1rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '20px', fontSize: '0.85rem', cursor: 'default' }}>🚀 UI/UX Design</motion.span>
                </div>
              </div>

            </motion.div>
          </Tilt>
        </div>
        
        <div className="about-right">
          <div className="about-grid">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
                >
                  <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.2} scale={1.05} transitionSpeed={400} className="about-card-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="about-card glass-panel" style={{ flex: 1 }}>
                      <div className="icon-wrapper">
                        <Icon className="card-icon" />
                      </div>
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </div>
          
          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable={true} glareMaxOpacity={0.1} scale={1.02} transitionSpeed={600}>
            <motion.div 
              className="stats-container glass-panel mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="stat-item">
                <h4 className="stat-number"><AnimatedCounter from={0} to={4} />+</h4>
                <p className="stat-label">Years Academic<br/>Focus</p>
              </div>
              <div className="stat-item">
                <h4 className="stat-number"><AnimatedCounter from={0} to={100} />%</h4>
                <p className="stat-label">Security<br/>Mindset</p>
              </div>
              <div className="stat-item">
                <h4 className="stat-number"><AnimatedCounter from={0} to={8} />+</h4>
                <p className="stat-label">Core Tech<br/>Mastered</p>
              </div>
              <div className="stat-item">
                <h4 className="stat-number"><AnimatedCounter from={0} to={50} />+</h4>
                <p className="stat-label">Projects<br/>Completed</p>
              </div>
            </motion.div>
          </Tilt>
        </div>
      </div>
      
      {/* NEW: Quote Block */}
      <motion.div 
        className="about-quote-block glass-panel mt-5"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ padding: '2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: '-20px', left: '20px', fontSize: '8rem', color: 'rgba(0, 210, 255, 0.1)', fontFamily: 'serif', lineHeight: 1 }}>"</div>
        <p className="quote-text" style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text-main)', position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
          Security is not an afterthought; it is a vital layer integrated into the foundation of every application I build. Combining scalable architecture with an offensive security mindset ensures my products don't just work—they survive.
        </p>
        <span className="quote-author" style={{ display: 'block', marginTop: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)', fontSize: '1rem' }}>— Hazrat Ullah</span>
      </motion.div>

      {/* NEW: AI Skills & Tools Full-Width Card */}
      <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} glareEnable={true} glareMaxOpacity={0.1} scale={1.01} transitionSpeed={600}>
        <motion.div 
          className="about-ai-card glass-panel mt-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '4px solid var(--accent-primary)' }}
        >
          <h3 style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.5rem' }}>
            <Cpu size={28} color="var(--accent-primary)" /> AI Skills & Tools
          </h3>
          <ul className="ai-skills-grid">
            <li style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
              <strong style={{ color: 'var(--text-main)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 Machine Learning
              </strong>
              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Building predictive models and automation tools</span>
            </li>
            <li style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
              <strong style={{ color: 'var(--text-main)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 Natural Language Processing (NLP)
              </strong>
              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Text analysis and conversational AI</span>
            </li>
            <li style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
              <strong style={{ color: 'var(--text-main)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 AI Tools & Platforms
              </strong>
              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Python, TensorFlow, PyTorch, OpenAI API</span>
            </li>
            <li style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
              <strong style={{ color: 'var(--text-main)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 AI Integration
              </strong>
              <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Incorporating AI features into web and mobile applications</span>
            </li>
          </ul>
        </motion.div>
      </Tilt>
      
      {/* Extra Feature: Core Competency Progress Bars */}
      <div className="about-progress-section mt-5 glass-panel">
        <h3 className="sub-heading" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
          <Target size={20} className="heading-icon" /> Core Technical Proficiencies
        </h3>
        <div className="progress-grid">
          <div className="progress-item">
            <div className="progress-info">
              <span>Frontend Architecture (React/Flutter)</span>
              <span>95%</span>
            </div>
            <div className="progress-bg">
              <motion.div className="progress-fill" initial={{ width: 0 }} whileInView={{ width: '95%' }} transition={{ duration: 1.5, delay: 0.2 }} viewport={{ once: true }}></motion.div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-info">
              <span>Backend Systems (Node.js/SQL)</span>
              <span>85%</span>
            </div>
            <div className="progress-bg">
              <motion.div className="progress-fill" initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1.5, delay: 0.4 }} viewport={{ once: true }}></motion.div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-info">
              <span>Ethical Hacking & Security</span>
              <span>90%</span>
            </div>
            <div className="progress-bg">
              <motion.div className="progress-fill" initial={{ width: 0 }} whileInView={{ width: '90%' }} transition={{ duration: 1.5, delay: 0.6 }} viewport={{ once: true }}></motion.div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
