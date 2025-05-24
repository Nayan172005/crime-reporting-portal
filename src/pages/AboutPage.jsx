import React from 'react';
import './AboutPage.css';
import { FaShieldAlt, FaUsers, FaChartLine, FaGlobe } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>About National Crime Reporting Portal</h1>
          <p>A secure platform for citizens to report crimes and help build a safer India</p>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <FaShieldAlt className="mission-icon" />
              <h3>Public Safety</h3>
              <p>Creating a secure environment for all citizens through timely crime reporting</p>
            </div>
            <div className="mission-card">
              <FaUsers className="mission-icon" />
              <h3>Community Partnership</h3>
              <p>Collaborating with citizens to prevent and solve crimes</p>
            </div>
            <div className="mission-card">
              <FaChartLine className="mission-icon" />
              <h3>Data-Driven</h3>
              <p>Utilizing crime analytics for better law enforcement strategies</p>
            </div>
            <div className="mission-card">
              <FaGlobe className="mission-icon" />
              <h3>National Coverage</h3>
              <p>Serving all states and union territories across India</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>50,000+</h3>
              <p>Crimes Reported</p>
            </div>
            <div className="stat-item">
              <h3>35,000+</h3>
              <p>Cases Resolved</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>User Satisfaction</p>
            </div>
            <div className="stat-item">
              <h3>All 28 States</h3>
              <p>Coverage</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2>Our Partners</h2>
          <div className="partner-logos">
            <img src="/images/mha-logo.png" alt="Ministry of Home Affairs" />
            <img src="/images/nia-logo.jpeg" alt="National Investigation Agency" />
            <img src="/images/police-logo.png" alt="State Police Departments" />
            <img src="/images/cyber-cell-logo.jpeg" alt="Cyber Crime Cell" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;