import React, { useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Contact.css';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Contact = () => {
  const position = [32.2217, 70.3793]; // Coordinates for Tank, Pakistan
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.message) return setStatusMsg('Please fill out all fields.');
    
    setIsSubmitting(true);
    setStatusMsg('');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/hazratullah.tk@gmail.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message
        })
      });

      if (response.ok) {
        setStatusMsg('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatusMsg('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error("Error sending message: ", error);
      setStatusMsg('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact" className="contact-section">
      <motion.h2 
        className="section-title text-3d-sidebar" 
        style={{ display: 'inline-block' }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Contact & Location
      </motion.h2>


      
      <div className="contact-content">
        <div className="contact-info">
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.15} transitionSpeed={400} perspective={1000}>
            <motion.div 
              className="glass-panel contact-card h-100"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
            <h3>Get In Touch</h3>
            <p>I'm currently available for new opportunities, freelance projects, and collaborations.</p>
            
            <div className="contact-methods">
              <div className="contact-method" style={{ alignItems: 'flex-start' }}>
                <Mail className="contact-icon" style={{ marginTop: '4px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span>hazratullah.tk@gmail.com</span>
                  <span>mr.hazratullah.tk@gmail.com</span>
                </div>
              </div>
              <div className="contact-method">
                <MapPin className="contact-icon" />
                <span>Tank, Khyber Pakhtunkhwa, Pakistan</span>
              </div>
              <div className="contact-method">
                <MessageCircle className="contact-icon" />
                <span>+92 306 9267984 (WhatsApp)</span>
              </div>
            </div>

            <div className="social-links">
              <a href="https://github.com/Hazrat-Ullah-star" target="_blank" rel="noreferrer" className="social-link" title="GitHub">
                <FaGithub style={{ fontSize: '1.2rem' }} />
              </a>
              <a href="https://www.linkedin.com/in/hazrat-ullah" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
                <FaLinkedin style={{ fontSize: '1.2rem' }} />
              </a>
              <a href="mailto:hazratullah.tk@gmail.com" className="social-link" title="Email">
                <FaEnvelope style={{ fontSize: '1.2rem' }} />
              </a>
              <a href="https://wa.me/923069267984" target="_blank" rel="noreferrer" className="social-link" title="WhatsApp">
                <FaWhatsapp style={{ fontSize: '1.2rem' }} />
              </a>
            </div>
          </motion.div>
          </Tilt>
          
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.15} transitionSpeed={400} perspective={1000}>
          <motion.form 
            className="glass-panel contact-form h-100" 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your Message" rows="4" disabled={isSubmitting}></textarea>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button 
                type="button" 
                className="btn btn-secondary glass-btn text-3d-hover" 
                style={{ flex: 1, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={() => setFormData({ name: '', email: '', message: '' })}
              >
                Reset
              </button>
              <button type="submit" className="btn btn-primary submit-btn text-3d-hover" style={{ flex: 2, marginTop: 0 }} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Message'}
              </button>
            </div>
            {statusMsg && <p className="status-msg" style={{ marginTop: '1rem', textAlign: 'center', color: statusMsg.includes('success') ? 'var(--accent-primary)' : 'red' }}>{statusMsg}</p>}
          </motion.form>
          </Tilt>
        </div>

        <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} transitionSpeed={500} perspective={1000}>
        <motion.div 
          className="map-container glass-panel"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: '15px' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Hazrat Ullah <br /> Tank, Pakistan
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
        </Tilt>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
