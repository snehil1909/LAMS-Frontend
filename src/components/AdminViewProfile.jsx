import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AdminViewProfile.css';

const AdminViewProfile = ({ isOpen, onClose, userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://192.168.47.133:5000/api/employee/profile/${userId}`
        );
        
        if (response.data) {
          setProfile(response.data);
          setError(null);
        } else {
          setError("No profile data received");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load employee profile");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="admin-profile-modal"
      overlayClassName="admin-profile-overlay"
    >
      <div className="modal-header">
        <h2>Employee Profile</h2>
        <button onClick={onClose} className="close-button">&times;</button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
      ) : profile ? (
        <div className="modal-content">
          <div className="profile-section">
            <div className="avatar-section">
              <div className="avatar">
                {profile?.firstName?.charAt(0) || "?"}{profile?.lastName?.charAt(0) || "?"}
              </div>
              <h3>{profile?.firstName} {profile?.lastName}</h3>
              <span className="department-badge">{profile?.department || "No Department"}</span>
            </div>

            <div className="info-section">
              <div className="info-card">
                <h4>Personal Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Employee ID</span>
                    <span className="value">{profile?.employeeId || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email</span>
                    <span className="value">{profile?.email || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Country</span>
                    <span className="value">{profile?.countryId || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h4>Work Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Department</span>
                    <span className="value">{profile?.department || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Supervisor</span>
                    <span className="value">{profile?.supervisorName || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default AdminViewProfile;