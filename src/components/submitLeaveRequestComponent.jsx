import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./submitLeaveRequestComponent.css"; // Import the CSS file for styling

const SubmitLeaveRequestComponent = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();
  const [leaveRequest, setLeaveRequest] = useState({
    leaveTypeId: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequest({ ...leaveRequest, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://192.168.47.134:5000/api/employee/${userId}/leave-request`, leaveRequest)
      .then(() => {
        alert("Leave request submitted successfully!");
        navigate(`/profile/${userId}`); // Redirect to the user's profile page
      })
      .catch((error) => {
        console.error("Error submitting leave request:", error);
        setError("Failed to submit leave request. Please try again.");
      });
  };

  return (
    <div className="leave-request-container">
      <h2 className="form-title">Submit Leave Request</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="leave-request-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Leave Type</label>
          <select
            name="leaveTypeId"
            className="form-control"
            value={leaveRequest.leaveTypeId}
            onChange={handleChange}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="1">Sick Leave</option>
            <option value="2">Casual Leave</option>
            <option value="3">Earned Leave</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={leaveRequest.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={leaveRequest.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Reason</label>
          <textarea
            name="reason"
            className="form-control"
            value={leaveRequest.reason}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn-submit">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default SubmitLeaveRequestComponent;