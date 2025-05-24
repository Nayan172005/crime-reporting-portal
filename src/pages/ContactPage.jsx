import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ContactPage.css';

const ContactPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been submitted!');
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>Reach out for assistance, feedback, or emergency support</p>
      </div>

      <div className="contact-container">
        {/* Contact Information */}
        <div className="contact-info">
          <div className="info-card">
            <FaPhone className="contact-icon" />
            <h3>Emergency Helpline</h3>
            <p>+91 112 (24x7)</p>
            <p className="emergency">Dial 112 for immediate police assistance</p>
          </div>

          <div className="info-card">
            <FaHeadset className="contact-icon" />
            <h3>General Support</h3>
            <p>1800-123-4567 (Toll Free)</p>
            <p>support@crimeportal.gov.in</p>
          </div>

          <div className="info-card">
            <FaMapMarkerAlt className="contact-icon" />
            <h3>Headquarters</h3>
            <p>Ministry of Home Affairs</p>
            <p>North Block, Central Secretariat</p>
            <p>New Delhi - 110001</p>
          </div>

          <div className="info-card">
            <FaClock className="contact-icon" />
            <h3>Working Hours</h3>
            <p>Monday to Saturday</p>
            <p>9:00 AM - 6:00 PM</p>
            <p>(Except national holidays)</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter your full name" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" required>
                <option value="">Select an option</option>
                <option value="complaint">Crime Complaint</option>
                <option value="status">Case Status Inquiry</option>
                <option value="feedback">Portal Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                rows="5" 
                placeholder="Enter your message..." 
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" onClick={() => navigate('/')}>
              Submit Message
            </button>
          </form>
        </div>
      </div>

      {/* Embedded Map */}
      <div className="map-container">
        <iframe 
          title="MHA Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.715150264319!2d77.2084723150834!3d28.61473998241864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2a99b6f9fa7%3A0x83a25e55f0af54c!2sMinistry%20of%20Home%20Affairs!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;