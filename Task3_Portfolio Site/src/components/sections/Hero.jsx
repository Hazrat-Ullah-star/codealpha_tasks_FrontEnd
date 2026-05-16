import React from 'react';
import SectionWrapper from '../SectionWrapper';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronDown, Download, Mail, ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaNodeJs, FaUserSecret } from 'react-icons/fa';
import { SiFlutter } from 'react-icons/si';
import { TypeAnimation } from 'react-type-animation';
import ParticleEffectThree from '../ParticleEffectThree';
import './Hero.css';
import cv from '../../assets/resume/Hazrat Ullah CV .pdf';

const Hero = () => {

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper id="home" className="hero-section">
      <ParticleEffectThree />

      <div className="hero-background-glow"></div>

      <div className="hero-content centered">

        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        >
          <ShieldCheck size={14} className="badge-icon" />
          <span>Available for Opportunities</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          Hi, I’m <span className="gradient-text text-3d" style={{ display: 'inline-block' }}>Hazrat Ullah</span>
        </motion.h1>

        <motion.div
          className="typing-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="type-prefix">— </span>
          <TypeAnimation
            sequence={[
              'Ethical Hacker', 2000,
              'Web Developer', 2000,
              'Flutter Developer', 2000,
            ]}
            wrapper="span"
            speed={50}
            className="typing-text text-3d"
            repeat={Infinity}
          />
        </motion.div>

        <motion.p  
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          I design and build secure, scalable, and modern digital solutions. With expertise in <i> <strong>Ethical Hacking</strong></i>, <i> <strong>Web Development</strong> </i>, and mobile app development with <i> <strong>Flutter</strong> </i>, I combine creativity and technical skills to craft applications that are fast, reliable, and user-friendly. I thrive on solving complex problems and turning ideas into professional-grade projects.
        </motion.p>

        {/* Highlight Main Skills Card */}
        <motion.div
          className="hero-skills-highlight glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="skill-dot" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <FaReact color="#61dafb" /> ReactJS
          </a> <span className="dot-sep">•</span>
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="skill-dot" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <SiFlutter color="#02569b" /> Flutter
          </a> <span className="dot-sep">•</span>
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="skill-dot" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <FaNodeJs color="#339933" /> Node.js
          </a> <span className="dot-sep">•</span>
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="skill-dot" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <FaUserSecret color="#fff" /> Ethical Hacking
          </a>
        </motion.div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
        >
          <a href="./projects/00.png" className="btn btn-primary">
            View My Work <ArrowRight size={18} />
          </a>
          <a href={cv} download="Hazrat Ullah CV.pdf" className="btn btn-secondary glass-btn">
            <Download size={18} /> Download Resume
          </a>
          <a href="+923069267984" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-secondary glass-btn">
            <Mail size={18} /> Contact Me
          </a>
        </motion.div>

        {/* Subtly Animated Social Links */}
        <motion.div
          className="hero-socials"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <a href="https://github.com/Hazrat-Ullah-star" target="_blank" rel="noreferrer" className="hero-social-icon html-anim">
            <FaGithub size={22} />
          </a>
          <a href="https://www.linkedin.com/in/hazrat-ullah" target="_blank" rel="noreferrer" className="hero-social-icon html-anim">
            <FaLinkedin size={22} />
          </a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hero-social-icon html-anim" title="Contact Me">
            <FaEnvelope size={22} />
          </a>
        </motion.div>

      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={(e) => scrollToSection(e, 'about')}
        style={{ cursor: 'pointer' }}
      >
        <span className="scroll-text">Scroll Down</span>
        <ChevronDown size={24} className="scroll-icon" />
      </motion.div>
    </SectionWrapper>
  );
};

export default Hero;
