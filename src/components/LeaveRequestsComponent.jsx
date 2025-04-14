import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./LeaveRequestsComponent.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const LeaveRequestsComponent = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch leave requests for the user
    axios
      .get(`http://192.168.47.134:5000/api/employee/${userId}/leave-requests`)
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leave requests:", error);
        setError("Failed to load leave requests. Please try again.");
      });

    // Fetch leave balance for the user
    axios
      .get(`http://192.168.47.134:5000/api/employee/${userId}/leave-balance`)
      .then((response) => {
        setLeaveBalance(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leave balance:", error);
        setError("Failed to load leave balance. Please try again.");
      });
  }, [userId]);

  const cancelLeaveRequest = (requestId) => {
    if (window.confirm("Are you sure you want to cancel this leave request?")) {
      axios
        .put(
          `http://192.168.47.134:5000/api/employee/${userId}/leave-request/${requestId}/cancel`
        )
        .then(() => {
          alert("Leave request canceled successfully!");
          // Refresh the leave requests list
          setLeaveRequests((prevRequests) =>
            prevRequests.map((request) =>
              request.requestId === requestId
                ? { ...request, status: "Canceled" }
                : request
            )
          );
        })
        .catch((error) => {
          console.error("Error canceling leave request:", error);
          alert("Failed to cancel leave request. Please try again.");
        });
    }
  };

  // Prepare data for the pie chart
  const pieData = {
    labels: leaveBalance.map((balance) => balance.leaveTypeName),
    datasets: [
      {
        data: leaveBalance.map((balance) => balance.remainingDays),
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
        hoverBackgroundColor: ["#0056b3", "#1e7e34", "#e0a800", "#c82333"],
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false, // Prevent aspect ratio issues
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="leave-requests-container">
      <h2 className="form-title">Leave Requests</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="leave-requests-content">
        {/* Pie Chart */}
        <div className="leave-balance-chart">
          <h3>Leave Balance</h3>
          <div style={{ height: "300px", width: "300px" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Leave Requests Table */}
        <div className="leave-requests-table-container">
          {leaveRequests.length > 0 ? (
            <table className="leave-requests-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.requestId}>
                    <td>{request.leaveType}</td>
                    <td>{request.startDate}</td>
                    <td>{request.endDate}</td>
                    <td>{request.status}</td>
                    <td>{request.reason}</td>
                    <td>
                      {request.status !== "Canceled" && (
                        <button
                          className="btn-cancel"
                          onClick={() => cancelLeaveRequest(request.requestId)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-requests-message">No leave requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestsComponent;