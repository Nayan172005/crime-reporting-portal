import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './ViewReports.css';

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="reports-container">
      <h2>Crime Reports</h2>
      <div className="reports-list">
        {reports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="report-card"
              onClick={() => navigate(`/report/${report.id}`)}
            >
              <h3>{report.crimeType}</h3>
              <p>{report.description.substring(0, 50)}...</p>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Status:</strong> {report.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewReports;
