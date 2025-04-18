import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SupervisorPage.css";

const SupervisorPage = () => {
  const { supervisorId } = useParams(); // Get supervisor ID from the URL
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch employees under the supervisor
  useEffect(() => {
    axios
      .get(`http://192.168.47.133:5000/api/supervisor/${supervisorId}/employees`)
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, [supervisorId]);

  // Fetch attendance stats for an employee
  const handleViewAttendance = (employeeId) => {
    setLoading(true);
    axios
      .get(`http://192.168.47.133:5000/api/employee/${employeeId}/attendance/stats`)
      .then((res) => {
        setAttendanceStats(res.data);
        setSelectedEmployee(employeeId);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching attendance stats:", err);
        setLoading(false);
      });
  };

  // Fetch leave requests and leave balance for an employee
  const handleViewLeaveRequests = (employeeId) => {
    setLoading(true);
    axios
      .get(`http://192.168.47.133:5000/api/employee/${employeeId}/leave-requests`)
      .then((res) => setLeaveRequests(res.data))
      .catch((err) => console.error("Error fetching leave requests:", err));

    axios
      .get(`http://192.168.47.133:5000/api/employee/${employeeId}/leave-balance`)
      .then((res) => setLeaveBalance(res.data))
      .catch((err) => console.error("Error fetching leave balance:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="supervisor-page">
      <h2 className="form-title">Employees Under Supervision</h2>
      <table className="table">
        <thead>
          <tr>
            <th>S.R No.</th>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Country</th>
            <th>View Attendance</th>
            <th>View Leave Request</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.employeeId}>
              <td>{index + 1}</td>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.role}</td>
              <td>{employee.country}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => handleViewAttendance(employee.employeeId)}
                >
                  View Attendance
                </button>
              </td>
              <td>
                {employee.hasLeaveRequest ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => handleViewLeaveRequests(employee.employeeId)}
                  >
                    View Leave Request
                  </button>
                ) : (
                  <button className="btn btn-disabled" disabled>
                    No Leave Request
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Attendance Stats Modal */}
      {attendanceStats && selectedEmployee && (
        <div className="modal">
          <h3>Attendance Stats for Employee ID: {selectedEmployee}</h3>
          <p>Total Days Present: {attendanceStats.presentDays}</p>
          <p>Total Days Absent: {attendanceStats.absentDays}</p>
          <button className="btn btn-close" onClick={() => setAttendanceStats(null)}>
            Close
          </button>
        </div>
      )}

      {/* Leave Requests Modal */}
      {leaveRequests.length > 0 && (
        <div className="modal">
          <h3>Leave Requests</h3>
          <ul>
            {leaveRequests.map((request) => (
              <li key={request.requestId}>
                <p>
                  <strong>Dates:</strong> {request.startDate} to {request.endDate}
                </p>
                <p>
                  <strong>Reason:</strong> {request.reason}
                </p>
              </li>
            ))}
          </ul>
          <h4>Leave Balance</h4>
          <ul>
            {leaveBalance.map((balance) => (
              <li key={balance.leaveTypeId}>
                {balance.leaveTypeName}: {balance.remainingDays} days remaining
              </li>
            ))}
          </ul>
          <button className="btn btn-close" onClick={() => setLeaveRequests([])}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SupervisorPage;