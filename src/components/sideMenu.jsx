import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = ({ userId }) => {
  const location = useLocation();
  
  // Check if current path matches the provided path
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="side-menu">
      
      <nav className="side-menu-nav">
        <ul>
          <li className={isActive(`/profile/${userId}`) ? 'active' : ''}>
            <Link to={`/profile/${userId}`}>
              <span className="icon">🏠</span>
              <span className="label">Home</span>
            </Link>
          </li>
          <li className={isActive(`/mark-attendance/${userId}`) ? 'active' : ''}>
            <Link to={`/mark-attendance/${userId}`}>
              <span className="icon">📝</span>
              <span className="label">Mark Attendance</span>
            </Link>
          </li>
          <li className={isActive(`/leave-requests/${userId}`) ? 'active' : ''}>
            <Link to={`/leave-requests/${userId}`}>
              <span className="icon">🗓️</span>
              <span className="label">My Leaves</span>
            </Link>
          </li>
          <li className={isActive('/submit-leave') ? 'active' : ''}>
            <Link to={`/submit-leave/${userId}`}>
              <span className="icon">📋</span>
              <span className="label">Apply Leave</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="logout">
              <span className="icon">🚪</span>
              <span className="label">Log Out</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;