import React, { useState } from "react";
import axios from "axios";

const DeleteEmployeeComponent = () => {
  const [employeeId, setEmployeeId] = useState("");

  const handleChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://192.168.47.134:5000/api/users/${employeeId}`)
      .then(() => {
        alert("Employee deleted successfully!");
        setEmployeeId(""); // Clear the input field
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee. Please check the ID and try again.");
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Delete Employee</h2>
      <form onSubmit={handleDelete}>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            name="employeeId"
            className="form-control"
            value={employeeId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger mt-3">
          Delete Employee
        </button>
      </form>
    </div>
  );
};

export default DeleteEmployeeComponent;