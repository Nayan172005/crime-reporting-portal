import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportCrime.css';
import api from '../services/api';

const ReportCrime = ({ onReportSubmitted }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    crimeType: '',
    description: '',
    date: '',
    time: '',
    location: '',
    evidence: null,
    anonymous: false,
    contactEmail: '',
    contactPhone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const crimeTypes = [
    'Cyber Crime',
    'Theft',
    'Fraud',
    'Assault',
    'Drug Offense',
    'Other'
  ];

  useEffect(() => {
    if (serverError && Object.keys(errors).length === 0) {
      setServerError(null);
    }
  }, [formData, errors, serverError]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.crimeType) newErrors.crimeType = 'Please select a crime type';
    if (!formData.description) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description should be at least 20 characters';
    }
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    if (!formData.anonymous) {
      if (!formData.contactEmail && !formData.contactPhone) {
        newErrors.contact = 'Please provide at least one contact method';
      } else if (formData.contactEmail && !/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
        newErrors.contactEmail = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setServerError(null);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('crimeType', formData.crimeType);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('time', formData.time || '');
      formDataToSend.append('location', formData.location);
      formDataToSend.append('anonymous', formData.anonymous);
      formDataToSend.append('contactEmail', formData.contactEmail || '');
      formDataToSend.append('contactPhone', formData.contactPhone || '');
      
      if (formData.evidence) {
        // Validate file size (5MB max)
        if (formData.evidence.size > 5 * 1024 * 1024) {
          throw new Error('File size exceeds 5MB limit');
        }
        formDataToSend.append('evidence', formData.evidence);
      }

      const response = await api.post('/reports', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Success handling
      if (typeof onReportSubmitted === 'function') {
        onReportSubmitted(); 
      }
      
      const successMessage = response.data?.id 
        ? `Report submitted successfully! Reference ID: ${response.data.id}`
        : 'Crime report submitted successfully!';
      
      alert(successMessage);
      navigate('/');
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                         error.message || 
                         'Failed to submit report';
      setServerError(errorMessage);
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="report-crime-page">
      <main className="report-crime-container">
        <div className="report-header">
          <h2>Report a Crime</h2>
        </div>
        
        {serverError && (
          <div className="server-error">
            <p>{serverError}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="crime-report-form" noValidate>
          <div className="form-section">
            <h3>Crime Information</h3>
            
            <div className={`form-group ${errors.crimeType ? 'error' : ''}`}>
              <label htmlFor="crimeType">Type of Crime*</label>
              <select
                id="crimeType"
                name="crimeType"
                value={formData.crimeType}
                onChange={handleChange}
                required
              >
                <option value="">Select a crime type</option>
                {crimeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.crimeType && <span className="error-message">{errors.crimeType}</span>}
            </div>
            
            <div className={`form-group ${errors.description ? 'error' : ''}`}>
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please provide detailed information about the incident (what happened, people involved, etc.)"
                rows={5}
                required
              />
              {errors.description && (
                <span className="error-message">{errors.description}</span>
              )}
            </div>
            
            <div className="form-row">
              <div className={`form-group ${errors.date ? 'error' : ''}`}>
                <label htmlFor="date">Date of Incident*</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="time">Time of Incident (approx.)</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className={`form-group ${errors.location ? 'error' : ''}`}>
              <label htmlFor="location">Location*</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Street address, city, or landmark"
                required
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="evidence">Upload Evidence (Optional)</label>
              <input
                type="file"
                id="evidence"
                name="evidence"
                onChange={handleChange}
                accept="image/*,.pdf,.doc,.docx"
              />
              <small>Accepted: JPG, PNG, PDF, DOC (Max 5MB)</small>
              {formData.evidence && (
                <div className="file-preview">
                  Selected: {formData.evidence.name} 
                  ({Math.round(formData.evidence.size / 1024)} KB)
                </div>
              )}
            </div>
          </div>
          
          <div className="form-section">
            <h3>Your Information</h3>
            
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="anonymous"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
              />
              <label htmlFor="anonymous">Report anonymously</label>
            </div>
            
            {!formData.anonymous && (
              <div className="contact-fields">
                <div className={`form-group ${errors.contactEmail ? 'error' : ''}`}>
                  <label htmlFor="contactEmail">Email</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="Your email address"
                  />
                  {errors.contactEmail && (
                    <span className="error-message">{errors.contactEmail}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="contactPhone">Phone Number</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />
                </div>
                
                {errors.contact && (
                  <div className="error-message">{errors.contact}</div>
                )}
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate('/')}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : 'Submit Report'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReportCrime;