import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./employeeProfile.css";

const EmployeeProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Using the employeeservice instead of direct axios call
        const response = await axios.get(
          `http://192.168.47.134:5000/api/employee/profile/${userId}`
        );
        
        console.log("API Response:", response.data); // Debug log
        
        if (response.data) {
          setProfile(response.data);
          setError(null);
        } else {
          setError("No profile data received");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load employee profile. Please try again.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="profile-container">
        <h3>Error</h3>
        <p>{error || "Failed to load employee profile"}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  // Only render when profile data exists
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <div className="avatar">
            {profile?.firstName?.charAt(0) || "?"}{profile?.lastName?.charAt(0) || "?"}
          </div>
        </div>
        <div className="profile-title">
          <h1>{profile?.firstName || "User"} {profile?.lastName || ""}</h1>
          <span className="department-badge">{profile?.department || "No Department"}</span>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <h3>Personal Information</h3>
          <div className="info-item">
            <span className="icon">🪪</span>
            <div>
              <span className="label">Employee ID</span>
              <span className="value">{profile?.employeeId || "N/A"}</span>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">👤</span>
            <div>
              <span className="label">Full Name</span>
              <span className="value">{profile?.firstName || "N/A"} {profile?.lastName || ""}</span>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">✉️</span>
            <div>
              <span className="label">Email Address</span>
              <span className="value">{profile?.email || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h3>Work Information</h3>
          <div className="info-item">
            <span className="icon">🏢</span>
            <div>
              <span className="label">Department</span>
              <span className="value">{profile?.department || "N/A"}</span>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">👔</span>
            <div>
              <span className="label">Supervisor</span>
              <span className="value">{profile?.supervisorName || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;