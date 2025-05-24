import React, { useState, useEffect } from 'react';
import './CrimeStats.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const CrimeStats = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCrimeStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/crime-stats`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCrimeData(data);
    } catch (error) {
      setError("Failed to load crime statistics");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCrimeStats();
    const interval = setInterval(fetchCrimeStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="crime-stats">
      <h2>Crime Statistics & Analysis</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="stats-container">
        <div className="chart-container">
          {isLoading ? (
            <div className="loading">Loading crime data...</div>
          ) : crimeData.length === 0 ? (
            <div className="empty-state">No crime data available</div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={crimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cases" fill="#1a237e" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="about-section">
          <h3>About Us</h3>
          <p>The National Cyber Crime Reporting Portal is an initiative of the Government of India to facilitate victims/complainants to report cyber crime complaints online.</p>
          <div className="links">
            <a href="http://localhost:3000/about">Overview</a>
            <a href="http://localhost:3000/about">Mission</a>
            <a href="http://localhost:3000/about">Vision</a>
            <a href="http://localhost:3000/services">Useful Links</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeStats;