import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployeeComponent = () => {
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
    countryId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://192.168.47.134:5000/api/users/createUser", employee)
      .then((response) => {
        alert("Employee created successfully!");
        navigate("/employees"); // Redirect to the employee list page
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
        alert("Failed to create employee. Please try again.");
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            name="employeeId"
            className="form-control"
            value={employee.employeeId}
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label>Country ID</label>
          <input
            type="text"
            name="countryId"
            className="form-control"
            value={employee.countryId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeComponent;