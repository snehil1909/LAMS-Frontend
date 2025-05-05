import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SupervisorEmployeesPage.css";

const SupervisorEmployeesPage = () => {
  const { supervisorId } = useParams();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // For profile modal
  const [attendanceStats, setAttendanceStats] = useState(null); // For attendance modal

  // Fetch employees under the supervisor
  useEffect(() => {
    axios
      .get(`http://192.168.47.133:5000/api/supervisor/${supervisorId}/employees`)
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, [supervisorId]);

// Update the handleViewAttendance function
const handleViewAttendance = (employeeId) => {
    console.log("Viewing attendance for employee:", employeeId);
    axios
      .get(
        `http://192.168.47.133:5000/api/supervisor/${supervisorId}/employees/${employeeId}/attendance?year=2025&month=4`
      )
      .then((res) => {
        console.log("Attendance response:", res.data);
        setAttendanceStats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching attendance stats:", err);
        alert("Failed to fetch attendance data");
      });
  };

  const closeAttendanceModal = () => {
    setAttendanceStats(null);
  };

  // Update the handleViewProfile function
  const handleViewProfile = (employee) => {
    console.log("Viewing profile for employee:", employee);
    setSelectedEmployee(employee);
  };

  // Close the profile modal
  const closeProfileModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="supervisor-employees-page">
      <h2>Employees Under Supervision</h2>
      <table className="table">
        <thead>
          <tr>
            <th>S.R No.</th>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.userId}>
              <td>{index + 1}</td>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>
                <button onClick={() => handleViewAttendance(employee.employeeId)}>
                  View Attendance
                </button>
                <button onClick={() => handleViewProfile(employee)}>
                  View Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

{/* Attendance Stats Modal */}
{attendanceStats && (
  <>
    <div className="modal-overlay" onClick={closeAttendanceModal}></div>
    <div className="modal">
      <div className="modal-content">
        <h3>Attendance Stats</h3>
        <p>Total Present: {attendanceStats.presentDays}</p>
        <p>Total Absent: {attendanceStats.absentDays}</p>
        <button onClick={closeAttendanceModal}>Close</button>
      </div>
    </div>
  </>
)}

{/* Profile Modal */}
{selectedEmployee && (
  <>
    <div className="modal-overlay" onClick={closeProfileModal}></div>
    <div className="modal">
      <div className="modal-content">
        <h3>Profile</h3>
        <p>Employee ID: {selectedEmployee.employeeId}</p>
        <p>Name: {selectedEmployee.firstName} {selectedEmployee.lastName}</p>
        <p>Role: {selectedEmployee.department}</p>
        <p>Email: {selectedEmployee.email}</p>
        <button onClick={closeProfileModal}>Close</button>
      </div>
    </div>
  </>
)}
    </div>
  );
};

export default SupervisorEmployeesPage;