import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideMenu.css'; // Import the CSS file for styling

const SideMenu = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const location = useLocation();

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="side-menu">
      <div className="side-menu-header">
      </div>
      <ul className="side-menu-nav">
        {/* Links for EMPLOYEE */}
        {user.role === 'EMPLOYEE' && (
          <>
            <li className={isActive(`/profile/${user.userId}`) ? 'active' : ''}>
              <Link to={`/profile/${user.userId}`}>
                <span className="icon">👤</span>
                <span className="label">My Profile</span>
              </Link>
            </li>
            <li className={isActive(`/submit-leave/${user.userId}`) ? 'active' : ''}>
              <Link to={`/submit-leave/${user.userId}`}>
                <span className="icon">📝</span>
                <span className="label">Submit Leave</span>
              </Link>
            </li>
            <li className={isActive(`/leave-requests/${user.userId}`) ? 'active' : ''}>
              <Link to={`/leave-requests/${user.userId}`}>
                <span className="icon">📋</span>
                <span className="label">My Leave Requests</span>
              </Link>
            </li>
            <li className={isActive(`/mark-attendance/${user.userId}`) ? 'active' : ''}>
              <Link to={`/mark-attendance/${user.userId}`}>
                <span className="icon">✔️</span>
                <span className="label">Mark Attendance</span>
              </Link>
            </li>
          </>
        )}

        {/* Links for SUPERVISOR */}
        {user.role === 'SUPERVISOR' && (
          <>
             <li className={isActive(`/profile/${user.userId}`) ? 'active' : ''}>
              <Link to={`/profile/${user.userId}`}>
                <span className="icon">👤</span>
                <span className="label">My Profile</span>
              </Link>
            </li>
            <li className={isActive(`/submit-leave/${user.userId}`) ? 'active' : ''}>
              <Link to={`/submit-leave/${user.userId}`}>
                <span className="icon">📝</span>
                <span className="label">Submit Leave</span>
              </Link>
            </li>
            <li className={isActive(`/leave-requests/${user.userId}`) ? 'active' : ''}>
              <Link to={`/leave-requests/${user.userId}`}>
                <span className="icon">📋</span>
                <span className="label">My Leave Requests</span>
              </Link>
            </li>
            <li className={isActive(`/mark-attendance/${user.userId}`) ? 'active' : ''}>
              <Link to={`/mark-attendance/${user.userId}`}>
                <span className="icon">✔️</span>
                <span className="label">Mark Attendance</span>
              </Link>
            </li>
            <li className={isActive(`/supervisor/${user.userId}/employees`) ? 'active' : ''}>
              <Link to={`/supervisor/${user.userId}/employees`}>
                <span className="icon">👥</span>
                <span className="label">My Employees</span>
              </Link>
            </li>
            <li className={isActive(`/supervisor/${user.userId}/leave-requests/pending`) ? 'active' : ''}>
              <Link to={`/supervisor/${user.userId}/leave-requests/pending`}>
                <span className="icon">⏳</span>
                <span className="label">Pending Requests</span>
              </Link>
            </li>
          </>
        )}

        {/* Links for HR */}
        {user.role === 'HR' && (

          <>
           <li className={isActive(`/profile/${user.userId}`) ? 'active' : ''}>
              <Link to={`/profile/${user.userId}`}>
                <span className="icon">👤</span>
                <span className="label">My Profile</span>
              </Link>
            </li>
            <li className={isActive(`/submit-leave/${user.userId}`) ? 'active' : ''}>
              <Link to={`/submit-leave/${user.userId}`}>
                <span className="icon">📝</span>
                <span className="label">Submit Leave</span>
              </Link>
            </li>
            <li className={isActive(`/leave-requests/${user.userId}`) ? 'active' : ''}>
              <Link to={`/leave-requests/${user.userId}`}>
                <span className="icon">📋</span>
                <span className="label">My Leave Requests</span>
              </Link>
            </li>
            <li className={isActive(`/mark-attendance/${user.userId}`) ? 'active' : ''}>
              <Link to={`/mark-attendance/${user.userId}`}>
                <span className="icon">✔️</span>
                <span className="label">Mark Attendance</span>
              </Link>
            </li>
            <li className={isActive('/hr/employees') ? 'active' : ''}>
            <Link to="/hr/employees">
              <span className="icon">👥</span>
              <span className="label">View Employees</span>
            </Link>
          </li>
          </>
        )}

        {/* Links for ADMIN */}
        {user.role === 'ADMIN' && (
          <>
            <li className={isActive('/employees') ? 'active' : ''}>
              <Link to="/employees">
                <span className="icon">📋</span>
                <span className="label">Employee List</span>
              </Link>
            </li>
            <li className={isActive('/add-employee') ? 'active' : ''}>
              <Link to="/add-employee">
                <span className="icon">➕</span>
                <span className="label">Add Employee</span>
              </Link>
            </li>
            <li className={isActive('/delete-employee') ? 'active' : ''}>
              <Link to="/delete-employee">
                <span className="icon">❌</span>
                <span className="label">Delete Employee</span>
              </Link>
            </li>
          </>
        )}

        {/* Logout */}
        <li>
          <Link to="/" className="logout">
            <span className="icon">🚪</span>
            <span className="label">Log Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;