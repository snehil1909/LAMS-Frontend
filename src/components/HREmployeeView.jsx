import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './HREmployeeView.css';

const HREmployeeView = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveBalance, setLeaveBalance] = useState([]);
  const [showLeaveBalance, setShowLeaveBalance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://192.168.47.133:5000/api/hr/${user.supervisorId}/employees`);
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch employees');
      setLoading(false);
    }
  };

  const fetchLeaveBalance = async (employeeId) => {
    try {
      const response = await axios.get(
        `http://192.168.47.133:5000/api/hr/${user.supervisorId}/employees/${employeeId}/leave-balance`
      );
      setLeaveBalance(response.data);
      setShowLeaveBalance(true);
    } catch (err) {
      console.error('Error fetching leave balance:', err);
    }
  };

  return (
    <div className="hr-employee-view">
      <h2>Employees Under Supervision</h2>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="employee-grid">
          {employees.map((employee) => (
            <div key={employee.userId} className="employee-card">
              <div className="employee-avatar">
                {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
              </div>
              <div className="employee-info">
                <h3>{employee.firstName} {employee.lastName}</h3>
                <p className="employee-id">ID: {employee.employeeId}</p>
                <p className="employee-dept">{employee.department}</p>
                <p className="employee-email">{employee.email}</p>
                <button 
                  className="view-balance-btn"
                  onClick={() => fetchLeaveBalance(employee.employeeId)}
                >
                  View Leave Balance
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leave Balance Modal */}
      <Modal
        isOpen={showLeaveBalance}
        onRequestClose={() => setShowLeaveBalance(false)}
        className="leave-balance-modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h3>Leave Balance</h3>
          <button onClick={() => setShowLeaveBalance(false)} className="close-btn">&times;</button>
        </div>
        <div className="modal-content">
          {leaveBalance.map((leave) => (
            <div key={leave.leaveTypeId} className="leave-balance-item">
              <span className="leave-type">{leave.leaveTypeName}</span>
              <span className="leave-count">
                {leave.remainingDays} / {leave.totalDays} days
              </span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default HREmployeeView;