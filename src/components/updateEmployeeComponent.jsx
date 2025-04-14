import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateEmployeeComponent = () => {
  const { id } = useParams(); // Get employee ID from the URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    departmentId: "",
    supervisorId: "",
    roleId: "",
  });

  useEffect(() => {
    // Fetch employee details to pre-fill the form
    axios
      .get(`http://192.168.47.134:5000/api/users/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
        alert("Failed to load employee details.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://192.168.47.134:5000/api/users/${id}`, employee)
      .then(() => {
        alert("Employee updated successfully!");
        navigate("/employees"); // Redirect to the employee list page
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        alert("Failed to update employee. Please try again.");
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            name="employeeId"
            className="form-control"
            value={employee.employeeId}
            onChange={handleChange}
            disabled // Employee ID should not be editable
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={employee.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={employee.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={employee.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Department ID</label>
          <input
            type="text"
            name="departmentId"
            className="form-control"
            value={employee.departmentId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Supervisor ID</label>
          <input
            type="text"
            name="supervisorId"
            className="form-control"
            value={employee.supervisorId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Role ID</label>
          <input
            type="text"
            name="roleId"
            className="form-control"
            value={employee.roleId}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployeeComponent;