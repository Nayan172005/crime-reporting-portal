import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  
  const handleReportClick = () => {
    setShowPopup(true);
  };

  const handleConfirm = () => {
    setShowPopup(false);
    navigate('/login');
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <h2>Report Crime</h2>
        <p>See something? Say something. Every report makes our nation more secure.</p>
        <button className="report-btn" onClick={handleReportClick}>
          Report Crime Now
        </button>
      </div>

      {/* Custom Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <h3>Login Required</h3>
              <p>You have to login to report a crime.</p>
              <p id = "note">Note: If you want to report another crime , you will have to login again after submiting the current report</p>
              <button className="popup-btn" onClick={handleConfirm}>
                Proceed to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;