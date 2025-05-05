import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PendingLeaveRequests.css";

const PendingLeaveRequestsPage = () => {
  const { supervisorId } = useParams();
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, [supervisorId]);

  const fetchLeaveRequests = () => {
    axios
      .get(`http://192.168.47.133:5000/api/supervisor/${supervisorId}/leave-requests/pending`)
      .then((res) => setLeaveRequests(res.data))
      .catch((err) => console.error("Error fetching leave requests:", err));
  };

  const handleUpdateLeaveStatus = (requestId, status) => {
    if (window.confirm(`Are you sure you want to ${status.toLowerCase()} this leave request?`)) {
      axios
        .put(`http://192.168.47.133:5000/api/supervisor/leave-requests/${requestId}/status`, {
          status: status,
        })
        .then(() => {
          alert(`Leave request ${status.toLowerCase()} successfully!`);
          fetchLeaveRequests(); // Refetch leave requests
        })
        .catch((err) => {
          console.error(`Error updating leave request status:`, err);
          alert(`Failed to ${status.toLowerCase()} the leave request. Please try again.`);
        });
    }
  };

  return (
    <div className="pending-leave-requests-container">
      <h2 className="form-title">Pending Leave Requests</h2>
      <div className="table-container">
        <table className="leave-requests-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.length > 0 ? (
              leaveRequests.map((request) => (
                <tr key={request.requestId}>
                  <td>{request.employeeId}</td>
                  <td>{request.employeeName}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.reason}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.status === "PENDING" && (
                      <>
                        <button
                          className="btn-approve"
                          onClick={() => handleUpdateLeaveStatus(request.requestId, "APPROVED")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn-reject"
                          onClick={() => handleUpdateLeaveStatus(request.requestId, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No pending leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingLeaveRequestsPage;