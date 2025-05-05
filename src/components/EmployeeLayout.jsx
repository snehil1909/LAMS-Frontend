import React from 'react';
import { useParams } from 'react-router-dom';
import SideMenu from './SideMenu';
import './EmployeeLayout.css';

const EmployeeLayout = ({ children }) => {
  const params = useParams();
  // Get the appropriate ID regardless of whether it's userId or supervisorId
  const id = params.userId || params.supervisorId;
  
  return (
    <div className="employee-layout">
      <SideMenu userId={id} />
      <div className="employee-content">
        {children}
      </div>
    </div>
  );
};

export default EmployeeLayout;