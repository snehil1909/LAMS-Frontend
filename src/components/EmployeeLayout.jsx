import React from 'react';
import { useParams } from 'react-router-dom';
import SideMenu from './SideMenu';
import './EmployeeLayout.css';

const EmployeeLayout = ({ children }) => {
  const { userId } = useParams();
  
  return (
    <div className="employee-layout">
      <SideMenu userId={userId} />
      <div className="employee-content">
        {children}
      </div>
    </div>
  );
};

export default EmployeeLayout;