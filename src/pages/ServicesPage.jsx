import React from 'react';
import { FaShieldAlt, FaUserShield, FaMobileAlt, FaLaptopCode, FaFileAlt, FaGlobe } from 'react-icons/fa';
import './ServicesPage.css';

const ServicesPage = () => {
  const services = [
    {
      icon: <FaShieldAlt className="service-icon" />,
      title: "Cyber Crime Reporting",
      description: "Report online fraud, hacking, identity theft, and other cyber crimes with digital evidence submission.",
      link: "/report/cyber"
    },
    {
      icon: <FaUserShield className="service-icon" />,
      title: "Women's Safety",
      description: "Immediate assistance for crimes against women with dedicated response teams.",
      link: "/report/women-safety"
    },
    {
      icon: <FaMobileAlt className="service-icon" />,
      title: "Mobile App Support",
      description: "Access all services through our secure mobile application (Android/iOS).",
      link: "/mobile-app"
    },
    {
      icon: <FaLaptopCode className="service-icon" />,
      title: "Online Complaint Tracking",
      description: "Real-time tracking of your complaint status with case reference number.",
      link: "/track-complaint"
    },
    {
      icon: <FaFileAlt className="service-icon" />,
      title: "Download Certificates",
      description: "Download FIR copies, investigation reports, and closure certificates.",
      link: "/certificates"
    },
    {
      icon: <FaGlobe className="service-icon" />,
      title: "National Database Access",
      description: "Search for crime patterns and alerts in your locality.",
      link: "/crime-database"
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>Comprehensive crime reporting and prevention solutions for citizens</p>
      </div>

      {/* Services Grid */}
      <div className="services-container">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon-container">
              {service.icon}
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a href={service.link} className="service-link">Learn More →</a>
          </div>
        ))}
      </div>

      {/* Emergency Banner */}
      <div className="emergency-banner">
        <div className="emergency-content">
          <h2>Emergency Assistance</h2>
          <p>Immediate response for life-threatening situations</p>
          <div className="emergency-contact">
            <span className="emergency-number">Dial 112</span>
            <span>National Emergency Number</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;