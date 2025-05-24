import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './EditReport.css';

const EditReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [formData, setFormData] = useState({
    crimeType: '',
    description: '',
    date: '',
    time: '',
    location: '',
    status: 'pending',
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get(`/reports/${id}`);
        setReport(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };
    fetchReport();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/reports/${id}`, formData);
      alert('Report updated successfully!');
      navigate('/reports');
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  if (!report) return <p>Loading...</p>;

  return (
    <div className="edit-report-container">
      <h2>Edit Report</h2>
      <form onSubmit={handleSubmit}>
        <label>Crime Type:</label>
        <input name="crimeType" value={formData.crimeType} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label>Time:</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} />

        <label>Location:</label>
        <input name="location" value={formData.location} onChange={handleChange} required />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="under investigation">Under Investigation</option>
          <option value="resolved">Resolved</option>
        </select>

        <button type="submit">Update Report</button>
      </form>
    </div>
  );
};

export default EditReport;
